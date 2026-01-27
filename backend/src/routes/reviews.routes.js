import { Router } from "express";
import { body, query, param } from "express-validator";
import { validate } from "../validators/index.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createReview,
  getPropertyReviews,
  getUserReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviews.controllers.js";

const router = Router();

// Validators
const createReviewValidator = [
  body("propertyId").notEmpty().withMessage("Property ID is required").isMongoId().withMessage("Invalid property ID"),
  body("propertyType").isIn(["hostel", "pg", "flat"]).withMessage("Property type must be hostel, pg, or flat"),
  body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
  body("comment")
    .trim()
    .notEmpty()
    .withMessage("Comment is required")
    .isLength({ max: 500 })
    .withMessage("Comment must be less than 500 characters"),
];

const getReviewsValidator = [
  query("propertyId").notEmpty().withMessage("Property ID is required").isMongoId().withMessage("Invalid property ID"),
  query("propertyType").isIn(["hostel", "pg", "flat"]).withMessage("Property type must be hostel, pg, or flat"),
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
  query("limit").optional().isInt({ min: 1, max: 50 }).withMessage("Limit must be between 1 and 50"),
];

const updateReviewValidator = [
  param("reviewId").isMongoId().withMessage("Invalid review ID"),
  body("rating").optional().isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
  body("comment")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Comment must be less than 500 characters"),
];

const deleteReviewValidator = [param("reviewId").isMongoId().withMessage("Invalid review ID")];

// Routes
router.post("/", verifyJWT, createReviewValidator, validate, createReview);
router.get("/property", getReviewsValidator, validate, getPropertyReviews);
router.get("/user", verifyJWT, getUserReviews);
router.put("/:reviewId", verifyJWT, updateReviewValidator, validate, updateReview);
router.delete("/:reviewId", verifyJWT, deleteReviewValidator, validate, deleteReview);

export default router;
