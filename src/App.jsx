import { Home } from "./pages/Home"
import { NotFound } from "./pages/NotFound"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import { useEffect } from "react";
import { CodeEditorPage } from "./pages/CodeEditorPage";
import { BrowserRouter, Route, Routes } from "react-router-dom"




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
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/editor" element={<CodeEditorPage />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
