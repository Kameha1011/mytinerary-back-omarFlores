import express from "express";
import userController from "../controllers/user.controller.js";
import { catchAsync } from "../utils/catchAsync.js";

const router = express.Router();

router
  .route("/")
  .get(catchAsync(userController.getUsers))
  .post(catchAsync(userController.createUser));

router.route("/:id").get(catchAsync(userController.getUserById));

export default router;
