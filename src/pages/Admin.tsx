
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

const Admin = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      // For demo purposes - check if we're using the demo login
      const demoMode = localStorage.getItem("demo_mode") === "true";
      
      if (error && !demoMode) {
        console.error("Error fetching session:", error);
      }
      
      // Allow access for demo mode or valid session
      if (data.session || demoMode) {
        setSession(data.session || { user: { email: "admin@portfolio.com" } });
      } else {
        setSession(null);
      }
      
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Handle demo mode for our admin login
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/admin/") && path !== "/admin/login") {
      // Check URL parameters for demo mode
      const urlParams = new URLSearchParams(location.search);
      const demoMode = urlParams.get("demo") === "true";
      
      if (demoMode) {
        localStorage.setItem("demo_mode", "true");
      }
    }
  }, [location]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-purple"></div>
      </div>
    );
  }

  // Allow access if we have a session or if we're in demo mode
  const demoMode = localStorage.getItem("demo_mode") === "true";
  
  if (!session && !demoMode) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Admin;
