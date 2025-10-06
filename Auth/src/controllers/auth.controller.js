import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { publishMessage } from "../broker/rabbit.js";
import otpModel from "../models/otp.model.js";
import axios from "axios";

export async function registerUser(req, res) {
  const {
    username,
    email,
    fullname: { firstname, lastname },
    password,
  } = req.body;
  const isUserExist = await userModel.findOne({
    $or: [{ email }, { username }],
  });
  if (isUserExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    fullname: { firstname, lastname },
    password: hashedPassword,
  });
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "2d",
  });
  res.cookie("token", token);
  await publishMessage("auth_queue", {
    email,
    username,
    fullname: { firstname, lastname },
    password,
  });
  return res
    .status(201)
    .json({ message: "User registered successfully", user, token });
}

export async function googleCallback(req, res) {
  const {
    id,
    displayName,
    emails: [{ value: email }],
    name: { givenName: firstname, familyName: lastname },
  } = req.user;
  const username = email.split("@")[0] + Math.floor(Math.random() * 1000);
  const isUserExist = await userModel.findOne({
    $or: [{ email }, { googleId: id }],
  });
  if (isUserExist) {
    const token = jwt.sign({ id: isUserExist._id }, config.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.cookie("token", token);
    return res
      .status(200)
      .json({ message: "User logged in successfully", isUserExist, token });
  }

  const user = await userModel.create({
    username,
    email,
    fullname: { firstname, lastname },
    googleId: id,
  });
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "2d",
  });
  res.cookie("token", token);
  await publishMessage("auth_queue", {
    email,
    username,
    fullname: { firstname, lastname },
  });
  return res
    .status(200)
    .json({ message: "User registered successfully", user, token });
}

export async function forgotPassword(req, res) {
  const { email } = req.body;
  const isUserExist = await userModel.findOne({ email });
  if (!isUserExist) {
    return res.status(200).json({
      message: "if the email is registered, a OTP will be sent to your email",
    });
  }
  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpHash = await bcrypt.hash(otp.toString(), 10);
  await otpModel.create({
    otp: otpHash,
    email,
    expireIn: new Date(Date.now() + 600000),
  });
  try {
    const token = jwt.sign({ email, otp }, config.JWT_SECRET, {
      expiresIn: "10m",
    });
    await axios.post("http://localhost:3001/api/notification/send-otp", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.status(200).json({ message: "if the email is registered, a OTP will be sent to your email" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}


export async function varifyForgotPassword(req, res) {
    const {email, otp, newPassword} = req.body;
    const otpDoc = await otpModel.findOne({email});
    if(!otpDoc){
        return res.status(400).json({message: "Invalid OTP"});
    }
    const isOtpValid = await bcrypt.compare(otp, otpDoc.otp);
    if(!isOtpValid){
        return res.status(400).json({message: "Invalid OTP"});
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userModel.findOneAndUpdate({email}, {password: hashedPassword});
    await otpDoc.remove();
    return res.status(200).json({message: "Password updated successfully"});
}