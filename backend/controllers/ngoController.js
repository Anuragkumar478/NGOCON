import NGO from "../models/NGO.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ Register NGO with file uploads
export const registerNGO = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      description,
      category,
      website,
      address,
      localContactNumber,
    } = req.body;

    const existingNGO = await NGO.findOne({ email });
    if (existingNGO)
      return res.status(400).json({ message: "NGO already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Get file paths from multer
   const profileImage = req.files?.profileImage?.[0]?.path || req.files?.profileImage?.[0]?.filename || "";
const govtDocument = req.files?.govtDocument?.[0]?.path || req.files?.govtDocument?.[0]?.filename || "";


    const ngo = new NGO({
      name,
      email,
      password: hashedPassword,
      description,
      category,
      website,
      address,
      localContactNumber,
      profileImage,
      govtDocument,
      verifiedByAuthority: false,
    });

    await ngo.save();

    const token = jwt.sign({ id: ngo._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .status(201)
      .json({ message: "NGO registered successfully", ngo, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all NGOs
export const getAllNGOs = async (req, res) => {
  try {
    const ngos = await NGO.find().select("-password");
    res.json(ngos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get single NGO details (with feedback)
export const getNGODetails = async (req, res) => {
  try {
    const ngo = await NGO.findById(req.params.id).select("-password");
    if (!ngo) return res.status(404).json({ message: "NGO not found" });
    res.json(ngo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Add feedback to NGO
export const addFeedback = async (req, res) => {
  try {
    const { name, email, rating, comment } = req.body;
    const { id } = req.params;

    const ngo = await NGO.findById(id);
    if (!ngo) return res.status(404).json({ message: "NGO not found" });

    ngo.feedbacks.push({ name, email, rating, comment });
    await ngo.save();

    res.status(201).json({ message: "Feedback added successfully", ngo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get NGOs by category
export const getNGOsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const ngos = await NGO.find({ category }).select("-password");
    res.json(ngos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const loginNGO = async (req, res) => {
  try {
    const { email, password } = req.body;

    const ngo = await NGO.findOne({ email });
    if (!ngo) return res.status(404).json({ message: "NGO not found" });

    const isMatch = await bcrypt.compare(password, ngo.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // Create JWT
    const token = jwt.sign({ id: ngo._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set token as HTTP-only cookie
    // res.cookie("ngoToken", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production", // only https in prod
    //   sameSite: "Strict",
    //   maxAge: 24 * 60 * 60 * 1000, // 1 day
    // });

    res.status(200).json({ message: "Login successful", ngo,
      token,
     });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};