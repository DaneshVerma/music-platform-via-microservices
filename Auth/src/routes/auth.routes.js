import express from "express";
import * as authController from "../controllers/auth.controller.js";
import { regitserValidationRules } from "../middlewares/validation.middleware.js";
import passport from "passport";
const router = express.Router();

router.post("/register", regitserValidationRules, authController.registerUser);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.googleCallback
);
export default router;
