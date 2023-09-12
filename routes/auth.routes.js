import express from "express";
import authcontroller from "../controllers/auth.controller.js";
import { createUserSchema } from "../schema/user.schema.js";
import { validator } from "../middlewares/validator.js";
import { accountExistsSignUp } from "../middlewares/accountExistsSignUp.js";
import { accountExistsSignIn } from "../middlewares/accountExistsSignIn.js";
import { passwordVerify } from "../middlewares/passwordVerify.js";
import passport from "../middlewares/passport.js";
const router = express.Router();

router.post(
  "/signup",
  validator(createUserSchema),
  accountExistsSignUp,
  authcontroller.signUp
);
router.post(
  "/signin",
  accountExistsSignIn,
  passwordVerify,
  authcontroller.signIn
);
router.post(
  "/signout",
  passport.authenticate("jwt", { session: false }),
  authcontroller.signOut
);

export default router;
