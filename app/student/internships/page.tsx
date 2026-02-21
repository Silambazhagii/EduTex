"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  GraduationCap, Briefcase, MapPin, 
  Building2, CalendarClock, ChevronRight,
  ExternalLink
} from "lucide-react"

// --- Dummy Data ---
const JOBS = [
  { id: "j1", company: "Google", role: "Software Engineering Intern", loc: "Bangalore (Hybrid)", stipend: "₹1,00,000/mo", status: "Interviewing", type: "Summer 2026", color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: "j2", company: "Razorpay", role: "Product Engineering Intern", loc: "Remote", stipend: "₹65,000/mo", status: "Applied", type: "6 Months", color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { id: "j3", company: "Zomato", role: "Frontend Developer Trainee", loc: "Gurgaon", stipend: "₹45,000/mo", status: "Offered", type: "Summer 2026", color: "text-rose-500", bg: "bg-rose-500/10" },
  { id: "j4", company: "Infosys", role: "Systems Engineer Trainee", loc: "Mysore", stipend: "₹25,000/mo", status: "Rejected", type: "Full Time", color: "text-emerald-500", bg: "bg-emerald-500/10" },
]

export default function InternshipsPage() {
  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      
      {/* Banner */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="card !p-8 bg-gradient-to-br from-card to-orange-500/10 overflow-hidden relative shadow-sm border-border">
        <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center text-orange-600 shadow-inner">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 bg-background border border-border rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm text-foreground">
                Career Hub
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-2 text-foreground">My Internships</h1>
            <p className="text-sm font-semibold text-muted-foreground max-w-xl">
              Track your campus placement applications, view upcoming interviews, and manage offers.
            </p>
          </div>

          <div className="flex gap-4">
             <div className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center justify-center min-w-28 shadow-sm">
                 <Briefcase className="w-6 h-6 text-orange-500 mb-2" />
                 <span className="text-xl font-black">4</span>
                 <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mt-1">Total Applied</span>
             </div>
             <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 flex flex-col items-center justify-center min-w-28 shadow-sm ring-1 ring-orange-500/10">
                 <Building2 className="w-6 h-6 text-orange-600 dark:text-orange-400 mb-2" />
                 <span className="text-xl font-black text-orange-600 dark:text-orange-400">1</span>
                 <span className="text-[10px] uppercase font-black tracking-widest text-orange-600/80 dark:text-orange-400/80 mt-1">Active Offers</span>
             </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
         {/* Application Tracker Canvas */}
         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card !p-0 overflow-hidden flex flex-col min-h-[500px]">
             
            <div className="flex justify-between items-center p-6 border-b border-border/50 bg-accent/20">
               <h2 className="text-lg font-black text-foreground">Application Tracker</h2>
               <button className="text-xs font-bold bg-primary text-primary-foreground px-4 py-2 rounded-xl shadow-md flex items-center gap-2 hover:bg-primary/90 transition-colors">
                 <ExternalLink size={14} /> Job Board
               </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 bg-background/50 flex-1 overflow-x-auto">
               
               {['Applied', 'Interviewing', 'Offered', 'Rejected'].map((colStatus) => {
                  const colJobs = JOBS.filter(j => j.status === colStatus)
                  
                  return (
                     <div key={colStatus} className="flex flex-col min-w-[280px]">
                        <div className="flex items-center justify-between mb-4">
                           <span className="text-xs font-black uppercase tracking-widest text-foreground opacity-80">{colStatus}</span>
                           <span className="w-6 h-6 rounded-lg bg-accent border border-border flex items-center justify-center text-[10px] font-black">{colJobs.length}</span>
                        </div>

                        <div className="flex flex-col gap-4">
                           {colJobs.map(job => (
                              <div key={job.id} className="p-5 bg-card rounded-2xl border border-border/60 shadow-sm hover:border-primary/40 hover:shadow-md transition-all cursor-pointer group">
                                 <div className="flex justify-between items-start mb-3">
                                    <div className={`w-10 h-10 rounded-xl ${job.bg} ${job.color} flex items-center justify-center text-lg font-black shrink-0`}>
                                       {job.company.charAt(0)}
                                    </div>
                                    <button className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary pt-1">
                                       <ChevronRight size={16} />
                                    </button>
                                 </div>
                                 <h4 className="font-black text-foreground text-sm group-hover:text-primary transition-colors leading-tight mb-1">{job.role}</h4>
                                 <p className="text-xs font-bold text-muted-foreground mb-4">{job.company}</p>
                                 
                                 <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                                       <MapPin size={12} className="shrink-0" /> {job.loc}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                                       <CalendarClock size={12} className="shrink-0" /> {job.type}
                                    </div>
                                 </div>
                                 
                                 <div className="pt-3 border-t border-border/50 flex justify-between items-center">
                                    <span className="bg-accent px-2 py-1 flex rounded text-[9px] font-black uppercase tracking-widest text-foreground">{job.stipend}</span>
                                 </div>
                              </div>
                           ))}

                           {colJobs.length === 0 && (
                              <div className="p-4 border-2 border-dashed border-border/60 rounded-2xl flex flex-col items-center justify-center text-center opacity-60 bg-transparent h-32">
                                 <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Empty Pipeline</p>
                              </div>
                           )}
                        </div>
                     </div>
                  )
               })}
            </div>
         </motion.div>
      </div>

    </div>
  )
}
