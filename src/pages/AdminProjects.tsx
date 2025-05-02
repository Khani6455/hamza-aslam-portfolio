
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  live: string;
  github: string;
  created_at?: string;
};

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({
    title: "",
    description: "",
    image: "",
    tech: [],
    live: "",
    github: "",
  });
  const [techInput, setTechInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const { toast } = useToast();

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          setProjects(data);
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Add tech to current project
  const handleAddTech = () => {
    if (techInput.trim() !== "") {
      const updatedTech = [...(currentProject.tech || []), techInput.trim()];
      setCurrentProject({ ...currentProject, tech: updatedTech });
      setTechInput("");
    }
  };

  // Remove tech from current project
  const handleRemoveTech = (index: number) => {
    const updatedTech = [...(currentProject.tech || [])];
    updatedTech.splice(index, 1);
    setCurrentProject({ ...currentProject, tech: updatedTech });
  };

  // Handle file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Create or update project
  const handleSaveProject = async () => {
    try {
      // Validate form
      if (!currentProject.title || !currentProject.description) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }

      let imagePath = currentProject.image;

      // Upload image if there's a new file
      if (imageFile) {
        const fileName = `project-${Date.now()}-${imageFile.name}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("portfolio-images")
          .upload(fileName, imageFile);

        if (uploadError) {
          throw uploadError;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from("portfolio-images")
          .getPublicUrl(fileName);

        imagePath = urlData.publicUrl;
      }

      // Save to database
      if (isEditing && currentProject.id) {
        // Update existing project
        const { error } = await supabase
          .from("projects")
          .update({
            title: currentProject.title,
            description: currentProject.description,
            image: imagePath,
            tech: currentProject.tech,
            live: currentProject.live,
            github: currentProject.github,
          })
          .eq("id", currentProject.id);

        if (error) throw error;

        // Update local state
        setProjects(projects.map(p => 
          p.id === currentProject.id ? { ...p, ...currentProject, image: imagePath } : p
        ));

        toast({
          title: "Success",
          description: "Project updated successfully",
        });
      } else {
        // Create new project
        const { data, error } = await supabase
          .from("projects")
          .insert({
            title: currentProject.title,
            description: currentProject.description,
            image: imagePath,
            tech: currentProject.tech,
            live: currentProject.live,
            github: currentProject.github,
          })
          .select();

        if (error) throw error;

        // Update local state
        if (data) {
          setProjects([...data, ...projects]);
        }

        toast({
          title: "Success",
          description: "Project created successfully",
        });
      }

      // Reset form
      setIsModalOpen(false);
      setCurrentProject({
        title: "",
        description: "",
        image: "",
        tech: [],
        live: "",
        github: "",
      });
      setImageFile(null);
      setImagePreview("");
      setIsEditing(false);

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Delete project
  const handleDeleteProject = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        const { error } = await supabase
          .from("projects")
          .delete()
          .eq("id", id);

        if (error) {
          throw error;
        }

        // Update local state
        setProjects(projects.filter(p => p.id !== id));

        toast({
          title: "Success",
          description: "Project deleted successfully",
        });
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  // Edit project
  const handleEditProject = (project: Project) => {
    setCurrentProject(project);
    setIsEditing(true);
    if (project.image) {
      setImagePreview(project.image);
    }
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neon-purple">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage your portfolio projects</p>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-neon-purple hover:bg-neon-purple/80 text-white"
              onClick={() => {
                setIsEditing(false);
                setCurrentProject({
                  title: "",
                  description: "",
                  image: "",
                  tech: [],
                  live: "",
                  github: "",
                });
                setImagePreview("");
                setImageFile(null);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
              Add Project
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Project" : "Add New Project"}</DialogTitle>
              <DialogDescription>
                Fill in the details below to {isEditing ? "update your" : "create a new"} project.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <Input 
                  id="title" 
                  placeholder="Project title"
                  value={currentProject.title}
                  onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea 
                  id="description" 
                  placeholder="Project description"
                  value={currentProject.description}
                  onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                  className="h-32"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="image" className="text-sm font-medium">Project Image</label>
                <div className="flex items-center gap-4">
                  <Input 
                    id="image" 
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="flex-1"
                  />
                  {imagePreview && (
                    <div className="h-20 w-20 rounded overflow-hidden border border-neon-purple/30">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="tech" className="text-sm font-medium">Technologies</label>
                <div className="flex gap-2">
                  <Input 
                    id="tech" 
                    placeholder="Add a technology"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTech();
                      }
                    }}
                  />
                  <Button 
                    type="button"
                    onClick={handleAddTech}
                    className="bg-neon-purple hover:bg-neon-purple/80 text-white"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentProject.tech?.map((tech, index) => (
                    <Badge 
                      key={index}
                      variant="secondary"
                      className="px-2 py-1 flex items-center gap-1"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTech(index)}
                        className="hover:text-neon-purple"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="live" className="text-sm font-medium">Live Demo URL</label>
                  <Input 
                    id="live" 
                    placeholder="https://example.com"
                    value={currentProject.live}
                    onChange={(e) => setCurrentProject({ ...currentProject, live: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="github" className="text-sm font-medium">GitHub URL</label>
                  <Input 
                    id="github" 
                    placeholder="https://github.com/username/repo"
                    value={currentProject.github}
                    onChange={(e) => setCurrentProject({ ...currentProject, github: e.target.value })}
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="bg-neon-purple hover:bg-neon-purple/80 text-white"
                onClick={handleSaveProject}
              >
                {isEditing ? "Update" : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-purple"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-lg border-neon-purple/20 bg-secondary/5">
          <div className="mb-4 text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          </div>
          <h3 className="text-lg font-medium">No projects yet</h3>
          <p className="text-muted-foreground mt-1">Get started by creating a new project</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Technologies</TableHead>
              <TableHead className="hidden md:table-cell">Links</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  {project.image ? (
                    <div className="h-12 w-16 rounded overflow-hidden bg-secondary/20">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-12 w-16 rounded bg-secondary/20 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="font-medium">{project.title}</div>
                  <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                    {project.description}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {project.tech?.slice(0, 3).map((tech, index) => (
                      <Badge key={index} variant="outline" className="bg-secondary/10">
                        {tech}
                      </Badge>
                    ))}
                    {project.tech && project.tech.length > 3 && (
                      <Badge variant="outline" className="bg-secondary/10">
                        +{project.tech.length - 3}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex gap-2">
                    {project.live && (
                      <a 
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path></svg>
                      </a>
                    )}
                    {project.github && (
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                      </a>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditProject(project)}
                      className="h-8 w-8 p-0"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-purple"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteProject(project.id)}
                      className="h-8 w-8 p-0 border-red-800/20 hover:bg-red-800/10 hover:text-red-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminProjects;
