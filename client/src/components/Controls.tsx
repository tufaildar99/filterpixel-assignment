import React, { useContext, useState } from "react";
import { ImageContext } from "../context/ImageContext";
import { adjustBrightness, rotateImage } from "../services/imageService";

const Controls: React.FC = () => {
  const { uploadedImage, setPreviewImage } = useContext(ImageContext)!;
  const [brightness, setBrightness] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleBrightnessChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBrightness(parseFloat(e.target.value));
    if (uploadedImage) {
      const response = await adjustBrightness(uploadedImage, brightness);
      console.log(response.ImageBinary);
      setPreviewImage(response.ImageBinary);
    }
  };

  const handleRotationChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRotation(parseFloat(e.target.value));
    if (uploadedImage) {
      const response = await rotateImage(uploadedImage, rotation);
      setPreviewImage(response.ImageBinary);
    }
  };

  return (
    <div className="controls">
      <label>Brightness: {brightness}</label>
      <input
        type="range"
        min="0"
        max="2"
        step="0.1"
        value={brightness}
        onChange={handleBrightnessChange}
      />

      <label>Rotation: {rotation}°</label>
      <input
        type="range"
        min="0"
        max="360"
        value={rotation}
        onChange={handleRotationChange}
      />
    </div>
  );
};

export default Controls;
