import express from "express";
import {
  createSubmission,
  getSubmissionsByQuestionId,
  deleteSubmissionsByUser,
  getLeaderboard
} from "../controllers/submissionController.js";

const router = express.Router();

router.post("/", createSubmission);
router.get("/:id", getSubmissionsByQuestionId); // id = questionId
router.delete("/:questionId", deleteSubmissionsByUser);
router.get("/leaderboard/top", getLeaderboard);

export default router;
