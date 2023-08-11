import { Schema, Types } from "mongoose";

const collection = "cities";

const citySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
},{
	timestamps: true
});

const City = mongoose.model(collection, citySchema);

export default City