import express from "express";
import * as authController from "../controllers/auth.controller.js";
import { regitserValidationRules } from "../middlewares/validation.middleware.js";
const router = express.Router();

router.post("/register", regitserValidationRules, authController.registerUser);

export default router;
