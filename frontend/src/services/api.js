import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const registerNGO = async (ngoData) => {
  const response = await axios.post(`${API_URL}/ngos/register`, ngoData);
  return response.data;
};

export const getAllNGOs = async () => {
  const response = await axios.get(`${API_URL}/ngos`);
  return response.data;
};
