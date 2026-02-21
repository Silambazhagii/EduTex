"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Library, Search, BookMarked, ChevronRight,
  BookOpen, Star, Clock, AlertTriangle
} from "lucide-react"

// --- Dummy Data ---
const BOOKS = [
  { id: "b1", title: "Clean Code", author: "Robert C. Martin", type: "Digital", tag: "Recommended", img: "CC", color: "from-blue-500/20 to-indigo-500/20", text: "text-blue-500" },
  { id: "b2", title: "Cracking the Coding Interview", author: "Gayle L. McDowell", type: "Digital", tag: "Popular", img: "CT", color: "from-rose-500/20 to-purple-500/20", text: "text-rose-500" },
  { id: "b3", title: "Design Patterns", author: "Erich Gamma", type: "Physical", tag: "Core", img: "DP", color: "from-amber-500/20 to-orange-500/20", text: "text-amber-500" },
  { id: "b4", title: "Introduction to Algorithms", author: "Thomas H. Cormen", type: "Digital", tag: "Core", img: "IA", color: "from-emerald-500/20 to-teal-500/20", text: "text-emerald-500" },
]

export default function LibraryPage() {
  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      
      {/* Banner */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="card !p-8 bg-gradient-to-br from-card to-yellow-500/10 overflow-hidden relative shadow-sm border-border">
        <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-yellow-500/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex items-center justify-center text-yellow-600 shadow-inner">
                <Library className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 bg-background border border-border rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm text-foreground">
                Digital Library
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-2 text-foreground">Knowledge Base</h1>
            <p className="text-sm font-semibold text-muted-foreground max-w-xl">
              Access curated reading materials, reserve physical copies, and explore technical ebooks.
            </p>
          </div>

          <div className="relative w-full md:w-72">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
             <input 
               type="text" 
               placeholder="Search title, author, isbn..." 
               className="w-full h-12 pl-11 pr-4 rounded-2xl border border-border bg-background shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
             />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
         
         <div className="lg:col-span-8 flex flex-col gap-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card flex-1">
               <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-black text-foreground">Recommended Readings</h2>
                  <button className="text-xs font-bold text-primary hover:text-primary/80 flex items-center gap-1">
                    Browse Catalog <ChevronRight size={14} />
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {BOOKS.map(b => (
                     <div key={b.id} className="p-4 rounded-2xl border border-border/60 bg-accent/20 hover:bg-card hover:border-primary/40 transition-all cursor-pointer group shadow-sm flex items-start gap-4 h-full">
                        <div className={`w-16 h-24 shrink-0 rounded-lg bg-gradient-to-br border border-border/50 flex flex-col items-center justify-center text-xl font-black shadow-inner ${b.color} ${b.text}`}>
                           {b.img}
                        </div>
                        <div className="flex-1 flex flex-col justify-between h-full min-w-0 py-1">
                           <div>
                              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                 <span className="px-1.5 py-0.5 bg-background border border-border rounded text-[9px] font-black uppercase tracking-widest">{b.type}</span>
                                 <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground truncate">{b.tag}</span>
                              </div>
                              <h3 className="font-extrabold text-foreground text-sm group-hover:text-primary transition-colors leading-tight line-clamp-2 mb-1">{b.title}</h3>
                              <p className="text-xs font-semibold text-muted-foreground truncate">{b.author}</p>
                           </div>
                           <div className="mt-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                              <Star className="text-amber-400 w-4 h-4 fill-amber-400" />
                              <button className="p-1.5 bg-background border border-border rounded-md hover:bg-primary/10 text-primary transition-colors">
                                 <BookMarked size={14} />
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </motion.div>
         </div>

         <div className="lg:col-span-4 flex flex-col gap-6">
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="card">
               <h3 className="text-sm font-black text-foreground mb-4">Checked Out</h3>
               
               <div className="p-4 rounded-2xl bg-card border border-border shadow-sm flex flex-col gap-3 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10"><BookOpen size={64}/></div>
                  <div className="flex items-center gap-2 mb-1">
                     <span className="text-[10px] font-black text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded uppercase tracking-widest">Overdue</span>
                  </div>
                  <div className="relative z-10">
                     <h4 className="font-black text-sm text-foreground">Clean Code</h4>
                     <p className="text-xs font-semibold text-muted-foreground">Robert C. Martin</p>
                  </div>
                  
                  <div className="mt-2 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 relative z-10">
                     <AlertTriangle size={18} className="text-rose-500 shrink-0" />
                     <div>
                        <div className="text-[10px] uppercase font-black tracking-widest text-rose-600 dark:text-rose-400">Due: Mar 10</div>
                        <div className="text-xs font-bold text-rose-600/80 dark:text-rose-400/80">Late fee accruing</div>
                     </div>
                  </div>
               </div>
            </motion.div>
         </div>

      </div>
    </div>
  )
}
