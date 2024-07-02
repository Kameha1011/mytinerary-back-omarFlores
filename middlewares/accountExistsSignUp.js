import User from "../models/User.js";
import { catchAsync } from "../utils/catchAsync.js";
import ExpressError from "../utils/ExpressError.js";
export const accountExistsSignUp = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    throw new ExpressError("User already exists!", 400);
  }
  req.user = {
    email: req.body.email,
    name: req.body.name,
    picture: req.body.picture,
    password: req.body.password,
  };
  return next();
});
