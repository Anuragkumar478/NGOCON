import Campaign from "../models/Campaign.js";
import Volunteer from "../models/Volunteer.js";
import Donor from "../models/Donor.js";

// NGO creates a campaign
export const createCampaign = async (req, res) => {
  try {
    const { title, description, location } = req.body;
    const ngoId = req.ngo._id;

    const campaign = new Campaign({ title, description, ngo: ngoId, location });
    await campaign.save();

    req.ngo.campaigns.push(campaign._id);
    await req.ngo.save();

    res.status(201).json({ message: "Campaign created successfully", campaign });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all campaigns (optional location filter)
export const getAllCampaigns = async (req, res) => {
  try {
    const filter = {};
    if (req.query.location) filter.location = req.query.location;

    const campaigns = await Campaign.find(filter)
      .populate("ngo", "name email")
      .populate("volunteers", "name email")
      .populate("donations.donor", "name email");

    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single campaign details
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

// Volunteer registers for a campaign
export const registerVolunteer = async (req, res) => {
  try {
    const { volunteerId } = req.body;
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });

    if (campaign.volunteers.includes(volunteerId))
      return res.status(400).json({ message: "Volunteer already registered" });

    campaign.volunteers.push(volunteerId);
    await campaign.save();

    volunteer.registeredActivities.push(campaign._id);
    await volunteer.save();

    res.status(200).json({ message: "Volunteer registered successfully", campaign });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Donor contributes to a campaign
export const addDonation = async (req, res) => {
  try {
    const { donorId, amount } = req.body;
    if (amount <= 0) return res.status(400).json({ message: "Donation must be greater than 0" });

    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    const donor = await Donor.findById(donorId);
    if (!donor) return res.status(404).json({ message: "Donor not found" });

    campaign.donations.push({ donor: donorId, amount });
    await campaign.save();

    if (!donor.donations.includes(campaign._id)) {
      donor.donations.push(campaign._id);
      await donor.save();
    }

    res.status(200).json({ message: "Donation added successfully", campaign });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// NGO updates campaign status/progress
export const updateCampaignStatus = async (req, res) => {
  try {
    const { status, progress } = req.body;
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    if (campaign.ngo.toString() !== req.ngo._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    if (status) campaign.status = status;
    if (progress !== undefined) {
      if (progress < 0 || progress > 100)
        return res.status(400).json({ message: "Progress must be 0–100" });
      campaign.progress = progress;
    }

    await campaign.save();
    res.status(200).json({ message: "Campaign updated", campaign });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// NGO adds updates for transparency
export const addCampaignUpdate = async (req, res) => {
  try {
    const { message } = req.body;
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    if (campaign.ngo.toString() !== req.ngo._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    campaign.updates.push({ message });
    await campaign.save();

    res.status(200).json({ message: "Update added", campaign });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getCampaignUtilization = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
      .populate("ngo", "name email")
      .populate("donations.donor", "name email");

    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    const totalDonations = campaign.donations.reduce((sum, d) => sum + d.amount, 0);

    res.json({
      campaignId: campaign._id,
      title: campaign.title,
      ngo: campaign.ngo,
      status: campaign.status,
      progress: campaign.progress,
      totalDonations,
      donations: campaign.donations.map(d => ({
        donor: d.donor.name,
        amount: d.amount
      })),
      updates: campaign.updates
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};