import express from "express";
import {
  createSubmission,
  getSubmissionsByQuestionId,
} from "../controllers/submissionController.js";

const router = express.Router();

router.post("/", createSubmission);
router.get("/:id", getSubmissionsByQuestionId); // id = questionId
router.delete("/:questionId", deleteSubmissionsByUser);

export default router;
