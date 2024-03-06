import mongoose from "mongoose";

const PGsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    distance_from_nearest_railway_station: {
      type: String,
      required: true,
    },
    distance_from_bus_stop: {
      type: Number,
      required: true,
    },
    photos: {
      type: [String],
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    pg_type: {
      type: String,
      required: true,
    },
    food_included: {
      type: Boolean,
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
      type: String, // girls, boys
      required: true,
    },
    phoneNumber: {
      type: Number,
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
  },
  { timestamps: true }
);

export default mongoose.model("PG", PGsSchema);
