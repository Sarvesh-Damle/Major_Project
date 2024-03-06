import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const hostelsSchema = new mongoose.Schema(
  {
    hostel_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    ownerName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
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
    type_of_hostel: {
      type: String,
      required: true,
    },
    room_type: {
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
    facilities: {
      type: [String],
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
    photos: {
      type: [String],
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
