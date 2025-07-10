import { cn } from "../lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "Practice", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Contest", href: "#projects" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [isGuest, setIsGuest] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const guestFlag = localStorage.getItem("email") === "guest@codespace.com";
    
    if (!storedName) {
      navigate("/login");
    } else {
      setName(storedName);
      setIsGuest(guestFlag);
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      // In case of guest, signOut will not be needed
    }
    localStorage.clear();
    navigate("/");
  };

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
        <a
          className="text-xl font-bold text-primary flex items-center"
          href="#hero"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground">Code</span> Space
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex space-x-8 items-center">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
          <div className="flex items-center space-x-3 ml-4">
            <span className="text-foreground font-semibold">{name}</span>
            {!isGuest && (
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:text-red-600 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Mobile nav toggle */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile nav menu */}
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
              <a
                key={key}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <span className="text-foreground font-semibold">{name}</span>
            {!isGuest && (
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600 text-base transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
