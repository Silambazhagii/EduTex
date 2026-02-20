"use client";

import { useState } from "react";
import { useDashboardStore, type Assignment } from "@/lib/store/useDashboardStore";
import { motion } from "framer-motion";
import { BookOpenCheck, CheckCircle2, Clock, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AssignmentsPage() {
  const router = useRouter();
  const { assignments, addAssignment, markAssignmentReviewed } = useDashboardStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newAssignment, setNewAssignment] = useState<Partial<Assignment>>({});

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAssignment.title && newAssignment.classCode && newAssignment.dueDate) {
      addAssignment({
        id: Date.now().toString(),
        title: newAssignment.title,
        classCode: newAssignment.classCode,
        dueDate: newAssignment.dueDate,
        status: 'Pending',
        submissions: 0,
        totalStudents: newAssignment.totalStudents || 30, // Mock default
        submissionList: []
      } as Assignment);
      setIsAdding(false);
      setNewAssignment({});
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Assignments</h1>
          <p className="text-muted-foreground mt-1">Manage courseworks and track student submissions.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary/90 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create Assignment
        </button>
      </div>

      {isAdding && (
        <motion.form 
          initial={{ opacity: 0, height: 0 }} 
          animate={{ opacity: 1, height: 'auto' }} 
          className="bg-card border border-border/60 rounded-3xl p-6 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
          onSubmit={handleAdd}
        >
          <input type="text" placeholder="Assignment Title" required className="bg-background border border-border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none" onChange={e => setNewAssignment({...newAssignment, title: e.target.value})} />
          <input type="text" placeholder="Class Code (e.g. CS302)" required className="bg-background border border-border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none" onChange={e => setNewAssignment({...newAssignment, classCode: e.target.value})} />
          <input type="text" placeholder="Due Date (e.g. Mar 10)" required className="bg-background border border-border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none" onChange={e => setNewAssignment({...newAssignment, dueDate: e.target.value})} />
          
          <div className="col-span-1 sm:col-span-3 flex justify-end gap-3 mt-2">
            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 rounded-xl text-sm font-bold text-muted-foreground hover:bg-accent transition-colors">Cancel</button>
            <button type="submit" className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-bold shadow-sm">Publish</button>
          </div>
        </motion.form>
      )}

      <div className="grid grid-cols-1 gap-4">
        {assignments.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground bg-card border border-border/60 rounded-3xl">
            No assignments found.
          </div>
        ) : assignments.map((assignment) => (
          <motion.div 
            key={assignment.id} 
            layout 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="bg-card border border-border/60 rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-border transition-colors cursor-pointer shadow-sm hover:shadow-md"
            onClick={() => router.push(`/dashboard/assignments/${assignment.id}`)}
          >
            
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${assignment.status === 'Reviewed' ? 'bg-primary/10 text-primary' : 'bg-accent text-accent-foreground'}`}>
                <BookOpenCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold tracking-tight group-hover:text-primary transition-colors">{assignment.title}</h3>
                <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground mt-1">
                  <span className="uppercase tracking-widest bg-accent px-2 py-0.5 rounded-md">{assignment.classCode}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Due {assignment.dueDate}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 sm:ml-auto">
              <div className="text-center sm:text-right">
                <span className="block text-2xl font-black">{assignment.submissionList ? assignment.submissionList.length : assignment.submissions}<span className="text-muted-foreground text-sm font-bold">/{assignment.totalStudents}</span></span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Submissions</span>
              </div>

              {assignment.status === 'Pending' ? (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    markAssignmentReviewed(assignment.id);
                  }} 
                  className="w-10 h-10 rounded-full bg-accent text-foreground hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors shadow-sm" 
                  title="Mark as Reviewed"
                >
                  <CheckCircle2 className="w-5 h-5" />
               </button>
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center" title="Reviewed">
                  <CheckCircle2 className="w-5 h-5" />
               </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
