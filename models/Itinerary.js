import { Schema, model } from "mongoose";

const collection = "Itinerary";

const itinerarySchema = new Schema(
  {
    name:{
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    hashtags: {
      type: [String],
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Itinerary = model(collection, itinerarySchema);
export default Itinerary;
