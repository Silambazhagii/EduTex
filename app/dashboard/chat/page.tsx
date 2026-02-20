"use client";

import { useState } from "react";
import { Send, UserCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const initialMessages = [
  { id: 1, text: "Hello Professor, regarding the Agile Case Study, is the word limit strictly 1000 words?", sender: "student", time: "10:24 AM" },
  { id: 2, text: "Hi John. A 10% deviation is perfectly fine. Focus on quality over quantity.", sender: "faculty", time: "10:45 AM" },
  { id: 3, text: "Understood, thank you! I will finalize the citations today.", sender: "student", time: "10:47 AM" },
];

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages([...messages, {
      id: Date.now(),
      text: inputText,
      sender: "faculty",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    
    setInputText("");

    // Mock an auto-reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Got it.",
        sender: "student",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-14rem)] relative">
      <div className="mb-4 shrink-0">
        <h1 className="text-3xl font-extrabold tracking-tight">Messages</h1>
        <p className="text-muted-foreground mt-1 text-sm">Real-time student queries and department chats.</p>
      </div>

      <div className="flex-1 bg-card border border-border/60 rounded-3xl shadow-sm flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-border/60 flex items-center gap-3 bg-background/50 backdrop-blur-md">
          <UserCircle2 className="w-10 h-10 text-muted-foreground" />
          <div>
            <h3 className="font-extrabold text-foreground leading-tight">John Doe</h3>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-500">Active</span>
          </div>
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={`flex flex-col ${msg.sender === 'faculty' ? 'items-end' : 'items-start'}`}
            >
              <div className={`px-4 py-3 rounded-2xl max-w-md text-sm font-medium shadow-sm ${
                msg.sender === 'faculty' 
                 ? 'bg-primary text-primary-foreground rounded-br-sm' 
                 : 'bg-accent text-accent-foreground rounded-bl-sm border border-border/60'
              }`}>
                {msg.text}
              </div>
              <span className="text-[10px] font-bold text-muted-foreground mt-1 px-1">{msg.time}</span>
            </motion.div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-background border-t border-border/60">
          <form onSubmit={sendMessage} className="flex gap-2 relative">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Send className="w-5 h-5 ml-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
