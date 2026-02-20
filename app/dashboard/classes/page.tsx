"use client";

import { useState } from "react";
import { useDashboardStore, type ClassItem } from "@/lib/store/useDashboardStore";
import { motion } from "framer-motion";
import { Users, Plus, Trash2 } from "lucide-react";

export default function ClassesPage() {
  const { classes, addClass, deleteClass } = useDashboardStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newClass, setNewClass] = useState<Partial<ClassItem>>({});

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newClass.name && newClass.code && newClass.room) {
      addClass({
        id: Date.now().toString(),
        name: newClass.name,
        code: newClass.code,
        room: newClass.room,
        students: newClass.students || 0,
      } as ClassItem);
      setIsAdding(false);
      setNewClass({});
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Classes</h1>
          <p className="text-muted-foreground mt-1">Manage your active courses and enrollments.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Class
        </button>
      </div>

      {isAdding && (
        <motion.form 
          initial={{ opacity: 0, height: 0 }} 
          animate={{ opacity: 1, height: 'auto' }} 
          className="bg-card border border-border/60 rounded-3xl p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
          onSubmit={handleAdd}
        >
          <input type="text" placeholder="Course Name" required className="bg-background border border-border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none" onChange={e => setNewClass({...newClass, name: e.target.value})} />
          <input type="text" placeholder="Course Code" required className="bg-background border border-border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none" onChange={e => setNewClass({...newClass, code: e.target.value})} />
          <input type="text" placeholder="Room" required className="bg-background border border-border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none" onChange={e => setNewClass({...newClass, room: e.target.value})} />
          <input type="number" placeholder="Students count" required className="bg-background border border-border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none" onChange={e => setNewClass({...newClass, students: parseInt(e.target.value)})} />
          
          <div className="col-span-1 sm:col-span-2 md:col-span-4 flex justify-end gap-3 mt-2">
            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 rounded-xl text-sm font-bold text-muted-foreground hover:bg-accent transition-colors">Cancel</button>
            <button type="submit" className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-bold shadow-sm">Save Class</button>
          </div>
        </motion.form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.length === 0 ? (
          <div className="col-span-full py-12 text-center text-muted-foreground bg-card border border-border/60 rounded-3xl">
            No classes found. Add one to get started!
          </div>
        ) : classes.map((cls) => (
          <motion.div key={cls.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card card-hover flex flex-col justify-between group !p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <button onClick={() => deleteClass(cls.id)} className="w-8 h-8 rounded-full bg-destructive/10 text-destructive flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div>
              <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">{cls.code} • {cls.room}</span>
              <h3 className="text-lg font-extrabold tracking-tight mt-1 mb-3">{cls.name}</h3>
              <div className="flex items-center gap-2 text-sm font-medium">
                <div className="w-2 h-2 rounded-full bg-primary" /> {cls.students} Enrolled Students
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
