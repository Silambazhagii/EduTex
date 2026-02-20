"use client";

import { motion } from "framer-motion";
import { GraduationCap, ArrowLeft, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({
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
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-rose-200/30 blur-[120px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-200/30 blur-[120px] rounded-full mix-blend-multiply" />
        <div className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] bg-amber-100/30 blur-[100px] rounded-full mix-blend-multiply" />
      </div>

      <main className="relative z-10 pt-16 px-6 max-w-7xl mx-auto flex flex-col min-h-[calc(100vh-6rem)]">
        {/* Persistent Top Navigation Header */}
        <header className="flex items-center justify-between mb-8">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight">EduTex</h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground leading-none">Faculty Portal</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {pathname !== "/dashboard" && (
              <Link href="/dashboard" className="px-4 py-2 bg-accent text-accent-foreground border border-border rounded-full text-xs font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Overview
              </Link>
            )}
            
            <button 
              onClick={handleLogout}
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-colors shadow-sm"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
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

        {/* Persistent Footer */}
        <div className="mt-16 text-center text-sm font-semibold text-muted-foreground pt-6 border-t border-border/40">
           &copy; {new Date().getFullYear()} EduTex Platform. Beautifully Handcrafted.
        </div>
      </main>
    </div>
  );
}
