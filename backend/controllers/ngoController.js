import NGO from "../models/NGO.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register NGO
export const registerNGO = async (req, res) => {
  try {
    const { name, email, password, description } = req.body;

    const existingNGO = await NGO.findOne({ email });
    if (existingNGO) return res.status(400).json({ message: "NGO already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const ngo = new NGO({ name, email, password: hashedPassword, description });
    await ngo.save();

    const token = jwt.sign({ id: ngo._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ ngo, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all NGOs
export const getAllNGOs = async (req, res) => {
  try {
    const ngos = await NGO.find().select("-password");
    res.json(ngos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
