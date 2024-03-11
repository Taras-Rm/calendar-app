import express from "express";
import { TasksController } from "../controllers/tasks";

const router = express.Router();

router.get("/", TasksController.getTasks);
router.post("/", TasksController.createTask);
router.put("/:id/position", TasksController.changeTaskPosition);

export default router;
