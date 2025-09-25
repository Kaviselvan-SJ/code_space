import { Link } from "react-router-dom";
import {
  Instagram,
  Linkedin,
  Github,
  Contact2,
  ArrowUp,
} from "lucide-react";

const navItems = [
  { name: "Home", to: "/home" },
  { name: "Code Editor", to: "/editor" },
  { name: "Practice", to: "/practice" },
  { name: "Contest", to: "/contest" },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 bg-card relative border-t border-border mt-12 flex flex-col items-center gap-6">
      <h2 className="text-2xl font-bold text-primary">CodeSpace</h2>

      {/* Navigation Links */}
      <nav className="flex flex-wrap justify-center gap-6 text-muted-foreground font-medium">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className="hover:text-primary transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Admin Login Button */}
      <Link
        to="/admin"
        className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium shadow hover:bg-primary/90 transition"
      >
        Admin Login
      </Link>

      {/* Copyright */}
      <p className="text-sm text-muted-foreground text-center">
        &copy; {year} <span className="text-primary font-medium">CodeSpace</span> – All rights reserved.
      </p>
    </footer>
  );
};
