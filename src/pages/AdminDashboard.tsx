
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experiences: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Get projects count
        const { count: projectsCount, error: projectsError } = await supabase
          .from("projects")
          .select("*", { count: "exact", head: true });

        // Get skills count
        const { count: skillsCount, error: skillsError } = await supabase
          .from("skills")
          .select("*", { count: "exact", head: true });

        // Get experiences count
        const { count: experiencesCount, error: experiencesError } = await supabase
          .from("experiences")
          .select("*", { count: "exact", head: true });

        if (projectsError || skillsError || experiencesError) {
          console.error("Error fetching stats:", projectsError || skillsError || experiencesError);
        } else {
          setStats({
            projects: projectsCount || 0,
            skills: skillsCount || 0,
            experiences: experiencesCount || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-neon-purple">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome to your portfolio admin panel</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-secondary/10 border-neon-purple/20 overflow-hidden relative">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {loading ? "..." : stats.projects}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Total portfolio projects</p>
          </CardContent>
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-purple"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path><path d="M12 3v6"></path></svg>
          </div>
        </Card>
        
        <Card className="bg-secondary/10 border-neon-purple/20 overflow-hidden relative">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {loading ? "..." : stats.skills}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Total skills & technologies</p>
          </CardContent>
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-purple"><path d="m7 11 2-2-2-2"></path><path d="M11 13h4"></path><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
          </div>
        </Card>
        
        <Card className="bg-secondary/10 border-neon-purple/20 overflow-hidden relative">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {loading ? "..." : stats.experiences}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Work & education entries</p>
          </CardContent>
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-purple"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 3v4"></path><path d="M8 3v4"></path><path d="M3 11h18"></path></svg>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-secondary/10 border-neon-purple/20 col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-8 text-muted-foreground">
              Activity will be shown here as you make changes
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-secondary/10 border-neon-purple/20 col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-background hover:bg-secondary/5 transition-colors cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-purple mb-2"><path d="M11 12H3"></path><path d="M16 6H3"></path><path d="M16 18H3"></path><path d="M21 12h-4"></path><path d="m19 10 2 2-2 2"></path></svg>
                  <span className="text-sm">Edit Hero</span>
                </CardContent>
              </Card>
              <Card className="bg-background hover:bg-secondary/5 transition-colors cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-purple mb-2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                  <span className="text-sm">Add Project</span>
                </CardContent>
              </Card>
              <Card className="bg-background hover:bg-secondary/5 transition-colors cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-purple mb-2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>
                  <span className="text-sm">Add Skill</span>
                </CardContent>
              </Card>
              <Card className="bg-background hover:bg-secondary/5 transition-colors cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-purple mb-2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  <span className="text-sm">Add Experience</span>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
