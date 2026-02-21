// app/faculty/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users, BookOpenCheck, ClipboardCheck, CalendarDays,
  MessageSquare, FlaskConical, FileBarChart, GraduationCap,
  Clock, ArrowUpRight, Activity, Play, X,
  LucideIcon, Paperclip, AlertCircle, Bell, ChevronRight,
} from "lucide-react";

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

interface ScheduleItem {
  time: string; md: string; title: string; rm: string;
  active: boolean; done: boolean;
}
interface WorkspaceItem { n: string; i: LucideIcon; route: string; }
interface Notice {
  id: number; title: string; body: string; date: string;
  attachment?: { name: string; url: string; type: string };
}

// ─────────────────────────────────────────
// Data
// ─────────────────────────────────────────

const SHARED_NOTICES: Notice[] = [
  {
    id: 1,
    title: "Robotics Workshop Circular",
    body: "Conducted on 20th February 2026. Faculties please share with your students.",
    date: "Feb 20",
    attachment: {
      name: "Robotics_Workshop_Circular.pdf",
      url: "https://drive.google.com/file/d/11SrEjfVbHN88uNUw4q3fH8NhECR9jgVt/preview",
      type: "application/pdf",
    },
  },
  { id: 2, title: "SOP Annual Day 2K26",  body: "New approval workflow is now live from Feb 18.", date: "Feb 18" },
  { id: 3, title: "Timetable Update",      body: "Updated timetable published – check your schedule.", date: "Feb 17" },
  { id: 4, title: "Exam Duty",             body: "Exam duty assignments published for March 2026.", date: "Feb 16" },
];

// ─────────────────────────────────────────
// Page
// ─────────────────────────────────────────

export default function FacultyDashboard() {
  const router = useRouter();

  const [schedule, setSchedule] = useState<ScheduleItem[]>([
    { time: "09:00", md: "AM", title: "BCA Software Eng",   rm: "302",        active: false, done: false },
    { time: "10:15", md: "AM", title: "Project Mentoring",  rm: "Lab 4",      active: true,  done: false },
    { time: "12:00", md: "PM", title: "Faculty Meeting",    rm: "Conf. B",    active: false, done: false },
    { time: "02:00", md: "PM", title: "Integration Review", rm: "Virtual",    active: false, done: false },
    { time: "03:30", md: "PM", title: "Research Seminar",   rm: "Auditorium", active: false, done: false },
  ]);

  const markDone = (i: number) =>
    setSchedule(prev => prev.map((s, idx) => idx === i ? { ...s, done: true, active: false } : s));

  const [activeWorkspace, setActiveWorkspace] = useState<string | null>(null);
  const workspaceItems: WorkspaceItem[] = [
    { n: "Classes",     i: Users,          route: "/faculty/classes"     },
    { n: "Assignments", i: BookOpenCheck,  route: "/faculty/assignments" },
    { n: "Attendance",  i: ClipboardCheck, route: "/faculty/attendance"  },
    { n: "Research",    i: FlaskConical,   route: "/faculty/research"    },
    { n: "Calendar",    i: CalendarDays,   route: "/faculty/calendar"    },
    { n: "Chat",        i: MessageSquare,  route: "/faculty/chat"        },
    { n: "Exams",       i: GraduationCap,  route: "/faculty/exams"       },
    { n: "Reports",     i: FileBarChart,   route: "/faculty/reports"     },
  ];

  const [evalDismissed, setEvalDismissed] = useState(false);
  const [viewNotice, setViewNotice]       = useState<Notice | null>(null);
  const [toast, setToast]                 = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const completedCount  = schedule.filter(s => s.done).length;
  const totalCount      = schedule.length;
  const activeSession   = schedule.find(s => s.active && !s.done);

  return (
    <div className="min-h-screen dotgrid bg-gradient-to-br from-background via-accent/30 to-background text-foreground font-sans pb-24 p-4 sm:p-6 lg:p-8">

      {/* ── Toast ── */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 bg-primary text-primary-foreground rounded-2xl shadow-2xl text-sm font-bold whitespace-nowrap"
        >
          {toast}
        </motion.div>
      )}

      <main className="relative z-10 max-w-7xl mx-auto space-y-4">

        {/* ══════════════════════════════════════
            TOP STATUS BAR
        ══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center gap-2 px-4 py-2.5 bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-sm"
        >
          <span className="text-xs font-black text-muted-foreground uppercase tracking-widest mr-1">Faculty</span>
          <div className="w-px h-4 bg-border mx-1" />

          {/* Active session pill */}
          {activeSession ? (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/30 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-black text-primary">{activeSession.title}</span>
              <span className="text-xs text-muted-foreground">· Live Now</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-accent/60 border border-border rounded-xl">
              <span className="text-xs font-semibold text-muted-foreground">No active session</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 px-3 py-1 bg-accent/60 border border-border rounded-xl">
            <Clock size={12} className="text-muted-foreground" />
            <span className="text-xs font-black text-primary tabular-nums">{completedCount}/{totalCount}</span>
            <span className="text-xs text-muted-foreground font-medium hidden sm:inline">Done today</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-accent/60 border border-border rounded-xl">
            <Bell size={12} className="text-muted-foreground" />
            <span className="text-xs font-black text-primary tabular-nums">{SHARED_NOTICES.length}</span>
            <span className="text-xs text-muted-foreground font-medium hidden sm:inline">Notices</span>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════
            BENTO GRID
        ══════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

          {/* ────────────────────────────────────
              LEFT COL — Timeline + Evaluations
          ──────────────────────────────────── */}
          <div className="md:col-span-4 flex flex-col gap-4">

            {/* TODAY'S TIMELINE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
              className="card flex flex-col !p-6"
              style={{ minHeight: "420px" }}
            >
              <div className="flex justify-between items-center mb-5 shrink-0">
                <div>
                  <h2 className="text-xl font-black text-primary">Today&apos;s Timeline</h2>
                  <p className="text-xs text-muted-foreground font-semibold mt-0.5">
                    {completedCount} of {totalCount} sessions done
                  </p>
                </div>
                <button
                  onClick={() => router.push("/faculty/calendar")}
                  className="w-9 h-9 rounded-xl bg-accent border border-border flex items-center justify-center hover:bg-muted hover:border-primary/30 transition-all"
                >
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Progress strip */}
              <div className="relative h-1.5 w-full rounded-full bg-accent border border-border mb-5 shrink-0 overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all duration-700"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                />
              </div>

              <div className="flex-1 overflow-y-auto pr-1 space-y-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/40">
                {schedule.map((sch, i) => (
                  <div key={i} className={`p-3.5 rounded-xl border-l-4 transition-all text-sm ${
                    sch.done
                      ? "bg-muted/30 border-border opacity-50"
                      : sch.active
                      ? "bg-primary/10 border-primary shadow-sm"
                      : "bg-accent/60 border-border hover:bg-accent"
                  }`}>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <span className={`font-black text-sm leading-snug ${
                        sch.done ? "line-through text-muted-foreground"
                        : sch.active ? "text-primary"
                        : "text-foreground"
                      }`}>{sch.title}</span>
                      <span className="text-[11px] text-muted-foreground shrink-0 tabular-nums font-semibold">
                        {sch.time} {sch.md}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                        <Clock size={10} /> {sch.rm}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {sch.active && !sch.done && (
                          <button
                            onClick={() => showToast(`Joining ${sch.title}...`)}
                            className="flex items-center gap-1 px-2.5 py-1 bg-primary text-primary-foreground rounded-lg text-[11px] font-bold hover:bg-primary/90 transition-colors shadow-sm"
                          >
                            Join <Play size={9} className="fill-current" />
                          </button>
                        )}
                        {!sch.done && (
                          <button
                            onClick={() => markDone(i)}
                            className="text-[11px] px-2.5 py-1 bg-background border border-border rounded-lg font-bold text-muted-foreground hover:text-primary hover:border-primary transition-all"
                          >
                            Done
                          </button>
                        )}
                        {sch.done && (
                          <span className="text-[11px] text-muted-foreground/60 font-bold">✓ Done</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* URGENT EVALUATIONS */}
            {!evalDismissed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
                className="tile flex items-center gap-4 cursor-pointer hover:border-destructive/50 hover:shadow-lg transition-all duration-300 !p-5 border-destructive/20 group"
                onClick={() => router.push("/faculty/evaluations")}
              >
                <div className="w-12 h-12 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Activity className="w-5 h-5 text-destructive" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-black text-foreground">Evaluations Pending</h3>
                    <span className="px-2 py-0.5 bg-destructive/10 border border-destructive/20 rounded-full text-[10px] font-black text-destructive uppercase tracking-widest shrink-0">
                      Urgent
                    </span>
                  </div>
                  <p className="font-semibold text-xs text-muted-foreground">
                    12 student reports due by Feb 28.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <button
                    onClick={(e) => { e.stopPropagation(); setEvalDismissed(true); }}
                    className="w-7 h-7 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center justify-center hover:bg-destructive/20 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-destructive" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="tile flex items-center justify-center !p-4 border-dashed"
                style={{ minHeight: "76px" }}
              >
                <button
                  onClick={() => setEvalDismissed(false)}
                  className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
                >
                  + Show Evaluations Banner
                </button>
              </motion.div>
            )}

          </div>

          {/* ────────────────────────────────────
              RIGHT COL — Workspace + Notices
          ──────────────────────────────────── */}
          <div className="md:col-span-8 flex flex-col gap-4">

            {/* WORKSPACE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}
              className="card !p-6"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-black text-primary mb-1">Workspace</h2>
                  <p className="text-muted-foreground font-semibold text-sm">
                    {activeWorkspace ? `Opening ${activeWorkspace}...` : "Quick access to all your tools"}
                  </p>
                </div>
                <button
                  onClick={() => showToast("Edit tools — coming soon!")}
                  className="px-4 py-2 bg-secondary text-secondary-foreground border border-border rounded-xl text-xs font-bold hover:bg-muted transition-all"
                >
                  Edit Tools
                </button>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {workspaceItems.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => { setActiveWorkspace(item.n); router.push(item.route); }}
                    className={`tile flex flex-col items-center justify-center gap-2.5 cursor-pointer hover:shadow-md hover:-translate-y-0.5 hover:border-primary/50 transition-all group/tile !p-4 ${
                      activeWorkspace === item.n ? "border-primary bg-primary/5 shadow-md" : ""
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center group-hover/tile:scale-110 transition-transform ${
                      activeWorkspace === item.n
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent border border-border text-foreground"
                    }`}>
                      <item.i className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                    <span className={`font-black text-xs tracking-tight text-center ${
                      activeWorkspace === item.n ? "text-primary" : "text-foreground"
                    }`}>{item.n}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ══════════════════════════════════════
                NOTICES  (replaces Faculty Rating)
            ══════════════════════════════════════ */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 }}
              className="card flex-1 !p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-primary">Notices</h2>
                    <p className="text-xs text-muted-foreground font-semibold">
                      {SHARED_NOTICES.length} active announcements
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/faculty/notices")}
                  className="flex items-center gap-1.5 px-3 py-2 bg-secondary border border-border rounded-xl text-xs font-bold text-secondary-foreground hover:bg-muted transition-all"
                >
                  View All <ChevronRight size={13} />
                </button>
              </div>

              <div className="w-full border-t-2 border-dashed border-border mb-4" />

              <div className="grid gap-3 sm:grid-cols-2">
                {SHARED_NOTICES.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => setViewNotice(n)}
                    className="group flex flex-col gap-2 p-4 bg-accent/60 rounded-2xl border border-border hover:border-primary/40 hover:bg-accent hover:shadow-md cursor-pointer transition-all"
                  >
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                          {n.attachment
                            ? <Paperclip size={13} className="text-primary" />
                            : <Bell size={13} className="text-primary" />
                          }
                        </div>
                        <span className="text-sm font-black text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {n.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground font-bold shrink-0 tabular-nums">{n.date}</span>
                    </div>

                    {/* Body */}
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 pl-9">
                      {n.body}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center gap-2 pl-9">
                      {n.attachment && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-bold">
                          <Paperclip size={8} /> Attachment
                        </span>
                      )}
                      <span className="ml-auto text-[10px] text-primary font-bold group-hover:underline">
                        View →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm font-semibold text-muted-foreground">
          &copy; 2026 EduTex Platform. Beautifully Handcrafted.
        </div>
      </main>

      {/* ══════════════════════════════════════
          MODAL: View Notice
      ══════════════════════════════════════ */}
      {viewNotice && (
        <div
          className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm p-2 sm:p-4"
          onClick={() => setViewNotice(null)}
        >
          <div
            className="h-full w-full max-w-7xl mx-auto bg-card border-2 border-border rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex justify-between items-center p-4 sm:p-5 border-b-2 border-border shrink-0">
              <div className="flex items-center gap-3 flex-1 pr-4 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-2xl font-black text-primary truncate">{viewNotice.title}</h2>
                  <p className="text-xs sm:text-sm text-foreground/70 mt-0.5 line-clamp-1">{viewNotice.body}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-muted-foreground font-bold hidden sm:block">{viewNotice.date}</span>
                <button
                  onClick={() => setViewNotice(null)}
                  className="w-9 h-9 rounded-xl bg-accent border border-border flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal body */}
            <div className="flex-1 overflow-hidden">
              {viewNotice.attachment ? (
                <>
                  {viewNotice.attachment.type === "application/pdf" && (
                    <iframe
                      src={viewNotice.attachment.url}
                      className="w-full h-full border-0"
                      title="PDF Viewer"
                    />
                  )}
                  {viewNotice.attachment.type.startsWith("image/") && (
                    <div className="w-full h-full flex items-center justify-center bg-muted p-4 overflow-auto">
                      <img
                        src={viewNotice.attachment.url}
                        alt="attachment"
                        className="max-w-full max-h-full object-contain rounded-xl"
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center p-8">
                  <div className="text-center border-2 border-dashed border-border rounded-2xl bg-accent/20 px-10 py-14 max-w-sm w-full">
                    <AlertCircle size={36} className="mx-auto mb-3 text-muted-foreground opacity-30" />
                    <p className="text-sm font-bold text-foreground mb-1">No attachment</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{viewNotice.body}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
