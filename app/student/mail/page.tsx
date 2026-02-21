"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Mail, Inbox, Send, Archive, Star, 
  Search, Paperclip, Reply, MoreHorizontal
} from "lucide-react"

// --- Dummy Data ---
type Email = {
  id: string
  sender: string
  subject: string
  preview: string
  time: string
  unread: boolean
  starred: boolean
  type: 'University' | 'Faculty' | 'System'
  body: string
}

const EMAILS: Email[] = [
  {
    id: "e1",
    sender: "Placement Cell",
    subject: "Upcoming Tech Recruitment Drive - Google 2026",
    preview: "Please find the attached prerequisites for the upcoming recruitment process...",
    time: "10:30 AM",
    unread: true,
    starred: true,
    type: "University",
    body: "Dear Students,\n\nWe are pleased to announce that Google will be visiting the campus for the 2026 placement drive. The eligibility criteria require a minimum CGPA of 8.0.\n\nPlease ensure your HackerRank and Leetcode profiles in the Dojo are updated by Friday.\n\nRegards,\nPlacement Coordinator."
  },
  {
    id: "e2",
    sender: "Prof. Anjali Sharma",
    subject: "Rescheduled: Operating Systems Lab",
    preview: "The lab session scheduled for this afternoon has been moved to Thursday.",
    time: "Yesterday",
    unread: true,
    starred: false,
    type: "Faculty",
    body: "Hi everyone,\n\nDue to unforeseen server maintenance, today's OS lab is postponed to Thursday 2 PM. Please utilize this time to complete the pending Assignment 3.\n\nBest,\nProf. Sharma"
  },
  {
    id: "e3",
    sender: "Library System",
    subject: "Overdue Notice: Clean Code",
    preview: "The book 'Clean Code by Robert C. Martin' is overdue by 2 days.",
    time: "Mar 12",
    unread: false,
    starred: false,
    type: "System",
    body: "Automated Notice:\n\nYou have an overdue item in your library inventory.\nBook Title: Clean Code\nDue Date: Mar 10\n\nPlease return the item to the central desk to avoid further late fees."
  },
  {
    id: "e4",
    sender: "Dean of Academics",
    subject: "Semester 6 Registration Guidelines",
    preview: "Read carefully before selecting your electives for the upcoming term.",
    time: "Mar 05",
    unread: false,
    starred: true,
    type: "University",
    body: "Students,\n\nThe portal for Semester 6 electives is now open. Refer to the attached PDF for the full list of offered specialized tracks. Note that the AI & ML track has a cap of 60 students and will be allocated on a first-come-first-serve basis.\n\nRegards,\nAdmin Office."
  }
]

export default function MailPage() {
  const [activeTab, setActiveTab] = React.useState('inbox')
  const [activeEmailId, setActiveEmailId] = React.useState<string | null>(EMAILS[0].id)
  
  const activeEmail = EMAILS.find(e => e.id === activeEmailId)

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] min-h-[600px] bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
      
      {/* MailToolbar */}
      <div className="h-16 border-b border-border/50 bg-accent/20 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3 text-foreground">
             <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20">
                <Mail size={16} />
             </div>
             <h1 className="font-black text-lg">Student Mail</h1>
          </div>
          
          <div className="relative w-64 md:w-80 hidden sm:block">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
             <input 
               type="text" 
               placeholder="Search inbox..." 
               className="w-full h-9 pl-9 pr-4 rounded-full border border-border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
             />
          </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
         {/* Left Sidebar (Folders) */}
         <div className="w-48 border-r border-border/50 bg-background/50 p-4 hidden lg:flex flex-col gap-1">
            <button onClick={() => setActiveTab('inbox')} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'inbox' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}>
               <Inbox size={16} /> Inbox <div className="ml-auto bg-background/20 px-1.5 rounded text-[10px]">{EMAILS.filter(e=>e.unread).length}</div>
            </button>
            <button onClick={() => setActiveTab('starred')} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'starred' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}>
               <Star size={16} /> Starred
            </button>
            <button onClick={() => setActiveTab('sent')} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'sent' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}>
               <Send size={16} /> Sent
            </button>
            <button onClick={() => setActiveTab('archive')} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'archive' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}>
               <Archive size={16} /> Archive
            </button>
         </div>

         {/* Middle Column (Email List) */}
         <div className="w-full lg:w-80 border-r border-border/50 bg-card overflow-y-auto flex flex-col shrink-0">
            {EMAILS.map((email) => {
               const isActive = email.id === activeEmailId
               const tagColors = email.type === 'University' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' : 
                                 email.type === 'Faculty' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 
                                 'bg-amber-500/10 text-amber-600 border-amber-500/20'

               return (
                  <button 
                    key={email.id} 
                    onClick={() => setActiveEmailId(email.id)}
                    className={`text-left p-4 border-b border-border/40 transition-all outline-none ${isActive ? 'bg-accent/40 border-l-4 border-l-primary' : 'hover:bg-accent/20 border-l-4 border-l-transparent'}`}
                  >
                     <div className="flex justify-between items-start mb-1.5">
                        <div className="flex items-center gap-2">
                           {email.unread && <div className="w-2 h-2 rounded-full bg-primary" />}
                           <span className={`text-sm font-black truncate max-w-[140px] ${email.unread ? 'text-foreground' : 'text-muted-foreground'}`}>{email.sender}</span>
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground">{email.time}</span>
                     </div>
                     <div className="text-xs font-bold text-foreground line-clamp-1 mb-1">{email.subject}</div>
                     <div className="text-[11px] font-semibold text-muted-foreground line-clamp-2 mb-3">{email.preview}</div>
                     <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 rounded border text-[9px] font-black uppercase tracking-widest ${tagColors}`}>{email.type}</span>
                        {email.starred && <Star size={12} className="text-amber-400 fill-amber-400" />}
                     </div>
                  </button>
               )
            })}
         </div>

         {/* Right Column (Message View) */}
         <div className="flex-1 bg-background hidden md:flex flex-col relative overflow-hidden">
            {activeEmail ? (
               <AnimatePresence mode="wait">
                  <motion.div key={activeEmail.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col h-full">
                     {/* Message Header */}
                     <div className="p-6 border-b border-border/50 bg-card/30">
                        <div className="flex justify-between items-start mb-6">
                           <h2 className="text-2xl font-black text-foreground max-w-xl leading-tight">{activeEmail.subject}</h2>
                           <div className="flex items-center gap-2">
                              <button className="w-8 h-8 rounded-lg hover:bg-accent flex items-center justify-center text-muted-foreground transition-colors"><Reply size={16} /></button>
                              <button className="w-8 h-8 rounded-lg hover:bg-accent flex items-center justify-center text-muted-foreground transition-colors"><Star size={16} className={activeEmail.starred ? "text-amber-400 fill-amber-400" : ""} /></button>
                              <button className="w-8 h-8 rounded-lg hover:bg-accent flex items-center justify-center text-muted-foreground transition-colors"><MoreHorizontal size={16} /></button>
                           </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-accent border border-border flex items-center justify-center text-lg font-black text-muted-foreground">
                                 {activeEmail.sender.charAt(0)}
                              </div>
                              <div>
                                 <div className="text-sm font-bold text-foreground">{activeEmail.sender}</div>
                                 <div className="text-xs font-semibold text-muted-foreground">to me • {activeEmail.time}</div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Message Body */}
                     <div className="flex-1 p-8 overflow-y-auto">
                        <div className="prose prose-sm dark:prose-invert max-w-none prose-p:font-medium prose-p:leading-relaxed text-foreground whitespace-pre-wrap font-sans">
                           {activeEmail.body}
                        </div>

                        {activeEmail.id === "e1" && (
                           <div className="mt-8 p-4 rounded-xl border border-border bg-accent/30 w-64 flex items-center gap-3 cursor-pointer hover:bg-accent transition-colors">
                              <div className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center"><Paperclip size={18} /></div>
                              <div>
                                 <div className="text-sm font-bold text-foreground">google_reqs.pdf</div>
                                 <div className="text-[10px] font-semibold text-muted-foreground">1.2 MB</div>
                              </div>
                           </div>
                        )}
                     </div>

                     {/* Reply Box Placeholder */}
                     <div className="p-4 border-t border-border/50 bg-card">
                        <div className="w-full bg-background border border-border rounded-xl p-3 flex items-center gap-3 cursor-text text-muted-foreground">
                           <Reply size={16} /> <span className="text-sm font-semibold">Click here to reply...</span>
                        </div>
                     </div>
                  </motion.div>
               </AnimatePresence>
            ) : (
               <div className="flex-1 flex flex-col items-center justify-center opacity-40">
                  <Mail size={48} className="mb-4" />
                  <p className="font-bold">Select an email to read</p>
               </div>
            )}
         </div>
      </div>
    </div>
  )
}
