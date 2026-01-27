import Review from "../models/reviews.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createReview = asyncHandler(async (req, res) => {
  const { propertyId, propertyType, rating, comment } = req.body;
  const userId = req.user._id;
  const userName = req.user.fullName || req.user.email.split("@")[0];

  // Check if user already reviewed this property
  const existingReview = await Review.findOne({ userId, propertyId, propertyType });
  if (existingReview) {
    throw new ApiError(400, "You have already reviewed this property");
  }

  const review = await Review.create({
    userId,
    propertyId,
    propertyType,
    rating,
    comment,
    userName,
  });

  return res.status(201).json(new ApiResponse(201, review, "Review submitted successfully"));
});

export const getPropertyReviews = asyncHandler(async (req, res) => {
  const { propertyId, propertyType } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  if (!propertyId || !propertyType) {
    throw new ApiError(400, "Property ID and type are required");
  }

  const total = await Review.countDocuments({ propertyId, propertyType });
  const reviews = await Review.find({ propertyId, propertyType })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  // Calculate average rating
  const avgResult = await Review.aggregate([
    { $match: { propertyId: new (await import("mongoose")).default.Types.ObjectId(propertyId), propertyType } },
    { $group: { _id: null, avgRating: { $avg: "$rating" }, count: { $sum: 1 } } },
  ]);

  const stats = avgResult[0] || { avgRating: 0, count: 0 };

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        reviews,
        stats: {
          averageRating: Math.round(stats.avgRating * 10) / 10,
          totalReviews: stats.count,
        },
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      "Reviews fetched successfully"
    )
  );
});

export const getUserReviews = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const reviews = await Review.find({ userId }).sort({ createdAt: -1 });

  return res.status(200).json(new ApiResponse(200, reviews, "User reviews fetched successfully"));
});

export const updateReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user._id;

  const review = await Review.findById(reviewId);
  if (!review) {
    throw new ApiError(404, "Review not found");
  }

  if (review.userId.toString() !== userId.toString()) {
    throw new ApiError(403, "You can only edit your own reviews");
  }

  review.rating = rating || review.rating;
  review.comment = comment || review.comment;
  await review.save();

  return res.status(200).json(new ApiResponse(200, review, "Review updated successfully"));
});

export const deleteReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user._id;

  const review = await Review.findById(reviewId);
  if (!review) {
    throw new ApiError(404, "Review not found");
  }

  if (review.userId.toString() !== userId.toString()) {
    throw new ApiError(403, "You can only delete your own reviews");
  }

  await Review.findByIdAndDelete(reviewId);

  return res.status(200).json(new ApiResponse(200, null, "Review deleted successfully"));
});
