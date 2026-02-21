"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users, BookOpenCheck, ClipboardCheck, CalendarDays,
  MessageSquare, FlaskConical,
  FileBarChart, GraduationCap, Clock, ArrowUpRight,
  Activity, CheckCircle2, Play, X,
  LucideIcon
} from "lucide-react";

interface ScheduleItem {
  time: string;
  md: string;
  title: string;
  rm: string;
  active: boolean;
  done: boolean;
}

interface WorkspaceItem {
  n: string;
  i: LucideIcon;
  route: string;
}

export default function FacultyDashboard() {
  const router = useRouter();

  // ── Schedule ──
  const [schedule, setSchedule] = useState<ScheduleItem[]>([
    { time: "09:00", md: "AM", title: "BCA Software Eng",   rm: "302",        active: false, done: false },
    { time: "10:15", md: "AM", title: "Project Mentoring",  rm: "Lab 4",      active: true,  done: false },
    { time: "12:00", md: "PM", title: "Faculty Meeting",    rm: "Conf. B",    active: false, done: false },
    { time: "02:00", md: "PM", title: "Integration Review", rm: "Virtual",    active: false, done: false },
    { time: "03:30", md: "PM", title: "Research Seminar",   rm: "Auditorium", active: false, done: false },
  ]);
  const markDone = (i: number) =>
    setSchedule(prev => prev.map((s, idx) => idx === i ? { ...s, done: true, active: false } : s));

  // ── Workspace ──
  const [activeWorkspace, setActiveWorkspace] = useState<string | null>(null);
  const workspaceItems: WorkspaceItem[] = [
    { n: "Classes",     i: Users,          route: "/fac/classes"     },
    { n: "Assignments", i: BookOpenCheck,  route: "/fac/assignments" },
    { n: "Attendance",  i: ClipboardCheck, route: "/fac/attendance"  },
    { n: "Research",    i: FlaskConical,   route: "/fac/research"    },
    { n: "Calendar",    i: CalendarDays,   route: "/fac/calendar"    },
    { n: "Chat",        i: MessageSquare,  route: "/fac/chat"        },
    { n: "Exams",       i: GraduationCap,  route: "/fac/exams"       },
    { n: "Reports",     i: FileBarChart,   route: "/fac/reports"     },
  ];

  // ── Eval banner ──
  const [evalDismissed, setEvalDismissed] = useState(false);

  // ── Rating ──
  const [ratingExpanded, setRatingExpanded] = useState(false);

  // ── Toast ──
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div className="min-h-screen dotgrid bg-gradient-to-br from-background via-accent/30 to-background text-foreground font-sans pb-20 p-4 sm:p-6 lg:p-8">

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 bg-primary text-primary-foreground rounded-2xl shadow-2xl text-sm font-bold">
          {toast}
        </div>
      )}

      <main className="relative z-10 max-w-7xl mx-auto">

        {/* ══════════════════════════════════════
            BENTO GRID
        ══════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[100px] md:auto-rows-[110px]">

          {/* ── TODAY'S TIMELINE — LEFT (col 4, row 5) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
            className="md:col-span-4 row-span-5 card relative overflow-hidden flex flex-col !p-6 order-first"
          >
            <div className="flex justify-between items-center mb-6 shrink-0">
              <h2 className="text-xl font-black text-primary">Today&apos;s Timeline</h2>
              <button
                onClick={() => router.push('/fac/calendar')}
                className="w-8 h-8 rounded-xl bg-accent border border-border flex items-center justify-center hover:bg-muted transition-colors"
              >
                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/40">
              {schedule.map((sch, i) => (
                <div key={i} className={`p-3 rounded-xl border-l-4 transition-all text-sm ${
                  sch.done
                    ? 'bg-muted/40 border-border opacity-50'
                    : sch.active
                    ? 'bg-primary/10 border-primary'
                    : 'bg-accent/60 border-border hover:bg-accent'
                }`}>
                  <div className="flex justify-between items-start gap-2">
                    <span className={`font-black text-sm ${
                      sch.done ? 'line-through text-muted-foreground' : sch.active ? 'text-primary' : 'text-foreground'
                    }`}>
                      {sch.title}
                    </span>
                    <span className="text-xs text-muted-foreground shrink-0">{sch.time} {sch.md}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={10} /> {sch.rm}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {sch.active && !sch.done && (
                        <button
                          onClick={() => showToast(`Joining ${sch.title}...`)}
                          className="flex items-center gap-1 px-2 py-0.5 bg-primary text-primary-foreground rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors"
                        >
                          Join <Play size={9} className="fill-current" />
                        </button>
                      )}
                      {!sch.done && (
                        <button
                          onClick={() => markDone(i)}
                          className="text-[10px] px-2 py-0.5 bg-accent border border-border rounded-lg font-bold text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                        >
                          Done
                        </button>
                      )}
                      {sch.done && (
                        <span className="text-[10px] text-muted-foreground font-bold">Done</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── WORKSPACE — RIGHT (col 8, row 3) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
            className="md:col-span-8 row-span-3 card relative overflow-hidden group !p-6"
          >
            <div className="relative z-10 flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-black text-primary mb-1">Workspace</h2>
                <p className="text-muted-foreground font-semibold text-sm">
                  {activeWorkspace ? `Opening ${activeWorkspace}...` : 'Quick access tools'}
                </p>
              </div>
              <button
                onClick={() => showToast('Edit tools — coming soon!')}
                className="px-4 py-2 bg-secondary text-secondary-foreground border border-border rounded-xl text-xs font-bold hover:bg-muted transition-all"
              >
                Edit Tools
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
              {workspaceItems.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveWorkspace(item.n);
                    router.push(item.route);
                  }}
                  className={`tile flex flex-col items-center justify-center gap-2 cursor-pointer hover:shadow-md hover:-translate-y-0.5 hover:border-primary/50 transition-all group/tile !p-3 ${
                    activeWorkspace === item.n ? 'border-primary bg-primary/5' : ''
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center group-hover/tile:scale-110 transition-transform ${
                    activeWorkspace === item.n ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
                  }`}>
                    <item.i className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <span className={`font-black text-sm tracking-tight ${
                    activeWorkspace === item.n ? 'text-primary' : 'text-foreground'
                  }`}>
                    {item.n}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── URGENT EVALUATIONS (col 4, row 2) ── */}
          {!evalDismissed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
              className="md:col-span-4 row-span-2 tile relative overflow-hidden flex flex-col justify-between cursor-pointer hover:border-destructive/50 hover:shadow-lg transition-all duration-300 !p-6 border-destructive/20"
              onClick={() => router.push('/fac/evaluations')}
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-destructive" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-destructive/10 border border-destructive/20 rounded-full text-[10px] font-black text-destructive uppercase tracking-widest">
                    Urgent
                  </span>
                  <button
                    onClick={(e: React.MouseEvent) => { e.stopPropagation(); setEvalDismissed(true); }}
                    className="w-6 h-6 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center justify-center hover:bg-destructive/20 transition-colors"
                  >
                    <X className="w-3 h-3 text-destructive" />
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <h3 className="text-xl font-black text-foreground tracking-tight mb-1">Evaluations</h3>
                <p className="font-semibold text-sm text-muted-foreground leading-snug">
                  12 student reports due strictly by Feb 28.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="md:col-span-4 row-span-2 tile flex items-center justify-center !p-6 border-dashed"
            >
              <button
                onClick={() => setEvalDismissed(false)}
                className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
              >
                + Show Evaluations Banner
              </button>
            </motion.div>
          )}

          {/* ── FACULTY RATING (col 4, row 2) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}
            onClick={() => setRatingExpanded(s => !s)}
            className="md:col-span-4 row-span-2 tile flex flex-col justify-center cursor-pointer hover:border-primary/50 hover:shadow-lg transition-all group !p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-black text-foreground">Faculty Rating</h3>
              <div className="w-8 h-8 rounded-xl bg-accent border border-border flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-4 h-4 text-primary" />
              </div>
            </div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-5xl font-black tracking-tighter text-primary leading-none">4.9</span>
              <span className="text-sm font-black text-muted-foreground mb-1">/ 5.0</span>
            </div>
            {!ratingExpanded ? (
              <p className="text-xs font-semibold text-muted-foreground">
                Tap to see breakdown · BCA cohort reviews.
              </p>
            ) : (
              <div className="space-y-1.5 mt-1">
                {[
                  { label: 'Teaching Quality', val: '5.0' },
                  { label: 'Availability',     val: '4.8' },
                  { label: 'Course Content',   val: '4.9' },
                ].map((r, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground font-semibold">{r.label}</span>
                    <span className="font-black text-primary">{r.val}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

        </div>

        {/* ══════════════════════════════════════
            FOOTER
        ══════════════════════════════════════ */}
        <div className="mt-16 text-center text-sm font-semibold text-muted-foreground">
          &copy; 2026 EduTex Platform. Beautifully Handcrafted.
        </div>

      </main>
    </div>
  );
}
