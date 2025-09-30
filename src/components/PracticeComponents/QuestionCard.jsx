import { useState } from "react";
import QuestionCard from "./QuestionCard";
import { Input } from "../../components/ui/Input"; // assuming you have a UI input component

export default function QuestionsList({ questions }) {
  const [search, setSearch] = useState("");

  const filteredQuestions = questions.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Question Cards */}
      {filteredQuestions.length > 0 ? (
        filteredQuestions.map((question, index) => (
          <QuestionCard key={question._id} question={question} index={index} />
        ))
      ) : (
        <p className="text-gray-500">No questions found.</p>
      )}
    </div>
  );
}
