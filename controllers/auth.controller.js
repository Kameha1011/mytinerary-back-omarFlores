import crypto from "crypto";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { verify } from "../utils/googleVerify.js";

const controllers = {
  signUp: async (req, res) => {
    try {
      req.body.verified_code = crypto.randomBytes(10).toString("hex");
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
      const user = await User.create(req.body);
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_TOKEN, {
        expiresIn: 60 * 60 * 24,
      });
      res.status(201).json({
        token,
        user: {
          name: req.user.name,
          email: req.user.email,
          picture: req.user.picture,
        },
      });
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
  googleSignin: async (req, res) => {
    try {
      const { token_id } = req.body;
      const { name, email, picture } = await verify(token_id);
      const user = await User.findOne({ email });
      if (!user) {
        const data = {
          name,
          email,
          picture,
          password: bcryptjs.hashSync(
            crypto.randomBytes(10).toString("hex"),
            10
          ),
          google: true,
          verified_code: crypto.randomBytes(10).toString("hex"),
        };
        user = await User.create(data);
      }
      user.online = true;
      await user.save();
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_TOKEN, {
        expiresIn: 60 * 60 * 24,
      });
      return res.status(200).json({
        message: "User signed in",
        user: {
          name: name,
          email: email,
          picture: picture,
        },
        token,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al autenticar el usuario",
      });
    }
  },
  googleSignup: async (req, res) => {
    try {
      const { token_id } = req.body;
      const { name, email, picture } = await verify(token_id);
      const user = await User.findOne({ email });
      if (!user) {
        const data = {
          name,
          email,
          picture,
          password: bcryptjs.hashSync(
            crypto.randomBytes(10).toString("hex"),
            10
          ),
          google: true,
          verified_code: crypto.randomBytes(10).toString("hex"),
        };
        const newUser = await User.create(data);
        newUser.online = true;
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_TOKEN, {
          expiresIn: 60 * 60 * 24,
        });
        return res.status(200).json({
          message: "User signed in",
          user: {
            name: name,
            email: email,
            picture: picture,
          },
          token,
        });
      }
      return res.status(409).json({
        message: "User already exists",
      })
    } catch (error) {
      console.log(error);
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
        token,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default controllers;
