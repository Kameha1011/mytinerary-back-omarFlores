import City from "../models/City.js";
const controllers = {
  getCities: async (req, res) => {
    try {
      const queries = {};
      if(req.query.name) queries.name = new RegExp(`^${req.query.name}`, 'i');
      if(req.query.country) queries.country = req.query.country;
      if(req.query.continent) queries.continent = req.query.continent;
      const cities = await City.find(queries);
      if (!cities) return res.status(404).json({ message: "cities not found" });
      res.json(cities).status(200);
    } catch (error) {
      res
        .json({
          message: error.message || "error getting cities",
        })
        .status(500);
    }
  },
  getCityById: async (req, res) => {
    try {
      const id = req.params.id;
      const city = await City.findById(id);
      if (!city) return res.status(404).json({ message: "city not found" });
      res.json(city).status(200);
    } catch (error) {
      res.json({ message: error.message || "error getting city" }).status(500);
    }
  },
  createCity: async (req, res) => {
    try {
      await City.create(req.body);
      res.json({ message: "city created" }).status(201);
    } catch (error) {
      res
        .json({
          message: error.message || "error creating city",
        })
        .status(500);
    }
  },
  updateCity: async (req, res) => {
    try {
      const updatedCity = await City.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedCity)
        return res.status(404).json({ message: "city not found" });
      res.json({ message: "city updated", city: updatedCity }).status(201);
    } catch (error) {
      res
        .json({
          message: error.message || "error updating city",
        })
        .status(500);
    }
  },
  deleteCity: async (req, res) => {
    try {
      await City.findByIdAndDelete(req.params.id);
      res.json({ message: "city deleted" }).status(200);
    } catch (error) {
      res
        .json({
          message: error.message || "error deleting city",
        })
        .status(500);
    }
  },
};

export default controllers;
