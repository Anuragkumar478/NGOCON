import mongoose from "mongoose";

const ngoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  description: { type: String },
  campaigns: [{ type: mongoose.Schema.Types.ObjectId, ref: "Campaign" }]
}, { timestamps: true });

export default mongoose.model("NGO", ngoSchema);
