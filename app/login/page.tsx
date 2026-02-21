"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GraduationCap, ArrowRight, Loader2, UserPlus, AlertCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const identifier = formData.get("identifier") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        identifier,
        password,
      });

      if (!res?.error) {
        router.push("/dashboard"); // Middleware will auto-redirect based on role
        router.refresh();
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err: any) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground dotgrid selection:bg-primary/20 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md p-6 sm:p-8 bg-card/80 backdrop-blur-3xl border border-border/60 rounded-3xl shadow-2xl flex flex-col relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 blur-3xl rounded-full" />

        <div className="flex flex-col items-center mb-8 relative z-10">
          <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/60 text-primary-foreground rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-primary/30">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-black tracking-tight">EduTex Platform</h1>
          <p className="text-muted-foreground text-sm font-semibold mt-1.5">Central Digital Hub & Knowledge Portal</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm font-semibold rounded-xl flex items-start gap-2"
          >
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-5 relative z-10">
          <div className="space-y-1.5">
            <label className="text-xs font-bold tracking-wider uppercase text-muted-foreground ml-1">Email or USN</label>
            <input
              name="identifier"
              type="text"
              placeholder="Enter your Email or USN"
              className="w-full bg-background/50 backdrop-blur-sm border-2 border-border/80 rounded-xl px-4 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all placeholder:font-medium placeholder:text-muted-foreground/60"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold tracking-wider uppercase text-muted-foreground ml-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full bg-background/50 backdrop-blur-sm border-2 border-border/80 rounded-xl px-4 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all placeholder:text-muted-foreground/40"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:scale-100 disabled:shadow-none mt-2"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Secure Sign In <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border/50 relative z-10">
          <div className="flex flex-col gap-3">
            <Link
              href="/register/student"
              className="w-full flex items-center justify-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors py-2 bg-accent/30 hover:bg-accent/50 rounded-xl"
            >
              <UserPlus className="w-4 h-4" /> Register as a Student
            </Link>
            <Link
              href="/register/hod"
              className="w-full text-center text-xs font-bold text-muted-foreground hover:text-foreground transition-colors py-1"
            >
              Apply for HOD / Admin Access
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
