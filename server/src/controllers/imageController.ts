import sharp from "sharp";
import path from "path";
import { Request, Response } from "express";

// Rotate Image
export const rotateImage = async (req: Request, res: Response) => {
  const { filepath, degrees } = req.body;
  const inputPath = path.join(__dirname, "../../uploads", filepath);
  console.log(degrees);

  const outputPath = path.join(
    __dirname,
    "../../processed",
    `rotated_${Date.now()}.jpg`
  );

  try {
    console.log("Processing image...");
    console.log(degrees);
    console.log(typeof degrees);
    await sharp(inputPath)
      .rotate(Number(degrees))
      .jpeg({ quality: 50 }) // Lower quality for preview
      .toFile(outputPath);
    const ImageBinary = await sharp(outputPath).toBuffer();
    res.json({ ImageBinary: ImageBinary.toString("base64") });
  } catch (err) {
    res.status(500).json({
      error: "Image processing failed",
      details: (err as Error).message,
    });
  }
};

// Adjust Brightness
export const adjustBrightness = async (req: Request, res: Response) => {
  const { filepath, brightness } = req.body;
  const inputPath = path.join(__dirname, "../../uploads", filepath);
  const outputPath = path.join(
    __dirname,
    "../../processed",
    `brightness_${Date.now()}.jpg`
  );

  try {
    await sharp(inputPath)
      .modulate({ brightness: parseFloat(brightness) })
      .jpeg({ quality: 50 })
      .toFile(outputPath);

    const ImageBinary = await sharp(outputPath).toBuffer();
    res.json({ ImageBinary: ImageBinary.toString("base64") });
  } catch (err) {
    res.status(500).json({
      error: "Image processing failed",
      details: (err as Error).message,
    });
  }
};
