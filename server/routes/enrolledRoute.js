import express from "express";
import { enrolledCourse } from "../controllers/courseController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const enrolledRouter = express.Router();

enrolledRouter.post("/:id", authMiddleware, enrolledCourse);

export default enrolledRouter;
