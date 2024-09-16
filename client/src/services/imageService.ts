import axios from "axios";

const API_URL = "http://localhost:5000/api/images";

export const uploadImage = async (formData: FormData) => {
  const response = await axios.post(`${API_URL}/upload`, formData);
  return response.data;
};

export const adjustBrightness = async (
  filepath: string,
  brightness: number
) => {
  const response = await axios.post(`${API_URL}/brightness`, {
    filepath,
    brightness,
  });
  return response.data;
};

export const rotateImage = async (filepath: string, degrees: number) => {
  const response = await axios.post(`${API_URL}/rotate`, { filepath, degrees });
  return response.data;
};

export const downloadImage = async (filepath: string, format: string) => {
  console.log(filepath, format);

  const response = await axios.get(`${API_URL}/download`, {
    params: { filepath, format },
  });

  return response;
};
