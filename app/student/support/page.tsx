"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  LifeBuoy, CheckCircle2, Clock, Info, 
  MessageSquarePlus, AlertCircle, ChevronRight,
  ShieldCheck, Wifi
} from "lucide-react"

export default function SupportPage() {
  const [activeTab, setActiveTab] = React.useState('active')

  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      
      {/* Banner */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="card !p-8 bg-gradient-to-br from-card to-teal-500/10 overflow-hidden relative shadow-sm border-border">
        <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-teal-500/20 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/20 rounded-2xl flex items-center justify-center text-teal-600 shadow-inner">
                <LifeBuoy className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 bg-background border border-border rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm text-foreground">
                Assistance Hub
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-2 text-foreground">Support & Tickets</h1>
            <p className="text-sm font-semibold text-muted-foreground max-w-xl">
              Report campus issues, manage IT requests, and browse FAQs to quickly unblock your learning.
            </p>
          </div>

          <button className="bg-primary text-primary-foreground px-6 py-4 rounded-2xl font-black shadow-md hover:bg-primary/90 hover:scale-105 transition-all text-sm flex items-center gap-2">
             <MessageSquarePlus size={18} /> New Ticket
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
         
         {/* Main Ticketing Board */}
         <div className="md:col-span-8 flex flex-col gap-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card !p-0 flex-1 overflow-hidden">
               <div className="flex overflow-x-auto gap-1 p-3 bg-accent/30 border-b border-border/50 items-center">
                  {["active", "resolved"].map((tab) => (
                     <button
                       key={tab}
                       onClick={() => setActiveTab(tab)}
                       className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                          activeTab === tab ? "bg-background shadow-md text-foreground border border-border" : "text-muted-foreground hover:text-foreground"
                       }`}
                     >
                        {tab === 'active' ? 'Active Issues (2)' : 'Past Records (5)'}
                     </button>
                  ))}
               </div>

               <div className="p-6">
                  {activeTab === 'active' && (
                     <div className="grid gap-4">
                        <div className="p-5 rounded-2xl border border-border/60 bg-card hover:border-primary/40 transition-colors cursor-pointer group shadow-sm flex flex-col sm:flex-row justify-between gap-4">
                           <div className="flex gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center shrink-0">
                                 <AlertCircle size={20} />
                              </div>
                              <div>
                                 <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-black text-amber-500 bg-amber-500/10 px-2 rounded uppercase tracking-widest">In Progress</span>
                                    <span className="text-[10px] font-bold text-muted-foreground">ID: #EDX-4091</span>
                                 </div>
                                 <h3 className="text-sm font-black text-foreground group-hover:text-primary transition-colors">Missing Attendance for DBMS Lab</h3>
                                 <p className="text-xs font-semibold text-muted-foreground mt-1 line-clamp-1">I was present for the lab on Tuesday but my records show an absence...</p>
                              </div>
                           </div>
                           <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest shrink-0 self-start sm:self-center flex items-center gap-1">
                              <Clock size={12}/> Updated 2h ago
                           </div>
                        </div>

                        <div className="p-5 rounded-2xl border border-border/60 bg-card hover:border-primary/40 transition-colors cursor-pointer group shadow-sm flex flex-col sm:flex-row justify-between gap-4">
                           <div className="flex gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center justify-center shrink-0">
                                 <Wifi size={20} />
                              </div>
                              <div>
                                 <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-black text-blue-500 bg-blue-500/10 px-2 rounded uppercase tracking-widest">Open</span>
                                    <span className="text-[10px] font-bold text-muted-foreground">ID: #EDX-4105</span>
                                 </div>
                                 <h3 className="text-sm font-black text-foreground group-hover:text-primary transition-colors">Hostel Block B Wi-Fi Down</h3>
                                 <p className="text-xs font-semibold text-muted-foreground mt-1 line-clamp-1">Router on floor 3 is blinking red, unable to connect to eduroam...</p>
                              </div>
                           </div>
                           <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest shrink-0 self-start sm:self-center flex items-center gap-1">
                              <Clock size={12}/> Opened Yesterday
                           </div>
                        </div>
                     </div>
                  )}

                  {activeTab === 'resolved' && (
                     <div className="p-10 flex flex-col items-center justify-center text-center opacity-60">
                         <CheckCircle2 size={48} className="mb-4 text-muted-foreground" />
                         <p className="font-bold text-lg mb-2 text-foreground">All clear here!</p>
                         <p className="text-sm font-medium text-muted-foreground max-w-sm">No recent resolved issues. Great!</p>
                     </div>
                  )}
               </div>
            </motion.div>
         </div>

         {/* Sidebar FAQs */}
         <div className="md:col-span-4 flex flex-col gap-6">
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="card">
               <h3 className="text-sm font-black text-foreground mb-4 flex items-center gap-2"><Info size={16} className="text-primary"/> Quick Answers</h3>
               <div className="space-y-2">
                  {[
                     "How to apply for make-up exams?",
                     "Where to collect my updated ID card?",
                     "Steps to request a bonafide certificate",
                     "Troubleshooting Dojo compiler issues"
                  ].map((faq, i) => (
                     <button key={i} className="w-full text-left p-3 rounded-xl border border-border/50 bg-accent/20 hover:bg-accent text-sm font-bold text-foreground transition-all flex justify-between items-center group">
                        <span className="truncate">{faq}</span>
                        <ChevronRight size={14} className="text-muted-foreground group-hover:text-primary" />
                     </button>
                  ))}
               </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="card bg-gradient-to-br from-indigo-500/10 to-transparent border-indigo-500/20 relative overflow-hidden">
               <ShieldCheck className="absolute -right-4 -bottom-4 w-24 h-24 text-indigo-500/10 pointer-events-none" />
               <h3 className="text-sm font-black text-indigo-500 mb-2">Emergency Help</h3>
               <p className="text-xs font-semibold text-muted-foreground mb-4 relative z-10">For urgent matters regarding harassment, security, or immediate physical facility issues on campus.</p>
               <button className="w-full py-2.5 rounded-xl border-2 border-indigo-500/30 text-indigo-500 font-bold text-xs bg-indigo-500/5 hover:bg-indigo-500/20 transition-all relative z-10">
                  Dial Campus Security
               </button>
            </motion.div>
         </div>

      </div>
    </div>
  )
}
