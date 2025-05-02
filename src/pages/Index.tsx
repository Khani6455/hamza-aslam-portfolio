
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <div className="mt-0"> {/* Removed any extra spacing */}
        <About />
        <Projects />
        <Experience />
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
