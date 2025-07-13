import Question from "../models/Question.js";

// POST: Add a new question
export const createQuestion = async (req, res) => {
  try {
    const newQuestion = await Question.create(req.body);
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET: All questions
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().select("_id title description");
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET: Single question by ID
export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ error: "Not found" });
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE: Remove question by ID
export const deleteQuestionById = async (req, res) => {
  try {
    const deleted = await Question.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json({ message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
