import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ContestList() {
  const [contests, setContests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${window.API_URL}/api/contests`)
      .then((res) => setContests(res.data))
      .catch(() => alert("❌ Failed to load contests"));
  }, []);

  const now = new Date();

  return (
    <div className="max-w-6xl mx-auto pt-25 space-y-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">Coding Contests</h1>

      {contests.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          🚀 No contests available right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contests.map((contest) => {
            const start = new Date(contest.startDate);
            const end = new Date(contest.endDate);
            const hasStarted = now >= start;
            const hasEnded = now > end;

            return (
              <div
                key={contest._id}
                className="bg-card border border-border rounded-xl shadow p-6 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-primary">
                    {contest.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {contest.description}
                  </p>

                  <div className="mt-3 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <p>🕒 Start: {start.toLocaleString("en-IN")}</p>
                    <p>⏳ End: {end.toLocaleString("en-IN")}</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/contest/${contest._id}`)}
                  className={`mt-6 px-4 py-2 rounded-xl shadow 
                    ${
                      hasStarted && !hasEnded
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    }`}
                  disabled={!hasStarted || hasEnded}
                >
                  {hasEnded ? "Contest Ended" : hasStarted ? "Participate" : "Not Started"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
