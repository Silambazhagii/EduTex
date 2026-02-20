"use client"

import * as React from "react"
import Link from "next/link"
import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import dayGridPlugin from "@fullcalendar/daygrid"
import listPlugin from "@fullcalendar/list"
import interactionPlugin from "@fullcalendar/interaction"

import { ChevronLeft, ChevronRight, CalendarDays, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

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
    source?: "SYSTEM" | "FACULTY" | "HOD"
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
  return new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(d)
}

function buildSampleEvents(today: Date): ScheduleEvent[] {
  const weekStart = startOfWeekSunday(today) // Sunday
  const days = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(weekStart)
    d.setDate(weekStart.getDate() + i) // Sun..Fri
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
    // SUN
    E(sun, 1, "Weekly Planning", "09:00", "09:50", { location: "Mentor Room", teacherName: "Mentor", source: "SYSTEM" }),
    E(sun, 2, "Data Structures — Practice", "10:10", "11:00", { courseCode: "BCA401", teacherName: "Prof. Sharma", source: "FACULTY" }),
    E(sun, 3, "DBMS — SQL Lab", "11:10", "12:00", { courseCode: "BCA403", location: "Lab-2", teacherName: "Prof. Ramesh", source: "FACULTY" }),
    E(sun, 4, "Soft Skills", "14:00", "14:45", { teacherName: "Coach", source: "SYSTEM" }),
    E(sun, 5, "Weekly Quiz", "15:00", "15:40", { source: "SYSTEM" }),

    // MON
    E(mon, 1, "Growth Hour", "09:30", "10:20", { teacherName: "Leela Krishna", statusTag: "Absent", source: "SYSTEM" }),
    E(mon, 2, "Operating Systems", "10:30", "11:20", { courseCode: "BCA402", teacherName: "Prof. Anjali", source: "FACULTY" }),
    E(mon, 3, "DBMS — Normalization", "11:30", "12:20", { courseCode: "BCA403", teacherName: "Prof. Ramesh", source: "FACULTY" }),
    E(mon, 4, "Data Structures — Trees", "14:00", "14:50", { courseCode: "BCA401", teacherName: "Prof. Sharma", source: "FACULTY" }),
    E(mon, 5, "Assignment Work Slot", "15:00", "15:50", { source: "SYSTEM" }),

    // TUE
    E(tue, 1, "OS — CPU Scheduling", "09:00", "09:50", { courseCode: "BCA402", teacherName: "Prof. Anjali", source: "FACULTY" }),
    E(tue, 2, "DS — Graphs", "10:10", "11:00", { courseCode: "BCA401", teacherName: "Prof. Sharma", source: "FACULTY" }),
    E(tue, 3, "Business Models", "11:10", "12:00", { teacherName: "Mentor", source: "SYSTEM" }),
    E(tue, 4, "DBMS — Transactions", "14:00", "14:50", { courseCode: "BCA403", teacherName: "Prof. Ramesh", source: "FACULTY" }),
    E(tue, 5, "SQL Practice", "15:00", "15:50", { location: "Lab-1", source: "FACULTY" }),

    // WED
    E(wed, 1, "Growth Hour", "09:30", "10:20", { teacherName: "Leela Krishna", source: "SYSTEM" }),
    E(wed, 2, "DS — Linked Lists", "10:30", "11:20", { courseCode: "BCA401", teacherName: "Prof. Sharma", source: "FACULTY" }),
    E(wed, 3, "OS — Memory Management", "11:30", "12:20", { courseCode: "BCA402", teacherName: "Prof. Anjali", source: "FACULTY" }),
    E(wed, 4, "Discovering Self", "14:00", "14:50", { teacherName: "Coach", source: "SYSTEM" }),
    E(wed, 5, "Mentor Check-in", "15:00", "15:40", { source: "SYSTEM" }),

    // THU
    E(thu, 1, "DBMS — SQL Advanced", "09:00", "09:50", { courseCode: "BCA403", teacherName: "Prof. Ramesh", source: "FACULTY" }),
    E(thu, 2, "OS — File Systems", "10:10", "11:00", { courseCode: "BCA402", teacherName: "Prof. Anjali", source: "FACULTY" }),
    E(thu, 3, "DS — Stacks & Queues", "11:10", "12:00", { courseCode: "BCA401", teacherName: "Prof. Sharma", source: "FACULTY" }),
    E(thu, 4, "OS Experiments", "14:00", "14:50", { location: "Lab-3", source: "FACULTY" }),
    E(thu, 5, "Doubts / Revision", "15:00", "15:50", { source: "SYSTEM" }),

    // FRI
    E(fri, 1, "CIA Prep — DS", "09:00", "09:50", { courseCode: "BCA401", source: "FACULTY" }),
    E(fri, 2, "CIA Prep — OS", "10:10", "11:00", { courseCode: "BCA402", source: "FACULTY" }),
    E(fri, 3, "CIA Prep — DBMS", "11:10", "12:00", { courseCode: "BCA403", source: "FACULTY" }),
    E(fri, 4, "Mock Test", "14:00", "14:50", { source: "SYSTEM" }),
    E(fri, 5, "Weekly Wrap-up", "15:00", "15:40", { source: "SYSTEM" }),
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
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-background">
        <div className="px-6 py-3 flex items-start justify-between">
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">
              <Link className="hover:underline" href="/">
                Home
              </Link>{" "}
              <span className="mx-1">›</span> <span>My Schedule</span>
            </div>
            <div className="text-2xl font-semibold tracking-tight">My Schedule</div>
          </div>

          <div className="text-right text-xs text-muted-foreground space-y-2">
            <div className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>{formatDateTopRight(now)}</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{formatTimeTopRight(now)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-1 w-full bg-red-500" />

      <div className="px-6 py-6">
        <Separator className="my-4" />

        <div className="border border-border bg-background">
          {/* Toolbar */}
          <div className="flex items-center gap-2 p-4 border-b border-border">
            <Button variant="ghost" size="icon" className="rounded-none" onClick={goPrev}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-none" onClick={goNext}>
              <ChevronRight className="h-5 w-5" />
            </Button>

            <Button variant="outline" className="rounded-none h-9 px-4 ml-2" onClick={goToday}>
              Today
            </Button>

            <div className="ml-auto mr-3 text-sm text-muted-foreground">{rangeTitle}</div>

            <div className="inline-flex border border-border rounded-none overflow-hidden">
              <SegBtn active={view === "dayGridMonth"} onClick={() => changeView("dayGridMonth")}>
                Month
              </SegBtn>
              <SegBtn active={view === "timeGridWeek"} onClick={() => changeView("timeGridWeek")}>
                Week
              </SegBtn>
              <SegBtn active={view === "timeGridDay"} onClick={() => changeView("timeGridDay")}>
                Day
              </SegBtn>
              <SegBtn active={view === "listWeek"} onClick={() => changeView("listWeek")}>
                List
              </SegBtn>
            </div>
          </div>

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
            eventMinHeight={64}
            datesSet={(arg) => {
              setRangeTitle(arg.view.title)
              setView(arg.view.type as ViewMode)
            }}
            // ✅ Card content (title first, then metadata)
            eventContent={(arg) => {
              const p = arg.event.extendedProps as {
                courseCode?: string
                location?: string
                teacherName?: string
                statusTag?: "Absent" | "Present" | "Info"
                source?: "SYSTEM" | "FACULTY" | "HOD"
              }
            
              const subtitle = p?.courseCode || p?.location || p?.teacherName || ""
              const absent = p?.statusTag === "Absent"
            
              // Month view: tiny card, still boxed, readable
              if (arg.view.type === "dayGridMonth") {
                return (
                  <div className="w-full rounded-lg border border-border bg-background px-3 py-2">
                    <div className="text-[11px] text-muted-foreground">{arg.timeText}</div>
                    <div className="mt-0.5 text-[12px] font-semibold leading-snug text-foreground">
                      {arg.event.title}
                    </div>
                  </div>
                )
              }
            
              // Week/Day: big boxed card
              return (
                <div className="w-full h-full rounded-xl border border-border bg-background px-4 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-xs text-muted-foreground">{arg.timeText}</div>
                      <div className="mt-1 truncate text-sm font-semibold text-foreground">
                        {arg.event.title}
                      </div>
                    </div>
            
                    {/* Status pill (shadcn token-based) */}
                    {absent ? (
                      <span className="shrink-0 rounded-md border border-border bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground">
                        Absent
                      </span>
                    ) : null}
                  </div>
            
                  {subtitle ? (
                    <div className="mt-2 text-xs text-muted-foreground truncate">{subtitle}</div>
                  ) : null}
            
                  {/* Optional: small “source” tag */}
                  {p?.source ? (
                    <div className="mt-2">
                      <span className="inline-flex items-center rounded-md border border-border bg-background px-2 py-1 text-[11px] font-medium text-muted-foreground">
                        {p.source}
                      </span>
                    </div>
                  ) : null}
                </div>
              )
            }}
            // ✅ full height like your screenshots
            height="calc(100vh - 220px)"
          />
        </div>

        {/* ✅ This is where the “big boxed grid” comes from */}
        <style jsx global>{`
          .fc {
            --fc-border-color: hsl(var(--border));
            --fc-page-bg-color: hsl(var(--background));
            --fc-today-bg-color: rgba(0, 0, 0, 0.02);
            --fc-now-indicator-color: #ef4444;
          }

          /* Cleaner header look */
          .fc .fc-col-header-cell-cushion {
            font-weight: 600;
            color: hsl(var(--foreground));
            text-decoration: none;
          }

          /* TIMEGRID: make the grid feel “relaxed” */
          .fc .fc-timegrid-slot {
            border-top: 1px solid hsl(var(--border)) !important;
          }
          .fc .fc-timegrid-slot-label {
            color: hsl(var(--muted-foreground));
            font-size: 12px;
          }

          /* Give space between event cards (THIS is what you’re missing) */
          .fc .fc-timegrid-event-harness {
            margin: 8px 8px 0 8px;
          }

          /* Big box event card */
          .fc .fc-timegrid-event,
          .fc .fc-daygrid-event {
            border: 1px solid hsl(var(--border)) !important;
            background: hsl(var(--background)) !important;
            color: hsl(var(--foreground)) !important;
            border-radius: 10px !important;
            box-shadow: none !important;
            overflow: hidden !important;
          }

          /* Remove default FullCalendar padding so our card controls it */
          .fc .fc-event-main {
            padding: 0 !important;
          }

          /* Card typography */
          .edx-card {
            padding: 12px 14px;
            height: 100%;
          }
          .edx-time {
            font-size: 12px;
            color: hsl(var(--muted-foreground));
          }
          .edx-title {
            margin-top: 2px;
            font-size: 14px;
            font-weight: 600;
            line-height: 1.2;
          }
          .edx-sub {
            margin-top: 6px;
            font-size: 12px;
            color: hsl(var(--muted-foreground));
          }
          .edx-flag {
            margin-top: 8px;
            font-size: 12px;
            color: hsl(var(--muted-foreground));
          }

          /* MONTH VIEW: make each item look like a “box” (not tiny line) */
          .fc .fc-daygrid-event-harness {
            margin: 6px 8px;
          }
          .fc .fc-daygrid-day-number {
            padding: 10px 10px 0 0;
            color: hsl(var(--muted-foreground));
          }
          .edx-month-card {
            padding: 10px 12px;
          }
          .edx-month-time {
            font-size: 11px;
            color: hsl(var(--muted-foreground));
          }
          .edx-month-title {
            margin-top: 3px;
            font-size: 12px;
            font-weight: 600;
            line-height: 1.2;
          }

          /* LIST VIEW is already fine — just keep it neat */
          .fc .fc-list-event-title,
          .fc .fc-list-event-time {
            font-size: 13px;
          }
        `}</style>
      </div>
    </div>
  )
}

function SegBtn({
  active,
  children,
  onClick,
}: {
  active?: boolean
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={[
        "h-9 px-4 text-sm font-medium",
        "border-r border-border last:border-r-0",
        active ? "bg-muted text-foreground" : "bg-background text-muted-foreground hover:bg-muted/40",
      ].join(" ")}
    >
      {children}
    </button>
  )
}