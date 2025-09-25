import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function AdminDashboard() {
  const navigate = useNavigate(); 
  const [stats, setStats] = useState({
    users: 0,
    submissions: 0,
    companies: 0,
    contests: 0,
  });

  const [testCaseCount, setTestCaseCount] = useState(1);

  const [newQuestion, setNewQuestion] = useState({
    title: "",
    description: "",
    constraints: "",
    sampleTestCase: {
      input: "",
      output: "",
      explanation: "",
    },
    topics: [],
    testCases: Array(1).fill({ input: "", expectedOutput: "" }),
  });

  useEffect(() => {
    axios.get(`${window.API_URL}/api/admin/stats`).then((res) => setStats(res.data));
  }, []);

  const handleTestCaseCountChange = (e) => {
    const count = parseInt(e.target.value);
    setTestCaseCount(count);
    const updatedTestCases = Array.from({ length: count }, (_, i) =>
      newQuestion.testCases[i] || { input: "", expectedOutput: "" }
    );
    setNewQuestion({ ...newQuestion, testCases: updatedTestCases });
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${window.API_URL}/api/questions`, newQuestion);
      const addedQuestion = res.data;

      alert("✅ Question added successfully");

      console.log("New question ID:", addedQuestion._id);

      setNewQuestion({
        title: "",
        description: "",
        constraints: "",
        sampleTestCase: { input: "", output: "", explanation: "" },
        topics: [],
        testCases: Array(testCaseCount).fill({ input: "", expectedOutput: "" }),
      });
    } catch (err) {
      alert("❌ Failed to add question");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-20 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Users" value={stats.users} />
        <StatCard label="Submissions" value={stats.submissions} />
        <StatCard label="Companies" value={stats.companies} />
        <StatCard label="Contests" value={stats.contests} />
      </div>

       {/* Create Contest Button */}
      <button
        onClick={() => navigate("/admin/create-contest")}
        className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700"
      >
        ➕ Create Contest
      </button>

      <form
        onSubmit={handleQuestionSubmit}
        className="bg-card p-6 rounded-xl shadow space-y-4"
      >
        <h2 className="text-xl font-semibold text-primary">Add New Question</h2>

        <input
          className="w-full p-2 rounded border border-border placeholder-gray-700 dark:placeholder-gray-400"
          placeholder="Title"
          value={newQuestion.title}
          onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
        />

        <textarea
          className="w-full p-2 rounded border border-border placeholder-gray-700 dark:placeholder-gray-400"
          placeholder="Description"
          value={newQuestion.description}
          onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
        ></textarea>

        <textarea
          className="w-full p-2 rounded border border-border placeholder-gray-700 dark:placeholder-gray-400"
          placeholder="Constraints"
          value={newQuestion.constraints}
          onChange={(e) => setNewQuestion({ ...newQuestion, constraints: e.target.value })}
        ></textarea>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="p-2 rounded border border-border placeholder-gray-700 dark:placeholder-gray-400"
            placeholder="Sample Input"
            value={newQuestion.sampleTestCase.input}
            onChange={(e) =>
              setNewQuestion({
                ...newQuestion,
                sampleTestCase: {
                  ...newQuestion.sampleTestCase,
                  input: e.target.value,
                },
              })
            }
          />

          <input
            className="p-2 rounded border border-border placeholder-gray-700 dark:placeholder-gray-400"
            placeholder="Sample Output"
            value={newQuestion.sampleTestCase.output}
            onChange={(e) =>
              setNewQuestion({
                ...newQuestion,
                sampleTestCase: {
                  ...newQuestion.sampleTestCase,
                  output: e.target.value,
                },
              })
            }
          />

          <input
            className="p-2 rounded border border-border placeholder-gray-700 dark:placeholder-gray-400"
            placeholder="Explanation"
            value={newQuestion.sampleTestCase.explanation}
            onChange={(e) =>
              setNewQuestion({
                ...newQuestion,
                sampleTestCase: {
                  ...newQuestion.sampleTestCase,
                  explanation: e.target.value,
                },
              })
            }
          />
        </div>

        <input
          className="w-full p-2 rounded border border-border placeholder-gray-700 dark:placeholder-gray-400"
          placeholder="Topics (comma separated)"
          value={newQuestion.topics.join(",")}
          onChange={(e) =>
            setNewQuestion({
              ...newQuestion,
              topics: e.target.value.split(",").map((t) => t.trim()),
            })
          }
        />

        <label className="block font-medium mt-4 text-gray-700 dark:text-gray-400">Number of Test Cases</label>
        <select
          className="w-20 p-2 pl-3 pr-8 rounded border border-border bg-background text-gray-400 dark:text-gray-400 relative"
          value={testCaseCount}
          onChange={handleTestCaseCountChange}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>

        <div className="space-y-4">
          {newQuestion.testCases.map((tc, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
              <input
                className="p-2 rounded border border-border placeholder-gray-700 dark:placeholder-gray-400"
                placeholder={`Test Input #${index + 1}`}
                value={tc.input}
                onChange={(e) => {
                  const updated = [...newQuestion.testCases];
                  updated[index].input = e.target.value;
                  setNewQuestion({ ...newQuestion, testCases: updated });
                }}
              />
              <input
                className="p-2 rounded border border-border placeholder-gray-700 dark:placeholder-gray-400"
                placeholder={`Expected Output #${index + 1}`}
                value={tc.expectedOutput}
                onChange={(e) => {
                  const updated = [...newQuestion.testCases];
                  updated[index].expectedOutput = e.target.value;
                  setNewQuestion({ ...newQuestion, testCases: updated });
                }}
              />
            </div>
          ))}
        </div>

        <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-xl">
          Add Question
        </button>
      </form>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 text-center shadow">
      <p className="text-sm text-foreground/70">{label}</p>
      <p className="text-2xl font-bold text-primary mt-1">{value}</p>
    </div>
  );
}
