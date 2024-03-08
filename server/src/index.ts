import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const PORT = process.env.PORT || 8080;

export const prisma = new PrismaClient()

const app = express();

app.use(cors());

app.use("/api", router);

app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
