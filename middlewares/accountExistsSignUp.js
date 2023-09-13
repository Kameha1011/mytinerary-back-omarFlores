import User from "../models/User.js";
export const accountExistsSignUp = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "User Already Exists!" });
  }
  req.user = {
    email: req.body.email,
    name: req.body.name,
    picture: req.body.picture,
    password: req.body.password,
  };
  return next();
};
