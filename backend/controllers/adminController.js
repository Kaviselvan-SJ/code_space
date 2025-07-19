// controllers/adminController.js
import Submission from "../models/Submission.js";
import Company from "../models/Company.js";
import Contest from "../models/Contest.js";
import admin from "../firebaseAdmin.js"; // ✅ Import Firebase Admin

export const getStats = async (req, res) => {
  try {
    const submissions = await Submission.countDocuments();
    const companies = await Company.countDocuments();
    const contests = await Contest.countDocuments();

    const listUsers = await admin.auth().listUsers(); // ✅ Firebase users
    const users = listUsers.users.length;

    res.json({ users, submissions, companies, contests });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};
