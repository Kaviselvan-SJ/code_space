import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/NavBar";
import { ThemeToggle } from "../components/ThemeToggle";
import { Footer } from "../components/Footer";
import { MainSection } from "../components/MainSection";

export const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (!storedName) {
      navigate("/login");
    } else {
      setName(storedName);
    }
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-gray-800 dark:text-white transition duration-300 ease-in-out">
      <ThemeToggle />
      <Navbar />
      <div className="flex flex-col items-center justify-center px-4 py-16 gap-4 text-center">
        <h1 className="text-4xl font-bold">
          Welcome, <span className="text-blue-600 dark:text-blue-400">{name}</span> 👋
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Ready to practice and summit your code?
        </p>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition"
        >
          Logout
        </button>
      </div>
      <MainSection />
      <Footer />
    </div>
  );
};
