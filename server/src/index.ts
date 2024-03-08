import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());

app.use("/api", router);

app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});
