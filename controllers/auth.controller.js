import crypto from "crypto";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const controllers = {
  signUp: async (req, res) => {
    try {
      req.body.verified_code = crypto.randomBytes(10).toString('hex')
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

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          name: user.name,
          photo: user.photo,
        },
        process.env.JWT_SECRET_TOKEN,
        { expiresIn: "10h" }
      );

      user.password = null;

      return res.status(200).json({
        success: true,
        message: "Usuario logueado correctamente",
        response: {
          token,
          user: {
            name: user.name,
            email: user.email,
            photo: user.photo,
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al autenticar el usuario",
      });
    }
  },
  signOut: async (req, res) => {
    try {
    } catch (error) {}
  },
};

export default controllers;
