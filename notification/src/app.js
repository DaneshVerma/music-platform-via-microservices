import express from "express";
import sendEmail from "./utils/email.js";
import cors from "cors";
import notificationRoutes from "./routes/notification.routes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/send-email", (req, res) => {
  sendEmail("factofreedom@gmail.com", "Test Subject", "Test Body");
  res.send("Email sent successfully");
});

app.use("/api/notification", notificationRoutes);
export default app;
