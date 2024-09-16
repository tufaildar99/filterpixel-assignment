import React, { useContext } from "react";
import { useDropzone } from "react-dropzone";
import { ImageContext } from "../context/ImageContext"; // Adjust the import according to your project structure
import { uploadImage } from "../services/imageService"; // Adjust the import according to your project structure

const ImageUpload: React.FC = () => {
  const { setUploadedImage, setPreviewImage } = useContext(ImageContext)!;

  const onDrop = async (acceptedFiles: File[]) => {
    console.log(acceptedFiles);

    if (acceptedFiles.length === 0) return;

    const formData = new FormData();
    formData.append("image", acceptedFiles[0]);

    try {
      const response = await uploadImage(formData);
      setUploadedImage(response.filepath);
      setPreviewImage(response.ImageBinary);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [".jpeg", ".jpg"], "image/png": [".png"] },
    multiple: false,
    onDragEnter: () => {},
    onDragOver: () => {},
    onDragLeave: () => {},
  });

  const inputProps = getInputProps();
  const { refKey, ...inputAttributes } = inputProps;

  return (
    <div {...getRootProps()} className="upload-box">
      <input {...inputAttributes} />
      <p>Drag 'n' drop an image, or click to select one</p>
    </div>
  );
};

export default ImageUpload;
