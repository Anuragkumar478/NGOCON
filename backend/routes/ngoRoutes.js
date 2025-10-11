import express from "express";
import {
  registerNGO,
  getAllNGOs,
  getNGODetails,
  addFeedback,
  getNGOsByCategory,
} from "../controllers/ngoController.js";
import { loginNGO } from "../controllers/ngoController.js";
import { upload } from "../middleware/uploads.js"; // Multer middleware

const router = express.Router();

// ✅ Register NGO with file uploads
router.post(
  "/register",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "govtDocument", maxCount: 1 },
  ]),
  registerNGO
);

// ✅ Get all NGOs
router.get("/", getAllNGOs);

// ✅ Get single NGO details
router.get("/:id", getNGODetails);

// ✅ Add feedback
router.post("/:id/feedback", addFeedback);

// ✅ Get NGOs by category
router.get("/category/:category", getNGOsByCategory);

router.post("/login", loginNGO);
export default router;
