import React, { useContext, useState } from "react";
import { ImageContext } from "../context/ImageContext";
import { downloadImage } from "../services/imageService";
import { log } from "console";

const DownloadButton: React.FC = () => {
  const { uploadedImage } = useContext(ImageContext)!;
  const [format, setFormat] = useState("jpeg");
  const handleDownload = async () => {
    try {
      if (!uploadedImage) {
        console.error("No uploaded image found");
        return;
      }
      console.log("Starting download process...");
      const response = await downloadImage(uploadedImage, format);
      if (!response?.data?.image) {
        console.error("No image data received from the server");
        return;
      }
      console.log("Image data received, creating blob...");

      // Extract the Base64 string from the response
      const base64Image = response.data.image.split(",")[1];
      const mimeType = format === "png" ? "image/png" : "image/jpeg";

      // Convert Base64 string to a Blob
      const byteCharacters = atob(base64Image);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });

      // Create a download link and click it programmatically
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `processed_image.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      console.log("Download link created and clicked");
    } catch (error) {
      console.error("Failed to download image", error);
    }
  };

  return (
    <div className="download-section">
      <label>Download Format:</label>
      <select value={format} onChange={(e) => setFormat(e.target.value)}>
        <option value="jpeg">JPEG</option>
        <option value="png">PNG</option>
      </select>
      <button onClick={handleDownload}>Download Image</button>
    </div>
  );
};

export default DownloadButton;
