"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  ClipboardCheck, TrendingUp, Download, 
  Award, Target, AlertCircle
} from "lucide-react"

// --- Dummy Data ---
const userData = {
  cgpa: 8.42,
  sgpa: 8.60,
  term: "Semester 5 (Completed)",
}

const subjects = [
  { id: "s1", code: "BCA301", name: "Operating Systems", credits: 4, internal: 38, external: 49, total: 87, grade: "A+", points: 10, status: "Pass" },
  { id: "s2", code: "BCA302", name: "Data Structures", credits: 4, internal: 35, external: 42, total: 77, grade: "A", points: 9, status: "Pass" },
  { id: "s3", code: "BCA303", name: "DBMS Concepts", credits: 4, internal: 30, external: 35, total: 65, grade: "B+", points: 8, status: "Pass" },
  { id: "s4", code: "BCA304", name: "Software Engineering", credits: 3, internal: 34, external: 40, total: 74, grade: "A", points: 9, status: "Pass" },
  { id: "s5", code: "BCAL31", name: "OS & DS Lab", credits: 2, internal: 45, external: 48, total: 93, grade: "O", points: 10, status: "Distinction" },
]

export default function MarkersPage() {
  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      
      {/* Banner */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="card !p-8 bg-gradient-to-br from-card to-emerald-500/10 overflow-hidden relative shadow-sm border-border">
        <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
                <ClipboardCheck className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 bg-background border border-border rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm text-foreground">
                Academic Performance
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-2 text-foreground">Markers & Grades</h1>
            <p className="text-sm font-semibold text-muted-foreground max-w-xl">
              Track your academic trajectory, view detailed grade breakdowns, and download your transcripts.
            </p>
          </div>

          <div className="flex gap-4">
             <div className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center justify-center min-w-28 shadow-sm">
                 <Target className="w-6 h-6 text-primary mb-2" />
                 <span className="text-xl font-black">{userData.sgpa}</span>
                 <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mt-1">Current SGPA</span>
             </div>
             <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex flex-col items-center justify-center min-w-28 shadow-sm ring-1 ring-emerald-500/10">
                 <Award className="w-6 h-6 text-emerald-500 mb-2" />
                 <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{userData.cgpa}</span>
                 <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600/80 dark:text-emerald-400/80 mt-1">Overall CGPA</span>
             </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         
         {/* Results Table */}
         <div className="lg:col-span-9 flex flex-col gap-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card flex-1">
               <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-black text-foreground">{userData.term} Results</h2>
                    <p className="text-xs font-semibold text-muted-foreground">Provisional grading breakdown</p>
                  </div>
                  <button className="text-xs font-bold bg-primary text-primary-foreground px-4 py-2 rounded-xl shadow-md flex items-center gap-2 hover:bg-primary/90 transition-colors">
                    <Download size={14} /> Download PDF
                  </button>
               </div>

               <div className="overflow-x-auto rounded-2xl border border-border">
                  <table className="w-full text-sm text-left">
                     <thead className="bg-accent/40 text-[10px] uppercase font-black tracking-widest text-muted-foreground border-b border-border">
                        <tr>
                           <th className="px-5 py-4">Subject</th>
                           <th className="px-5 py-4 text-center">Cr</th>
                           <th className="px-5 py-4 text-center">Internal (50)</th>
                           <th className="px-5 py-4 text-center">External (50)</th>
                           <th className="px-5 py-4 text-center">Total</th>
                           <th className="px-5 py-4 text-center">Grade</th>
                           <th className="px-5 py-4 text-right">Status</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-border/50">
                        {subjects.map(s => (
                           <tr key={s.id} className="hover:bg-accent/20 transition-colors group">
                              <td className="px-5 py-4">
                                 <div className="font-bold text-foreground">{s.name}</div>
                                 <div className="text-[10px] font-black text-muted-foreground">{s.code}</div>
                              </td>
                              <td className="px-5 py-4 text-center font-bold text-muted-foreground">{s.credits}</td>
                              <td className="px-5 py-4 text-center font-semibold text-foreground/80">{s.internal}</td>
                              <td className="px-5 py-4 text-center font-semibold text-foreground/80">{s.external}</td>
                              <td className="px-5 py-4 text-center font-black text-foreground">{s.total}</td>
                              <td className="px-5 py-4 text-center">
                                 <span className={`px-2.5 py-1 rounded text-xs font-black ${s.grade.startsWith('A') || s.grade === 'O' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary'}`}>
                                    {s.grade}
                                 </span>
                              </td>
                              <td className="px-5 py-4 text-right">
                                 <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{s.status}</span>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               
               <div className="mt-4 p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 flex items-start gap-3">
                  <AlertCircle className="text-rose-500 mt-0.5 shrink-0" size={16} />
                  <p className="text-xs font-semibold text-rose-600/80 dark:text-rose-400/80">
                      These grades are provisional and subject to university moderation. For detailed evaluation rubrics, refer to your Livebooks subject overview.
                  </p>
               </div>
            </motion.div>
         </div>

         {/* Stats */}
         <div className="lg:col-span-3 flex flex-col gap-6">
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="card">
               <h3 className="text-sm font-black text-primary mb-4 flex items-center gap-2"><TrendingUp size={16} /> Analytics</h3>
               
               <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-card to-accent/50 border border-border">
                     <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-1 block">Total Credits Earned</span>
                     <span className="text-2xl font-black text-foreground">104 <span className="text-sm text-muted-foreground">/ 140</span></span>
                     <div className="w-full bg-background rounded-full h-1.5 mt-2 overflow-hidden border border-border/50">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: '74%' }} />
                     </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-card border border-border">
                     <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-1 block">Class Ranking</span>
                     <span className="text-xl font-black text-foreground flex items-end gap-1">Top 12%</span>
                     <p className="text-xs text-muted-foreground font-semibold mt-1">Based on SGPA 8.60</p>
                  </div>
               </div>
            </motion.div>
         </div>

      </div>
    </div>
  )
}
