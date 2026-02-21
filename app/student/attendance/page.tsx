"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  IdCard, Activity, CalendarDays,
  FileX, UserCheck
} from "lucide-react"

// --- Dummy Data ---
const userData = {
  overallPct: 84.5,
  totalClasses: 120,
  attended: 101,
  missed: 19,
}

const subjects = [
  { id: "s1", name: "Operating Systems",  attended: 24, total: 30, pct: 80, req: 75, color: "text-blue-500", stroke: "stroke-blue-500", fill: "bg-blue-500/10", border: "border-blue-500/20" },
  { id: "s2", name: "Data Structures",  attended: 28, total: 30, pct: 93, req: 75, color: "text-purple-500", stroke: "stroke-purple-500", fill: "bg-purple-500/10", border: "border-purple-500/20" },
  { id: "s3", name: "DBMS Concepts",  attended: 21, total: 30, pct: 70, req: 75, color: "text-rose-500", stroke: "stroke-rose-500", fill: "bg-rose-500/10", border: "border-rose-500/20", alert: true },
  { id: "s4", name: "Software Eng",  attended: 28, total: 30, pct: 93, req: 75, color: "text-emerald-500", stroke: "stroke-emerald-500", fill: "bg-emerald-500/10", border: "border-emerald-500/20" },
]

export default function AttendancePage() {
  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      
      {/* Banner */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="card !p-8 bg-gradient-to-br from-card to-cyan-500/10 overflow-hidden relative shadow-sm border-border">
        <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-600 shadow-inner">
                <IdCard className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 bg-background border border-border rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm text-foreground">
                Attendance Hub
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-2 text-foreground">My Attendance</h1>
            <p className="text-sm font-semibold text-muted-foreground max-w-xl">
              Monitor your session presence across all subjects and ensure you meet the 75% university requirement.
            </p>
          </div>

          <div className="flex gap-4">
             <div className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center justify-center min-w-28 shadow-sm">
                 <UserCheck className="w-6 h-6 text-foreground mb-2" />
                 <span className="text-xl font-black">{userData.attended}/{userData.totalClasses}</span>
                 <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mt-1">Sessions</span>
             </div>
             <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4 flex flex-col items-center justify-center min-w-28 shadow-sm ring-1 ring-cyan-500/10">
                 <Activity className="w-6 h-6 text-cyan-600 dark:text-cyan-400 mb-2" />
                 <span className="text-xl font-black text-cyan-600 dark:text-cyan-400">{userData.overallPct}%</span>
                 <span className="text-[10px] uppercase font-black tracking-widest text-cyan-600/80 dark:text-cyan-400/80 mt-1">Overall</span>
             </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {subjects.map((sub, i) => (
            <motion.div key={sub.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`card !p-6 flex flex-col items-center relative ${sub.alert ? 'border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.1)] hover:border-rose-500/50' : 'hover:border-primary/30'} flex justify-between`}>
               {sub.alert && (
                  <div className="absolute top-0 right-0 p-3">
                     <span className="px-2 py-0.5 bg-rose-500 text-white text-[9px] font-black uppercase tracking-widest rounded shadow-sm">Warning</span>
                  </div>
               )}

               <h3 className="text-sm font-black text-foreground text-center mb-6 px-4">{sub.name}</h3>

               {/* Ring Chart */}
               <div className="relative w-32 h-32 mb-6 shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                     <circle cx="64" cy="64" r="56" fill="transparent" strokeWidth="12" className="stroke-accent" />
                     <circle cx="64" cy="64" r="56" fill="transparent" strokeWidth="12" className={sub.stroke} strokeLinecap="round" strokeDasharray={`${(sub.pct / 100) * 351.8} 351.8`} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className={`text-2xl font-black ${sub.alert ? 'text-rose-500' : 'text-foreground'}`}>{sub.pct}%</span>
                  </div>
               </div>

               <div className="w-full bg-accent/20 border border-border/50 rounded-xl p-3 flex justify-between shrink-0">
                  <div className="text-center">
                     <span className="block text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-0.5">Attended</span>
                     <span className="text-sm font-black text-foreground">{sub.attended}</span>
                  </div>
                  <div className="w-px bg-border/50" />
                  <div className="text-center">
                     <span className="block text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-0.5">Missed</span>
                     <span className={`text-sm font-black ${sub.total - sub.attended > 5 ? 'text-rose-500' : 'text-foreground'}`}>{sub.total - sub.attended}</span>
                  </div>
                  <div className="w-px bg-border/50" />
                  <div className="text-center">
                     <span className="block text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-0.5">Total</span>
                     <span className="text-sm font-black text-foreground">{sub.total}</span>
                  </div>
               </div>

               <button className="w-full mt-4 py-2 bg-background border border-border text-xs font-bold text-foreground hover:bg-accent rounded-xl transition-all shadow-sm">
                  View Log
               </button>
            </motion.div>
         ))}
      </div>

    </div>
  )
}
