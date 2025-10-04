import express from "express";
import sendEmail from "./utils/email.js";

const app = express()


app.get("/send-email", (req, res) => {
    sendEmail("factofreedom@gmail.com", "Test Subject", "Test Body");
    res.send("Email sent successfully");
});
export default app;