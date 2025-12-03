// middleware/auth.js
import jwt from "jsonwebtoken";
import NGO from "../models/NGO.js";

export const protectNGO = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
   // console.log("Auth Header:", authHeader);
if (!authHeader || !authHeader.startsWith("Bearer ")) {
 // console.log(res.status(401).json({ message: "Not authorized, token missing" }));
  return res.status(401).json({ message: "Not authorized, token missing" });
}
const token = authHeader.split(" ")[1];
    console.log("Token:", token);
    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);
    const ngo = await NGO.findById(decoded.id);
    if (!ngo) return res.status(401).json({ message: "NGO not found" });

    req.ngo = ngo; // attach NGO to request
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ message: "Not authorized" });
  }
};
