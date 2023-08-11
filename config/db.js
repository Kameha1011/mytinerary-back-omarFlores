import mongoose from "mongoose";

const db_uri = process.env.DB_URI;
console.log(db_uri);
mongoose
  .connect(db_uri)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });
