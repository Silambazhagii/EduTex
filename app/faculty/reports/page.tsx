"use client";

import { useDashboardStore } from "@/lib/store/useDashboardStore";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { TrendingUp, Users, BookOpenCheck } from "lucide-react";

const performanceData = [
  { month: "Sep", average: 65, highest: 90 },
  { month: "Oct", average: 72, highest: 94 },
  { month: "Nov", average: 68, highest: 91 },
  { month: "Dec", average: 80, highest: 98 },
  { month: "Jan", average: 75, highest: 95 },
  { month: "Feb", average: 82, highest: 99 },
];

export default function ReportsPage() {
  const { classes, attendance, assignments } = useDashboardStore();

  const totalStudents = classes.reduce((acc, curr) => acc + curr.students, 0);
  const avgAttendance = attendance.length
    ? Math.round(attendance.reduce((acc, curr) => acc + curr.overallPercentage, 0) / attendance.length)
    : 0;
  const assignmentsReviewed = assignments.filter(a => a.status === 'Reviewed').length;

  return (
    <div className="space-y-6 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Analytics & Reports</h1>
        <p className="text-muted-foreground mt-1">Holistic view of student performance and engagement metrics.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border/60 rounded-3xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1">Total Students</p>
            <h3 className="text-4xl font-black tracking-tight">{totalStudents}</h3>
          </div>
          <div className="w-12 h-12 bg-accent text-accent-foreground rounded-2xl flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-card border border-border/60 rounded-3xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1">Avg Attendance</p>
            <h3 className="text-4xl font-black tracking-tight">{avgAttendance}%</h3>
          </div>
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-card border border-border/60 rounded-3xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1">Assignments Reviewed</p>
            <h3 className="text-4xl font-black tracking-tight">{assignmentsReviewed} <span className="text-lg text-muted-foreground">/ {assignments.length}</span></h3>
          </div>
          <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center">
            <BookOpenCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Performance Area Chart */}
        <div className="bg-card border border-border/60 rounded-3xl p-6 shadow-sm flex flex-col min-h-[400px]">
          <h3 className="text-lg font-extrabold mb-6">Class Performance Trajectory</h3>
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border)/0.5)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '16px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))', fontWeight: 700, fontSize: '13px' }}
                />
                <Area type="monotone" dataKey="average" stroke="hsl(var(--primary))" strokeWidth={4} fillOpacity={1} fill="url(#colorAvg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Bar Chart from Zustand Store */}
        <div className="bg-card border border-border/60 rounded-3xl p-6 shadow-sm flex flex-col min-h-[400px]">
          <h3 className="text-lg font-extrabold mb-6">Attendance Overview per Course</h3>
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendance.map(a => {
                const title = classes.find(c => c.id === a.classId)?.code || 'Unknown';
                return { name: title, attendance: a.overallPercentage };
              })} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border)/0.5)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700 }} />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '16px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))', fontWeight: 700, fontSize: '13px' }}
                />
                <Bar dataKey="attendance" fill="hsl(var(--foreground))" radius={[8, 8, 8, 8]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
