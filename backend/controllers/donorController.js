import Donor from "../models/Donor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register Donor
export const registerDonor = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if donor already exists
    const existingDonor = await Donor.findOne({ email });
    if (existingDonor) return res.status(400).json({ message: "Donor already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const donor = new Donor({ name, email, password: hashedPassword });
    await donor.save();

    // Generate JWT
    const token = jwt.sign({ id: donor._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ donor, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login Donor
export const loginDonor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const donor = await Donor.findOne({ email });
    if (!donor) return res.status(404).json({ message: "Donor not found" });

    const isMatch = await bcrypt.compare(password, donor.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: donor._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ donor, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Donors
export const getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find().select("-password");
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
