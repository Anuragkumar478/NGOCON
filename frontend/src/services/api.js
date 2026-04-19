import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ✅ send cookies automatically with every request
});

// 🔹 Automatically handle FormData uploads
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

 

  return config;
});


/* ===================== NGO APIs ===================== */
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

export const loginNGO = async (ngoData) => {
  // Cookie-based login
  
  const res = await api.post("/ngos/login", ngoData);
  localStorage.setItem("ngoToken", res.data.token);
  return res.data; // cookie is automatically stored by browser
};

export const logoutNGO = async () => {
  const res = await api.post("/ngos/logout"); // backend clears the cookie
  return res.data;
};

/* ===================== Donor APIs ===================== */
export const registerDonor = async (donorData) => {
  const res = await api.post("/donors/register", donorData);
  return res.data;
};

export const loginDonor = async (donorData) => {
  const res = await api.post("/donors/login", donorData);
  return res.data;
};

export const getAllDonors = async () => {
  const res = await api.get("/donors");
  return res.data;
};

/* ===================== Volunteer APIs ===================== */
export const registerVolunteer = async (volunteerData) => {
  const res = await api.post("/volunteers/register", volunteerData);
  return res.data;
};

export const loginVolunteer = async (volunteerData) => {
  const res = await api.post("/volunteers/login", volunteerData);
  return res.data;
};

export const getAllVolunteers = async () => {
  const res = await api.get("/volunteers");
  return res.data;
};

/* ===================== Campaign APIs ===================== */

export const createCampaign = async (data) => {
  const res = await api.post("/campaigns/create", data);
  return res.data;
};

export const getAllCampaigns = async (location) => {
  const res = await api.get("/campaigns", {
    params: location ? { location } : {},
  });
  return res.data;
}

export const getCampaignDetails = async (id) => {
  const res = await api.get(`/campaigns/${id}`);
  return res.data;
};

export const registerVolunteerToCampaign = async (campaignId) => {
  const res = await api.post(`/campaigns/${campaignId}/register-volunteer`);
  return res.data;
};

export const addDonationToCampaign = async (campaignId, donation) => {
  const res = await api.post(`/campaigns/${campaignId}/donate`, donation);
  return res.data;
};

export const getCampaignUtilization = async (campaignId) => {
  const res = await api.get(`/campaigns/${campaignId}/utilization`);
  return res.data;
};
export const loginProfile = async (profileData) => {
  const res = await api.post("/profile/login", profileData);
  return res.data; // cookie is automatically stored by browser
}
export const getProfile = async () => {
  const res = await api.get("/profile/getProfile");
  return res.data;
}
export const updateProfile = async (profileData) => {
  const res = await api.put("/profile/updateProfile", profileData);
  return res.data;
}

export default api;
