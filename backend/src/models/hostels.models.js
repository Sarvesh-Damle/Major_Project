import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const hostelsSchema = new mongoose.Schema(
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
    hostel_name: {
      type: String,
      required: true,
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
      default: "Maharashtra",
    },
    pincode: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    type_of_hostel: {
      type: String,
      required: true,
    },
    room_type: {
      type: [String],
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
    rules: {
      type: [String],
      required: true,
    },
    amenities: {
      type: [String],
      required: true,
    },
    security_deposit: {
      type: Number,
      required: true,
    },
    property_photos: {
      type: [String],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

hostelsSchema.plugin(mongooseAggregatePaginate);

export default mongoose.model("Hostel", hostelsSchema);
