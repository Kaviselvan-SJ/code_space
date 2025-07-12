import {
  Instagram,
  Linkedin,
  Github,
  Contact2,
  ArrowUp,
} from "lucide-react";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 bg-card relative border-t border-border mt-12 flex flex-col items-center gap-6">
      <h2 className="text-2xl font-bold text-primary">CodeSpace</h2>

      {/* Navigation Links */}
      <nav className="flex flex-wrap justify-center gap-6 text-muted-foreground font-medium">
        <a href="#hero" className="hover:text-primary transition-colors">Home</a>
        <a href="#about" className="hover:text-primary transition-colors">About</a>
        <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
        <a href="#experience" className="hover:text-primary transition-colors">Experience</a>
        <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
        <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
      </nav>

      {/* Copyright */}
      <p className="text-sm text-muted-foreground text-center">
        &copy; {year} <span className="text-primary font-medium">CodeSpace</span> – All rights reserved.
      </p>

     
    </footer>
  );
};