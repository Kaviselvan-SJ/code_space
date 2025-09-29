import { useNavigate } from "react-router-dom";
import { Code, Target, Rocket } from "lucide-react";

export const MainSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/editor");
  };

  return (
    <div className="relative min-h-screen pt-30 flex flex-col items-center justify-center px-6 text-center gap-10 bg-gradient-to-br ">
      {/* Hero Section */}
      <div>
        <h1 className="text-6xl font-extrabold drop-shadow-md text-indigo-700">
          Code Space
        </h1>
        <h3 className="text-2xl font-semibold mt-3">
          code → submit → repeat
        </h3>
        <p className="max-w-2xl mt-4 text-lg ">
          Want to master <span className="font-medium text-indigo-600">Data Structures </span> 
          and <span className="font-medium text-indigo-600">Algorithms</span>? <br />
          Want to improve your <span className="font-medium text-indigo-600">problem-solving skills</span>?  
          This platform is built for you.
        </p>

        <div className="flex gap-4 justify-center mt-6">
          <button
            onClick={handleGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
          >
            Get Started
          </button>
          <a
            href="#/login"
            className="border border-blue-600 hover:bg-blue-200 text-blue-600 font-semibold px-6 py-3 rounded-lg transition duration-300"
          >
            Already have an account?
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mt-12">
        <div className="p-6 bg-blue-300 rounded-2xl shadow-md hover:shadow-lg transition">
          <Code className="mx-auto text-indigo-600 w-10 h-10 mb-3" />
          <h4 className="text-lg font-semibold text-gray-800">Practice Coding</h4>
          <p className="text-sm text-gray-600 mt-2">
            Solve a wide range of coding challenges from beginner to advanced level.
          </p>
        </div>
        <div className="p-6 bg-blue-300 rounded-2xl shadow-md hover:shadow-lg transition">
          <Target className="mx-auto text-indigo-600 w-10 h-10 mb-3" />
          <h4 className="text-lg font-semibold text-gray-800">Track Progress</h4>
          <p className="text-sm text-gray-600 mt-2">
            Monitor your performance, improve weak areas, and stay motivated.
          </p>
        </div>
        <div className="p-6 bg-blue-300 rounded-2xl shadow-md hover:shadow-lg transition">
          <Rocket className="mx-auto text-indigo-600 w-10 h-10 mb-3" />
          <h4 className="text-lg font-semibold text-gray-800">Level Up</h4>
          <p className="text-sm text-gray-600 mt-2">
            Sharpen your problem-solving skills and get interview ready faster.
          </p>
        </div>
      </div>

      {/* Footer-style CTA */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold ">
          Ready to start your coding journey?
        </h2>
        <button
          onClick={handleGetStarted}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition"
        >
          Start Practicing
        </button>
      </div>
    </div>
  );
};
