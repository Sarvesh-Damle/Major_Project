import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

/**
 * Middleware to validate request using express-validator
 * Must be used after validation chain middleware
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errorMessages,
    });
  }
  next();
};

// Re-export all validators
export * from "./auth.validators.js";
export * from "./property.validators.js";
export * from "./contact.validators.js";
