
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if already authenticated
  supabase.auth.getSession().then(({ data }) => {
    setSession(data.session);
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // For demo purposes - allow a dummy login
      if (email === "admin@portfolio.com" && password === "admin123") {
        // Create a session manually for demo purposes
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          // If the user doesn't exist in Supabase, show a message
          toast({
            title: "Demo Mode",
            description: "Logging in with demo credentials",
          });
          
          // Redirect to admin dashboard anyway for demo
          setTimeout(() => {
            navigate("/admin/dashboard");
          }, 1000);
        } else {
          toast({
            title: "Success",
            description: "Logged in successfully",
          });
          navigate("/admin/dashboard");
        }
      } else {
        // Regular Supabase authentication
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: "Logged in successfully",
          });
          navigate("/admin/dashboard");
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

  // If already authenticated, redirect to admin dashboard
  if (session) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background bg-grid-small-white/5 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      <div className="relative z-10 glass-morphism p-8 rounded-xl w-full max-w-md space-y-6 shadow-lg border border-neon-purple/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neon-purple text-glow">Admin Login</h1>
          <p className="text-muted-foreground mt-2">Access your portfolio dashboard</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="admin@portfolio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-neon-purple/30 focus:ring-neon-purple"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-neon-purple/30 focus:ring-neon-purple"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-neon-purple hover:bg-neon-purple/80 text-white" 
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            This area is restricted to administrators only
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Demo credentials: admin@portfolio.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
