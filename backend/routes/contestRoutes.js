import express from "express";
import Contest from "../models/Contest.js";

const router = express.Router();

// ✅ Create a contest
router.post("/", async (req, res) => {
  try {
    const { name, description, startDate, endDate, problems, visibility } = req.body;

    if (!name || !startDate || !endDate) {
      return res.status(400).json({ message: "Name, startDate, and endDate are required" });
    }

    const contest = new Contest({
      name,
      description,
      startDate,
      endDate,
      problems,
      visibility,
    });

    await contest.save();
    res.status(201).json(contest);
  } catch (error) {
    res.status(500).json({ message: "Failed to create contest", error: error.message });
  }
});

// ✅ Get all contests
router.get("/", async (req, res) => {
  try {
    const contests = await Contest.find().populate("problems", "title");
    res.json(contests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contests", error: error.message });
  }
});

// ✅ Get contest by ID
router.get("/:id", async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id).populate("problems");
    if (!contest) return res.status(404).json({ message: "Contest not found" });
    res.json(contest);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contest", error: error.message });
  }
});

export default router;
