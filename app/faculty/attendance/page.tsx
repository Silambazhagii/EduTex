"use client";

import { useDashboardStore } from "@/lib/store/useDashboardStore";
import { ClipboardCheck, Percent, Users, Search } from "lucide-react";
import { useState, useMemo } from "react";

export default function AttendancePage() {
  const { classes, attendance, toggleStudentAttendance } = useDashboardStore();
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedClass = classes.find((c) => c.id === selectedClassId);
  const selectedRecord = attendance.find((a) => a.classId === selectedClassId);

  const filteredStudents = useMemo(() => {
    if (!selectedRecord?.students) return [];
    if (!searchQuery.trim()) return selectedRecord.students;
    return selectedRecord.students.filter(student => 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedRecord?.students, searchQuery]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Attendance Records</h1>
        <p className="text-muted-foreground mt-1">Select a class to track and update individual student attendance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.length === 0 ? (
          <div className="col-span-full py-12 text-center text-muted-foreground bg-card border border-border/60 rounded-3xl">
            You must add classes first before managing attendance.
          </div>
        ) : classes.map((cls) => {
          const record = attendance.find(a => a.classId === cls.id) || { overallPercentage: 0, lastUpdated: 'Never', students: [] };
          const isSelected = selectedClassId === cls.id;
          
          return (
            <div 
              key={cls.id} 
              onClick={() => setSelectedClassId(isSelected ? null : cls.id)}
              className={`card !p-6 flex flex-col justify-between cursor-pointer transition-all ${isSelected ? 'ring-2 ring-primary border-transparent shadow-md bg-accent/20' : 'hover:border-primary/50'}`}
            >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">{cls.code}</span>
                    <h3 className="text-lg font-extrabold tracking-tight mt-1">{cls.name}</h3>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'}`}>
                    <ClipboardCheck className="w-4 h-4" />
                  </div>
                </div>

                <div className="mb-2 flex items-end gap-2">
                  <span className="text-5xl font-black tracking-tighter text-foreground leading-none">{record.overallPercentage}</span>
                  <Percent className="w-6 h-6 text-muted-foreground mb-1" />
                </div>

                <div className="flex justify-between items-center text-xs font-bold text-muted-foreground mt-4">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>{cls.students} Students</span>
                  </div>
                  <span>Updated: {record.lastUpdated}</span>
                </div>
            </div>
          );
        })}
      </div>

      {selectedClassId && selectedClass && selectedRecord && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
            <h2 className="text-2xl font-bold tracking-tight">
              {selectedClass.name} <span className="text-muted-foreground font-medium text-lg ml-2">({selectedClass.code})</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search student..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-card border border-border/60 rounded-xl pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none w-full shadow-sm"
                />
              </div>
              <div className="text-sm font-medium text-muted-foreground bg-card border border-border/50 px-4 py-2 rounded-xl shadow-sm whitespace-nowrap">
                <span className="text-foreground font-bold">{selectedRecord.students.filter(s => s.isPresent).length}</span> / {selectedRecord.students.length} Present
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border/60 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/60 bg-muted/20">
                    <th className="text-left py-4 px-6 font-semibold text-sm text-foreground">Student ID</th>
                    <th className="text-left py-4 px-6 font-semibold text-sm text-foreground">Student Name</th>
                    <th className="text-center py-4 px-6 font-semibold text-sm text-foreground">Status</th>
                    <th className="text-right py-4 px-6 font-semibold text-sm text-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.studentId} className="border-b border-border/40 last:border-0 hover:bg-muted/10 transition-colors">
                      <td className="py-4 px-6 text-sm font-medium text-muted-foreground">{student.studentId}</td>
                      <td className="py-4 px-6 text-sm font-medium text-foreground">{student.name}</td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${student.isPresent ? 'bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-rose-500/15 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400'}`}>
                          {student.isPresent ? 'Present' : 'Absent'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStudentAttendance(selectedClassId, student.studentId);
                          }}
                          className={`text-sm font-semibold px-4 py-1.5 rounded-lg transition-all active:scale-95 ${student.isPresent ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20'}`}
                        >
                          Mark {student.isPresent ? 'Absent' : 'Present'}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {(!selectedRecord.students || selectedRecord.students.length === 0) && (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-muted-foreground">
                        No students enrolled in this class yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
