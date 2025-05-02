
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);

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

    const section = document.getElementById('experience');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const experiences = [
    {
      role: "Senior Full-Stack Developer",
      company: "TechInnovate Solutions",
      period: "2023 - Present",
      description: "Led development of enterprise web applications using React, Node.js, and MongoDB. Implemented CI/CD pipelines and mentored junior developers.",
      achievements: [
        "Reduced application load time by 40% through code optimization",
        "Implemented microservices architecture for improved scalability",
        "Led a team of 5 developers to deliver projects on time"
      ]
    },
    {
      role: "Full-Stack Developer",
      company: "WebTech Experts",
      period: "2021 - 2023",
      description: "Developed and maintained multiple web applications for clients across various industries. Worked with MERN stack and integrated third-party APIs.",
      achievements: [
        "Built a real-time dashboard for monitoring business metrics",
        "Integrated payment gateways and authentication systems",
        "Optimized database queries resulting in 30% faster response times"
      ]
    },
    {
      role: "Frontend Developer",
      company: "CreativeWeb Studio",
      period: "2020 - 2021",
      description: "Created responsive UI components and integrated RESTful APIs. Worked closely with UI/UX designers to implement pixel-perfect designs.",
      achievements: [
        "Revamped the company website improving user engagement by 25%",
        "Developed reusable component library for faster development",
        "Implemented automated testing reducing bug reports by 40%"
      ]
    },
  ];

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/3">
            <div className={`sticky top-24 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow text-neon-purple">
                Experience
              </h2>
              <p className="text-muted-foreground mb-8">
                With over 3 years in professional web development, I've helped businesses deliver exceptional digital experiences.
              </p>
              <Button className="bg-neon-purple hover:bg-neon-purple/80 text-white">
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neon-purple/30 before:to-transparent">
              {experiences.map((exp, index) => (
                <div 
                  key={exp.company} 
                  className={`relative flex items-start mb-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  style={{ transitionDelay: `${300 + index * 200}ms` }}
                >
                  {/* Timeline bullet */}
                  <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-neon-purple/20 border border-neon-purple/30 shadow-md shadow-neon-purple/10 z-10 md:mx-auto md:left-1/2 md:-translate-x-1/2">
                    <span className="h-3 w-3 rounded-full bg-neon-purple animate-pulse"></span>
                  </div>
                  
                  {/* Experience Card */}
                  <div className="ml-6 md:ml-0 md:max-w-md md:mr-auto md:pr-8 md:relative">
                    {/* Date tag for desktop */}
                    <div className="hidden md:flex absolute right-0 top-0 -mr-4 -mt-2 rounded bg-secondary/50 font-jetbrains text-sm py-1.5 px-3 text-neon-purple shadow-md">
                      {exp.period}
                    </div>
                    
                    <div className="glassmorphism p-5 rounded-lg border border-neon-purple/10 hover:border-neon-purple/30 transition-all duration-300 bg-secondary/20">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                        {/* Date tag for mobile */}
                        <div className="md:hidden text-sm text-neon-purple font-jetbrains">
                          {exp.period}
                        </div>
                      </div>
                      <p className="text-neon-purple font-medium mb-2">{exp.company}</p>
                      <p className="text-muted-foreground mb-3">{exp.description}</p>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-neon-purple mr-2">▹</span>
                            <span className="text-sm text-muted-foreground">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
