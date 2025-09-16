import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/NavBar";
import { ThemeToggle } from "../components/ThemeToggle";
import { Footer } from "../components/Footer";
import { UserProfile } from "../components/userProfile";

export function Profile() {
  const userName = localStorage.getItem("userName");
  const email = localStorage.getItem("email");
  const isGuest = email === "guest@codespace.com";

  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch("/api/submissions/leaderboard/top")
      .then((res) => res.json())
      .then((data) => setLeaderboard(data))
      .catch((err) => console.error("Error fetching leaderboard:", err));
  }, []);

  return (
    <>
      <ThemeToggle />
      <UserProfile />
      <Navbar />

      <div className="max-w-2xl mx-auto py-16 px-6 space-y-10">
        {/* Profile Section */}
        {!isGuest ? (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">👤 Profile</h2>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Name:</span> {userName || "Unknown"}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              <span className="font-medium">Email:</span> {email}
            </p>
          </div>
        ) : (
          <div className="bg-yellow-50 dark:bg-gray-900 border border-yellow-300 dark:border-yellow-600 text-yellow-800 dark:text-yellow-200 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-2">🚫 Guest Access</h2>
            <p className="mb-4">You’re signed in as a guest. Please login or sign up for full access.</p>
            <div className="flex gap-3">
              <Link to="/login" className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg">
                Login
              </Link>
              <Link to="/" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                Sign Up
              </Link>
            </div>
          </div>
        )}

        {/* Leaderboard Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white">
          <h2 className="text-2xl font-bold mb-4">🏆 Leaderboard</h2>
          <ul className="space-y-3">
            {leaderboard.map((user) => (
              <li
                key={user.userId}
                className="flex items-center justify-between bg-white/10 rounded-lg px-4 py-2"
              >
                <span className="font-semibold">
                  #{user.rank} {user.userName}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </>
  );
}
