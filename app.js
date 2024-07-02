import "dotenv/config";
import "./config/db.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import indexRoutes from "./routes/index.routes.js";
import ExpressError from "./utils/ExpressError.js";

const app = express();
const PORT = process.env.PORT || 3000;
const ORIGIN =
  process.env.NODE_ENV === "production"
    ? "https://mytinerary-back-omarflores.vercel.app"
    : "http://localhost:5173";
const corsOptions = {
  origin: ORIGIN,
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use("/api", indexRoutes);

app.all("*", (req, res, next) => {
  next(new ExpressError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, name } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).json({
    message: err.message,
    name,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

app.listen(PORT, () => console.log("Server running on port " + PORT));
