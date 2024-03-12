import express from "express";
import { LabelsController } from "../controllers/labels";

const router = express.Router();

router.get("/", LabelsController.getLabels);

export default router;
