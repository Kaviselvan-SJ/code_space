import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../firebase/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); // 🔴 Error message state
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setErrorMsg(""); // Clear previous errors
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("userName", result.user.displayName || "User");
      localStorage.setItem("email", result.user.email);
      navigate("/home");
    } catch (error) {
      setErrorMsg("Invalid username or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem("userName", result.user.displayName || "User");
      localStorage.setItem("email", result.user.email);
      navigate("/home");
    } catch (error) {
      setErrorMsg("Google sign-in failed. Please try again.");
    }
  };

  const handleGuestLogin = () => {
    setErrorMsg(""); // clear any error
    localStorage.setItem("userName", "Guest");
    localStorage.setItem("email", "guest@codespace.com");
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <div className="p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-glow">
          Welcome back to Code Space 🚀
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 rounded border"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-5 rounded border"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-500 py-2 rounded mb-2 hover:bg-indigo-600 transition"
        >
          Login
        </button>

        {/* 🔻 Error message shown here */}
        {errorMsg && (
          <p className="text-sm text-red-600 mb-2 text-center">
            {errorMsg}
          </p>
        )}

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 py-2 rounded mb-2 hover:bg-red-600 transition"
        >
          Login with Google
        </button>
        <button
          onClick={handleGuestLogin}
          className="w-full bg-gray-500 py-2 rounded hover:bg-gray-600 transition"
        >
          Continue as Guest
        </button>

        <p className="mt-4 text-sm">
          Don't have an account?
          <Link
            to="/"
            className="ml-1 text-primary hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>

        {/* 🔽 New: Login as Company Link */}
        <p className="mt-2 text-sm text-center">
          Are you a company?
          <Link
            to="/company-login"
            className="ml-1 text-blue-600 hover:underline font-medium"
          >
            Login as Company
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
