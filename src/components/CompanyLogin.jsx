import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";

function CompanyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCompanyLogin = async () => {
    if (!email.endsWith("@company.com")) {
      alert("Only valid company emails can login here.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("userName", userCredential.user.displayName || "Company");
      localStorage.setItem("email", email);
      localStorage.setItem("role", "company");
      navigate("/home");
    } catch (error) {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 bg-background text-foreground">
      <div className="p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-glow">Company Login</h1>

        <input
          type="email"
          placeholder="Company Email"
          className="w-full p-2 mb-3 rounded border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-5 rounded border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleCompanyLogin}
          className="w-full bg-yellow-500 py-2 rounded hover:bg-yellow-600 transition"
        >
          Login
        </button>

        <p className="mt-4 text-sm">
          Don't have a company account?{" "}
          <Link to="/company-signup" className="text-primary hover:underline font-medium">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default CompanyLogin;
