import express from "express";
import itineraryController from "../controllers/itinerary.controller.js";
import { catchAsync } from "../utils/catchAsync.js";

const router = express.Router();

router
  .route("/")
  .get(catchAsync(itineraryController.getItineraries))
  .post(catchAsync(itineraryController.createItinerary));

router
  .route("/:id")
  .get(catchAsync(itineraryController.getItineraryById))
  .put(catchAsync(itineraryController.updateItinerary))
  .delete(catchAsync(itineraryController.deleteItinerary));

router
  .route("/city/:cityId")
  .get(catchAsync(itineraryController.getItineraryByCity));
export default router;
