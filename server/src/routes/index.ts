import express from "express";
import TasksRouter from "./tasksRoutes";

const router = express.Router();

router.use("/tasks", TasksRouter);

export default router;
