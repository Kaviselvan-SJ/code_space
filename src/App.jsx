import { Home } from "./pages/Home"
import { NotFound } from "./pages/NotFound"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import CompanyLogin from "./components/CompanyLogin"
import CompanySignUp from "./components/CompanySignUp"
import { useEffect } from "react"
import { CodeEditorPage } from "./pages/CodeEditorPage"
import PracticePage from "./pages/Practice"
import PracticeQuestions from "./pages/PracticeQuestions"
import { Admin } from "./pages/Admin"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Profile } from "./pages/Profile"

function App() {
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/company-signup" element={<CompanySignUp />} />
        <Route path="/company-login" element={<CompanyLogin />} />  
        <Route path="/home" element={<Home />} />
        <Route path="/editor" element={<CodeEditorPage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/practice/:id" element={<PracticeQuestions />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
