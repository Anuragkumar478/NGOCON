import express from "express";
import {
  registerNGO,
  getAllNGOs,
  getNGODetails,
  addFeedback,
  getNGOsByCategory,
  loginNGO
} from "../controllers/ngoController.js";
import { upload } from "../middleware/uploads.js";

import { authMiddleware } from "../middleware/authProfile.js";
const router = express.Router();

router.post(
  "/register",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "govtDocument", maxCount: 1 },
  ]),
  
  registerNGO
);

router.post("/login", loginNGO);

// ✅ Route order fixed
router.get("/category/:category", getNGOsByCategory);
router.get("/:id", getNGODetails);

// ✅ Protect feedback route
router.post("/:id/feedback", authMiddleware, addFeedback);

router.get("/", getAllNGOs);

export default router;
