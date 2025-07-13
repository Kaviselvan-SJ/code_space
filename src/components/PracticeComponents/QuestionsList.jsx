
import QuestionCard from "../../components/PracticeComponents/QuestionCard";

export default function QuestionList({ questions }) {
  if (!questions.length) {
    return <p>No questions available.</p>;
  }

  return (
    <div className="grid gap-5">
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  );
}
