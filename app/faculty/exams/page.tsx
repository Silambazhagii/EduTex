"use client";

import { motion } from "framer-motion";
import { GraduationCap, CalendarDays, Plus } from "lucide-react";
import { useState } from "react";

const mockExams = [
  { id: 1, title: "Midterm - Agile Strategies", date: "Feb 28, 2026", duration: "120 mins", enrolled: 45, status: "Upcoming" },
  { id: 2, title: "Final Lab - SQL Normalization", date: "Mar 15, 2026", duration: "180 mins", enrolled: 38, status: "Scheduled" },
  { id: 3, title: "Pop Quiz - AI Ethics", date: "Jan 10, 2026", duration: "45 mins", enrolled: 120, status: "Completed" },
];

export default function ExamsPage() {
  const [exams, setExams] = useState(mockExams);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Examinations</h1>
          <p className="text-muted-foreground mt-1">Schedule and manage course assessments.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary/90 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Create Exam
        </button>
      </div>

      {isAdding && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-card border border-border/60 rounded-3xl p-6 mb-8">
           <p className="text-muted-foreground text-sm font-bold mb-4">Exam creation is simplified for this demo.</p>
           <button onClick={() => {
             setExams([{ id: Date.now(), title: "New Mock Exam", date: "Apr 01, 2026", duration: "90 mins", enrolled: 0, status: "Upcoming" }, ...exams]);
             setIsAdding(false);
           }} className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-bold shadow-sm">Save Mock Exam</button>
        </motion.div>
      )}

      <div className="grid gap-4">
        {exams.map((exam, i) => (
          <motion.div 
            key={exam.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border/60 rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-border transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${exam.status === 'Completed' ? 'bg-accent/50 text-muted-foreground' : 'bg-accent text-accent-foreground'}`}>
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold tracking-tight">{exam.title}</h3>
                <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground mt-1">
                  <span className={`uppercase tracking-widest px-2 py-0.5 rounded-md ${exam.status === 'Upcoming' ? 'bg-destructive/10 text-destructive' : 'bg-accent text-foreground'}`}>
                    {exam.status}
                  </span>
                  <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3" /> {exam.date}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 sm:ml-auto">
              <div className="text-center sm:text-right">
                <span className="block text-xl font-black">{exam.enrolled}</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Students</span>
              </div>
              <div className="text-center sm:text-right">
                <span className="block text-xl font-black">{exam.duration}</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Duration</span>
              </div>
            </div>
            
          </motion.div>
        ))}
      </div>
    </div>
  );
}
