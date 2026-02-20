"use client";

import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { CalendarDays, Clock, Play } from "lucide-react";
import { useDashboardStore } from "@/lib/store/useDashboardStore";

export default function CalendarPage() {
  const schedule = useDashboardStore(state => state.schedule);
  const [currentDate] = useState(new Date());

  // Generate days for the current month
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  return (
    <div className="space-y-6">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground mt-1">Schedules, meetings, and events.</p>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl shadow-sm text-sm font-bold">
          <CalendarDays className="w-4 h-4 text-primary" /> {format(currentDate, "MMMM yyyy")}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Simple Monthly View */}
        <div className="lg:col-span-2 bg-card border border-border/60 rounded-3xl p-6 shadow-sm">
           <div className="grid grid-cols-7 gap-2 mb-4 text-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
             {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
           </div>
           <div className="grid grid-cols-7 gap-2">
             {/* Empty slots for start of month alignment (Mocked for generic month) */}
             {Array.from({ length: start.getDay() }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square rounded-xl bg-transparent" />
             ))}
             {days.map((day, i) => {
               const isToday = format(day, "d") === format(new Date(), "d");
               const hasEvent = i % 5 === 0; // Mock random active events

               return (
                 <div key={day.toISOString()} className={`aspect-square rounded-xl flex flex-col items-center justify-center relative cursor-pointer hover:bg-accent transition-colors border ${isToday ? 'border-primary bg-primary/5 text-primary' : 'border-border/40 text-foreground'}`}>
                   <span className="font-extrabold text-sm">{format(day, "d")}</span>
                   {hasEvent && <div className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-primary" />}
                 </div>
               );
             })}
           </div>
        </div>

        {/* Upcoming List */}
        <div className="bg-primary text-primary-foreground rounded-3xl p-6 shadow-lg flex flex-col overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[60px] rounded-full pointer-events-none" />
          
          <h2 className="text-xl font-extrabold tracking-tight mb-6 relative z-10">Agenda for Today</h2>
          
          <div className="flex-1 space-y-4 overflow-y-auto pr-2 relative z-10 scrollbar-thin scrollbar-thumb-primary-foreground/20 scrollbar-track-transparent">
            {schedule.map((sch, i) => (
              <div key={sch.id} className="p-4 rounded-2xl bg-background/10 border border-background/20 backdrop-blur-md">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-extrabold text-sm leading-tight text-white">{sch.title}</h4>
                  <span className="text-xs font-bold opacity-90">{sch.time} {sch.meridiem}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-primary-foreground/20 text-[11px] font-extrabold">
                    <Clock className="w-3 h-3" /> {sch.room}
                  </span>
                  {sch.active && (
                    <button className="w-8 h-8 bg-background text-primary rounded-full flex justify-center items-center shadow-lg hover:scale-105 transition-transform">
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
