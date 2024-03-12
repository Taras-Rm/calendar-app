import express from "express";
import TasksRouter from "./tasksRoutes";
import LabelsRouter from "./labelsRoutes";

const router = express.Router();

router.use("/tasks", TasksRouter);
router.use("/labels", LabelsRouter);

export default router;
