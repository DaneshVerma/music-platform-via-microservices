import sendEmail from "../utils/email.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const sendOtp = async (req, res) => {
  const token = req.headers.authorization?.split(" ")?.[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const { email, otp } = decoded;
    const template = `

   <h2>we received a request to reset your password</h2>
   <h1>OTP</h1>
   <p>${otp}</p>
   <p>if you did not request this, please ignore this email</p>
   <p>Thank you for using our service</p>
   `;
    await sendEmail(email, template, "OTP");
    return res.status(200).json({ message: "Otp sent successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
