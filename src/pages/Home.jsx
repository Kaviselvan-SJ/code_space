import { Navbar } from "../components/NavBar";
import { ThemeToggle } from "../components/ThemeToggle";
import { Footer } from "../components/Footer";

export const Home = () => {
  return(
    <div>
      <ThemeToggle />
      <Navbar />
      <h1>Home Page</h1>
      <Footer />
    </div>
  );
}