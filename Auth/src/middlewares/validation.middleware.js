import { body, validationResult } from "express-validator";

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const regitserValidationRules = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("fullname.firstname")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long"),
  body("fullname.lastname")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 3 })
    .withMessage("Last name must be at least 3 characters long"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  validationMiddleware,
];

export const resetPasswordValidationRules = [
  body("email").trim().notEmpty().withMessage("Email is required"),
  body("otp").trim().notEmpty().withMessage("OTP is required"),
  body("newPassword").trim().notEmpty().withMessage("New Password is required"),
  validationMiddleware,
];

export const loginValidationRules = [
  body("email").trim().notEmpty().withMessage("Email is required"),
  body("password").trim().notEmpty().withMessage("Password is required"),
  validationMiddleware,
];