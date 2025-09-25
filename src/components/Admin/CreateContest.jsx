import { useState, useEffect } from "react";
import axios from "axios";

export default function CreateContest() {
  const [contest, setContest] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    problems: [],
    visibility: "public",
  });

  const [availableProblems, setAvailableProblems] = useState([]);

  useEffect(() => {
    // Fetch all questions to allow selection
    axios.get(`${window.API_URL}/api/questions`).then((res) => setAvailableProblems(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${window.API_URL}/api/contests`, contest);
      alert("✅ Contest created successfully!");
      console.log("Contest ID:", res.data._id);

      setContest({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        problems: [],
        visibility: "public",
      });
    } catch (err) {
      alert("❌ Failed to create contest");
    }
  };

  const toggleProblemSelection = (id) => {
    setContest((prev) => {
      const exists = prev.problems.includes(id);
      return {
        ...prev,
        problems: exists
          ? prev.problems.filter((p) => p !== id)
          : [...prev.problems, id],
      };
    });
  };

  return (
    <div className="max-w-4xl mx-auto pt-25 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Create Contest</h1>

      <form onSubmit={handleSubmit} className="bg-card p-6 rounded-xl shadow space-y-4">
        <input
          className="w-full p-2 rounded border"
          placeholder="Contest Name"
          value={contest.name}
          onChange={(e) => setContest({ ...contest, name: e.target.value })}
        />

        <textarea
          className="w-full p-2 rounded border"
          placeholder="Contest Description"
          value={contest.description}
          onChange={(e) => setContest({ ...contest, description: e.target.value })}
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="datetime-local"
            className="p-2 rounded border"
            value={contest.startDate}
            onChange={(e) => setContest({ ...contest, startDate: e.target.value })}
          />
          <input
            type="datetime-local"
            className="p-2 rounded border"
            value={contest.endDate}
            onChange={(e) => setContest({ ...contest, endDate: e.target.value })}
          />
        </div>

        <select
          className="w-full p-2 rounded border"
          value={contest.visibility}
          onChange={(e) => setContest({ ...contest, visibility: e.target.value })}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <div>
          <h3 className="font-medium mb-2">Select Problems</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {availableProblems.map((q) => (
              <label key={q._id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={contest.problems.includes(q._id)}
                  onChange={() => toggleProblemSelection(q._id)}
                />
                <span>{q.title}</span>
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-xl">
          Create Contest
        </button>
      </form>
    </div>
  );
}
