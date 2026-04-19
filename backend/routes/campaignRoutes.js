import express from "express";
import {
  createCampaign,
  getAllCampaigns,
  getCampaignDetails,
  registerVolunteer,
  addDonation,
  updateCampaignStatus,
  addCampaignUpdate,
   getCampaignUtilization, 
} from "../controllers/campaignController.js";

import { authMiddleware } from "../middleware/authProfile.js";

const router = express.Router();

// NGO routes (require authentication)
router.post("/create", authMiddleware, createCampaign);
router.patch("/:id/status", authMiddleware, updateCampaignStatus);
router.post("/:id/updates", authMiddleware, addCampaignUpdate);

// Public routes
router.get("/", getAllCampaigns);
router.get("/:id", getCampaignDetails);

// ✅ Donor utilization report route (public)
router.get("/:id/utilization", getCampaignUtilization);
// Volunteer & Donor actions (can add auth if needed)
router.post("/:id/register-volunteer", authMiddleware, registerVolunteer);
router.post("/:id/donate", authMiddleware, addDonation);

export default router;
