"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import dayGridPlugin from "@fullcalendar/daygrid"
import listPlugin from "@fullcalendar/list"
import interactionPlugin from "@fullcalendar/interaction"

import { ChevronLeft, ChevronRight, CalendarDays, Clock, Play } from "lucide-react"

type ViewMode = "dayGridMonth" | "timeGridWeek" | "timeGridDay" | "listWeek"

type ScheduleEvent = {
  id: string
  title: string
  start: string
  end?: string
  extendedProps?: {
    courseCode?: string
    location?: string
    teacherName?: string
    statusTag?: "Absent" | "Present" | "Info"
    description?: string
    type?: "Lecture" | "Lab" | "Seminar" | "Mentoring" | "System"
  }
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}
function ymd(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
function startOfWeekSunday(d: Date) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  x.setDate(x.getDate() - x.getDay())
  return x
}

function formatDateTopRight(d: Date) {
  return new Intl.DateTimeFormat(undefined, { day: "2-digit", month: "short", year: "numeric" }).format(d)
}
function formatTimeTopRight(d: Date) {
  return new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }).format(d)
}

function buildSampleEvents(today: Date): ScheduleEvent[] {
  const weekStart = startOfWeekSunday(today) 
  const days = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(weekStart)
    d.setDate(weekStart.getDate() + i) 
    return ymd(d)
  })
  const [sun, mon, tue, wed, thu, fri] = days

  const E = (
    day: string,
    idx: number,
    title: string,
    startHHmm: string,
    endHHmm: string,
    extra?: ScheduleEvent["extendedProps"]
  ): ScheduleEvent => ({
    id: `evt-${day}-${idx}`,
    title,
    start: `${day}T${startHHmm}:00`,
    end: `${day}T${endHHmm}:00`,
    extendedProps: extra ?? {},
  })

  return [
    E(mon, 1, "Growth Hour", "09:30", "10:20", { teacherName: "Leela Krishna", type: "System", statusTag: "Info" }),
    E(mon, 2, "Operating Systems", "10:30", "11:20", { courseCode: "BCA402", teacherName: "Prof. Anjali", type: "Lecture" }),
    E(mon, 3, "DBMS — Normalization", "11:30", "12:20", { courseCode: "BCA403", teacherName: "Prof. Ramesh", type: "Lecture" }),
    E(mon, 4, "Data Structures — Trees", "14:00", "14:50", { courseCode: "BCA401", teacherName: "Prof. Sharma", type: "Lecture" }),
    E(mon, 5, "Assignment Work Slot", "15:00", "15:50", { type: "Lab" }),

    E(tue, 1, "OS — CPU Scheduling", "09:00", "09:50", { courseCode: "BCA402", teacherName: "Prof. Anjali", type: "Lecture" }),
    E(tue, 2, "DS — Graphs", "10:10", "11:00", { courseCode: "BCA401", teacherName: "Prof. Sharma", type: "Lecture" }),
    E(tue, 3, "Business Models", "11:10", "12:00", { teacherName: "Mentor", type: "Mentoring" }),
    E(tue, 4, "DBMS — Transactions", "14:00", "14:50", { courseCode: "BCA403", teacherName: "Prof. Ramesh", type: "Lecture" }),
    E(tue, 5, "SQL Practice", "15:00", "15:50", { location: "Lab-1", type: "Lab" }),

    E(wed, 1, "Growth Hour", "09:30", "10:20", { teacherName: "Leela Krishna", type: "System" }),
    E(wed, 2, "DS — Linked Lists", "10:30", "11:20", { courseCode: "BCA401", teacherName: "Prof. Sharma", type: "Lecture" }),
    E(wed, 3, "OS — Memory Management", "11:30", "12:20", { courseCode: "BCA402", teacherName: "Prof. Anjali", type: "Lecture" }),
    E(wed, 4, "Discovering Self", "14:00", "14:50", { teacherName: "Coach", type: "Seminar" }),
    E(wed, 5, "Mentor Check-in", "15:00", "15:40", { type: "Mentoring" }),
  ]
}

export default function StudentSchedulePage() {
  const calendarRef = React.useRef<FullCalendar | null>(null)

  const [now, setNow] = React.useState(() => new Date())
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const today = React.useMemo(() => new Date(), [])
  const initialDate = React.useMemo(() => ymd(today), [today])
  const events = React.useMemo(() => buildSampleEvents(today), [today])

  const [view, setView] = React.useState<ViewMode>("timeGridWeek")
  const [rangeTitle, setRangeTitle] = React.useState<string>("")

  const api = () => calendarRef.current?.getApi()
  const goPrev = () => api()?.prev()
  const goNext = () => api()?.next()
  const goToday = () => api()?.today()

  const changeView = (v: ViewMode) => {
    setView(v)
    api()?.changeView(v)
  }

  return (
    <div className="flex flex-col gap-6">
      
      {/* Immersive Header Card */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="card !p-6 bg-gradient-to-br from-card to-accent/20 border-border overflow-hidden relative shadow-sm">
        <div className="absolute top-[-20%] left-[-5%] w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10 text-foreground">
          <div className="flex flex-col">
            <h2 className="text-2xl font-black tracking-tight text-primary flex items-center gap-3">
               <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20"><CalendarDays className="w-5 h-5 text-primary" /></div>
               Master Schedule
            </h2>
            <p className="text-sm font-semibold text-muted-foreground mt-2 max-w-xl">
              Coordinate your daily timeline, track assignments, and directly join live lecture sessions right from your calendar.
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
             <div className="p-3 bg-card border border-border rounded-2xl flex flex-col items-center justify-center min-w-24 shadow-sm">
                 <span className="text-2xl font-black">{formatDateTopRight(now).split(' ')[0]}</span>
                 <span className="text-[10px] uppercase font-black tracking-widest text-primary">{formatDateTopRight(now).split(' ')[1]}</span>
             </div>
             <div className="p-3 bg-primary text-primary-foreground border border-primary rounded-2xl flex flex-col items-center justify-center min-w-24 shadow-md">
                 <span className="text-xl font-black">{formatTimeTopRight(now).split(' ')[0]}</span>
                 <span className="text-[10px] uppercase font-black tracking-widest text-primary-foreground/80">{formatTimeTopRight(now).split(' ')[1]}</span>
             </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Calendar Container */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card !p-0 bg-card overflow-hidden shadow-lg border-border">
          {/* Custom Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-5 border-b border-border bg-accent/20">
            <div className="flex items-center gap-2">
              <button onClick={goPrev} className="w-10 h-10 rounded-xl border border-border bg-background flex items-center justify-center hover:bg-accent text-foreground transition-all shadow-sm">
                 <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={goNext} className="w-10 h-10 rounded-xl border border-border bg-background flex items-center justify-center hover:bg-accent text-foreground transition-all shadow-sm">
                 <ChevronRight className="w-5 h-5" />
              </button>
              <button onClick={goToday} className="px-5 h-10 rounded-xl border-2 border-primary bg-primary/5 text-primary font-black uppercase text-[11px] tracking-widest hover:bg-primary hover:text-primary-foreground transition-all shadow-sm ml-2">
                 Today
              </button>
            </div>

            <div className="text-lg font-black tracking-tight text-foreground">{rangeTitle}</div>

            <div className="flex bg-background border border-border p-1 rounded-2xl shadow-sm overflow-hidden">
               {["Month", "Week", "Day", "List"].map((lbl) => {
                  const val = lbl === "Month" ? "dayGridMonth" : lbl === "Week" ? "timeGridWeek" : lbl === "Day" ? "timeGridDay" : "listWeek"
                  const active = view === val
                  return (
                     <button
                        key={lbl}
                        onClick={() => changeView(val as ViewMode)}
                        className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                          active ? "bg-primary text-primary-foreground shadow-sm" : "bg-transparent text-muted-foreground hover:bg-accent/60"
                        }`}
                     >
                       {lbl}
                     </button>
                  )
               })}
            </div>
          </div>

          <div className="p-3">
             <FullCalendar
              ref={calendarRef}
              plugins={[timeGridPlugin, dayGridPlugin, listPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              initialDate={initialDate}
              headerToolbar={false}
              firstDay={0}
              weekends={true}
              nowIndicator={true}
              editable={false}
              selectable={true}
              events={events}
              eventDisplay="block"
              allDaySlot={false}
              dayMaxEvents={true}
              slotMinTime="08:00:00"
              slotMaxTime="18:00:00"
              slotDuration="01:00:00"
              slotLabelInterval="01:00:00"
              expandRows={true}
              stickyHeaderDates={true}
              eventMinHeight={75}
              datesSet={(arg) => {
                setRangeTitle(arg.view.title)
                setView(arg.view.type as ViewMode)
              }}
              
              eventContent={(arg) => {
                const p = arg.event.extendedProps as {
                  courseCode?: string; location?: string; teacherName?: string;
                  statusTag?: "Absent" | "Present" | "Info"; type?: string;
                }
              
                const absent = p?.statusTag === "Absent"

                // Color mapping logic for different types
                const badgeStyle = p.type === 'Lecture' ? 'bg-blue-500/15 text-blue-500 border-blue-500/30' : 
                                   p.type === 'Lab' ? 'bg-purple-500/15 text-purple-500 border-purple-500/30' : 
                                   p.type === 'Seminar' ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30' :
                                   p.type === 'Mentoring' ? 'bg-amber-500/15 text-amber-500 border-amber-500/30' :
                                   'bg-foreground/5 text-foreground border-foreground/10'

                // Monthly Card
                if (arg.view.type === "dayGridMonth") {
                  return (
                    <div className={`w-full rounded-xl border-2 hover:scale-[1.02] transition-transform shadow-sm px-3 py-2 ${p.type === 'Lecture' ? 'border-blue-500/20 bg-blue-500/5' : 'border-border bg-card'}`}>
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{arg.timeText}</div>
                      <div className="text-xs font-black leading-snug line-clamp-1">{arg.event.title}</div>
                    </div>
                  )
                }
              
                // Week/Day Card (Large tiles)
                return (
                  <div className={`w-full h-full rounded-2xl border bg-card/80 backdrop-blur shadow-sm p-3 md:p-4 hover:shadow-md transition-shadow group overflow-hidden relative flex flex-col justify-between ${
                     p.type === 'Lecture' ? 'border-blue-500/30 hover:border-blue-500/60' : 
                     p.type === 'Lab' ? 'border-purple-500/30 hover:border-purple-500/60' : 'border-border'
                  }`}>
                    {/* Background glow for special types */}
                    {p.type === 'Lecture' && <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[40px] pointer-events-none" />}
                    {p.type === 'Lab' && <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[40px] pointer-events-none" />}
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded-lg border text-[9px] font-black uppercase tracking-widest ${badgeStyle}`}>
                          {p.type || "Event"}
                        </span>
                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{arg.timeText}</div>
                      </div>
                      
                      <div className="mt-1 text-sm font-black leading-snug break-words group-hover:text-primary transition-colors">
                        {arg.event.title}
                      </div>

                      {(p.courseCode || p.teacherName || p.location) && (
                         <div className="mt-3 flex flex-wrap gap-1.5 opacity-80">
                            {p.courseCode && <span className="text-[10px] font-bold bg-background border border-border px-1.5 rounded text-muted-foreground">{p.courseCode}</span>}
                            {p.teacherName && <span className="text-[10px] font-bold bg-background border border-border px-1.5 rounded text-muted-foreground line-clamp-1 max-w-[120px]">{p.teacherName}</span>}
                            {p.location && <span className="text-[10px] font-bold bg-background border border-border px-1.5 rounded text-muted-foreground">{p.location}</span>}
                         </div>
                      )}
                    </div>
                  </div>
                )
              }}
              height="calc(100vh - 280px)"
            />
          </div>

          <style jsx global>{`
          .fc {
            --fc-border-color: hsl(var(--border) / 0.5);
            --fc-page-bg-color: transparent;
            --fc-today-bg-color: hsl(var(--primary) / 0.02);
            --fc-now-indicator-color: hsl(var(--primary));
            font-family: inherit;
          }

          .fc .fc-col-header-cell-cushion {
            font-weight: 900;
            color: hsl(var(--foreground));
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-size: 11px;
            padding: 12px 0;
          }

          .fc .fc-timegrid-slot { border-top: 1px solid hsl(var(--border) / 0.3) !important; }
          .fc .fc-timegrid-slot-label {
            color: hsl(var(--muted-foreground));
            font-size: 11px;
            font-weight: 800;
          }

          .fc .fc-timegrid-event-harness { margin: 6px 6px 0 6px; }
          .fc .fc-daygrid-event-harness { margin: 4px 6px; }

          /* Big box event card overrides to let our tailwind do the work */
          .fc .fc-timegrid-event,
          .fc .fc-daygrid-event {
            border: none !important;
            background: transparent !important;
            box-shadow: none !important;
            border-radius: 16px !important;
          }

          .fc .fc-event-main { padding: 0 !important; }

          /* List View overrides */
          .fc .fc-list-event-title { font-weight: 800; font-size: 14px; }
          .fc .fc-list-event-time { font-weight: 800; font-size: 12px; color: hsl(var(--muted-foreground)); }
          .fc .fc-list-day-cushion { background: hsl(var(--accent) / 0.3); border-radius: 8px; margin-bottom: 8px; font-weight: 900; }
        `}</style>
      </motion.div>
    </div>
  )
}