import express from "express";
import auth from "../middleware/authmiddleware.js";
// import index from "../index.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/dashboard", auth, (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    user: req.user,
  });
});
router.get("/uploadreport", auth, (req, res) => {
  res.json({
    message: "Welcome to uploadreport",
    user: req.user,
  });
});
router.get("/advitals", auth, (req, res) => {
  res.json({
    message: "Welcome to advitals",
    user: req.user,
  });
});
router.get("/timeline", auth, (req, res) => {
  res.json({
    message: "Welcome to timeline",
    user: req.user,
  });
});
router.get("/viewReport", auth, (req, res) => {
  res.json({
    message: "Welcome to viewReport",
    user: req.user,
  });
});

export default router;
