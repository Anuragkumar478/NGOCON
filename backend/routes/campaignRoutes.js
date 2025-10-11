import express from "express";
import {
  createCampaign,
  getAllCampaigns,
  getCampaignDetails,
  registerVolunteer,
  addDonation,
  updateCampaignStatus
} from "../controllers/campaignController.js";

const router = express.Router();

// Create Campaign
router.post("/", createCampaign);

// Get all campaigns
router.get("/", getAllCampaigns);

// Get single campaign details
router.get("/:id", getCampaignDetails);

// Volunteer register
router.post("/:id/register-volunteer", registerVolunteer);

// Donor donate
router.post("/:id/donate", addDonation);

// Update campaign status
router.patch("/:id/status", updateCampaignStatus);

export default router;
