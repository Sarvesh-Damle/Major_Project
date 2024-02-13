import mongoose from "mongoose";

const apartmentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
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
    distance: {
        type: String,
        required: true,
    },
    photos: {
        type: [String],
    }, 
    title: {
        type: String,
        required: true,
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
    room_type: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    tenant_type: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model("Apartment", apartmentsSchema);