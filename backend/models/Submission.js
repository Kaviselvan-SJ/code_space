import mongoose from "mongoose";
const submissionSchema = new mongoose.Schema({
  userId: String,
  questionId: String,
  code: String,
  status: String,
});
export default mongoose.model("Submission", submissionSchema);