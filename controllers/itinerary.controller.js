import Itinerary from "../models/Itinerary.js";
import City from "../models/City.js";
import User from "../models/User.js";
import ExpressError from "../utils/ExpressError.js";

const controllers = {
  getItineraries: async (req, res) => {
    const itineraries = await Itinerary.find();
    if (!itineraries) throw new ExpressError("itineraries not found", 404);
    res.json(itineraries).status(200);
  },
  getItineraryByCity: async (req, res) => {
    const { cityId } = req.params;
    const itinerary = await Itinerary.find({ city: cityId });
    if (!itinerary) throw new ExpressError("itinerary not found", 404);
    res.json(itinerary).status(200);
  },
  getItineraryById: async (req, res) => {
    const { id } = req.params;
    const itinerary = await Itinerary.findById(id);
    if (!itinerary) throw new ExpressError("itinerary not found", 404);
    res.json(itinerary).status(200);
  },
  createItinerary: async (req, res) => {
    const newItinerary = await Itinerary.create(req.body);
    //finds city attached to found itinerary and pushes found itinerary id on itineraries attribute
    await City.findByIdAndUpdate(newItinerary.city, {
      $push: { itineraries: newItinerary._id },
    });
    await User.findByIdAndUpdate(newItinerary.user, {
      $push: { itineraries: newItinerary._id },
    });
    res.json({ message: "itinerary created" }).status(201);
  },
  updateItinerary: async (req, res) => {
    const updatedItinerary = await Itinerary.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItinerary) throw new ExpressError("itinerary not found", 404);
    res
      .json({ message: "itinerary updated", itinerary: updatedItinerary })
      .status(201);
  },
  deleteItinerary: async (req, res) => {
    const foundItinerary = await Itinerary.findById(req.params.id);
    if (!foundItinerary) throw new ExpressError("itinerariy not found", 404);
    //finds city attached to found itinerary and pulls out found itinerary id from itineraries attribute
    const updatedCity = await City.findByIdAndUpdate(foundItinerary.city._id, {
      $pull: { itineraries: req.params.id },
    });
    if (!updatedCity)
      return res.status(404).json({ message: "city not found" });
    foundItinerary.deleteOne();
    res.json({ message: "itinerary deleted" }).status(200);
  },
};

export default controllers;
