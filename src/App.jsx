import { Home } from "./pages/Home"
import { NotFound } from "./pages/NotFound"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import { BrowserRouter, Route, Routes } from "react-router-dom"




function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
