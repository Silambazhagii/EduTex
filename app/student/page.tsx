"use client"

import * as React from "react"
import {
  BookOpen,
  Calendar,
  ChevronRight,
  Download,
  FileText,
  GraduationCap,
  Layers,
  ListChecks,
  NotebookText,
  Paperclip,
  Search,
  Sparkles,
  Upload,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"

/**
 * -----------------------------
 * Sample Data (replace later with backend)
 * -----------------------------
 */

type Semester = {
  id: string
  name: string
  isCurrent?: boolean
  accent: "violet" | "sky" | "emerald" | "amber" | "rose"
}

type Subject = {
  id: string
  semesterId: string
  title: string
  description: string
  credits: number
  assignments: number
  units: number
  progressPct: number // faculty-marked progress
  icon: "discover" | "business" | "automata" | "networks" | "work"
  meta?: {
    universitySubjectCode?: string
    facilitator?: string
    facilitatorEmail?: string
  }
}

type NoteItem = {
  id: string
  subjectId: string
  title: string
  format: "PDF" | "PPT" | "DOCX" | "ZIP"
  sizeLabel: string
  updatedAt: string
  url: string
}

type SessionItem = {
  id: string
  subjectId: string
  date: string // YYYY-MM-DD
  time: string // "11:30 AM - 12:30 PM"
  title: string
  mandatory?: boolean
}

type AssessmentItem = {
  id: string
  subjectId: string
  title: string
  dueDate: string
  instructions: string
  status: "Not Started" | "Submitted" | "Needs Revision" | "Graded"
}

const SEMESTERS: Semester[] = [
  { id: "sem-6", name: "Semester 6", isCurrent: true, accent: "violet" },
  { id: "sem-5", name: "Semester 5", accent: "sky" },
  { id: "sem-4", name: "Semester 4", accent: "emerald" },
  { id: "sem-3", name: "Semester 3", accent: "amber" },
  { id: "sem-2", name: "Semester 2", accent: "rose" },
  { id: "sem-1", name: "Semester 1", accent: "sky" },
]

const SUBJECTS: Subject[] = [
  {
    id: "sub-discovering-self",
    semesterId: "sem-6",
    title: "Discovering Self",
    description:
      "An experiential journey for engineers to decode their internal architecture, exploring self-awareness and purpose.",
    credits: 3,
    assignments: 3,
    units: 32,
    progressPct: 34,
    icon: "discover",
    meta: {
      universitySubjectCode: "N/A",
      facilitator: "Navaneeth V",
      facilitatorEmail: "navaneeth.v@edutex.com",
    },
  },
  {
    id: "sub-business-models",
    semesterId: "sem-6",
    title: "Fundamentals of Business Management",
    description:
      "Core concepts of business management including strategic planning, marketing, and decision-making basics.",
    credits: 3,
    assignments: 2,
    units: 33,
    progressPct: 12,
    icon: "business",
  },
  {
    id: "sub-automata",
    semesterId: "sem-6",
    title: "Formal Language and Automata Theory",
    description:
      "How computers understand and process languages. Covers DFA/NFA, regex, CFG, and basic computation models.",
    credits: 4,
    assignments: 4,
    units: 56,
    progressPct: 25,
    icon: "automata",
  },
  {
    id: "sub-networks",
    semesterId: "sem-6",
    title: "Computer Networks",
    description:
      "Foundations of networks from layered architectures to protocols for reliable data communication.",
    credits: 4,
    assignments: 4,
    units: 58,
    progressPct: 27,
    icon: "networks",
  },
  {
    id: "sub-work-integration",
    semesterId: "sem-6",
    title: "Integrated Work with Partner Company VI",
    description:
      "Structured workplace-style learning track that replicates real-world work integration and delivery cycles.",
    credits: 8,
    assignments: 8,
    units: 199,
    progressPct: 0,
    icon: "work",
  },
]

const NOTES: NoteItem[] = [
  {
    id: "note-1",
    subjectId: "sub-discovering-self",
    title: "Module Pack — The Mirror (Who am I?)",
    format: "PDF",
    sizeLabel: "2.3 MB",
    updatedAt: "2026-02-18",
    url: "#",
  },
  {
    id: "note-2",
    subjectId: "sub-discovering-self",
    title: "Reflection Worksheet Set",
    format: "DOCX",
    sizeLabel: "780 KB",
    updatedAt: "2026-02-20",
    url: "#",
  },
  {
    id: "note-3",
    subjectId: "sub-discovering-self",
    title: "Session Slides (Week 3)",
    format: "PPT",
    sizeLabel: "5.1 MB",
    updatedAt: "2026-02-21",
    url: "#",
  },
]

const SESSIONS: SessionItem[] = [
  {
    id: "sess-1",
    subjectId: "sub-discovering-self",
    date: "2026-02-27",
    time: "11:30 AM - 12:30 PM",
    title: "Protocols for Human Connection",
    mandatory: true,
  },
  {
    id: "sess-2",
    subjectId: "sub-discovering-self",
    date: "2026-02-28",
    time: "1:15 PM - 2:10 PM",
    title: "The Art of Empathy",
    mandatory: true,
  },
  {
    id: "sess-3",
    subjectId: "sub-discovering-self",
    date: "2026-03-04",
    time: "9:30 AM - 10:30 AM",
    title: "Navigating Merge Conflicts (life edition)",
    mandatory: true,
  },
  {
    id: "sess-4",
    subjectId: "sub-discovering-self",
    date: "2026-03-06",
    time: "11:30 AM - 12:30 PM",
    title: "Assignment Clinic: Conflict Refactoring",
    mandatory: true,
  },
]

const ASSESSMENTS: AssessmentItem[] = [
  {
    id: "asm-1",
    subjectId: "sub-discovering-self",
    title: "Self Audit — Values & Triggers",
    dueDate: "2026-03-02",
    instructions:
      "Upload a 1–2 page reflection. Keep it honest, structured, and readable.",
    status: "Not Started",
  },
  {
    id: "asm-2",
    subjectId: "sub-discovering-self",
    title: "Communication Roleplay Notes",
    dueDate: "2026-03-10",
    instructions:
      "Upload your session notes + takeaways. PDF preferred. Max 5 MB.",
    status: "Needs Revision",
  },
]

/**
 * -----------------------------
 * UI Helpers
 * -----------------------------
 */

function formatPrettyDate(iso: string) {
  const d = new Date(iso + "T00:00:00")
  return d.toLocaleDateString(undefined, { day: "2-digit", month: "short" })
}

function accentClass(accent: Semester["accent"]) {
  // subtle accent background for the sidebar chip
  switch (accent) {
    case "violet":
      return "bg-violet-500/10 text-violet-700 dark:text-violet-200"
    case "sky":
      return "bg-sky-500/10 text-sky-700 dark:text-sky-200"
    case "emerald":
      return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-200"
    case "amber":
      return "bg-amber-500/10 text-amber-800 dark:text-amber-200"
    case "rose":
      return "bg-rose-500/10 text-rose-700 dark:text-rose-200"
    default:
      return "bg-muted text-foreground"
  }
}

function SubjectIcon({ kind }: { kind: Subject["icon"] }) {
  // keeping it minimal; you can swap with colored SVGs later
  const common = "h-6 w-6 text-muted-foreground"
  if (kind === "discover") return <Sparkles className={common} />
  if (kind === "business") return <GraduationCap className={common} />
  if (kind === "automata") return <Layers className={common} />
  if (kind === "networks") return <BookOpen className={common} />
  return <NotebookText className={common} />
}

/**
 * A segmented “tick” progress bar like your screenshot:
 * - uses shadcn tokens (bg-muted, fg, etc.)
 * - looks premium without being loud
 */
function SegmentedProgress({
  value,
  labelLeft,
  labelRight,
}: {
  value: number
  labelLeft?: string
  labelRight?: string
}) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className="space-y-2">
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
        {/* base ticks */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "10px 100%",
          }}
        />
        {/* fill */}
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-foreground/80"
          style={{ width: `${clamped}%` }}
        />
        {/* glow-ish top line */}
        <div className="absolute inset-x-0 top-0 h-px bg-background/50" />
      </div>

      {(labelLeft || labelRight) && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{labelLeft ?? ""}</span>
          <span>{labelRight ?? ""}</span>
        </div>
      )}
    </div>
  )
}

function StatPill({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}) {
  return (
    <TooltipProvider delayDuration={120}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground shadow-sm">
            <span className="text-muted-foreground">{icon}</span>
            <span className="tabular-nums text-foreground">{value}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="text-xs">
          <span>{label}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function FileFormatBadge({ format }: { format: NoteItem["format"] }) {
  // neutral badge (token-based), looks like “format badge” in your ref
  return (
    <Badge variant="secondary" className="rounded-md px-2 py-0.5 text-[11px]">
      {format}
    </Badge>
  )
}

/**
 * -----------------------------
 * Page
 * -----------------------------
 */

export default function LivebooksPage() {
  const [activeSemesterId, setActiveSemesterId] = React.useState(
    SEMESTERS.find((s) => s.isCurrent)?.id ?? SEMESTERS[0].id
  )

  const semesterSubjects = React.useMemo(() => {
    return SUBJECTS.filter((s) => s.semesterId === activeSemesterId)
  }, [activeSemesterId])

  const [activeSubjectId, setActiveSubjectId] = React.useState(
    semesterSubjects[0]?.id ?? SUBJECTS[0].id
  )

  // keep active subject valid when semester changes
  React.useEffect(() => {
    const first = SUBJECTS.find((s) => s.semesterId === activeSemesterId)
    if (first) setActiveSubjectId(first.id)
  }, [activeSemesterId])

  const activeSubject = React.useMemo(() => {
    return SUBJECTS.find((s) => s.id === activeSubjectId) ?? semesterSubjects[0]
  }, [activeSubjectId, semesterSubjects])

  const [query, setQuery] = React.useState("")

  const filteredSubjects = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return semesterSubjects
    return semesterSubjects.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    )
  }, [query, semesterSubjects])

  return (
    <TooltipProvider delayDuration={120}>
      <div className="min-h-screen bg-background">
        {/* Subtle patterned header strip like ref */}
        <div className="relative border-b">
          <div
            className="h-14"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, transparent, transparent), radial-gradient(hsl(var(--border)) 1px, transparent 1px)",
              backgroundSize: "auto, 16px 16px",
              backgroundPosition: "0 0, 0 0",
              opacity: 0.35,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg border bg-background shadow-sm">
                <BookOpen className="h-4 w-4" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold">Livebooks</div>
                <div className="text-xs text-muted-foreground">
                  Your courses, notes, sessions & assessments
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative hidden md:block">
                <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search subjects…"
                  className="h-9 w-[260px] pl-9"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-6 py-6">
          {/* Sidebar */}
          <aside className="col-span-12 md:col-span-3 lg:col-span-2">
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="text-sm font-semibold">Semesters</div>
                <div className="text-xs text-muted-foreground">
                  Current on top, past below
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {SEMESTERS.map((s) => {
                    const active = s.id === activeSemesterId
                    return (
                      <button
                        key={s.id}
                        onClick={() => setActiveSemesterId(s.id)}
                        className={[
                          "group flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left transition",
                          active
                            ? "border-foreground/20 bg-muted/40 shadow-sm"
                            : "hover:bg-muted/30",
                        ].join(" ")}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={[
                              "h-9 w-9 rounded-xl border grid place-items-center",
                              accentClass(s.accent),
                            ].join(" ")}
                          >
                            <span className="text-xs font-semibold">
                              {s.name.replace("Semester ", "")}
                            </span>
                          </div>
                          <div className="leading-tight">
                            <div className="text-sm font-medium">{s.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {s.isCurrent ? "Current" : "Past"}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-40 transition group-hover:opacity-100" />
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main */}
          <main className="col-span-12 space-y-6 md:col-span-9 lg:col-span-10">
            {/* Dotted canvas like reference */}
            <div
              className="rounded-2xl border bg-background p-6"
              style={{
                backgroundImage:
                  "radial-gradient(hsl(var(--border)) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-lg font-semibold">
                    {SEMESTERS.find((s) => s.id === activeSemesterId)?.name ??
                      "Semester"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Pick a subject to view notes, sessions, and assessments.
                  </div>
                </div>

                {/* mobile search */}
                <div className="relative md:hidden">
                  <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search subjects…"
                    className="h-9 pl-9"
                  />
                </div>
              </div>

              <Separator className="my-5" />

              {/* Subject cards grid */}
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {filteredSubjects.map((s) => {
                  const selected = s.id === activeSubjectId
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActiveSubjectId(s.id)}
                      className="text-left"
                    >
                      <Card
                        className={[
                          "h-full transition",
                          selected
                            ? "border-foreground/25 shadow-md"
                            : "hover:border-foreground/20 hover:shadow-sm",
                        ].join(" ")}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="grid h-10 w-10 place-items-center rounded-xl border bg-muted/30">
                                <SubjectIcon kind={s.icon} />
                              </div>
                              <div className="min-w-0">
                                <div className="truncate text-sm font-semibold">
                                  {s.title}
                                </div>
                                <div className="line-clamp-2 text-xs text-muted-foreground">
                                  {s.description}
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="mt-1 h-4 w-4 text-muted-foreground opacity-40" />
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            <StatPill
                              icon={<Sparkles className="h-3.5 w-3.5" />}
                              label="Credits"
                              value={s.credits}
                            />
                            <StatPill
                              icon={<ListChecks className="h-3.5 w-3.5" />}
                              label="Assignments"
                              value={s.assignments}
                            />
                            <StatPill
                              icon={<Layers className="h-3.5 w-3.5" />}
                              label="Units"
                              value={s.units}
                            />
                          </div>

                          <div className="rounded-xl border bg-muted/20 p-3">
                            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                              <span>Faculty Progress</span>
                              <span className="tabular-nums">
                                {s.progressPct}%
                              </span>
                            </div>
                            <SegmentedProgress value={s.progressPct} />
                          </div>
                        </CardContent>
                      </Card>
                    </button>
                  )
                })}
              </div>

              {/* Detail panel (matches your “second image” layout idea) */}
              {activeSubject ? (
                <>
                  <Separator className="my-6" />

                  <Card className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-3">
                          <div className="grid h-11 w-11 place-items-center rounded-xl border bg-muted/30">
                            <SubjectIcon kind={activeSubject.icon} />
                          </div>
                          <div className="min-w-0">
                            <div className="truncate text-base font-semibold">
                              {activeSubject.title}
                            </div>
                            <div className="line-clamp-2 text-sm text-muted-foreground">
                              {activeSubject.description}
                            </div>
                          </div>
                        </div>

                        <div className="w-full max-w-sm rounded-xl border bg-muted/20 p-3 md:w-[340px]">
                          <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                            <span>
                              <span className="tabular-nums">
                                {activeSubject.progressPct}%
                              </span>{" "}
                              Completed
                            </span>
                            <span className="text-muted-foreground">
                              Faculty-marked
                            </span>
                          </div>
                          <SegmentedProgress value={activeSubject.progressPct} />
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <Tabs defaultValue="notes" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="notes">Notes</TabsTrigger>
                          <TabsTrigger value="sessions">
                            Upcoming Sessions
                          </TabsTrigger>
                          <TabsTrigger value="assessments">
                            Assessments
                          </TabsTrigger>
                          <TabsTrigger value="about">About</TabsTrigger>
                        </TabsList>

                        {/* NOTES */}
                        <TabsContent value="notes" className="mt-4">
                          <div className="grid gap-4 lg:grid-cols-12">
                            <div className="lg:col-span-8">
                              <div className="mb-3 flex items-center justify-between">
                                <div>
                                  <div className="text-sm font-semibold">
                                    Notes & Downloads
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Keep it clean: title, format, updated date,
                                    download.
                                  </div>
                                </div>
                                <Button variant="secondary" size="sm">
                                  <Paperclip className="mr-2 h-4 w-4" />
                                  Upload note
                                </Button>
                              </div>

                              <div className="space-y-3">
                                {NOTES.filter(
                                  (n) => n.subjectId === activeSubject.id
                                ).map((n) => (
                                  <div
                                    key={n.id}
                                    className="flex items-center justify-between rounded-xl border bg-background p-4"
                                  >
                                    <div className="min-w-0">
                                      <div className="truncate text-sm font-medium">
                                        {n.title}
                                      </div>
                                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                        <FileFormatBadge format={n.format} />
                                        <span>•</span>
                                        <span className="tabular-nums">
                                          {n.sizeLabel}
                                        </span>
                                        <span>•</span>
                                        <span>
                                          Updated {formatPrettyDate(n.updatedAt)}
                                        </span>
                                      </div>
                                    </div>
                                    <Button size="sm" variant="outline">
                                      <Download className="mr-2 h-4 w-4" />
                                      Download
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="lg:col-span-4">
                              <div className="rounded-xl border bg-muted/20 p-4">
                                <div className="text-sm font-semibold">
                                  Quick summary
                                </div>
                                <div className="mt-2 space-y-2 text-sm text-muted-foreground">
                                  <div className="flex items-center justify-between">
                                    <span>Total notes</span>
                                    <span className="tabular-nums text-foreground">
                                      {
                                        NOTES.filter(
                                          (n) => n.subjectId === activeSubject.id
                                        ).length
                                      }
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span>Assignments</span>
                                    <span className="tabular-nums text-foreground">
                                      {activeSubject.assignments}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span>Units</span>
                                    <span className="tabular-nums text-foreground">
                                      {activeSubject.units}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        {/* UPCOMING SESSIONS */}
                        <TabsContent value="sessions" className="mt-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-semibold">
                                Upcoming sessions
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Minimal list, easy to scan.
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Calendar className="mr-2 h-4 w-4" />
                              View calendar
                            </Button>
                          </div>

                          <Separator className="my-4" />

                          <div className="space-y-3">
                            {SESSIONS.filter(
                              (s) => s.subjectId === activeSubject.id
                            ).map((s) => (
                              <div
                                key={s.id}
                                className="flex items-start gap-4 rounded-xl border bg-background p-4"
                              >
                                <div className="w-16 shrink-0 text-center">
                                  <div className="text-xl font-semibold tabular-nums">
                                    {formatPrettyDate(s.date).split(" ")[0]}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {formatPrettyDate(s.date).split(" ")[1]}
                                  </div>
                                </div>

                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2">
                                    <div className="truncate text-sm font-semibold">
                                      {s.title}
                                    </div>
                                    {s.mandatory ? (
                                      <Badge variant="secondary">Mandatory</Badge>
                                    ) : null}
                                  </div>
                                  <div className="mt-1 text-xs text-muted-foreground">
                                    {s.time}
                                  </div>
                                </div>

                                <Button variant="secondary" size="sm">
                                  Add reminder
                                </Button>
                              </div>
                            ))}
                          </div>
                        </TabsContent>

                        {/* ASSESSMENTS */}
                        <TabsContent value="assessments" className="mt-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-semibold">
                                Assessments
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Students upload submissions here.
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Upload className="mr-2 h-4 w-4" />
                              Upload submission
                            </Button>
                          </div>

                          <Separator className="my-4" />

                          <div className="grid gap-4 lg:grid-cols-12">
                            <div className="lg:col-span-7">
                              <div className="space-y-3">
                                {ASSESSMENTS.filter(
                                  (a) => a.subjectId === activeSubject.id
                                ).map((a) => (
                                  <div
                                    key={a.id}
                                    className="rounded-xl border bg-background p-4"
                                  >
                                    <div className="flex items-start justify-between gap-3">
                                      <div className="min-w-0">
                                        <div className="truncate text-sm font-semibold">
                                          {a.title}
                                        </div>
                                        <div className="mt-1 text-xs text-muted-foreground">
                                          Due{" "}
                                          <span className="tabular-nums">
                                            {formatPrettyDate(a.dueDate)}
                                          </span>
                                        </div>
                                      </div>
                                      <Badge variant="secondary">{a.status}</Badge>
                                    </div>

                                    <div className="mt-3 text-sm text-muted-foreground">
                                      {a.instructions}
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                      <Button size="sm">Open</Button>
                                      <Button size="sm" variant="outline">
                                        Upload file
                                      </Button>
                                      <Button size="sm" variant="secondary">
                                        View rubric
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="lg:col-span-5">
                              <div className="rounded-xl border bg-muted/20 p-4">
                                <div className="text-sm font-semibold">
                                  Quick submit (UI)
                                </div>
                                <div className="mt-1 text-xs text-muted-foreground">
                                  Wire it to backend later (S3/Drive/local).
                                </div>

                                <div className="mt-4 space-y-3">
                                  <Input type="file" />
                                  <Textarea
                                    placeholder="Add a short note to the evaluator…"
                                    className="min-h-[90px]"
                                  />
                                  <Button className="w-full">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Submit
                                  </Button>

                                  <div className="rounded-lg border bg-background p-3 text-xs text-muted-foreground">
                                    Tip: enforce max size, allowed types, and
                                    keep file naming consistent.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        {/* ABOUT */}
                        <TabsContent value="about" className="mt-4">
                          <div className="grid gap-4 lg:grid-cols-12">
                            <div className="lg:col-span-8">
                              <div className="rounded-xl border bg-background p-4">
                                <div className="text-sm font-semibold">
                                  Description
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground">
                                  {activeSubject.description}
                                </p>

                                <Separator className="my-4" />

                                <div className="grid gap-3 md:grid-cols-2">
                                  <div className="rounded-lg border bg-muted/20 p-3">
                                    <div className="text-xs text-muted-foreground">
                                      Credits
                                    </div>
                                    <div className="mt-1 text-sm font-semibold tabular-nums">
                                      {activeSubject.credits}
                                    </div>
                                  </div>

                                  <div className="rounded-lg border bg-muted/20 p-3">
                                    <div className="text-xs text-muted-foreground">
                                      University Subject Code
                                    </div>
                                    <div className="mt-1 text-sm font-semibold">
                                      {activeSubject.meta?.universitySubjectCode ??
                                        "—"}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="lg:col-span-4">
                              <div className="rounded-xl border bg-muted/20 p-4">
                                <div className="text-sm font-semibold">
                                  Facilitator
                                </div>
                                <div className="mt-2 text-sm">
                                  {activeSubject.meta?.facilitator ?? "—"}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {activeSubject.meta?.facilitatorEmail ?? ""}
                                </div>

                                <Separator className="my-4" />

                                <div className="text-sm font-semibold">
                                  Key stats
                                </div>
                                <div className="mt-2 space-y-2 text-sm text-muted-foreground">
                                  <div className="flex items-center justify-between">
                                    <span>Assignments</span>
                                    <span className="tabular-nums text-foreground">
                                      {activeSubject.assignments}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span>Units</span>
                                    <span className="tabular-nums text-foreground">
                                      {activeSubject.units}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span>Progress</span>
                                    <span className="tabular-nums text-foreground">
                                      {activeSubject.progressPct}%
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </>
              ) : null}
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}