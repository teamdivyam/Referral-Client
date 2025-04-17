import Navbar from "../components/common/Navbar";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import HowItWorks from "../components/home/HowItWorks";
import FAQ from "../components/home/FAQ";
import Footer from "../components/common/Footer";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to dashboard if user is authenticated
      navigate("/dashboard/overview");
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
