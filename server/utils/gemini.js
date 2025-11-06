// // utils/gemini.js
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";
// dotenv.config();

// if (!process.env.GEMINI_API_KEY) {
//   console.warn("⚠️ GEMINI_API_KEY not set in .env!");
// }

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // ✅ PDF / TEXT AI
// export async function analyzeReportText(text) {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//     const prompt = `
// You are a medical lab report analysis AI.

// Return output ONLY in the following structured MARKDOWN format:

// ## 📄 Report Summary
// - <2 lines summary>

// ## 🧪 Key Findings
// - Hemoglobin: xx (Low/Normal/High)
// - PCV: xx (Low/Normal/High)
// - Platelets: xx (Low/Normal/High)
// - Other key values...

// ## 🚨 Possible Health Risks
// - ...

// ## 🩺 Suggested Actions
// - ...

// ## ⚠️ Severity
// - Low / Medium / High

// ### ❗ Disclaimer
// This is AI-generated guidance. Consult a doctor for medical decisions.

// RULES:
// - NO storytelling
// - NO extra text
// - NO patient name
// - NO lab name
// - Use clean bullet points
// - MUST respect markdown line breaks
// Here is the report text to analyze:
// ${text}
// `;

//     const result = await model.generateContent(prompt);
//     return result.response.text();

//   } catch (err) {
//     console.error("Text AI error:", err);
//     return "AI analysis failed.";
//   }
// }

// // ✅ IMAGE AI (Correct working format)
// export async function analyzeReportImage(buffer, mimetype) {
//   try {
//     const base64Image = buffer.toString("base64");

//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.0-flash"
//     });

//     const result = await model.generateContent({
//       contents: [
//         {
//           role: "user",
//           parts: [
//             {
//               inlineData: { data: base64Image, mimeType: mimetype }
//             },
//           {
//   text: `
// You are a medical lab report analysis AI. 
// Return output ONLY in pure markdown. 
// NO extra text. NO greetings. NO intro. NO conclusion.
// FORCE a newline after every heading.

// Format STRICTLY like this:

// ### Report Summary
// - ...

// ### Key Findings
// - Test: value (Low/Normal/High)

// ### Possible Health Risks
// - ...

// ### Suggested Actions
// - ...
// - ...
// - ...

// ### Severity
// Low / Medium / High

// ### Disclaimer
// This is AI-generated analysis. Consult a doctor for confirmation.

// Now analyze the following report data:
// `
// }

//           ]
//         }
//       ]
//     });

//     return result.response.text();

//   } catch (err) {
//     console.error("⚠️ Image AI error:", err);
//     return "Error analyzing image report.";
//   }
// }

// export default { analyzeReportText, analyzeReportImage };






// utils/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🧾 TEXT REPORT AI
export async function analyzeReportText(text) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
You are a medical lab report analysis AI.

Return output ONLY in this markdown format:

## 📄 Report Summary
- <2 line brief summary>

## 🧪 Key Findings
- Hemoglobin: xx (Low/Normal/High)
- PCV: xx (Low/Normal/High)
- Platelets: xx (Low/Normal/High)
- Other key values if present

## 🚨 Possible Health Risks
- ...

## 🩺 Suggested Actions
- ...
- ...
- ...

## ⚠️ Severity
Low / Medium / High

### ❗ Disclaimer
AI generated. Consult a doctor.

Analyze this report:
${text}
`;

    const result = await model.generateContent(prompt);
    return result.response.text();

  } catch (err) {
    console.error("Text AI error:", err);
    return "AI analysis failed.";
  }
}


// 🖼️ IMAGE REPORT AI
export async function analyzeReportImage(buffer, mimetype) {
  try {
    if (!buffer || buffer.length < 100) {
      return "❌ Invalid image file. Upload again.";
    }

    const base64Image = buffer.toString("base64");

    const prompt = `
You are a medical lab report analysis AI.

Return only markdown in this format:

### Report Summary
- 1–2 line high-level summary

### Key Findings
- Test: value (Low/Normal/High)

### Possible Health Risks
- ...

### Suggested Actions
- ...
- ...
- ...

### Severity
Low / Medium / High

### Disclaimer
AI generated. Consult a doctor.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { data: base64Image, mimeType: mimetype } },
            { text: prompt }
          ]
        }
      ]
    });

    return result.response.text();

  } catch (err) {
    console.error("❌ Image AI error:", err);
    return "Error analyzing image report.";
  }
}

export default { analyzeReportText, analyzeReportImage };
