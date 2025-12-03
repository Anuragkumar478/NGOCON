import NGO from "../models/NGO.js";
import Volunteer from "../models/Volunteer.js";
import Donor from "../models/Donor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user;
    let role;

    // Check NGO
    user = await NGO.findOne({ email });
    if (user) role = "ngo";

    // Check Volunteer
    if (!user) {
      user = await Volunteer.findOne({ email });
      if (user) role = "volunteer";
    }

    // Check Donor
    if (!user) {
      user = await Donor.findOne({ email });
      if (user) role = "donor";
    }

    // Not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Password check
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    // Token payload
    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      role,
      user,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getProfile = async (req, res) => {
  try {
    const { userId, userRole } = req;

    let user;

    if (userRole === "ngo") {
      user = await NGO.findById(userId).populate("campaigns");
    } 
    else if (userRole === "volunteer") {
      user = await Volunteer.findById(userId).populate("registeredActivities");
    } 
    else if (userRole === "donor") {
      user = await Donor.findById(userId).populate("donations");
    }

    if (!user) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({
      role: userRole,
      profile: user,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id, role } = req.user; // from token
    const updates = req.body;

    let updatedUser;

    if (role === "ngo") {
      updatedUser = await NGO.findByIdAndUpdate(id, updates, { new: true });
    } 
    else if (role === "volunteer") {
      updatedUser = await Volunteer.findByIdAndUpdate(id, updates, { new: true });
    } 
    else if (role === "donor") {
      updatedUser = await Donor.findByIdAndUpdate(id, updates, { new: true });
    }

    res.json({ message: "Profile updated", updatedUser });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
