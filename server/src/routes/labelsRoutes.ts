import express from "express";
import { LabelsController } from "../controllers/labels";

const router = express.Router();

router.get("/", LabelsController.getLabels);
router.post("/", LabelsController.createLabel);

export default router;
