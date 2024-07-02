import User from "../models/User.js";
import { catchAsync } from "../utils/catchAsync.js";

export const accountExistsSignIn = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    req.user = {
      email: user.email,
      name: user.name,
      picture: user.picture,
      password: user.password,
    };
    return next();
  }
  return res.status(400).json({ message: "User does not exists!" });
});
