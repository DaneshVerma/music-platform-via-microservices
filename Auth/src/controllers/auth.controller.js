import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

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
  return res
    .status(201)
    .json({ message: "User registered successfully", user, token });
}

export async function googleCallback(req, res) {
  const { id, displayName, emails: [{ value: email }],name:{givenName:firstname, familyName:lastname} } = req.user
  const username = email.split("@")[0] + Math.floor(Math.random() * 1000);
  const isUserExist = await userModel.findOne({$or:[{email},{googleId:id}]});
  if(isUserExist){
    const token = jwt.sign({ id:isUserExist._id }, config.JWT_SECRET, {
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
  return res
    .status(200)
    .json({ message: "User registered successfully", user, token });
}
