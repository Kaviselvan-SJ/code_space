import CreateContest from "../components/Admin/CreateContest";
import { Navbar } from "../components/NavBar";
import { ThemeToggle } from "../components/ThemeToggle";
import { Footer } from "../components/Footer";
import { UserProfile } from "../components/userProfile";


export const CreateContestPage = () => {
  return (
    <div>
      <ThemeToggle />
      <UserProfile />
      <Navbar />
      <CreateContest />
      <Footer />
    </div>
  );
};
