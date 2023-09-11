import express from "express";
import authcontroller from "../controllers/auth.controller.js";
import { createUserSchema } from "../schema/user.schema.js";
import { validator } from "../middlewares/validator.js";
import { accountExistsSignUp } from "../middlewares/accountExistsSignUp.js";

const router = express.Router();

router.post(
  "/signup",
  validator(createUserSchema),
  accountExistsSignUp,
  authcontroller.signUp
);
router.post("/signin", authcontroller.signUp);
router.post("/signout", authcontroller.signUp);

export default router;
