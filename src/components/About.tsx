
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

const About = () => {
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

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const skills = [
    { name: "React", icon: "⚛️", level: 90 },
    { name: "Node.js", icon: "🟩", level: 85 },
    { name: "JavaScript", icon: "🟨", level: 95 },
    { name: "TypeScript", icon: "🔷", level: 80 },
    { name: "MongoDB", icon: "🍃", level: 85 },
    { name: "Express", icon: "🚂", level: 85 },
    { name: "Python", icon: "🐍", level: 75 },
    { name: "HTML/CSS", icon: "🎨", level: 90 },
    { name: "Git", icon: "🔄", level: 85 },
    { name: "Tailwind CSS", icon: "🌊", level: 90 },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-20">
          <div className={`w-full md:w-1/2 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-glow text-neon-purple">About Me</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Hello! I'm Hamza, a passionate full-stack web developer with over 3 years of experience
                crafting digital experiences that users love. I specialize in building modern,
                responsive web applications using the MERN stack (MongoDB, Express, React, Node.js)
                and Python.
              </p>
              <p>
                My journey in web development began with a fascination for creating interactive
                interfaces and has evolved into a deep expertise in both frontend and backend
                technologies. I'm constantly learning and adapting to new technologies to stay
                at the forefront of web development.
              </p>
              <p>
                When I'm not coding, you can find me exploring new tech, contributing to open-source
                projects, or mentoring aspiring developers. I believe in clean code, intuitive user
                experiences, and the power of technology to solve real-world problems.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h3 className={`text-2xl font-bold mb-6 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Skills & Expertise
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className={`transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <Card className="p-4 bg-secondary/50 border border-neon-purple/10 hover:border-neon-purple/30 transition-all duration-300 group">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">{skill.icon}</span>
                      <h4 className="font-medium">{skill.name}</h4>
                    </div>
                    <div className="h-2 bg-background/80 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-neon-purple to-neon-blue rounded-full transition-all duration-1000 group-hover:animate-pulse" 
                        style={{ 
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${500 + index * 100}ms` 
                        }}
                      />
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
