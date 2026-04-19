import jwt from "jsonwebtoken";
import NGO from "../models/NGO.js";
import Volunteer from "../models/Volunteer.js";
import Donor from "../models/Donor.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user;

    if (decoded.role === "ngo") {
      user = await NGO.findById(decoded.id);
       req.ngo = user;
    } else if (decoded.role === "volunteer") {
      user = await Volunteer.findById(decoded.id);
      
    } else if (decoded.role === "donor") {
      user = await Donor.findById(decoded.id);
    }

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = {
      id: user._id,
      role: decoded.role,
    };

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Not authorized" });
  }
};