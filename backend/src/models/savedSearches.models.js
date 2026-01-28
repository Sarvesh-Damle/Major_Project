import mongoose, { Schema } from "mongoose";

const savedSearchSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    searchName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    propertyType: {
      type: String,
      enum: ["hostel", "pg", "flat"],
      required: true,
    },
    filters: {
      city: { type: String },
      locality: { type: String },
      minPrice: { type: Number },
      maxPrice: { type: Number },
      // Hostel specific
      typeOfHostel: { type: String },
      roomType: { type: String },
      // PG/Flat specific
      preferredTennats: { type: String },
      // Flat specific
      flatType: { type: String },
      furnishedStatus: { type: String },
    },
    notifyOnNewMatches: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Compound index for efficient user queries
savedSearchSchema.index({ userId: 1, createdAt: -1 });

const SavedSearch = mongoose.model("SavedSearch", savedSearchSchema);

export default SavedSearch;
