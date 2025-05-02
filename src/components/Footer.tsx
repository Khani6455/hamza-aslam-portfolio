
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="py-10 bg-secondary/20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-xl font-bold text-neon-purple text-glow">
              <span className="font-jetbrains">&lt;HA/&gt;</span>
            </a>
            <p className="text-muted-foreground mt-2">
              Building digital experiences with code
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-6 mb-4">
              <a href="#home" className="text-muted-foreground hover:text-neon-purple transition-colors duration-300 text-sm">Home</a>
              <a href="#about" className="text-muted-foreground hover:text-neon-purple transition-colors duration-300 text-sm">About</a>
              <a href="#projects" className="text-muted-foreground hover:text-neon-purple transition-colors duration-300 text-sm">Projects</a>
              <a href="#experience" className="text-muted-foreground hover:text-neon-purple transition-colors duration-300 text-sm">Experience</a>
              <a href="#contact" className="text-muted-foreground hover:text-neon-purple transition-colors duration-300 text-sm">Contact</a>
            </div>
            
            <div className="flex items-center">
              <button
                onClick={scrollToTop}
                className="p-2 rounded-full bg-neon-purple/10 text-neon-purple hover:bg-neon-purple/20 transition-all duration-300"
                aria-label="Scroll to top"
              >
                <ArrowUp className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neon-purple/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Hamza Aslam. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm mt-2 md:mt-0">
            Built with <span className="text-neon-purple">React</span> & <span className="text-neon-purple">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
