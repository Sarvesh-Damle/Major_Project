import { body } from "express-validator";

export const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("phoneNumber")
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone number must be exactly 10 digits"),
];

export const loginValidator = [
  body("email")
    .optional()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("phoneNumber")
    .optional()
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone number must be exactly 10 digits"),
  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

export const googleAuthValidator = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("name")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Name must be less than 100 characters"),
];

export const changePasswordValidator = [
  body("oldPassword")
    .notEmpty()
    .withMessage("Old password is required"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters"),
];

export const updateAccountValidator = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("phoneNumber")
    .optional()
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone number must be exactly 10 digits"),
];
