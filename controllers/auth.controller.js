import crypto from "crypto";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const controllers = {
  signUp: async (req, res) => {
    try {
      req.body.verified_code = crypto.randomBytes(10).toString("hex");
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
      await User.create(req.body);
      res.status(201).json({ message: "User created!" });
    } catch (error) {
      res
        .json({
          message: error.message || "error creating user",
        })
        .status(500);
    }
  },
  signIn: async (req, res) => {
    try {
      let user = await User.findOneAndUpdate(
        { email: req.user.email },
        { online: true },
        { new: true }
      );
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_TOKEN, {
        expiresIn: 60 * 60 * 24,
      });
      return res.status(200).json({
        token,
        user: {
          name: req.user.name,
          email: req.user.email,
          picture: req.user.picture,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al autenticar el usuario",
      });
    }
  },
  signOut: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { email: req.user.email },
        { online: false },
        { new: true }
      );
      if (!user) return res.status(404).json({ message: "User not found" });
      return res.status(200).json({
        message: "Usuario deslogueado",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al autenticar el usuario",
      });
    }
  },
  verifyToken: async (req, res) => {
    const { user } = req;
    const token = req.headers.authorization.slice(7);
    try {
      return res.status(200).json({
        user: {
          name: user.name,
          email: user.email,
          photo: user.photo,
        },
        token
      });
    } catch (error) {
      next(error);
    }
  },
};

export default controllers;
