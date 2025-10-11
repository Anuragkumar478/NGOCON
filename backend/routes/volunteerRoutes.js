import express from "express";
import {
  registerVolunteer,
  loginVolunteer,
  getAllVolunteers,
} from "../controllers/volunteerController.js";

const router = express.Router();

// POST /api/volunteers/register
router.post("/register", registerVolunteer);

// POST /api/volunteers/login
router.post("/login", loginVolunteer);

// GET /api/volunteers
router.get("/", getAllVolunteers);

export default router;
