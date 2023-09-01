import express from "express";
import itineraryController from "../controllers/itinerary.controller.js";

const router = express.Router();

router
  .route("/")
  .get(itineraryController.getItineraries)
  .post(itineraryController.createItinerary);

router
  .route("/:id")
  .get(itineraryController.getItineraryById)
  .put(itineraryController.updateItinerary)
  .delete(itineraryController.deleteItinerary);

router.route("/city/:cityId").get(itineraryController.getItineraryByCity);
export default router;
