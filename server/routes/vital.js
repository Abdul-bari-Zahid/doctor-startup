import express from "express";
import Vitals from "../models/Vitals.js";
import dotenv from "dotenv";
import auth from "../middleware/authmiddleware.js"; // ✅ Add auth middleware
import { analyzeReportText } from "../utils/gemini.js"; // reuse
dotenv.config();

const router = express.Router();

router.post("/add", auth, async (req, res) => {
  try {
    const { bp, sugar, weight, notes } = req.body;

    console.log("📦 Body received:", req.body);

    // ✅ Prompt with explicit formatting instructions
    const promptText = `
You are a professional health assistant. Summarize the user's health report in clear, structured English.
Use the following format exactly, and do NOT use Markdown headings or emojis:

Patient Summary:
<short paragraph describing the patient's condition>

Key Findings:
- ...

Possible Health Risks:
- ...

Suggested Actions:
- ...

Severity: Low / Medium / High
Disclaimer: AI generated. Consult a doctor.

Vitals:
- Blood Pressure: ${bp}
- Sugar Level: ${sugar} mg/dL
- Weight: ${weight} kg
- Notes: ${notes}
`;

    let aiResult = "AI result not available";

    if (!process.env.GEMINI_API_KEY) {
      console.warn("⚠️ GEMINI_API_KEY not found");
    } else {
      try {
        aiResult = await analyzeReportText(promptText);
      } catch (e) {
        console.error("AI ERROR:", e.message);
        aiResult = "AI processing error.";
      }
    }

    const newVitals = await Vitals.create({ 
      userId: req.user.id, // ✅ Save current user's ID
      bp, 
      sugar, 
      weight, 
      notes, 
      aiResult 
    });

    res.json({
      message: "Vitals saved and AI result generated ✅",
      vitals: newVitals
    });
  } catch (err) {
    console.error("❌ Vitals route error:", err);
    res.status(500).json({ error: "Server error ❌" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const userVitals = await Vitals.find({ userId: req.user.id }).sort({ createdAt: -1 }); // ✅ Filter by user ID
    res.json(userVitals);
  } catch (err) {
    res.status(500).json({ error: "Server error ❌" });
  }
});

export default router;
