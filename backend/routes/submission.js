import express from "express";
import {
  createSubmission,
  getSubmissionsByQuestionId,
  deleteSubmissionsByUser,
} from "../controllers/submissionController.js";

const router = express.Router();

router.post("/", createSubmission);
router.get("/:id", getSubmissionsByQuestionId); // id = questionId
router.delete("/:questionId", deleteSubmissionsByUser);

export default router;
