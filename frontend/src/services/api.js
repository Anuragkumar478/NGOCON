import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" }
});

// NGO APIs
export const registerNGO = async (ngoData) => {
  const res = await api.post("/ngos/register", ngoData);
  return res.data;
};

export const getAllNGOs = async () => {
  const res = await api.get("/ngos");
  return res.data;
};

export default api;
