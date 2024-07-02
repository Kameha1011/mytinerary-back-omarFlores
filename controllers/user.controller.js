import User from "../models/User.js";
import ExpressError from "../utils/ExpressError.js";
const controller = {
  getUsers: async (req, res) => {
    const users = await User.find();
    if (!users) throw new ExpressError("users not found", 404);
    res.json(users).status(200);
  },
  getUserById: async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) throw new ExpressError("user not found", 404);
    res.json(user).status(200);
  },
  createUser: async (req, res) => {
    await User.create(req.body);
    res.json({ message: "user created" }).status(201);
  },
};

export default controller;
