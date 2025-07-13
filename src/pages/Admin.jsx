
import { Navbar } from "../components/NavBar";
import { ThemeToggle } from "../components/ThemeToggle";
import { Footer } from "../components/Footer";
import { UserProfile } from "../components/userProfile";
import AdminDashboard from "../components/Admin/AdminDashboard";

export const Admin = () => {
  return (
    <div>
      <ThemeToggle />
      <UserProfile />
      <Navbar />
      <AdminDashboard />
      <Footer />
    </div>
  );
};
