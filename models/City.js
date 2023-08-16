import { Schema, Types, model } from "mongoose";

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
  continent: {
    type: String,
    required: true,
  }
},{
	timestamps: true
});

const City = model(collection, citySchema);

export default City