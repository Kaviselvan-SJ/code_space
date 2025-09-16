
import { Navbar } from "../components/NavBar";
import { ThemeToggle } from "../components/ThemeToggle";
import { Footer } from "../components/Footer";
import { UserProfile } from "../components/userProfile";
import ContestList from "../components/Contest/ContestList";

export const Contest = () => {
  return (
    <div>
      <ThemeToggle />
      <UserProfile />
      <Navbar />
      <ContestList />
      <Footer />
    </div>
  );
};
