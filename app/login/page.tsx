"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GraduationCap, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock an API call duration
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Set a mock cookie for middleware to read
    document.cookie = "mock-auth=true; path=/";
    
    // Redirect to dashboard
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground dotgrid selection:bg-primary/20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 bg-card border border-border/60 rounded-3xl shadow-xl flex flex-col relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
        
        <div className="flex flex-col items-center mb-8 relative z-10">
          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">EduTex Platform</h1>
          <p className="text-muted-foreground text-sm font-medium mt-1">Faculty Portal Login</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-wider uppercase text-muted-foreground ml-1">Faculty ID</label>
            <input 
              type="text" 
              defaultValue="FAC-2026-042"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              required 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-wider uppercase text-muted-foreground ml-1">Password</label>
            <input 
              type="password" 
              defaultValue="password123"
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Sign In <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-muted-foreground font-medium relative z-10">
          <p>Login is mocked for this demo. Just click Sign In.</p>
        </div>
      </motion.div>
    </div>
  );
}
