
import { Navbar } from "../components/NavBar";
import { ThemeToggle } from "../components/ThemeToggle";
import { Footer } from "../components/Footer";
import { MainSection } from "../components/MainSection";

export const Home = () => {
  return (
    <div>
      <ThemeToggle />
      <Navbar />
      <MainSection />
      <Footer />
    </div>
  );
};
