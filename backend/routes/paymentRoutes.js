import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import NGO from "../models/NGO.js";

dotenv.config();
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create an order (initiates payment)
router.post("/create-order", async (req, res) => {
  try {
    const { amount, ngoId } = req.body;
    const ngo = await NGO.findById(ngoId);
    if (!ngo) return res.status(404).json({ message: "NGO not found" });

    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ order, key: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Verify payment (optional: save transaction in DB)
router.post("/verify", async (req, res) => {
  // You can verify payment signature here
  res.json({ success: true });
});

export default router;
