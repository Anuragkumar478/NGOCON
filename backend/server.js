import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import ngoRoutes from "./routes/ngoRoutes.js";
import donorRoutes from "./routes/donorRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL, // replace with your frontend URL
  credentials: true,               // important to allow cookies
}));

app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api/ngos", ngoRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/profile", profileRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/", (req, res) => {
  res.send("NGO Platform Backend is Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
