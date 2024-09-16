import React, { createContext, useState, ReactNode } from "react";

interface ImageContextType {
  uploadedImage: string | null;
  previewImage: string | null;
  setUploadedImage: (image: string | null) => void;
  setPreviewImage: (image: string | null) => void;
}

export const ImageContext = createContext<ImageContextType | undefined>(
  undefined
);

export const ImageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  return (
    <ImageContext.Provider
      value={{ uploadedImage, previewImage, setUploadedImage, setPreviewImage }}
    >
      {children}
    </ImageContext.Provider>
  );
};
