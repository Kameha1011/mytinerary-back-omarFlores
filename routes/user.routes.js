import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").get(userController.getUsers).post(userController.createUser);

router.route("/:id").get(userController.getUserById);

export default router;
