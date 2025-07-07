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
      <h2 className="text-2xl font-bold text-primary">Kaviselvan S J</h2>

      {/* Navigation Links */}
      <nav className="flex flex-wrap justify-center gap-6 text-muted-foreground font-medium">
        <a href="#hero" className="hover:text-primary transition-colors">Home</a>
        <a href="#about" className="hover:text-primary transition-colors">About</a>
        <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
        <a href="#experience" className="hover:text-primary transition-colors">Experience</a>
        <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
        <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
      </nav>

      {/* Social Icons */}
      <div className="flex justify-center gap-6">
        <a
          href="https://instagram.com/kaviselvan_sj"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-primary/10 text-primary hover:scale-110 transition-transform"
        >
          <Instagram className="h-6 w-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/kaviselvan-sj/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-primary/10 text-primary hover:scale-110 transition-transform"
        >
          <Linkedin className="h-6 w-6" />
        </a>
        <a
          href="https://github.com/Kaviselvan-SJ"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-primary/10 text-primary hover:scale-110 transition-transform"
        >
          <Github className="h-6 w-6" />
        </a>
        <a
          href="#contact"
          className="p-3 rounded-full bg-primary/10 text-primary hover:scale-110 transition-transform"
        >
          <Contact2 className="h-6 w-6" />
        </a>
      </div>

      {/* Copyright */}
      <p className="text-sm text-muted-foreground text-center">
        &copy; {year} <span className="text-primary font-medium">Kaviselvan S J</span> – All rights reserved.
      </p>

      {/* Scroll to Top Button (only in footer) */}
      <div className="absolute right-6 bottom-6">
        <a
          href="#hero"
          className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
        >
          <ArrowUp size={20} />
        </a>
      </div>
    </footer>
  );
};