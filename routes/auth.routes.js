import express from "express";
import authcontroller from "../controllers/auth.controller.js";
import { createUserSchema } from "../schema/user.schema.js";
import { validator } from "../middlewares/validator.js";
import { accountExistsSignUp } from "../middlewares/accountExistsSignUp.js";
import { accountExistsSignIn } from "../middlewares/accountExistsSignIn.js";
import { passwordVerify } from "../middlewares/passwordVerify.js";
import passport from "../middlewares/passport.js";
import { catchAsync } from "../utils/catchAsync.js";
const router = express.Router();

router.post(
  "/signup",
  validator(createUserSchema),
  accountExistsSignUp,
  catchAsync(authcontroller.signUp)
);
router.post(
  "/signin",
  accountExistsSignIn,
  passwordVerify,
  catchAsync(authcontroller.signIn)
);
router.post("/googleSignin", catchAsync(authcontroller.googleSignin));
router.post("/googleSignup", catchAsync(authcontroller.googleSignup));
router.post(
  "/signout",
  accountExistsSignUp,
  passport.authenticate("jwt", { session: false }),
  catchAsync(authcontroller.signOut)
);
router.post(
  "/verify",
  passport.authenticate("jwt", { session: false }),
  catchAsync(authcontroller.verifyToken)
);

export default router;
