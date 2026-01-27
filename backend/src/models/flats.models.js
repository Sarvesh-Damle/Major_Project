import mongoose from "mongoose";

const FlatsSchema = new mongoose.Schema(
  {
    owner_name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    owner_email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    owner_phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      default: "Maharashtra"
    },
    pincode: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    flat_type: {
      type: String,
      required: true,
    },
    rent_amount: {
      type: Number,
      required: true,
    },
    distance_from_nearest_railway_station: {
      type: Number,
      required: true,
    },
    distance_from_bus_stop: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    furnished_status: {
      type: String,
      required: true,
    },
    flat_area: {
      type: Number,
      required: true,
    },
    flat_floor_number: {
      type: Number,
      required: true,
    },
    parking_availability: {
      type: Boolean,
      required: true,
    },
    security_deposit: {
      type: Number,
      required: true,
    },
    preferred_tennats: {
      type: String, // family, students, bachelors
      required: true,
    },
    amenities: {
      type: [String], // gym, swimming pool
      required: true,
    },
    rules: {
      type: [String], // smoking policy, pet policy
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    property_photos: {
      type: [String],
      required: true
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Indexes for query optimization
FlatsSchema.index({ city: 1, locality: 1 });
FlatsSchema.index({ featured: 1 });
FlatsSchema.index({ owner_email: 1 });
FlatsSchema.index({ flat_type: 1 });
FlatsSchema.index({ rent_amount: 1 });
FlatsSchema.index({ createdAt: -1 });

export default mongoose.model("Flat", FlatsSchema);
