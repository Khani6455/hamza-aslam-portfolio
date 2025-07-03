
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github, Globe } from "lucide-react";

const Projects = () => {
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

    const section = document.getElementById('projects');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const projects = [
    {
      title: "E-commerce Platform",
      description: "A high-performance MERN stack e-commerce platform with lightning-fast product browsing, secure Stripe payments, and a real-time admin dashboard. Features seamless cart management, user authentication, and scalable MongoDB backend**—delivering a premium shopping experience with 99% uptime reliability.",
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80",
      tech: ["React", "Node.js", "MongoDB", "Express", "Stripe API"],
      live: "https://nexshop-h2r4.onrender.com/",
      github: "https://github.com/example/repo",
    },

    {
      title: "Live Cricket Updates & Streaming",
      description: "A website providing live cricket score updates using a Cric API, along with live streaming links for PTV and Star Sports. Built using only HTML, CSS, and JavaScript.",
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgcIqsZ9Dw4jzTuIU6Jq1A81QxebYzGJQQ0ljS1bTHqf1l3uivOfvb3NERuMt58uoCU_FTXPPtcdeZP29H7KhpvJfi4j57lHmwQl4042llBSHZgu_kcjNCY7DCH6U0g9jA-nZ3u_Z2YUxISYbw3sX765nJEXEkGR69v1jORm7WMXkQekaPpPxWkKexEKhft/s320/ae4b5d24-8588-42ac-aaf7-7a3bd2448a30.png",

      tech: ["HTML", "CSS", "JavaScript", "Cric API"],
      live: "https://khani6455.github.io/cricArena/", // Replace with your live site URL
      github: "https://github.com/Khani6455/cricArena", // Replace with your GitHub repo URL
    },

   {
  title: "React Admin Dashboard Template",
  description: "A modern and responsive admin dashboard built with React, Vite, and TypeScript. Features include Firebase authentication, real-time data integration, responsive UI with Tailwind CSS, and reusable component structure—perfect as a starter template for admin panels and CMS apps.",
  image: "https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3", // You can replace this with your actual app screenshot URL
  tech: ["React", "Vite", "TypeScript", "Firebase", "Tailwind CSS"],
  live: "https://react-admin-starter-kit.onrender.com", // Change if different
  github: "https://github.com/Khani6455/hamza-aslam-portfolio", // Replace with your actual GitHub repo link
},

    {
  title: "AI Text Summarizer",
  description: "AI-powered tool that instantly summarizes long articles, documents, or web pages. Users can paste text, enter URLs, and download summaries as PDFs.",
  image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  tech: ["Python", "Flask", "OpenAI API", "BeautifulSoup (Web Scraping)", "PDFKit", "HTML/CSS"],
  live: "https://summarizeai-tl8h.onrender.com/",
  github: "https://github.com/Khani6455/Summarizeai",
},
  ];

  return (
    <section id="projects" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-glow text-neon-purple transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Featured Projects
        </h2>
        <p className={`text-muted-foreground mb-12 max-w-3xl transition-all duration-1000 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          A selection of projects I've worked on, showcasing my skills and experience in building modern web applications.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              <div className="rounded-xl overflow-hidden group relative h-full flex flex-col bg-secondary/20 border border-neon-purple/10 hover:border-neon-purple/30 transition-all duration-300">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-neon-purple/10 group-hover:bg-transparent transition-all duration-300 z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                
                {/* Project Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-neon-purple transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                  
                  {/* Tech Stack */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 rounded-full bg-background/60 text-neon-purple/80">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Project Links */}
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10" asChild>
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" className="border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={`flex justify-center mt-12 transition-all duration-1000 delay-800 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Button className="bg-neon-purple hover:bg-neon-purple/80">
            View All Projects
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
