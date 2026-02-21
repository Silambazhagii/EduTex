"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MessageCircle, Send, Users, Shield, 
  Hash, Search, MoreVertical, Phone, Image as ImageIcon,
  Paperclip, Smile
} from "lucide-react"

// --- Dummy Data ---
const CONTACTS = [
  { id: "c1", name: "Squad 50 - Core", type: 'group', unread: 3, last: "Anjali: Did anyone finish the SQL lab?", time: "10:24 AM", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
  { id: "c2", name: "Leela Krishna (Mentor)", type: 'direct', unread: 1, last: "Let's review your product pitch.", time: "Yesterday", icon: Shield, color: "text-amber-500", bg: "bg-amber-500/10" },
  { id: "c3", name: "Hackathon Team Alpha", type: 'group', unread: 0, last: "We need to submit the deck by 5 PM.", time: "Tuesday", icon: Hash, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { id: "c4", name: "Uni Announcements", type: 'channel', unread: 12, last: "Campus closed for maintenance.", time: "Mar 10", icon: Shield, color: "text-blue-500", bg: "bg-blue-500/10" },
]

const MESSAGES = [
  { id: "m1", sender: "Anjali", text: "Hey guys! Did anyone finish the SQL lab?", time: "10:20 AM", me: false },
  { id: "m2", sender: "Kopperun", text: "Yeah, I just pushed it to GitHub. Ensure you use inner joins for step 3.", time: "10:22 AM", me: true },
  { id: "m3", sender: "Ravi", text: "Thanks Kopperun! The inner join tip saved me.", time: "10:23 AM", me: false },
  { id: "m4", sender: "Anjali", text: "Awesome. Submitting now!", time: "10:24 AM", me: false },
]

export default function ChatPage() {
  const [activeContact, setActiveContact] = React.useState(CONTACTS[0].id)
  const contact = CONTACTS.find(c => c.id === activeContact)

  return (
    <div className="flex h-[calc(100vh-12rem)] min-h-[600px] bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
      
      {/* Sidebar List */}
      <div className="w-full sm:w-80 border-r border-border bg-accent/20 flex flex-col shrink-0">
          <div className="p-5 border-b border-border/50">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center border border-indigo-500/20">
                   <MessageCircle size={16} />
                </div>
                <h1 className="font-black text-lg text-foreground">Ping</h1>
             </div>
             
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search chats..." 
                  className="w-full h-9 pl-9 pr-4 rounded-full border border-border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto w-full">
             {CONTACTS.map(c => (
                <button 
                  key={c.id} 
                  onClick={() => setActiveContact(c.id)}
                  className={`w-full flex items-center gap-3 p-4 border-b border-border/40 transition-all text-left ${activeContact === c.id ? 'bg-primary/5 hover:bg-primary/10 relative' : 'hover:bg-accent/40'}`}
                >
                   {activeContact === c.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}
                   
                   <div className={`w-12 h-12 shrink-0 rounded-2xl ${c.bg} ${c.color} border border-border flex items-center justify-center`}>
                      <c.icon size={20} />
                   </div>
                   
                   <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                         <span className="text-sm font-black text-foreground truncate">{c.name}</span>
                         <span className="text-[10px] font-bold text-muted-foreground">{c.time}</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-xs font-semibold text-muted-foreground truncate">{c.last}</span>
                         {c.unread > 0 && <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-black">{c.unread}</span>}
                      </div>
                   </div>
                </button>
             ))}
          </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-background hidden sm:flex flex-col relative">
         {/* Detail Header */}
         <div className="h-[76px] border-b border-border/50 bg-card/50 flex items-center justify-between px-6 shrink-0 relative z-10">
            <div className="flex items-center gap-4">
               {contact && (
                  <div className={`w-10 h-10 rounded-xl ${contact.bg} ${contact.color} border border-border flex items-center justify-center`}>
                     <contact.icon size={18} />
                  </div>
               )}
               <div>
                  <h2 className="text-base font-black text-foreground">{contact?.name}</h2>
                  <p className="text-[10px] uppercase font-black tracking-widest text-emerald-500">Online</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <Phone size={18} className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
               <MoreVertical size={18} className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
            </div>
         </div>

         {/* Chat Bubbles */}
         <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 relative">
             <div className="absolute inset-0 max-w-lg mx-auto bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
             
             {MESSAGES.map((msg, i) => (
                <div key={msg.id} className={`flex flex-col max-w-[70%] relative z-10 ${msg.me ? 'self-end items-end' : 'self-start items-start'}`}>
                   {!msg.me && <span className="text-[10px] font-black uppercase text-muted-foreground mb-1 ml-1">{msg.sender}</span>}
                   <div className={`py-2 px-4 rounded-2xl text-sm font-semibold shadow-sm ${msg.me ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-card border border-border text-foreground rounded-bl-sm'}`}>
                      {msg.text}
                   </div>
                   <span className="text-[9px] font-bold text-muted-foreground mt-1 mx-1">{msg.time}</span>
                </div>
             ))}
         </div>

         {/* Composer */}
         <div className="p-4 border-t border-border/50 bg-card shrink-0 relative z-10">
            <div className="flex items-center gap-3 bg-background border border-border rounded-2xl px-4 py-2 hover:border-primary/40 transition-colors focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/20">
               <button className="text-muted-foreground hover:text-primary transition-colors"><Smile size={20} /></button>
               <input 
                 type="text" 
                 placeholder="Send a message..." 
                 className="flex-1 h-10 bg-transparent outline-none text-sm font-medium text-foreground placeholder:text-muted-foreground"
               />
               <button className="text-muted-foreground hover:text-primary transition-colors"><Paperclip size={20} /></button>
               <button className="text-muted-foreground hover:text-primary transition-colors"><ImageIcon size={20} /></button>
               <div className="w-px h-6 bg-border mx-1" />
               <button className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform shadow-md">
                 <Send size={16} className="ml-0.5" />
               </button>
            </div>
         </div>
      </div>
    </div>
  )
}
