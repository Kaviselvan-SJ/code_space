import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    submissions: 0,
    companies: 0,
    contests: 0,
  });

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
    testCases: [
      { input: "", expectedOutput: "" },
    ],
  });

  useEffect(() => {
    axios.get("/api/admin/stats").then((res) => setStats(res.data));
  }, []);

  const handleQuestionSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("/api/questions", newQuestion);
    const addedQuestion = res.data;

    alert("✅ Question added successfully");

    // Log the generated ID
    console.log("New question ID:", addedQuestion._id);

    // Optional: redirect to the question view page
    // navigate(`/questions/${addedQuestion._id}`);

    setNewQuestion({
      title: "",
      description: "",
      constraints: "",
      sampleTestCase: { input: "", output: "", explanation: "" },
      topics: [],
      testCases: [{ input: "", expectedOutput: "" }],
    });
  } catch (err) {
    alert("❌ Failed to add question");
  }
};


  return (
    <div className="max-w-6xl mx-auto p-20 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Users" value={stats.users} />
        <StatCard label="Submissions" value={stats.submissions} />
        <StatCard label="Companies" value={stats.companies} />
        <StatCard label="Contests" value={stats.contests} />
      </div>

      {/* Add Question Form */}
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

        {/* Add a simple field for one test case (extendable later) */}
        <div className="grid grid-cols-2 gap-4">
          <input
            className="p-2 rounded border border-border placeholder-gray-700 dark:placeholder-gray-400"
            placeholder="Test Input"
            value={newQuestion.testCases[0].input}
            onChange={(e) => {
              const tc = [...newQuestion.testCases];
              tc[0].input = e.target.value;
              setNewQuestion({ ...newQuestion, testCases: tc });
            }}
          />

          <input
            className="p-2 rounded border border-border placeholder-gray-700 dark:placeholder-gray-400"
            placeholder="Expected Output"
            value={newQuestion.testCases[0].expectedOutput}
            onChange={(e) => {
              const tc = [...newQuestion.testCases];
              tc[0].expectedOutput = e.target.value;
              setNewQuestion({ ...newQuestion, testCases: tc });
            }}
          />
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
