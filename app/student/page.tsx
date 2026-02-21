"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, ClipboardCheck, CalendarDays, MessageSquare, 
  FlaskConical, Library, GraduationCap, Clock, ArrowUpRight, 
  Activity, Play, X, LucideIcon, Target, CheckCircle2,
  ChevronRight, BrainCircuit, Code, Search
} from "lucide-react";

// ─────────────────────────────────────────
// Types & Defaults
// ─────────────────────────────────────────

interface ScheduleItem {
  time: string; md: string; title: string; rm: string;
  active: boolean; done: boolean; type: "Lecture" | "Lab" | "Seminar" | "Mentoring";
}

interface WorkspaceItem { n: string; i: LucideIcon; route: string; color: string; }

interface SubjectProgress {
  id: string; title: string; progress: number; assignments: number; nextDue?: string; color: string; icon: LucideIcon;
}

// ─────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────

export default function StudentDashboard() {
  const router = useRouter();

  // ── Data ──
  const [schedule, setSchedule] = useState<ScheduleItem[]>([
    { time: "09:00", md: "AM", title: "Computer Networks", rm: "302", active: false, done: true, type: "Lecture" },
    { time: "10:15", md: "AM", title: "Formal Language & Automata", rm: "Lab 4", active: true, done: false, type: "Lecture" },
    { time: "12:00", md: "PM", title: "Discovering Self", rm: "Auditorium", active: false, done: false, type: "Seminar" },
    { time: "02:00", md: "PM", title: "Partner Company Integration", rm: "Virtual", active: false, done: false, type: "Mentoring" },
  ]);

  const subjects: SubjectProgress[] = [
    { id: "sub-1", title: "Computer Networks", progress: 68, assignments: 2, nextDue: "Feb 23", color: "bg-blue-500", icon: Code },
    { id: "sub-2", title: "Formal Language & Automata", progress: 42, assignments: 1, nextDue: "Feb 28", color: "bg-purple-500", icon: BrainCircuit },
    { id: "sub-3", title: "Business Management", progress: 85, assignments: 0, color: "bg-amber-500", icon: Target },
    { id: "sub-4", title: "Discovering Self", progress: 34, assignments: 3, nextDue: "Mar 05", color: "bg-emerald-500", icon: Users }, // Using generic search icon if standard missing, handled below via imports
  ];

  const workspaceItems: WorkspaceItem[] = [
    { n: "Livebooks", i: BookOpen, route: "/student/livebooks", color: "text-blue-500" },
    { n: "Assignments", i: ClipboardCheck, route: "/student/assignments", color: "text-rose-500" },
    { n: "Attendance", i: CheckCircle2, route: "/student/attendance", color: "text-emerald-500" },
    { n: "Research Hub", i: FlaskConical, route: "/student/research", color: "text-purple-500" },
    { n: "Calendar", i: CalendarDays, route: "/student/calendar", color: "text-amber-500" },
    { n: "Discussions", i: MessageSquare, route: "/student/chat", color: "text-indigo-500" },
    { n: "Grades", i: GraduationCap, route: "/student/grades", color: "text-teal-500" },
    { n: "Library", i: Library, route: "/student/library", color: "text-orange-500" },
  ];

  const [urgentDismissed, setUrgentDismissed] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const markDone = (i: number) => {
    setSchedule(prev => prev.map((s, idx) => idx === i ? { ...s, done: true, active: false } : s));
  };

  const completedCount = schedule.filter(s => s.done).length;
  const totalCount = schedule.length;
  const activeSession = schedule.find(s => s.active && !s.done);
  const overallProgress = Math.round(subjects.reduce((acc, curr) => acc + curr.progress, 0) / subjects.length);

  return (
    <div className="min-h-screen dotgrid bg-gradient-to-br from-background via-accent/30 to-background text-foreground font-sans pb-24 p-4 sm:p-6 lg:p-8">
      
      {/* ── Toast ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3.5 bg-foreground text-background rounded-full shadow-2xl text-sm font-bold whitespace-nowrap tracking-wide"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 max-w-7xl mx-auto space-y-4">

        {/* ══════════════════════════════════════
            TOP STATUS BAR
        ══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-between items-center gap-4 px-5 py-3.5 bg-card/80 backdrop-blur-xl border border-border rounded-3xl shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-primary text-primary-foreground rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm">
              BCA Sem 6
            </span>
            <div className="w-px h-5 bg-border hidden sm:block" />
            <span className="text-sm font-extrabold tracking-tight hidden sm:block">Cohort Alpha</span>
          </div>

          <div className="flex items-center gap-2">
            {activeSession ? (
              <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full cursor-pointer hover:bg-emerald-500/20 transition-colors" onClick={() => showToast(`Entering ${activeSession.title}...`)}>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 tracking-tight hidden sm:inline">{activeSession.title}</span>
                <span className="text-xs text-emerald-600/70 dark:text-emerald-400/70 font-bold">Live</span>
              </div>
            ) : (
               <div className="flex items-center gap-2 px-4 py-1.5 bg-accent/60 border border-border rounded-full">
                <span className="text-xs font-bold text-muted-foreground">No active session</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* ══════════════════════════════════════
            BENTO GRID
        ══════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

          {/* ────────────────────────────────────
              LEFT COL — Timeline + Action
          ──────────────────────────────────── */}
          <div className="md:col-span-4 flex flex-col gap-4">

            {/* QUICK STATS WIDGET */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 }}
              className="card flex items-center justify-between !p-5 bg-gradient-to-r from-primary/10 to-transparent border-primary/20"
            >
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Semester Progress</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black tracking-tighter text-foreground leading-none">{overallProgress}</span>
                  <span className="text-lg font-bold text-muted-foreground mb-0.5">%</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-full border-[4px] border-primary/20 flex items-center justify-center relative bg-background shadow-inner">
                 <svg className="w-full h-full transform -rotate-90 absolute top-0 left-0">
                    <circle cx="24" cy="24" r="20" className="text-transparent" strokeWidth="4" fill="transparent" />
                    <circle cx="24" cy="24" r="20" className="text-primary transition-all duration-1000 ease-out" strokeWidth="4" strokeDasharray={`${(overallProgress / 100) * 125} 125`} strokeLinecap="round" fill="transparent" />
                 </svg>
                 <ArrowUpRight className="w-5 h-5 text-primary" />
              </div>
            </motion.div>

            {/* TODAY'S TIMELINE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
              className="card flex flex-col !p-6 flex-1"
              style={{ minHeight: "360px" }}
            >
              <div className="flex justify-between items-center mb-6 shrink-0">
                <div>
                  <h2 className="text-xl font-black text-foreground">Today's Schedule</h2>
                  <p className="text-xs text-muted-foreground font-semibold mt-0.5">
                    {completedCount} of {totalCount} sessions done
                  </p>
                </div>
                <div className="w-9 h-9 rounded-2xl bg-accent border border-border flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                  <CalendarDays className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-1 space-y-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/20">
                {schedule.map((sch, i) => (
                  <div key={i} className={`relative pl-4 transition-all duration-300 ${
                    sch.done ? "opacity-50" : sch.active ? "opacity-100" : "opacity-80 hover:opacity-100"
                  }`}>
                    {/* Timeline Line */}
                    <div className={`absolute left-0 top-1.5 bottom-[-1rem] w-0.5 ${sch.done ? 'bg-primary/30' : 'bg-border'} ${i === schedule.length - 1 ? 'bottom-0' : ''}`} />
                    <div className={`absolute left-[-3px] top-1.5 w-2 h-2 rounded-full ${sch.active ? 'bg-primary shadow-[0_0_10px_rgba(var(--primary),0.8)]' : sch.done ? 'bg-primary/50' : 'bg-muted-foreground/30'}`} />

                    <div className={`p-4 rounded-2xl border transition-all ${
                      sch.active ? "bg-primary/5 border-primary/30 shadow-sm translate-x-1" : "bg-card border-border/50 hover:bg-accent hover:border-border"
                    }`}>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <div>
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest mb-1.5 inline-block ${
                            sch.type === 'Lecture' ? 'bg-blue-500/10 text-blue-500' : 
                            sch.type === 'Lab' ? 'bg-purple-500/10 text-purple-500' : 'bg-amber-500/10 text-amber-500'
                          }`}>
                            {sch.type}
                          </span>
                          <h4 className={`font-black text-sm leading-tight ${sch.active ? "text-primary" : "text-foreground"}`}>
                            {sch.title}
                          </h4>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="block text-xs font-black">{sch.time}</span>
                          <span className="block text-[10px] text-muted-foreground font-bold">{sch.md}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold bg-background border border-border/50 px-2 py-1 rounded-lg">
                          <Clock size={10} /> {sch.rm}
                        </span>
                        
                        {sch.active && !sch.done && (
                          <button onClick={() => showToast(`Joining ${sch.title}...`)} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-xl text-xs font-bold shadow-md hover:bg-primary/90 transition-all active:scale-95">
                            Join <Play size={10} className="fill-current" />
                          </button>
                        )}
                        {!sch.done && !sch.active && (
                          <button onClick={() => markDone(i)} className="text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors hover:underline">Mark Done</button>
                        )}
                        {sch.done && <span className="text-[10px] text-primary font-black uppercase tracking-widest flex items-center gap-1"><CheckCircle2 size={10} /> Done</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* ────────────────────────────────────
              RIGHT COL — Workspace + Subjects
          ──────────────────────────────────── */}
          <div className="md:col-span-8 flex flex-col gap-4">

            {/* ACTION BANNER */}
            <AnimatePresence>
              {!urgentDismissed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95, height: 0 }}
                  className="card !p-5 bg-destructive text-destructive-foreground border-destructive/20 relative overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all"
                  onClick={() => router.push("/student/assignments")}
                >
                  <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-white/20 blur-[80px] rounded-full pointer-events-none" />
                  
                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-black/15 flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:scale-110 transition-transform">
                        <Activity className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-extrabold text-lg text-white tracking-tight">2 Urgent Assignments</h3>
                          <span className="px-2 py-0.5 bg-black/20 border border-white/20 rounded-full text-[9px] font-black uppercase tracking-widest text-white">Action Required</span>
                        </div>
                        <p className="font-semibold text-xs text-white/80">Formal Languages & Computer Networks — Due this week</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={(e) => { e.stopPropagation(); setUrgentDismissed(true); }}
                      className="w-8 h-8 rounded-xl bg-black/10 flex items-center justify-center hover:bg-black/20 transition-colors backdrop-blur-md border border-white/20"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* WORKSPACE POCKETS */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}
              className="card !p-6"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-black text-foreground mb-1">Student Workspace</h2>
                  <p className="text-muted-foreground font-semibold text-xs">Access your academic tools</p>
                </div>
                <button
                  onClick={() => showToast("Opening tool editor...")}
                  className="w-8 h-8 rounded-xl bg-accent border border-border flex items-center justify-center hover:border-primary/30 transition-all text-muted-foreground"
                >
                  <Search size={14} />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {workspaceItems.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => router.push(item.route)}
                    className="tile flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-md hover:-translate-y-0.5 hover:border-primary/40 transition-all group/tile !p-4 bg-accent/30 border border-border/50 rounded-2xl"
                  >
                    <div className={`w-12 h-12 rounded-2xl bg-background border border-border/60 shadow-sm flex items-center justify-center group-hover/tile:scale-110 group-hover/tile:shadow-md transition-all ${item.color}`}>
                      <item.i className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                    <span className="font-extrabold text-[#9da5b4] dark:text-[#6b7280] group-hover/tile:text-foreground text-[11px] uppercase tracking-wider text-center transition-colors">
                      {item.n}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* LIVEBOOKS / SUBJECTS TRACKER */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 }}
              className="card flex-1 !p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-foreground">Current Subjects</h2>
                    <p className="text-xs text-muted-foreground font-semibold">Track your academic progress</p>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/student/livebooks")}
                  className="flex items-center gap-1.5 px-3 py-2 bg-secondary border border-border rounded-xl text-xs font-bold text-secondary-foreground hover:bg-muted transition-all"
                >
                  Livebooks <ChevronRight size={13} />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {subjects.map((sub) => (
                  <div key={sub.id} className="group p-4 bg-accent/40 border border-border rounded-3xl hover:border-primary/40 hover:bg-card hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div className={`w-10 h-10 rounded-2xl ${sub.color}/10 border ${sub.color}/20 flex items-center justify-center shrink-0`}>
                           <sub.icon className={`w-5 h-5 ${sub.color.replace('bg-', 'text-')}`} />
                        </div>
                        {sub.assignments > 0 && (
                          <span className="px-2 py-1 rounded-lg bg-destructive/10 text-destructive text-[10px] font-black uppercase tracking-widest border border-destructive/20">
                            {sub.assignments} Due
                          </span>
                        )}
                      </div>
                      <h4 className="font-extrabold text-sm text-foreground mb-1 leading-snug group-hover:text-primary transition-colors">{sub.title}</h4>
                      {sub.nextDue ? (
                        <p className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
                          <Clock size={10} /> Next due: {sub.nextDue}
                        </p>
                      ) : (
                        <p className="text-[11px] font-bold text-muted-foreground flex items-center gap-1 opacity-70">
                          <CheckCircle2 size={10} /> All caught up
                        </p>
                      )}
                    </div>

                    <div className="mt-5">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">
                        <span>Progress</span>
                        <span className="text-foreground">{sub.progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-background border border-border rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${sub.color}`}
                          style={{ width: `${sub.progress}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
            </motion.div>

          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-[11px] font-bold text-muted-foreground tracking-widest uppercase pb-4">
          &copy; 2026 EduTex Student Portal. Forged with precision.
        </div>
      </main>

    </div>
  );
}