import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    ngo: { type: mongoose.Schema.Types.ObjectId, ref: "NGO", required: true },
    volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Volunteer" }],
    donations: [
      {
        donor: { type: mongoose.Schema.Types.ObjectId, ref: "Donor" },
        amount: { type: Number, min: 1 },
      },
    ],
    status: { type: String, enum: ["active", "completed", "paused"], default: "active" },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    updates: [{ message: String, createdAt: { type: Date, default: Date.now } }],
    location: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Campaign", campaignSchema);
