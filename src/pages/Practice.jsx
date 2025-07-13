// src/pages/PracticePage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import QuestionList from "../components/PracticeComponents/QuestionsList"

export default function Practice() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/questions") // 🔁 Connect to your backend API
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching questions", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Practice Problems</h1>
      {loading ? <p>Loading...</p> : <QuestionList questions={questions} />}
    </div>
  );
}
