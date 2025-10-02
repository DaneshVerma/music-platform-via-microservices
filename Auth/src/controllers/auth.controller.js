import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
  res.cookie("token", token);
  return res.status(201).json({ message: "User registered successfully", user, token });
}
