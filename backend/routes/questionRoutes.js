import express from "express";
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  deleteQuestionById,
} from "../controllers/questionController.js";

const router = express.Router();

router.post("/", createQuestion);
router.get("/", getAllQuestions);
router.get("/:id", getQuestionById);
router.delete("/:id", deleteQuestionById);

export default router;
