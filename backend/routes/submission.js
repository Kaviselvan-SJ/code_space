import express from "express";
import {
  createSubmission,
  getSubmissionsByQuestionId,
} from "../controllers/submissionController.js";

const router = express.Router();

router.post("/", createSubmission);
router.get("/:id", getSubmissionsByQuestionId); // id = questionId

export default router;
