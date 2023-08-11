import express from "express";
import cityControllers from "../controllers/city.controller.js";

const router = express.Router();

router.route("/")
.get(cityControllers.getCities)
.post(cityControllers.createCity);

export default router