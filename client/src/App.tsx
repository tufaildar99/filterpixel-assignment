import React from "react";
import ImageUpload from "./components/ImageUpload";
import ImagePreview from "./components/ImagePreview";
import Controls from "./components/Controls";
import DownloadButton from "./components/DownloadButton";
import { ImageProvider } from "./context/ImageContext";

const App: React.FC = () => {
  return (
    <ImageProvider>
      <div className="App">
        <h1>Image Processing App</h1>
        <ImageUpload />
        <Controls />
        <ImagePreview />
        <DownloadButton />
      </div>
    </ImageProvider>
  );
};

export default App;
