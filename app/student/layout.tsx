"use client";

import { motion } from "framer-motion";
import { GraduationCap, ArrowLeft, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Clear the mock auth cookie
    document.cookie = "mock-auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 dotgrid relative pb-20">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Soft immersive background gradients */}
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-200/30 blur-[120px] rounded-full mix-blend-multiply dark:bg-blue-900/30" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-200/20 blur-[120px] rounded-full mix-blend-multiply dark:bg-emerald-900/20" />
        <div className="absolute top-[30%] left-[20%] w-[30vw] h-[30vw] bg-purple-200/20 blur-[100px] rounded-full mix-blend-multiply dark:bg-purple-900/20" />
      </div>

      <main className="relative z-10 pt-16 px-6 max-w-7xl mx-auto flex flex-col min-h-[calc(100vh-6rem)]">
        {/* Persistent Top Navigation Header */}
        <header className="flex items-center justify-between mb-8 bg-card/40 backdrop-blur-md p-4 rounded-3xl border border-border/50 shadow-sm">
          <Link href="/student" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary/10 border border-primary/20 text-primary rounded-xl flex items-center justify-center shadow-inner group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors">EduTex</h2>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary leading-none">Student Portal</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {pathname !== "/student" && (
              <Link href="/student" className="px-4 py-2 bg-accent/60 text-foreground border border-border/60 hover:border-primary/40 rounded-full text-xs font-extrabold shadow-sm hover:shadow-md transition-all flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Overview</span>
              </Link>
            )}
            
            <button 
              onClick={handleLogout}
              className="w-10 h-10 rounded-full border border-border/60 bg-accent/60 flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:bg-destructive/10 transition-colors shadow-sm"
              title="Logout"
            >
              <LogOut className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </header>

        {/* Page Content with Framer Motion Transition */}
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex-1"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
