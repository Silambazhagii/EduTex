"use client";

import { motion } from "framer-motion";
import { 
  Users, BookOpenCheck, ClipboardCheck, CalendarDays, 
  MessageSquare, FlaskConical, Bell, 
  FileBarChart, GraduationCap, Clock, ArrowUpRight, 
  Sparkles, Activity, CheckCircle2, Search, Play
} from "lucide-react";
import Link from "next/link";
import { useDashboardStore } from "@/lib/store/useDashboardStore";

export default function DashboardOverview() {
  const schedule = useDashboardStore((state) => state.schedule);
  const assignments = useDashboardStore((state) => state.assignments);
  
  const pendingAssignmentsCount = assignments.filter(a => a.status === 'Pending').length;

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-xl">
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent text-accent-foreground border border-border shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Senior Faculty</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-foreground"
          >
            Good morning, <span className="text-primary">Dr. Silambazhagii.</span>
          </motion.h1>
          <motion.p initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="text-sm text-muted-foreground font-medium leading-relaxed">
            Your next highly anticipated lecture is starting in 45 minutes. You have {pendingAssignmentsCount} assignments awaiting your review.
          </motion.p>
        </div>
        
        {/* Quick Actions */}
        <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{delay:0.3}} className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shadow-sm">
            <Search className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-destructive rounded-full" />
          </button>
          <div className="w-9 h-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm border border-border shadow-sm">
            S
          </div>
        </motion.div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[100px] md:auto-rows-[110px] w-full mx-auto">
        
        {/* Main App Block (3 rows) */}
        <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{delay:0.3}} className="md:col-span-8 row-span-3 card card-hover relative overflow-hidden group !p-6 flex flex-col">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-accent to-transparent rounded-full -translate-y-1/2 translate-x-1/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="relative z-10 flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-foreground mb-1">Workspace</h2>
              <p className="text-foreground/80 font-bold text-sm">Quick access tools</p>
            </div>
            <button className="px-4 py-2 bg-background text-foreground border border-border rounded-full text-xs font-bold shadow-sm hover:shadow-md transition-all">Edit Tools</button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 relative z-10 flex-1">
            {[
              {n: "Classes", i: Users, href: "/dashboard/classes"},
              {n: "Assignments", i: BookOpenCheck, href: "/dashboard/assignments"},
              {n: "Attendance", i: ClipboardCheck, href: "/dashboard/attendance"},
              {n: "Research", i: FlaskConical, href: "/dashboard/research"},
              {n: "Calendar", i: CalendarDays, href: "/dashboard/calendar"},
              {n: "Chat", i: MessageSquare, href: "/dashboard/chat"},
              {n: "Exams", i: GraduationCap, href: "/dashboard/exams"},
              {n: "Reports", i: FileBarChart, href: "/dashboard/reports"},
            ].map((item, idx) => (
              <Link href={item.href} key={idx} className="tile flex flex-col items-center justify-center gap-2 hover:shadow-md hover:-translate-y-0.5 hover:bg-background transition-all group/tile !p-3">
                <div className={`w-12 h-12 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center group-hover/tile:scale-110 transition-transform`}>
                  <item.i className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <span className="font-extrabold text-sm tracking-tight text-foreground">{item.n}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Schedule Block (5 rows) */}
        <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{delay:0.4}} className="md:col-span-4 row-span-5 bg-primary text-primary-foreground rounded-3xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.1)] relative overflow-hidden group flex flex-col">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[60px] rounded-full pointer-events-none" />
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6 shrink-0">
              <h2 className="text-xl font-extrabold tracking-tight">Today's Timeline</h2>
              <Link href="/dashboard/calendar" className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors shadow-inner">
                <ArrowUpRight className="w-4 h-4 text-primary-foreground" />
              </Link>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-primary-foreground/20 scrollbar-track-transparent">
              {schedule.map((sch, i) => (
                <div key={sch.id} className={`flex gap-3 ${sch.active ? 'opacity-100' : 'opacity-80 hover:opacity-100'} transition-opacity duration-300`}>
                  <div className="text-right shrink-0 w-12 pt-1">
                    <span className="block text-sm font-extrabold">{sch.time}</span>
                    <span className="block text-xs font-bold opacity-90">{sch.meridiem}</span>
                  </div>
                  <div className="relative flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full mt-1.5 z-10 ${sch.active ? 'bg-background shadow-[0_0_15px_rgba(255,255,255,0.8)]' : 'bg-primary-foreground/50'}`} />
                    {i !== schedule.length - 1 && <div className={`w-0.5 h-[calc(100%+1.5rem)] absolute top-3 ${sch.active ? 'bg-gradient-to-b from-background to-primary-foreground/30' : 'bg-primary-foreground/30'}`} />}
                  </div>
                  <div className={`flex-1 p-4 rounded-2xl border ${sch.active ? 'bg-background/10 border-background/20 backdrop-blur-md' : 'bg-primary-foreground/5 border-primary-foreground/10'}`}>
                    <h4 className="font-extrabold text-sm leading-tight mb-2 text-primary-foreground">{sch.title}</h4>
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-primary-foreground/20 text-[11px] font-extrabold">
                      <Clock className="w-3 h-3" /> {sch.room}
                    </span>
                    {sch.active && (
                      <button className="mt-3 w-full py-2 bg-background text-primary rounded-lg text-xs font-extrabold hover:bg-accent hover:text-accent-foreground transition-colors flex justify-center items-center gap-2 shadow-lg shadow-background/10">
                        Join Now <Play className="w-3 h-3 fill-current" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Action Banner Block (2 rows) */}
        <Link href="/dashboard/assignments" passHref legacyBehavior>
          <motion.a initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{delay:0.5}} className="md:col-span-4 row-span-2 bg-destructive text-destructive-foreground rounded-3xl p-6 shadow-lg relative overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-shadow duration-500">
            <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/20 blur-3xl rounded-full pointer-events-none" />
            <div className="relative z-10 flex justify-between items-start">
              <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center backdrop-blur-md border border-white/20">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="px-3 py-1 bg-black/10 border border-white/20 rounded-full text-[10px] font-extrabold backdrop-blur-md uppercase tracking-widest text-white">Urgent</span>
            </div>
            <div className="relative z-10 text-white mt-2">
              <h3 className="text-xl font-extrabold tracking-tight mb-1">Evaluations</h3>
              <p className="font-bold text-xs leading-snug opacity-95">{pendingAssignmentsCount} assignments strictly due pending.</p>
            </div>
          </motion.a>
        </Link>

        {/* Profile Stats Block (2 rows) */}
        <Link href="/dashboard/reports" passHref legacyBehavior>
          <motion.a initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{delay:0.6}} className="md:col-span-4 row-span-2 card card-hover flex flex-col justify-center relative overflow-hidden group !p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-extrabold text-foreground">Faculty Rating</h3>
              <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-5xl font-black tracking-tighter text-foreground leading-none">4.9</span>
              <span className="text-sm font-extrabold text-foreground/70 mb-1">/ 5.0</span>
            </div>
            <p className="text-xs font-bold text-foreground/80 line-clamp-2">Excellent reviews from the recent BCA cohort.</p>
          </motion.a>
        </Link>
        
      </div>
    </>
  );
}
