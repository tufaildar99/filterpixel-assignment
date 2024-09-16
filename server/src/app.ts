// src/app.ts
import express from "express";
import cors from "cors";
import imageRoutes from "./routes/imageRoutes";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/processed", express.static(path.join(__dirname, "../processed")));

app.use("/api/images", imageRoutes);

export default app;
