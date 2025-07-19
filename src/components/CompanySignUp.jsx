import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

function CompanySignUp() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCompanySignup = async () => {
    if (!companyName || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    if (!email.endsWith("@company.com")) {
      alert("Please use a valid company email (e.g., yourname@company.com).");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: companyName });
      localStorage.setItem("userName", companyName);
      localStorage.setItem("email", email);
      localStorage.setItem("role", "company");
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 bg-background text-foreground">
      <div className="p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-glow">Sign Up as a Company</h1>

        <input
          type="text"
          placeholder="Company Name"
          className="w-full p-2 mb-3 rounded border"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
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
          onClick={handleCompanySignup}
          className="w-full bg-yellow-500 py-2 rounded hover:bg-yellow-600 transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default CompanySignUp;
