import { cn } from "../lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserProfile } from "./userProfile";
import { ThemeToggle } from "./ThemeToggle";


const navItems = [
  { name: "Home", to: "/home" },
  { name: "Code Editor", to: "/editor" },
  { name: "Practice", to: "/practice" },
  { name: "Contest", to: "/contest" },
  { name: "Contact", to: "/contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (!storedName) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-md shadow-xs"
          : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/home"
          className="text-xl font-bold text-primary flex items-center"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground">Code</span> Space
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 items-center pr-15">
          {navItems.map((item, key) => (
            <Link
              key={key}
              to={item.to}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav Menu */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
        <div className="flex flex-col space-y-8 text-xl">
          {navItems.map((item, key) => (
            <Link
              key={key}
              to={item.to}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <button
            onClick={() => {
              navigate("/profile");
              setIsMenuOpen(false);
            }}
            className="text-foreground hover:text-primary transition"
          >
            View Profile
          </button>
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="text-red-500 hover:text-red-600 transition"
          >
            Logout
          </button>
        </div>

        </div>
      </div>
    </nav>
  );
};
