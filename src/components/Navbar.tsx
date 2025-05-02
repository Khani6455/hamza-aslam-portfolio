
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-lg shadow-md' : ''}`}>
      <div className="container mx-auto flex items-center justify-between p-4">
        <a href="#home" className="text-2xl font-bold text-neon-purple text-glow">
          <span className="font-jetbrains">&lt;HA/&gt;</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-muted-foreground hover:text-neon-purple transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          <Button className="bg-neon-purple hover:bg-neon-purple/80 text-white font-medium">
            Resume
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-background/95 backdrop-blur-lg">
          <div className="flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-muted-foreground hover:text-neon-purple py-2"
              >
                {link.name}
              </a>
            ))}
            <Button className="bg-neon-purple hover:bg-neon-purple/80 text-white font-medium w-full">
              Resume
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
