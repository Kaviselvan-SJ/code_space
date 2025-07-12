import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { CircleUserRound } from "lucide-react";

export const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) setUserName(name);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      // guest fallback
    }
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      className="fixed top-4 right-16 z-50 max-sm:hidden" // right-16 puts it left of ThemeToggle (which is right-5)
      ref={dropdownRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-background/80 dark:bg-muted shadow-md hover:scale-105 transition"
        title={userName}
      >
        <CircleUserRound className="w-7 h-7 text-primary" />
      </button>

      {isOpen && (
        <div className="mt-2  shadow-lg rounded-md py-2 w-40 absolute right-0 text-sm border">
          <button
            onClick={() => {
              navigate("/profile");
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 transition"
          >
            View Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
