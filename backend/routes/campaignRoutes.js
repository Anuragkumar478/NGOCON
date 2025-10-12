import express from "express";
import {
  createCampaign,
  getAllCampaigns,
  getCampaignDetails,
  registerVolunteer,
  addDonation,
  updateCampaignStatus,
  addCampaignUpdate,
} from "../controllers/campaignController.js";
import { protectNGO } from "../middleware/auth.js";

const router = express.Router();

// NGO routes (require authentication)
router.post("/", protectNGO, createCampaign);
router.patch("/:id/status", protectNGO, updateCampaignStatus);
router.post("/:id/updates", protectNGO, addCampaignUpdate);

// Public routes
router.get("/", getAllCampaigns);
router.get("/:id", getCampaignDetails);

// Volunteer & Donor actions (can add auth if needed)
router.post("/:id/register-volunteer", registerVolunteer);
router.post("/:id/donate", addDonation);

export default router;
