import express from "express";
import userRouter from "./user.routes.js";
import cityRouter from "./city.routes.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("epale sans");
})

router.use("/users", userRouter);
router.use("/cities", cityRouter);

export default router