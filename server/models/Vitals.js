import mongoose from "mongoose";

const vitalsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ Add user reference
  bp: String,
  sugar: Number,
  weight: Number,
  notes: String,
  aiResult: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Vitals", vitalsSchema);
