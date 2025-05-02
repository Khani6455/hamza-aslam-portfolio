
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

type HeroContent = {
  id: string;
  name: string;
  titles: string[];
  description: string;
  profile_image: string;
  updated_at?: string;
};

const AdminHero = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [heroContent, setHeroContent] = useState<HeroContent>({
    id: "",
    name: "",
    titles: [],
    description: "",
    profile_image: "",
  });
  const [titleInput, setTitleInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const { toast } = useToast();

  // Fetch hero content
  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("hero")
          .select("*")
          .single();

        if (error && error.code !== "PGRST116") {
          throw error;
        }

        if (data) {
          setHeroContent(data);
          if (data.profile_image) {
            setImagePreview(data.profile_image);
          }
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

    fetchHeroContent();
  }, []);

  // Add title
  const handleAddTitle = () => {
    if (titleInput.trim() !== "") {
      const updatedTitles = [...(heroContent.titles || []), titleInput.trim()];
      setHeroContent({ ...heroContent, titles: updatedTitles });
      setTitleInput("");
    }
  };

  // Remove title
  const handleRemoveTitle = (index: number) => {
    const updatedTitles = [...heroContent.titles];
    updatedTitles.splice(index, 1);
    setHeroContent({ ...heroContent, titles: updatedTitles });
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

  // Save hero content
  const handleSave = async () => {
    try {
      setSaving(true);
      // Validate form
      if (!heroContent.name || !heroContent.description || heroContent.titles.length === 0) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }

      let imagePath = heroContent.profile_image;

      // Upload image if there's a new file
      if (imageFile) {
        const fileName = `hero-${Date.now()}-${imageFile.name}`;
        
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

      // Check if hero content exists
      if (heroContent.id) {
        // Update existing hero content
        const { error } = await supabase
          .from("hero")
          .update({
            name: heroContent.name,
            titles: heroContent.titles,
            description: heroContent.description,
            profile_image: imagePath,
          })
          .eq("id", heroContent.id);

        if (error) throw error;
      } else {
        // Create new hero content
        const { data, error } = await supabase
          .from("hero")
          .insert({
            name: heroContent.name,
            titles: heroContent.titles,
            description: heroContent.description,
            profile_image: imagePath,
          })
          .select();

        if (error) throw error;
        
        if (data && data[0]) {
          setHeroContent({ ...data[0] });
        }
      }

      toast({
        title: "Success",
        description: "Hero section updated successfully",
      });

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-purple"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neon-purple">Hero Section</h1>
        <p className="text-muted-foreground mt-1">Update your portfolio's hero section</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="bg-secondary/10 border-neon-purple/20">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input 
                    id="name" 
                    placeholder="Your name"
                    value={heroContent.name}
                    onChange={(e) => setHeroContent({ ...heroContent, name: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="titles" className="text-sm font-medium">Professional Titles</label>
                  <div className="flex gap-2">
                    <Input 
                      id="titles" 
                      placeholder="Add a professional title"
                      value={titleInput}
                      onChange={(e) => setTitleInput(e.target.value)}
                      className="flex-1"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTitle();
                        }
                      }}
                    />
                    <Button 
                      type="button"
                      onClick={handleAddTitle}
                      className="bg-neon-purple hover:bg-neon-purple/80 text-white"
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {heroContent.titles?.map((title, index) => (
                      <div 
                        key={index}
                        className="px-3 py-1 rounded-full bg-secondary/20 flex items-center gap-2"
                      >
                        {title}
                        <button
                          type="button"
                          onClick={() => handleRemoveTitle(index)}
                          className="hover:text-neon-purple"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">Short Description</label>
                  <Textarea 
                    id="description" 
                    placeholder="A brief description about yourself"
                    value={heroContent.description}
                    onChange={(e) => setHeroContent({ ...heroContent, description: e.target.value })}
                    className="h-32"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="profile_image" className="text-sm font-medium">Profile Image</label>
                  <Input 
                    id="profile_image" 
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                
                <Button 
                  className="bg-neon-purple hover:bg-neon-purple/80 text-white w-full"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="bg-secondary/10 border-neon-purple/20 overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Preview</h3>
              </div>
              
              <div className="relative bg-background/50 p-6 border-t border-neon-purple/10 min-h-[300px]">
                {/* Hero Preview */}
                <div className="flex flex-col items-center">
                  {imagePreview ? (
                    <div className="h-32 w-32 rounded-full overflow-hidden mb-4 border-2 border-neon-purple/30">
                      <img 
                        src={imagePreview} 
                        alt="Profile" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-32 w-32 rounded-full bg-secondary/20 flex items-center justify-center mb-4 border-2 border-neon-purple/30">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h2 className="text-2xl font-bold">
                      {heroContent.name || "Your Name"}
                    </h2>
                    <div className="text-neon-purple/80 mt-1">
                      {heroContent.titles && heroContent.titles.length > 0 ? 
                        heroContent.titles[0] : "Professional Title"}
                    </div>
                    <p className="text-muted-foreground mt-2 max-w-md">
                      {heroContent.description || "Your professional description will appear here."}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-purple shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>Keep your description concise and impactful</span>
              </li>
              <li className="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-purple shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>Add multiple titles to showcase your skills</span>
              </li>
              <li className="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-purple shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>Use a professional, high-quality profile image</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHero;
