import express from "express";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import NGO from "../models/NGO.js";
import Payment from "../models/payment_model.js";
import crypto from "crypto";

dotenv.config();
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create an order (initiates payment)


router.post("/create-order", async (req, res) => {
  try {
    const { amount, ngoId, userId } = req.body;

    const ngo = await NGO.findById(ngoId);
    if (!ngo) return res.status(404).json({ message: "NGO not found" });

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // ✅ Save payment as pending
    const payment = await Payment.create({
      userId,
      ngoId,
      amount,
      currency: "INR",
      status: "pending",
      razorpayOrderId: order.id,
    });

    res.json({
      order,
      key: process.env.RAZORPAY_KEY_ID,
      paymentId: payment._id,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Verify payment (optional: save transaction in DB)


router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // ✅ Payment verified → update DB
      const payment = await Payment.findByIdAndUpdate(
        paymentId,
        {
          status: "completed",
          razorpayPaymentId: razorpay_payment_id,
        },
        { new: true }
      );

      return res.json({ success: true, payment });
    } else {
      // ❌ Signature mismatch
      await Payment.findByIdAndUpdate(paymentId, {
        status: "failed",
      });

      return res.status(400).json({ success: false });
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;