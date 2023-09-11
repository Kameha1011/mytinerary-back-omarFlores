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
      return res.status(200).json({
        message: "Usuario logueado correctamente",
        response: {
          user: {
            name: req.user.name,
            email: req.user.email,
            picture: req.user.picture,
          },
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
    } catch (error) {}
  },
};

export default controllers;
