
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Mail, Linkedin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('contact');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormState({ name: "", email: "", message: "" });
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
        duration: 5000,
      });
    }, 1500);
  };

  const socialLinks = [
    { name: "GitHub", icon: <Github className="h-6 w-6" />, href: "https://github.com/" },
    { name: "LinkedIn", icon: <Linkedin className="h-6 w-6" />, href: "https://linkedin.com/in/" },
    { name: "Email", icon: <Mail className="h-6 w-6" />, href: "mailto:hamzaaslam645555@gmail.com" },
  ];

  return (
    <section id="contact" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-glow text-neon-purple transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Get In Touch
          </h2>
          <p className={`text-muted-foreground mb-12 max-w-2xl text-center transition-all duration-1000 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            I'm currently available for freelance work and employment opportunities. 
            Feel free to reach out if you have a question or just want to connect.
          </p>

          <div className="w-full max-w-4xl flex flex-col md:flex-row gap-10">
            {/* Contact Form */}
            <div className={`w-full md:w-2/3 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="glassmorphism p-6 rounded-lg border border-neon-purple/10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground/80">
                      Name
                    </label>
                    <Input 
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="bg-background/40 border-neon-purple/20 focus:border-neon-purple"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground/80">
                      Email
                    </label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                      className="bg-background/40 border-neon-purple/20 focus:border-neon-purple"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground/80">
                      Message
                    </label>
                    <Textarea 
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Your message here..."
                      required
                      rows={5}
                      className="bg-background/40 border-neon-purple/20 focus:border-neon-purple"
                    />
                  </div>
                  
                  <div>
                    <Button 
                      type="submit"
                      className="w-full bg-neon-purple hover:bg-neon-purple/80 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </div>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className={`w-full md:w-1/3 transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="glassmorphism p-6 rounded-lg border border-neon-purple/10 h-full">
                <h3 className="text-xl font-bold mb-6 text-neon-purple">Connect With Me</h3>
                
                <div className="space-y-6">
                  {socialLinks.map((link) => (
                    <a 
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 rounded-md hover:bg-neon-purple/10 transition-all duration-300"
                    >
                      <div className="p-2 rounded-full bg-neon-purple/10 text-neon-purple mr-3">
                        {link.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">{link.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {link.name === "Email" ? "contact@hamzaaslam.com" : `@hamza.aslam`}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
                
                <div className="mt-12 pt-8 border-t border-neon-purple/10">
                  <p className="text-muted-foreground">
                    Based in <span className="text-neon-purple">New York, USA</span>
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Available for remote opportunities worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
