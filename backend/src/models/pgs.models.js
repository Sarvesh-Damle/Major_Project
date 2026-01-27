import mongoose from "mongoose";

const PGsSchema = new mongoose.Schema(
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
    pg_name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      default: "Maharashtra",
    },
    pincode: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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
    rent_amount: {
      type: Number,
      required: true,
    },
    security_deposit: {
      type: Number,
      required: true,
    },
    food_included: {
      type: String,
      required: true,
    },
    food_availability: {
      type: [String],
    },
    parking_availability: {
      type: Boolean,
      required: true,
    },
    preferred_tennats: {
      type: String, // girls, boys
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
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Indexes for query optimization
PGsSchema.index({ city: 1, locality: 1 });
PGsSchema.index({ featured: 1 });
PGsSchema.index({ owner_email: 1 });
PGsSchema.index({ preferred_tennats: 1 });
PGsSchema.index({ rent_amount: 1 });
PGsSchema.index({ createdAt: -1 });

export default mongoose.model("PG", PGsSchema);
