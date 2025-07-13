// src/pages/PracticeQuestions.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import { Button } from "../components/ui/Button";

export default function PracticeQuestions() {
  const { id } = useParams(); // Get question ID from URL
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState("// Write your code here");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`/api/questions/${id}`)
      .then((res) => setQuestion(res.data))
      .catch((err) => console.error("Failed to fetch question", err));
  }, [id]);

  const runCode = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/execute", {
        code,
        language: "cpp", // can be dynamic
        input,
      });
      setOutput(res.data.output);
    } catch (err) {
      setOutput("Error executing code");
    }
    setLoading(false);
  };

  if (!question) return <p className="p-4">Loading question...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 grid gap-6">
      <div>
        <h1 className="text-2xl font-bold">{question.title}</h1>
        <p className="text-muted-foreground mt-2 whitespace-pre-wrap">{question.description}</p>
        {question.constraints && (
          <div className="mt-4 text-sm text-muted-foreground">
            <strong>Constraints:</strong>
            <pre>{question.constraints}</pre>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-border rounded-xl p-4">
          <h2 className="font-semibold mb-2">Code Editor</h2>
          <Editor
            height="400px"
            defaultLanguage="cpp"
            defaultValue={code}
            theme="vs-dark"
            onChange={(val) => setCode(val)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm mb-1">Custom Input</label>
            <textarea
              className="w-full border border-border rounded-md p-2 bg-background"
              rows={5}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Output</label>
            <textarea
              className="w-full border border-border rounded-md p-2 bg-background"
              rows={5}
              readOnly
              value={output} 
            />
          </div>

          <Button onClick={runCode} disabled={loading}>
            {loading ? "Running..." : "Run Code"}
          </Button>
        </div>
      </div>
    </div>
  );
}
