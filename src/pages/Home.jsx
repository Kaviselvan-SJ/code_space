
import { Navbar } from "../components/NavBar";
import { ThemeToggle } from "../components/ThemeToggle";
import { Footer } from "../components/Footer";
import { MainSection } from "../components/MainSection";
import { UserProfile } from "../components/userProfile";

export const Home = () => {
  return (
    <div>
      <ThemeToggle />
      <UserProfile />
      <Navbar />
      <MainSection />
      <Footer />
    </div>
  );
};
