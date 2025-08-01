import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/Button";

export default function AdminQuestionList() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all questions
  const fetchQuestions = async () => {
    try {
      const res = await axios.get("/api/questions");
      setQuestions(res.data);
    } catch (err) {
      console.error("Failed to load questions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this question?");
    if (!confirm) return;

    try {
      await axios.delete(`/api/questions/${id}`);
      setQuestions((prev) => prev.filter((q) => q._id !== id));
    } catch (err) {
      console.error("Failed to delete question:", err);
      alert("❌ Failed to delete question");
    }
  };

  if (loading) return <p className="p-4">Loading questions...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Manage Questions</h2>
      {questions.length === 0 ? (
        <p>No questions available.</p>
      ) : (
        questions.map((q, index) => (
          <div
            key={q._id}
            className="border border-border rounded-lg px-4 py-3 flex items-center justify-between gap-4"
          >
            <h3 className="text-base font-medium">
              {index + 1}. {q.title}
            </h3>
            <Button
              variant="destructive"
              onClick={() => handleDelete(q._id)}
            >
              Delete
            </Button>
          </div>
        ))
      )}
    </div>
  );
}
