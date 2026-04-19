import express from "express";
import { loginUser,getProfile,updateProfile } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authProfile.js";

const router = express.Router();
router.post("/login",loginUser)
router.get("/getProfile", authMiddleware, getProfile);
router.put("/updateProfile", authMiddleware, updateProfile);
export default router;
