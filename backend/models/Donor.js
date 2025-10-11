import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  donations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Campaign" }]
}, { timestamps: true });

export default mongoose.model("Donor", donorSchema);