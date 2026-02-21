"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Clock, FileText, CheckCircle2, User, Search, Filter } from "lucide-react";

export default function EvaluationsPage() {
  const [evaluations, setEvaluations] = useState([
    { id: 1, student: "Alice Johnson", course: "BCA Software Eng", type: "Project Report", dueDate: "Feb 28", status: "Urgent", submitted: "2 days ago" },
    { id: 2, student: "Bob Smith", course: "BCA Software Eng", type: "Midterm Evaluation", dueDate: "Feb 28", status: "Urgent", submitted: "1 day ago" },
    { id: 3, student: "Charlie Davis", course: "Project Mentoring", type: "Final Thesis", dueDate: "Mar 05", status: "Pending", submitted: "3 days ago" },
    { id: 4, student: "Diana Evans", course: "Research Seminar", type: "Literature Review", dueDate: "Mar 10", status: "Pending", submitted: "5 days ago" },
    { id: 5, student: "Ethan Harris", course: "BCA Software Eng", type: "Project Report", dueDate: "Feb 28", status: "Urgent", submitted: "Just now" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleMarkEvaluated = (id: number) => {
    setEvaluations(evaluations.filter(e => e.id !== id));
  };

  const filteredEvals = evaluations.filter(e => 
    e.student.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 bg-destructive/10 rounded-xl flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5 text-destructive" />
            </div>
            Evaluations
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">Review pending student reports and assessments.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search students..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-card border border-border/60 rounded-xl pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none w-full md:w-64"
            />
          </div>
          <button className="bg-card border border-border/60 w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shadow-sm">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card border border-border/60 rounded-3xl p-5 shadow-sm">
          <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1">Total Pending</p>
          <h3 className="text-3xl font-black tracking-tight">{evaluations.length}</h3>
        </div>
        <div className="bg-destructive/5 border border-destructive/20 rounded-3xl p-5 shadow-sm">
          <p className="text-xs font-bold tracking-widest uppercase text-destructive mb-1">Urgent</p>
          <h3 className="text-3xl font-black tracking-tight text-destructive">
            {evaluations.filter(e => e.status === "Urgent").length}
          </h3>
        </div>
      </div>

      {/* Evaluations List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredEvals.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="py-16 text-center text-muted-foreground bg-card border border-border/60 rounded-3xl shadow-sm"
            >
              <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-emerald-500 opacity-50" />
              <p className="font-bold text-lg">All caught up!</p>
              <p className="text-sm">No pending evaluations at the moment.</p>
            </motion.div>
          ) : (
            filteredEvals.map((evaluation) => (
              <motion.div 
                key={evaluation.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`bg-card border rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-sm hover:shadow-md ${
                  evaluation.status === 'Urgent' ? 'border-destructive/30' : 'border-border/60'
                }`}
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    evaluation.status === 'Urgent' ? 'bg-destructive/10 text-destructive' : 'bg-accent text-accent-foreground'
                  }`}>
                    {evaluation.status === 'Urgent' ? <Activity className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-extrabold tracking-tight">{evaluation.student}</h3>
                      {evaluation.status === 'Urgent' && (
                        <span className="px-2 py-0.5 bg-destructive/10 border border-destructive/20 rounded-full text-[10px] font-black text-destructive uppercase tracking-widest">
                          Urgent
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-muted-foreground">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {evaluation.course}</span>
                      <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {evaluation.type}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Due {evaluation.dueDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:ml-auto">
                  <div className="text-right hidden sm:block">
                    <span className="block text-xs font-bold text-muted-foreground">Submitted</span>
                    <span className="text-sm font-bold">{evaluation.submitted}</span>
                  </div>
                  
                  <button 
                    onClick={() => handleMarkEvaluated(evaluation.id)}
                    className="w-full sm:w-auto bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    Evaluate
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
