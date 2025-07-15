
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Landing from "../components/PracticeCodeEditor/Landing";
import { Navbar } from "../components/NavBar";
import { ThemeToggle } from "../components/ThemeToggle";
import { Footer } from "../components/Footer";
import { UserProfile } from "../components/userProfile";

export default function PracticeQuestions() {
  return(
    <>
    <Navbar/>
    <UserProfile/>
    <ThemeToggle/>
    <Landing/>
    <Footer/>
    
    </>
  );
}
