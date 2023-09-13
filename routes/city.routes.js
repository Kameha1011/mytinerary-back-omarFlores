import express from "express";
import cityControllers from "../controllers/city.controller.js";
import { catchAsync } from "../utils/catchAsync.js";

const router = express.Router();

router
  .route("/")
  .get(catchAsync(cityControllers.getCities))
  .post(catchAsync(cityControllers.createCity));

router
  .route("/:id")
  .get(catchAsync(cityControllers.getCityById))
  .put(catchAsync(cityControllers.updateCity))
  .delete(catchAsync(cityControllers.deleteCity));

export default router;
