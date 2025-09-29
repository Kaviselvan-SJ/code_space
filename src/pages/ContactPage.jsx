
import { Navbar } from "../components/NavBar";
import { ThemeToggle } from "../components/ThemeToggle";
import { Footer } from "../components/Footer";
import { ContactSection } from "../components/ContactSection";
import { UserProfile } from "../components/userProfile";

export const Contact = () => {
  return (
    <div>
      <ThemeToggle />
      <UserProfile />
      <Navbar />
      <ContactSection />
      <Footer />
    </div>
  );
};
