import User from "../models/User.js";
const controller = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      if (!users) return res.status(404).json({ message: "users not found" });
      res.json(users).status(200);
    } catch (error) {
      res
        .json({
          message: error.message || "error getting users",
        })
        .status(500);
    }
  },
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: "user not found" });
      res.json(user).status(200);
    } catch (error) {
      res.json({ message: error.message || "error getting user" }).status(500);
    }
  },
  createUser: async (req, res) => {
    try {
      await User.create(req.body);
      res.json({ message: "user created" }).status(201);
    } catch (error) {
      res
        .json({
          message: error.message || "error creating user",
        })
        .status(500);
    }
  },
};

export default controller;
