// src/pages/PracticePage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import QuestionList from "../components/PracticeComponents/QuestionsList"
import { ThemeToggle } from "../components/ThemeToggle";
import { Navbar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { UserProfile } from "../components/userProfile";

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
  <>
    
    <ThemeToggle />
    <UserProfile />
    <Navbar />
    <div className="relative min-h-screen flex flex-col justify-center px-4 text-center gap-5 bg-gradient-to-br" >
      <h1 className="text-3xl font-bold mb-6">Practice Problems</h1>
      {loading ? <p>Loading...</p> : <QuestionList questions={questions} />}
    </div>
    <Footer />
  </>
    
  );
}
