import React, { useContext } from "react";
import { ImageContext } from "../context/ImageContext";

const ImagePreview: React.FC = () => {
  const { previewImage } = useContext(ImageContext)!;

  return (
    <div className="image-preview">
      {previewImage ? (
        <img src={`data:image/jpeg;base64,${previewImage}`} alt="Preview" />
      ) : (
        <p>No preview available</p>
      )}
    </div>
  );
};

export default ImagePreview;
