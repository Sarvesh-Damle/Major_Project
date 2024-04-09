import mongoose, { Schema } from "mongoose";

const FavouritesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  properties: [
    {
      propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      propertyTag: {
        type: String,
        required: true
      }
    },
  ],
});

export default mongoose.model("Favourites", FavouritesSchema);
