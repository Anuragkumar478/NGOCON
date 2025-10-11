import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registeredActivities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Campaign" }]
}, { timestamps: true });

export default mongoose.model("Volunteer", volunteerSchema);
