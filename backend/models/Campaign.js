import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ngo: { type: mongoose.Schema.Types.ObjectId, ref: "NGO" },
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Volunteer" }],
  donations: [{ donor: { type: mongoose.Schema.Types.ObjectId, ref: "Donor" }, amount: Number }],
  status: { type: String, default: "active" }
}, { timestamps: true });

export default mongoose.model("Campaign", campaignSchema);
