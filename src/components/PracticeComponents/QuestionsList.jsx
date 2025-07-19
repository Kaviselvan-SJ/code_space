import QuestionCard from "../../components/PracticeComponents/QuestionCard";

export default function QuestionList({ questions }) {
  if (!Array.isArray(questions) || !questions.length) {
    return <p>No questions available.</p>;
  }

  return (
    <div className="grid gap-4">
      {questions.map((question, index) => (
        <QuestionCard key={question._id} question={question} index={index} />
      ))}
    </div>
  );
}
