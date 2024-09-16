// src/app.ts
import express from "express";
import cors from "cors";
import imageRoutes from "./routes/imageRoutes";
import path from "path";

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON requests

// Static file serving for uploads/processed images
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/processed", express.static(path.join(__dirname, "../processed")));

// Routes
app.use("/api/images", imageRoutes); // All image-related API routes

export default app;
