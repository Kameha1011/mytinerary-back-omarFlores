import 'dotenv/config';
import './config/db.js';
import express from "express";
import morgan from "morgan";
import cors from "cors";
import indexRoutes from "./routes/index.routes.js";
import ExpressError from './utils/ExpressError.js';

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: 'http://localhost:5173'
  }

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use('/api', indexRoutes);

app.all('*', (req, res, next) => {
  next(new ExpressError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use((err, req, res, next) => {
  const { statusCode = 500, name } = err
  if (!err.message) err.message = 'Oh No, Something Went Wrong!'
  res.status(statusCode).json({
    message: err.message,
    name
  })
})

app.listen(PORT, () => console.log("Server running on port " + PORT));
