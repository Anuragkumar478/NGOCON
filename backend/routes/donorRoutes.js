import express from "express";
import { registerDonor, loginDonor, getAllDonors } from "../controllers/donorController.js";

const router = express.Router();

// POST /api/donors/register
router.post("/register", registerDonor);

// POST /api/donors/login
router.post("/login", loginDonor);

// GET /api/donors
router.get("/", getAllDonors);

export default router;
