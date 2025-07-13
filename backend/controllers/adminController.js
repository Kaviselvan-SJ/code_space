import User from "../models/User.js";
import Submission from "../models/Submission.js";
import Company from "../models/Company.js";
import Contest from "../models/Contest.js";

export const getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const submissions = await Submission.countDocuments();
    const companies = await Company.countDocuments();
    const contests = await Contest.countDocuments();

    res.json({ users, submissions, companies, contests });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};
