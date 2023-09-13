import City from "../models/City.js";
import ExpressError from "../utils/ExpressError.js";
const controllers = {
  getCities: async (req, res) => {
    const queries = {};
    if (req.query.name) {
      queries.name = new RegExp(`^${req.query.name}`, "i");
    }
    if (req.query.country) {
      queries.country = req.query.country;
    }
    if (req.query.continent) {
      queries.continent = req.query.continent;
    }
    if (req.query.skip) {
      queries.skip = req.query.skip;
    }
    const cities = await City.find(queries, {}, { skip: queries.skip });
    if (!cities) throw new ExpressError("cities not found", 404);
    res.json(cities).status(200);
  },
  getCityById: async (req, res) => {
    const id = req.params.id;
    const city = await City.findById(id).populate({
      path: "itineraries",
      populate: { path: "user" },
    });
    if (!city) throw new ExpressError("city not found", 404);
    res.json(city).status(200);
  },
  createCity: async (req, res) => {
    await City.create(req.body);
    res.json({ message: "city created" }).status(201);
  },
  updateCity: async (req, res) => {
    const updatedCity = await City.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedCity) throw new ExpressError("city not found", 404);
    res.json({ message: "city updated", city: updatedCity }).status(201);
  },
  deleteCity: async (req, res) => {
    await City.findByIdAndDelete(req.params.id);
    res.json({ message: "city deleted" }).status(200);
  },
};

export default controllers;
