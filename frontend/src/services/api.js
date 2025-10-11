import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// ✅ NGO APIs
export const registerNGO = async (ngoData) => {
  const res = await api.post("/ngos/register", ngoData);
  return res.data;
};

export const getAllNGOs = async () => {
  const res = await api.get("/ngos");
  return res.data;
};

export const getNGODetails = async (id) => {
  const res = await api.get(`/ngos/${id}`);
  return res.data;
};

export const getNGOsByCategory = async (category) => {
  const res = await api.get(`/ngos/category/${category}`);
  return res.data;
};

export const addFeedback = async (id, feedback) => {
  const res = await api.post(`/ngos/${id}/feedback`, feedback);
  return res.data;
};

// ✅ Donor APIs (if you have donors)
export const loginDonor = async (donorData) => {
  const res = await api.post("/donors/login", donorData);
  return res.data;
};

export const getAllDonors = async () => {
  const res = await api.get("/donors");
  return res.data;
};

export default api;
