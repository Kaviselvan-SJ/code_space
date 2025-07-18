import { useEffect, useState } from "react";
import axios from "axios";
import QuestionList from "../components/PracticeComponents/QuestionsList"
import { ThemeToggle } from "../components/ThemeToggle";
import { Navbar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { UserProfile } from "../components/userProfile";
import { Link } from "react-router-dom";

export default function Practice() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const isGuest = localStorage.getItem("email") === "guest@codespace.com";

  useEffect(() => {
    if (!isGuest) {
      axios
        .get("/api/questions")
        .then((res) => {
          setQuestions(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching questions", err);
          setLoading(false);
        });
    }
  }, [isGuest]);

  return (
    <>
      <ThemeToggle />
      <UserProfile />
      <Navbar />
      <div className="relative min-h-screen flex flex-col justify-center px-4 text-center gap-5 bg-gradient-to-br">
        <h1 className="text-3xl font-bold mb-6">Practice Problems</h1>

        {isGuest ? (
          <div className="max-w-md mx-auto bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl p-6 shadow-lg text-left">
            <h2 className="text-xl font-semibold mb-2">🔒 Restricted Access</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Please login or sign up to access practice problems.
            </p>
            <div className="flex justify-between">
              <Link
                to="/login"
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded transition"
              >
                Login
              </Link>
              <Link
                to="/"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <QuestionList questions={questions} />
        )}
      </div>
      <Footer />
    </>
  );
}
