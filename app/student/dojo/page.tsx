"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  BadgeCheck, Trophy, Target, Zap, 
  Code2, Database, TerminalSquare, 
  ArrowRight, Sparkles, TrendingUp
} from "lucide-react"

// --- Dummy Data ---
const userData = {
  rank: "Gold II",
  points: 12450,
  streak: 14,
  globalPosition: 42
}

const activeChallenges = [
  { id: "c1", title: "React Hooks Mastery", category: "Frontend", difficulty: "Medium", reward: 250, completed: 60, total: 100, icon: Code2, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { id: "c2", title: "Advanced SQL Injection Prevention", category: "Security", difficulty: "Hard", reward: 500, completed: 2, total: 5, icon: Database, color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" },
  { id: "c3", title: "Data Structures: Trees", category: "Core", difficulty: "Medium", reward: 300, completed: 15, total: 20, icon: TerminalSquare, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
]

const recentActivity = [
  { id: "a1", action: "Solved", target: "Binary Search Tree Traversal", time: "2 hours ago", pts: "+50" },
  { id: "a2", action: "Completed Module", target: "Responsive CSS Layouts", time: "1 day ago", pts: "+150" },
  { id: "a3", action: "Daily Login", target: "14 Day Streak Hit!", time: "1 day ago", pts: "+20" },
]

export default function DojoPage() {
  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      
      {/* Header Banner */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="card !p-8 bg-gradient-to-br from-card to-accent/20 overflow-hidden relative shadow-sm border-border">
        <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center text-purple-600 shadow-inner">
                <BadgeCheck className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 bg-background border border-border rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm text-foreground">
                Practice Arena
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-2 text-foreground">The Dojo</h1>
            <p className="text-sm font-semibold text-muted-foreground max-w-xl">
              Sharpen your skills, complete daily challenges, and climb the global leaderboard.
            </p>
          </div>

          <div className="flex gap-4">
             <div className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center justify-center min-w-28 shadow-sm">
                 <Trophy className="w-6 h-6 text-amber-500 mb-2" />
                 <span className="text-xl font-black">{userData.rank}</span>
                 <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mt-1">Tier</span>
             </div>
             <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex flex-col items-center justify-center min-w-28 shadow-sm ring-1 ring-primary/10">
                 <Zap className="w-6 h-6 text-primary animate-pulse mb-2" />
                 <span className="text-xl font-black text-primary">{userData.streak}</span>
                 <span className="text-[10px] uppercase font-black tracking-widest text-primary/80 mt-1">Day Streak</span>
             </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
         
         {/* Main Training Area */}
         <div className="lg:col-span-8 flex flex-col gap-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card flex-1">
               <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-black text-foreground">Active Quests</h2>
                    <p className="text-xs font-semibold text-muted-foreground">Jump back into your assigned training</p>
                  </div>
                  <button className="text-xs font-bold text-primary hover:text-primary/80 flex items-center gap-1">
                    Explore All <ArrowRight size={14} />
                  </button>
               </div>

               <div className="grid gap-4">
                  {activeChallenges.map(c => (
                     <div key={c.id} className="p-5 rounded-2xl border border-border/60 bg-accent/20 hover:bg-card hover:border-primary/30 transition-all group flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                        <div className={`w-14 h-14 shrink-0 rounded-2xl ${c.bg} ${c.border} border flex items-center justify-center ${c.color} group-hover:scale-105 transition-transform`}>
                           <c.icon size={24} strokeWidth={2} />
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-0.5 bg-background border border-border rounded text-[9px] font-black uppercase tracking-widest">{c.category}</span>
                              <span className={`text-[10px] font-black uppercase tracking-widest ${c.difficulty === 'Hard' ? 'text-rose-500' : 'text-amber-500'}`}>{c.difficulty}</span>
                           </div>
                           <h3 className="text-base font-black text-foreground truncate">{c.title}</h3>
                           
                           {/* Progress Bar */}
                           <div className="mt-3">
                              <div className="flex justify-between text-[10px] font-bold text-muted-foreground mb-1.5">
                                 <span>{c.completed} / {c.total} completed</span>
                                 <span className="flex items-center gap-1 text-primary"><Sparkles size={10} /> {c.reward} pts</span>
                              </div>
                              <div className="h-2 bg-background rounded-full overflow-hidden border border-border/50">
                                 <div className="h-full bg-primary rounded-full" style={{ width: `${(c.completed / c.total) * 100}%` }} />
                              </div>
                           </div>
                        </div>
                        <div className="shrink-0 w-full sm:w-auto">
                           <button className="w-full sm:w-auto px-6 py-2.5 bg-background border border-border rounded-xl text-xs font-black shadow-sm group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                              Continue
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </motion.div>
         </div>

         {/* Sidebar Stats */}
         <div className="lg:col-span-4 flex flex-col gap-6">
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="card">
               <h3 className="text-sm font-black text-primary mb-4 flex items-center gap-2"><Target size={16} /> Leaderboard</h3>
               <div className="p-4 rounded-2xl bg-gradient-to-br from-card to-accent/50 border border-border">
                  <div className="flex items-end justify-between mb-4">
                     <span className="text-3xl font-black text-foreground">{userData.points.toLocaleString()}</span>
                     <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-1">Total XP</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-background rounded-xl border border-border/50">
                     <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-black text-xs border border-emerald-500/20">#{userData.globalPosition}</div>
                     <div className="flex-1">
                        <div className="text-xs font-bold">Global Rank</div>
                        <div className="text-[10px] text-muted-foreground font-semibold">Top 5% of your cohort</div>
                     </div>
                     <TrendingUp size={16} className="text-emerald-500" />
                  </div>
               </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="card flex-1">
               <h3 className="text-sm font-black text-foreground mb-4">Recent Activity</h3>
               <div className="space-y-4">
                  {recentActivity.map(act => (
                     <div key={act.id} className="flex gap-3 relative">
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5 absolute left-[-4px]" />
                        <div className="pl-3 border-l-2 border-border/50 flex-1 pb-2">
                           <div className="flex justify-between items-start mb-0.5">
                              <span className="text-xs font-black text-foreground">{act.action}</span>
                              <span className="text-xs font-black text-primary bg-primary/10 px-1.5 rounded">{act.pts}</span>
                           </div>
                           <p className="text-[11px] font-semibold text-muted-foreground leading-tight">{act.target}</p>
                           <p className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-wider mt-1.5">{act.time}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </motion.div>
         </div>

      </div>
    </div>
  )
}
