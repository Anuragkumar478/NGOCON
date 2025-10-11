import mongoose from "mongoose";

// Feedback schema (like product reviews)
const feedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const ngoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    description: { type: String },

    category: {
      type: String,
      enum: [
        "Education",
        "Health",
        "Environment",
        "Women Empowerment",
        "Animal Welfare",
        "Community Development",
        "Disaster Relief",
        "Other",
      ],
      default: "Other",
    },

    profileImage: { type: String, default: "https://via.placeholder.com/150" },
    website: { type: String },
    address: { type: String },
    localContactNumber: { type: String },
    govtDocument: { type: String },
    verifiedByAuthority: { type: Boolean, default: false },

    campaigns: [{ type: mongoose.Schema.Types.ObjectId, ref: "Campaign" }],
    feedbacks: [feedbackSchema], // 💬 Feedback array
  },
  { timestamps: true }
);

// Virtual for average rating
ngoSchema.virtual("averageRating").get(function () {
  if (this.feedbacks.length === 0) return 0;
  const total = this.feedbacks.reduce((sum, fb) => sum + fb.rating, 0);
  return (total / this.feedbacks.length).toFixed(1);
});

export default mongoose.model("NGO", ngoSchema);
