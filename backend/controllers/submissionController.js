  // POST /api/submissions
  import mongoose from "mongoose";

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





  // GET /api/submissions/:id  (where :id is the questionId)

  export const getSubmissionsByQuestionId = async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid questionId format" });
      }
      //console.log("Looking for submissions with questionId:", id);

      const submissions = await Submission.find({
        questionId: new mongoose.Types.ObjectId(id)
      }).sort({ createdAt: -1 });

      res.json(submissions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
