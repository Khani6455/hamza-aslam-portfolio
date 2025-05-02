
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const texts = ["Full-Stack Developer", "MERN Stack Expert", "Python Developer"];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center py-20 relative overflow-hidden">
      {/* Code background animation */}
      <div className="code-vertical left-4 top-0 animate-code-flow">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="text-neon-purple/10">
            {"{  const  developer = 'passionate';  }"}
          </div>
        ))}
      </div>
      <div className="code-vertical right-4 top-[25%] animate-code-flow">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="text-neon-blue/10">
            {"function buildAmazingWebsite() { return true; }"}
          </div>
        ))}
      </div>
      
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center">
        <div className="w-full md:w-3/5 space-y-6 md:pr-10 z-10">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-neon-purple font-jetbrains mb-2">Hello, my name is</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 relative inline-block overflow-hidden whitespace-nowrap">
              <span className="animate-typing text-glow">Hamza Aslam</span>
              <span className="animate-cursor-blink border-r-4 border-neon-purple absolute ml-1"></span>
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-white/80 font-light h-[40px]">
              <span className="inline-block overflow-hidden whitespace-nowrap animate-fade-in">
                {texts[textIndex]}
              </span>
            </h2>
            <p className="text-muted-foreground max-w-lg mt-4 md:text-lg">
              I build exceptional digital experiences that are fast, accessible,
              and designed with best practices. Specializing in modern web applications.
            </p>
          </div>
          
          <div className={`flex gap-4 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Button className="bg-neon-purple hover:bg-neon-purple/80 text-white">View Projects</Button>
            <Button variant="outline" className="border-neon-purple text-neon-purple hover:bg-neon-purple/10">
              Contact Me
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="w-full md:w-2/5 mt-12 md:mt-0 flex justify-center z-10">
          <div className={`transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Placeholder for profile image with glowing effect */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue blur-lg opacity-30 animate-pulse"></div>
              <div className="h-64 w-64 md:h-80 md:w-80 rounded-full overflow-hidden border-2 border-neon-purple/30 relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Hamza Aslam"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-background p-3 rounded-full border border-neon-purple/30 animate-float">
                <div className="bg-neon-purple/20 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-purple"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tech particles */}
      <div className="absolute bottom-10 left-10 animate-float opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-neon-blue"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="10 9 9 9 8 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <div className="absolute top-20 right-20 animate-spin-slow opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-magenta"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="21.17" x2="12" y1="8" y2="8"></line><line x1="3.95" x2="8.54" y1="6.06" y2="14"></line><line x1="10.88" x2="15.46" y1="21.94" y2="14"></line></svg>
      </div>
    </section>
  );
};

export default Hero;
