import express from "express";
import cityControllers from "../controllers/city.controller.js";

const router = express.Router();

router.route("/")
.get(cityControllers.getCities)
.post(cityControllers.createCity);

router.route("/:id")
.get(cityControllers.getCityById)
.put(cityControllers.updateCity)
.delete(cityControllers.deleteCity);

export default router