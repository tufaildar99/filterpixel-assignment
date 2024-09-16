import { Router } from "express";
import multer from "multer";
import { rotateImage, adjustBrightness } from "../controllers/imageController";
import path from "path";
import fs from "fs";
import sharp from "sharp"; // Required for final image processing

const router = Router();

// Configure multer for file uploads (as before)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only images (PNG, JPEG) are allowed!"));
  },
});

// Route to upload an image
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  const ImageBinary = fs.readFileSync(req.file.path).toString("base64");
  res.json({ filepath: req.file.filename, ImageBinary });
});

// Image processing routes (rotate, brightness adjustments)
router.post("/rotate", rotateImage);
router.post("/brightness", adjustBrightness);

router.get("/download", async (req, res) => {
  const { filepath, format } = req.query;
  console.log(`Received request to download: ${filepath} in format: ${format}`);

  // Validate format parameter
  if (format !== "png" && format !== "jpeg") {
    return res
      .status(400)
      .json({ error: "Invalid format. Only 'png' and 'jpeg' are supported." });
  }

  const inputPath = path.join(__dirname, "../../uploads", filepath as string);
  console.log(`Input path: ${inputPath}`);

  if (!fs.existsSync(inputPath)) {
    return res.status(404).json({ error: "File not found" });
  }

  try {
    let buffer: Buffer = Buffer.alloc(0); // Initialize buffer with an empty buffer

    // Convert to the requested format (PNG or JPEG)
    if (format === "png") {
      buffer = await sharp(inputPath).png().toBuffer();
    } else if (format === "jpeg") {
      buffer = await sharp(inputPath).jpeg().toBuffer();
    }

    const base64Image = buffer.toString("base64");
    const mimeType = format === "png" ? "image/png" : "image/jpeg";

    console.log(`File processed successfully, sending Base64 string...`);
    res.json({ image: `data:${mimeType};base64,${base64Image}` });
  } catch (err) {
    console.error("Error processing the file:", err);
    res.status(500).json({ error: "Failed to process and send image" });
  }
});

export default router;
