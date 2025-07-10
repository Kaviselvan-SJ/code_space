import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInAnonymously,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../firebase/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      localStorage.setItem("userName", name);
      localStorage.setItem("email", email);
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userName = prompt("Enter your name:");
      if (userName) {
        await updateProfile(result.user, { displayName: userName });
        localStorage.setItem("userName", userName);
        localStorage.setItem("email", result.user.email);
        navigate("/home");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGuestLogin = () => {
    localStorage.setItem("userName", "Guest");
    localStorage.setItem("email", "guest@codespace.com");
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5 bg-background text-foreground px-4">
      <div className="glass-light-card p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-glow">Create your Code Space account</h1>
        
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 mb-3 rounded border"
          value={name}
          onChange={e => setName(e.target.value)}
        />
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

        <button onClick={handleSignup} className="w-full cosmic-button mb-2">Sign Up</button>
        <button onClick={handleGoogleSignup} className="w-full bg-red-500 text-white py-2 rounded mb-2 hover:bg-red-600 transition">Sign Up with Google</button>
        <button onClick={handleGuestLogin} className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition">Sign in as Guest</button>

        <p className="mt-4 text-sm text-gray-600">
          Already have an account?
          <Link to="/login" className="ml-1 text-primary hover:underline font-medium">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
