import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CodeEditorWindow from "../PracticeCodeEditor/CodeEditorWindow";
import CustomInput from "../PracticeCodeEditor/CustomInput";
import OutputWindow from "../PracticeCodeEditor/OutputWindow";
import OutputDetails from "../PracticeCodeEditor/OutputDetails";
import ThemeDropdown from "../PracticeCodeEditor/ThemeDropdown";
import LanguagesDropdown from "../PracticeCodeEditor/LanguagesDropdown";

import useKeyPress from "../../hooks/useKeyPress";
import { classnames } from "../../utils/general";
import { languageOptions } from "../../constants/languageOptions";
import { defineTheme } from "../../lib/defineThemes";

const Landing = () => {
  const { id } = useParams();
  const userId = localStorage.getItem("email") || "guest@codespace.com";

  const [code, setCode] = useState("// Write your code here...");
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [outputDetails, setOutputDetails] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [question, setQuestion] = useState(null);
  const [testCases, setTestCases] = useState([]);
  const [readOnlyInput, setReadOnlyInput] = useState("");
  const [submissions, setSubmissions] = useState([]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  useEffect(() => {
    if (enterPress && ctrlPress) {
      handleRun();
    }
  }, [ctrlPress, enterPress]);

  const fetchQuestion = async () => {
    try {
      const questionRes = await axios.get(`${window.API_URL}/api/questions/${id}`);
      setQuestion(questionRes.data);
      setTestCases(questionRes.data.testCases || []);
      setReadOnlyInput(questionRes.data.testCases?.[0]?.input || "");
    } catch {
      toast.error("Failed to load question.");
    }

    try {
      const subRes = await axios.get(`${window.API_URL}/api/submissions/${id}?userId=${userId}`);
      setSubmissions(subRes.data);
    } catch (error) {
      console.error("Submission history fetch failed", error);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  useEffect(() => {
    defineTheme("oceanic-next").then(() =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const onChange = (action, data) => {
    if (action === "code") setCode(data);
  };

  const onSelectChange = (sl) => setLanguage(sl);

  const handleThemeChange = (th) => {
    if (["light", "vs-dark"].includes(th.value)) setTheme(th);
    else defineTheme(th.value).then(() => setTheme(th));
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: `${import.meta.env.VITE_RAPID_API_URL}/submissions/${token}`,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      },
    };

    try {
      let response = await axios.request(options);
      if ([1, 2].includes(response.data.status?.id)) {
        await new Promise((res) => setTimeout(res, 2000));
        return await checkStatus(token);
      }
      return response.data;
    } catch (err) {
      return { error: true, details: err };
    }
  };

  const handleRun = async () => {
    if (!testCases.length) return;
    setIsRunning(true);

    const stdin = testCases[0].input;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_RAPID_API_URL}/submissions`,
        {
          language_id: language.id,
          source_code: btoa(code),
          stdin: btoa(stdin),
        },
        {
          params: { base64_encoded: "true", fields: "*" },
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
            "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
          },
        }
      );

      const result = await checkStatus(response.data.token);
      setOutputDetails(result);

      const output = result.stdout ? atob(result.stdout).trim() : null;
      const expected = testCases[0].expectedOutput.trim();

      output === expected
        ? showSuccessToast("Test Case Passed ✅")
        : showErrorToast(`Test Case Failed ❌\nExpected: ${expected}\nGot: ${output}`);
    } catch (err) {
      showErrorToast("Runtime Error ❌");
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!testCases.length) return;
    setIsSubmitting(true);

    const results = await Promise.all(
      testCases.map(async (tc) => {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_RAPID_API_URL}/submissions`,
            {
              language_id: language.id,
              source_code: btoa(code),
              stdin: btoa(tc.input),
            },
            {
              params: { base64_encoded: "true", fields: "*" },
              headers: {
                "content-type": "application/json",
                "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
                "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
              },
            }
          );
          return await checkStatus(res.data.token);
        } catch (err) {
          return { error: true };
        }
      })
    );

    let passed = 0;
    results.forEach((res, i) => {
      const expected = testCases[i].expectedOutput.trim();
      const actual = res.stdout ? atob(res.stdout).trim() : "null";
      if (expected === actual) passed++;
    });

    const message = `${passed}/${testCases.length} test cases passed`;

    try {
      await axios.post(`${window.API_URL}/api/submissions`, {
        userId,
        questionId: id,
        code,
        status: message,
        language: language?.label,
      });

      fetchQuestion(); // refresh history
    } catch (e) {
      console.error("Submission save failed", e);
    }

    passed === testCases.length
      ? showSuccessToast(message)
      : showErrorToast(message);

    setIsSubmitting(false);
  };

  const handleClearSubmissions = async () => {
    try {
      await axios.delete(`${window.API_URL}/api/submissions/${id}?userId=${userId}`);
      toast.success("Submission history cleared.");
      fetchQuestion();
    } catch (err) {
      toast.error("Failed to clear submission history.");
    }
  };

  const showSuccessToast = (msg) => {
    toast.success(msg, { position: "top-right", autoClose: 1500 });
  };

  const showErrorToast = (msg) => {
    toast.error(msg, { position: "top-right", autoClose: 1500 });
  };

  return (
    <>
      <ToastContainer />
      {question && (
        <div className="min-h-screen px-4 pt-16 bg-background text-foreground">
          <div className="max-w-7xl mx-auto mb-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="p-4">
              <h1 className="text-3xl font-bold mb-2">{question.title}</h1>
              <p className="mb-2 text-muted-foreground">
                Topics: {question.topics?.join(", ")}
              </p>
              <p className="whitespace-pre-line mb-4">{question.description}</p>
              <div className="mb-4">
                <strong>Constraints:</strong>
                <pre className="bg-muted p-2 rounded whitespace-pre-wrap">
                  {question.constraints}
                </pre>
              </div>

              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold">Submission History</h2>
                  {submissions.length > 0 && (
                    <button
                      onClick={handleClearSubmissions}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Clear History
                    </button>
                  )}
                </div>
                <div className="bg-muted rounded p-2 max-h-60 overflow-y-auto text-sm">
                  {submissions.length === 0 ? (
                    <p className="text-muted-foreground">No submissions yet.</p>
                  ) : (
                    <ul className="list-disc ml-5 space-y-1">
                      {submissions.map((sub, index) => (
                        <li key={index}>
                          <span className="font-medium">
                            {new Date(sub.createdAt).toLocaleString()}
                          </span>
                          : {sub.status} - {sub.language}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4 p-4">
              <div>
                <strong className="block mb-1">Sample Input:</strong>
                <pre className="bg-muted p-2 rounded whitespace-pre-wrap">
                  {question.sampleTestCase.input}
                </pre>
              </div>
              <div>
                <strong className="block mb-1">Sample Output:</strong>
                <pre className="bg-muted p-2 rounded whitespace-pre-wrap">
                  {question.sampleTestCase.output}
                </pre>
              </div>
              <div>
                <strong className="block">Explanation:</strong>
                <pre className="bg-muted p-2 rounded whitespace-pre-wrap">
                  {question.sampleTestCase.explanation}
                </pre>
              </div>
            </div>
          </div>

          <div className="flex flex-row mb-4">
            <div className="px-4 py-2">
              <LanguagesDropdown onSelectChange={onSelectChange} />
            </div>
            <div className="px-4 py-2">
              <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
            </div>
          </div>

          <div className="flex flex-row space-x-4 items-start px-4 py-4">
            <div className="flex flex-col w-full h-full justify-start items-end">
              <CodeEditorWindow
                code={code}
                onChange={onChange}
                language={language?.value}
                theme={theme.value}
              />
            </div>

            <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
              <CustomInput readOnlyInput={readOnlyInput} />
              <OutputWindow outputDetails={outputDetails} />
              <div className="flex flex-col items-end">
                <div className="flex gap-2">
                  <button
                    onClick={handleRun}
                    disabled={!code || isRunning || isSubmitting}
                    className={classnames(
                      "mt-4 border-2 rounded-md px-4 py-2 hover:shadow transition duration-200",
                      !code ? "opacity-50" : ""
                    )}
                  >
                    {isRunning ? "Running..." : "Run"}
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isRunning || isSubmitting}
                    className="mt-4 border-2 rounded-md px-4 py-2 hover:shadow transition duration-200"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
              {outputDetails && <OutputDetails outputDetails={outputDetails} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Landing;
