import express from "express";
import {
  createQuestion,
  getAllQuestions,
  getQuestionById
} from "../controllers/questionController.js";

const router = express.Router();

router.post("/", createQuestion);
router.get("/", getAllQuestions);
router.get("/:id", getQuestionById);

export default router;
