import { body, query } from "express-validator";
import mongoose from "mongoose";

// Custom validator for MongoDB ObjectId
const isValidObjectId = (value) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new Error("Invalid ID format");
  }
  return true;
};

export const idQueryValidator = [
  query("id")
    .notEmpty()
    .withMessage("ID is required")
    .custom(isValidObjectId),
];

export const idBodyValidator = [
  body("id")
    .notEmpty()
    .withMessage("ID is required")
    .custom(isValidObjectId),
];

export const createHostelValidator = [
  body("owner_name")
    .trim()
    .notEmpty()
    .withMessage("Owner name is required")
    .isLength({ max: 100 })
    .withMessage("Owner name must be less than 100 characters"),
  body("owner_email")
    .isEmail()
    .withMessage("Valid owner email is required")
    .normalizeEmail(),
  body("owner_phoneNumber")
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone number must be exactly 10 digits"),
  body("hostel_name")
    .trim()
    .notEmpty()
    .withMessage("Hostel name is required")
    .isLength({ max: 200 })
    .withMessage("Hostel name must be less than 200 characters"),
  body("type_of_hostel")
    .isIn(["Boys-Hostel", "Girls-Hostel"])
    .withMessage("Type must be Boys-Hostel or Girls-Hostel"),
  body("rent_amount")
    .isInt({ min: 0 })
    .withMessage("Rent amount must be a positive number"),
  body("city")
    .trim()
    .notEmpty()
    .withMessage("City is required"),
  body("locality")
    .trim()
    .notEmpty()
    .withMessage("Locality is required"),
  body("pincode")
    .matches(/^[0-9]{6}$/)
    .withMessage("Pincode must be exactly 6 digits"),
];

export const createPGValidator = [
  body("owner_name")
    .trim()
    .notEmpty()
    .withMessage("Owner name is required")
    .isLength({ max: 100 })
    .withMessage("Owner name must be less than 100 characters"),
  body("owner_email")
    .isEmail()
    .withMessage("Valid owner email is required")
    .normalizeEmail(),
  body("owner_phoneNumber")
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone number must be exactly 10 digits"),
  body("pg_name")
    .trim()
    .notEmpty()
    .withMessage("PG name is required")
    .isLength({ max: 200 })
    .withMessage("PG name must be less than 200 characters"),
  body("rent_amount")
    .isInt({ min: 0 })
    .withMessage("Rent amount must be a positive number"),
  body("city")
    .trim()
    .notEmpty()
    .withMessage("City is required"),
  body("locality")
    .trim()
    .notEmpty()
    .withMessage("Locality is required"),
  body("pincode")
    .matches(/^[0-9]{6}$/)
    .withMessage("Pincode must be exactly 6 digits"),
];

export const createFlatValidator = [
  body("owner_name")
    .trim()
    .notEmpty()
    .withMessage("Owner name is required")
    .isLength({ max: 100 })
    .withMessage("Owner name must be less than 100 characters"),
  body("owner_email")
    .isEmail()
    .withMessage("Valid owner email is required")
    .normalizeEmail(),
  body("owner_phoneNumber")
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone number must be exactly 10 digits"),
  body("flat_type")
    .trim()
    .notEmpty()
    .withMessage("Flat type is required"),
  body("rent_amount")
    .isInt({ min: 0 })
    .withMessage("Rent amount must be a positive number"),
  body("city")
    .trim()
    .notEmpty()
    .withMessage("City is required"),
  body("locality")
    .trim()
    .notEmpty()
    .withMessage("Locality is required"),
  body("pincode")
    .matches(/^[0-9]{6}$/)
    .withMessage("Pincode must be exactly 6 digits"),
];

export const verifyPropertyValidator = [
  body("id")
    .notEmpty()
    .withMessage("Property ID is required")
    .custom(isValidObjectId),
  body("featured")
    .isBoolean()
    .withMessage("Featured must be a boolean value"),
];

export const getAllPropertiesValidator = [
  query("city")
    .trim()
    .notEmpty()
    .withMessage("City is required"),
  query("locality")
    .optional()
    .trim(),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
];
