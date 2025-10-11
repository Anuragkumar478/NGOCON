import express from "express";
import { registerNGO, getAllNGOs } from "../controllers/ngoController.js";

const router = express.Router();

router.post("/register", registerNGO);
router.get("/", getAllNGOs);

export default router;
