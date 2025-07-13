import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  constraints: { type: String },
  sampleTestCase: {
    input: String,
    output: String,
    explanation: String,
  },
  topics: [String],
  testCases: [
    {
      input: String,
      expectedOutput: String,
    },
  ],
}, { timestamps: true });

const Question = mongoose.model("Question", questionSchema);

export default Question;
