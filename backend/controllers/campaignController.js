import Campaign from "../models/Campaign.js";
import Volunteer from "../models/Volunteer.js";
import Donor from "../models/Donor.js";
import NGO from "../models/NGO.js";

// ✅ Create Campaign (by NGO)
export const createCampaign = async (req, res) => {
  try {
    const { title, description, ngoId } = req.body;

    // Check if NGO exists
    const ngo = await NGO.findById(ngoId);
    if (!ngo) return res.status(404).json({ message: "NGO not found" });

    const campaign = new Campaign({
      title,
      description,
      ngo: ngoId,
      status: "active",
    });

    await campaign.save();

    // Add campaign to NGO's campaigns array
    ngo.campaigns.push(campaign._id);
    await ngo.save();

    res.status(201).json({ message: "Campaign created successfully", campaign });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Campaigns
export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find()
      .populate("ngo", "name email")
      .populate("volunteers", "name email")
      .populate("donations.donor", "name email");
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Single Campaign Details
export const getCampaignDetails = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
      .populate("ngo", "name email")
      .populate("volunteers", "name email")
      .populate("donations.donor", "name email");
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Register Volunteer to Campaign
export const registerVolunteer = async (req, res) => {
  try {
    const { volunteerId } = req.body;
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });

    // Check if volunteer already registered
    if (campaign.volunteers.includes(volunteerId))
      return res.status(400).json({ message: "Volunteer already registered" });

    campaign.volunteers.push(volunteerId);
    await campaign.save();

    // Add campaign to volunteer's registeredActivities
    volunteer.registeredActivities.push(campaign._id);
    await volunteer.save();

    res.status(200).json({ message: "Volunteer registered successfully", campaign });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Add Donation
export const addDonation = async (req, res) => {
  try {
    const { donorId, amount } = req.body;
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    const donor = await Donor.findById(donorId);
    if (!donor) return res.status(404).json({ message: "Donor not found" });

    campaign.donations.push({ donor: donorId, amount });
    await campaign.save();

    // Add campaign to donor's donations array if not already present
    if (!donor.donations.includes(campaign._id)) {
      donor.donations.push(campaign._id);
      await donor.save();
    }

    res.status(200).json({ message: "Donation added successfully", campaign });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Campaign Status
export const updateCampaignStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    campaign.status = status;
    await campaign.save();

    res.status(200).json({ message: "Campaign status updated", campaign });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
