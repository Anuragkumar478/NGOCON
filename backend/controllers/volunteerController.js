import Volunteer from "../models/Volunteer.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ Register Volunteer
export const registerVolunteer = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if volunteer exists
    const existingVolunteer = await Volunteer.findOne({ email });
    if (existingVolunteer)
      return res.status(400).json({ message: "Volunteer already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const volunteer = new Volunteer({ name, email, password: hashedPassword });
    await volunteer.save();

    // JWT token
    const token = jwt.sign({ id: volunteer._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ volunteer, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Login Volunteer
export const loginVolunteer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const volunteer = await Volunteer.findOne({ email });
    if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });

    const isMatch = await bcrypt.compare(password, volunteer.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: volunteer._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ volunteer, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Volunteers
export const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().select("-password");
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
