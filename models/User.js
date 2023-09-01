import { Schema, model } from "mongoose";

const collection = "User";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  itineraries: [
    {
      type: Schema.Types.ObjectId,
      ref: "Itinerary",
    },
  ],
});

const User = model(collection, userSchema);
export default User;