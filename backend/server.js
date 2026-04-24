
import "dotenv/config";

import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import cloudinary from "./config/cloudinary.js";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import ngoRoutes from "./routes/ngoRoutes.js";
import donorRoutes from "./routes/donorRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import multer from "multer";
connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://ngocon.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api/ngos", ngoRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/payment", paymentRoutes);
app.get("/", (req, res) => {
  res.send("NGO Platform Backend is Running");
});

app.use((err, req, res, next) => {
  console.error("Error caught by middleware:", err);
  if (err instanceof multer.MulterError || err) {
    return res.status(400).json({ message: err.message });
  }
  res.status(500).json({ message: err.message || "Internal Server Error" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
