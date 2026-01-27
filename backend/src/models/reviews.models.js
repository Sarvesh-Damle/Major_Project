import mongoose from "mongoose";

const ReviewsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    propertyType: {
      type: String,
      enum: ["hostel", "pg", "flat"],
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      maxlength: 500,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Indexes for efficient queries
ReviewsSchema.index({ propertyId: 1, propertyType: 1 });
ReviewsSchema.index({ userId: 1 });
ReviewsSchema.index({ createdAt: -1 });

// Compound index to ensure one review per user per property
ReviewsSchema.index({ userId: 1, propertyId: 1, propertyType: 1 }, { unique: true });

export default mongoose.model("Review", ReviewsSchema);
