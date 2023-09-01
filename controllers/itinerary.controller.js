import Itinerary from "../models/Itinerary.js";
import City from "../models/City.js";
import User from "../models/User.js";

const controllers = {
  getItineraries: async (req, res) => {
    try {
      const itineraries = await Itinerary.find();
      if (!itineraries)
        return res.status(404).json({ message: "itineraries not found" });
      res.json(itineraries).status(200);
    } catch (error) {
      res
        .json({
          message: error.message || "error getting itineraries",
        })
        .status(500);
    }
  },
  getItineraryByCity: async (req, res) => {
    try {
      const { cityId } = req.params;
      const itinerary = await Itinerary.find({ city: cityId });
      if (!itinerary)
        return res.status(404).json({ message: "itinerary not found" });
      res.json(itinerary).status(200);
    } catch (error) {
      res
        .json({ message: error.message || "error getting itinerary" })
        .status(500);
    }
  },
  getItineraryById: async (req, res) => {
    try {
      const { id } = req.params;
      const itinerary = await Itinerary.findById(id);
      if (!itinerary)
        return res.status(404).json({ message: "itinerary not found" });
      res.json(itinerary).status(200);
    } catch (error) {
      res
        .json({ message: error.message || "error getting itinerary" })
        .status(500);
    }
  },
  createItinerary: async (req, res) => {
    try {
      const newItinerary = await Itinerary.create(req.body);
      //finds city attached to found itinerary and pushes found itinerary id on itineraries attribute
      await City.findByIdAndUpdate(newItinerary.city, {
        $push: { itineraries: newItinerary._id },
      });
      await User.findByIdAndUpdate(newItinerary.user, {
        $push: { itineraries: newItinerary._id },
      });
      res.json({ message: "itinerary created" }).status(201);
    } catch (error) {
      res
        .json({
          message: error.message || "error creating itinerary",
        })
        .status(500);
    }
  },
  updateItinerary: async (req, res) => {
    try {
      const updatedItinerary = await Itinerary.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedItinerary)
        return res.status(404).json({ message: "itinerary not found" });
      res
        .json({ message: "itinerary updated", itinerary: updatedItinerary })
        .status(201);
    } catch (error) {
      res
        .json({
          message: error.message || "error updating itinerary",
        })
        .status(500);
    }
  },
  deleteItinerary: async (req, res) => {
    try {
      const foundItinerary = await Itinerary.findById(req.params.id);
      if (!foundItinerary)
        return res.status(404).json({ message: "itinerary not found" });
      //finds city attached to found itinerary and pulls out found itinerary id from itineraries attribute
      const updatedCity = await City.findByIdAndUpdate(
        foundItinerary.city._id,
        { $pull: { itineraries: req.params.id } }
      );
      if (!updatedCity)
        return res.status(404).json({ message: "city not found" });
      foundItinerary.deleteOne();
      res.json({ message: "itinerary deleted" }).status(200);
    } catch (error) {
      res
        .json({
          message: error.message || "error deleting itinerary",
        })
        .status(500);
    }
  },
};

export default controllers;
