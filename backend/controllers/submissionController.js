  // POST /api/submissions
  import mongoose from "mongoose";
  import Submission from "../models/Submission.js";

  export const createSubmission = async (req, res) => {
    try {
      const { userId, questionId, code, status, language } = req.body;

      console.log("Received Submission:", { userId, questionId, code, status, language });

      if (!userId || !questionId || !code || !status || !language) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const submission = await Submission.create({
        userId,
        questionId: new mongoose.Types.ObjectId(questionId), // <- cast to ObjectId
        code,
        status,
        language,
      });

      res.status(201).json(submission);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };



// GET /api/submissions/:questionId?userId=abc123
export const getSubmissionsByQuestionId = async (req, res) => {
  try {
    const { id } = req.params; // questionId
    const { userId } = req.query;

    const filter = { questionId: new mongoose.Types.ObjectId(id) };
    if (userId) {
      filter.userId = userId;
    }

    const submissions = await Submission.find(filter).sort({ createdAt: -1 });

    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Delete all submissions for a given user and question
export const deleteSubmissionsByUser = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { userId } = req.query;

    if (!questionId || !userId) {
      return res.status(400).json({ error: "Missing questionId or userId" });
    }

    const result = await Submission.deleteMany({
      questionId,
      userId,
    });

    res.status(200).json({
      message: "Submissions deleted",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET /api/submissions/leaderboard

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Submission.aggregate([
      {
        $group: {
          _id: "$userId",
          submissionCount: { $sum: 1 },
        },
      },
      { $sort: { submissionCount: -1 } }, // highest first
      { $limit: 10 }, // top 10 users
    ]);

    // Map to { rank, userId, userName }
    const leaderboardWithRank = leaderboard.map((user, index) => ({
      rank: index + 1,
      userId: user._id,
      userName: user._id, // replace with actual User model lookup if available
    }));

    res.json(leaderboardWithRank);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
