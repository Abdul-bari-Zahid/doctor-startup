
// import mongoose from "mongoose";

// const reportSchema = new mongoose.Schema(
//   {
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     fileUrl: String,
//     reportType: String,
//     reportDate: Date,
//     aiSummary: String,
//   },
//   { timestamps: true }
// );

// const Report = mongoose.model("Report", reportSchema);
// export default Report;



import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fileUrl: String,
    reportType: String,
    reportDate: Date,
    aiSummary: String,
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
