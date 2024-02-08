import mongoose from "mongoose";

const RoomsSchema = new mongoose.Schema({
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
    distance: {
        type: String,
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
    flat_type: {
        type: String,
        required: true,
    },
    availability: {
        type: String,
        required: true,
    },
}, {timestamps: true});

export default mongoose.model("Room", RoomsSchema);