"use client"

import * as React from "react"
import Link from "next/link"
import { useMemo, useState } from "react"
import {
  Award,
  BookOpen,
  ChevronRight,
  FileText,
  GraduationCap,
  Layers,
  ListChecks,
  Search,
  Sparkles,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Semester = {
  id: string
  name: string
  isCurrent?: boolean
  summary?: string
}

type Subject = {
  id: string
  semesterId: string
  title: string
  description: string
  credits: number
  assignments: number
  units: number
  progressPct: number // 0..100
}

const SEMESTERS: Semester[] = [
  { id: "sem-6", name: "Semester 6", isCurrent: true, summary: "Current term" },
  { id: "sem-5", name: "Semester 5", summary: "Past term" },
  { id: "sem-4", name: "Semester 4", summary: "Past term" },
  { id: "sem-3", name: "Semester 3", summary: "Past term" },
  { id: "sem-2", name: "Semester 2", summary: "Past term" },
  { id: "sem-1", name: "Semester 1", summary: "Past term" },
]

const SUBJECTS: Subject[] = [
  {
    id: "sub-discovering-self",
    semesterId: "sem-6",
    title: "Discovering Self",
    description:
      "An experiential journey to decode internal architecture, build self-awareness, and sharpen communication.",
    credits: 3,
    assignments: 0,
    units: 32,
    progressPct: 34,
  },
  {
    id: "sub-business-models",
    semesterId: "sem-6",
    title: "Fundamentals of Business Management",
    description:
      "Intro to business thinking: strategy, planning, marketing basics, and real-world product foundations.",
    credits: 3,
    assignments: 1,
    units: 33,
    progressPct: 12,
  },
  {
    id: "sub-fla",
    semesterId: "sem-6",
    title: "Formal Language and Automata Theory",
    description:
      "Languages, grammars, automata, and how computation models work behind the scenes.",
    credits: 4,
    assignments: 3,
    units: 56,
    progressPct: 25,
  },
  {
    id: "sub-cn",
    semesterId: "sem-6",
    title: "Computer Networks",
    description:
      "Network layers, protocols, routing, reliability, and practical networking foundations.",
    credits: 4,
    assignments: 2,
    units: 58,
    progressPct: 27,
  },
  {
    id: "sub-iw",
    semesterId: "sem-6",
    title: "Integrated Work with a Partner Company VI",
    description:
      "Structured workplace-style track simulating professional work, planning, communication, and delivery.",
    credits: 8,
    assignments: 0,
    units: 199,
    progressPct: 0,
  },

  // Add a few for older semesters (optional)
  {
    id: "sub-dbms",
    semesterId: "sem-5",
    title: "DBMS",
    description:
      "Relational modeling, SQL foundations, normalization, indexing basics, and transactions.",
    credits: 4,
    assignments: 4,
    units: 44,
    progressPct: 86,
  },
  {
    id: "sub-os",
    semesterId: "sem-4",
    title: "Operating Systems",
    description:
      "Processes, scheduling, memory management, file systems, and concurrency primitives.",
    credits: 4,
    assignments: 3,
    units: 52,
    progressPct: 73,
  },
]

function SegmentedProgress({ value }: { value: number }) {
  const total = 18
  const filled = Math.round((Math.min(100, Math.max(0, value)) / 100) * total)

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="w-full">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Progress</span>
              <span>{Math.round(value)}%</span>
            </div>

            <div className="mt-2 flex gap-1">
              {Array.from({ length: total }).map((_, i) => (
                <div
                  key={i}
                  className={[
                    "h-2 flex-1 rounded-sm border",
                    i < filled
                      ? "bg-primary/80 border-primary/30"
                      : "bg-muted/40 border-border",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="text-xs">
          Faculty marked progress: {Math.round(value)}%
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: number
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="text-muted-foreground">{icon}</span>
            <span className="tabular-nums">{value}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="text-xs">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function SubjectCard({ s }: { s: Subject }) {
  return (
    <Link href={`/student/${s.id}`} className="block h-full">
      <Card className="h-full rounded-sm border bg-card transition hover:bg-muted/10">
        <div className="flex h-full flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="line-clamp-2 text-sm font-semibold leading-snug">
                  {s.title}
                </div>
                <div className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {s.description}
                </div>
              </div>

              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-sm border bg-background">
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="mt-auto pt-0">
            <Separator className="my-3" />
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <Stat
                  icon={<Award className="h-4 w-4" />}
                  label="Credits"
                  value={s.credits}
                />
                <Stat
                  icon={<ListChecks className="h-4 w-4" />}
                  label="Assignments"
                  value={s.assignments}
                />
                <Stat
                  icon={<Layers className="h-4 w-4" />}
                  label="Units"
                  value={s.units}
                />
              </div>

              <div className="w-[160px]">
                <SegmentedProgress value={s.progressPct} />
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}

export default function LivebooksPage() {
  const defaultSem = SEMESTERS.find((s) => s.isCurrent)?.id ?? SEMESTERS[0].id
  const [selectedSemesterId, setSelectedSemesterId] = useState(defaultSem)
  const [q, setQ] = useState("")

  const selectedSemester = useMemo(
    () => SEMESTERS.find((s) => s.id === selectedSemesterId),
    [selectedSemesterId]
  )

  const filteredSubjects = useMemo(() => {
    const base = SUBJECTS.filter((s) => s.semesterId === selectedSemesterId)
    if (!q.trim()) return base
    const t = q.trim().toLowerCase()
    return base.filter(
      (s) =>
        s.title.toLowerCase().includes(t) ||
        s.description.toLowerCase().includes(t)
    )
  }, [selectedSemesterId, q])

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-6">
          {/* Header */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Student</div>
              <div className="text-2xl font-semibold tracking-tight">
                Livebooks
              </div>
            </div>

            <div className="relative w-full md:w-[360px]">
              <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="rounded-sm pl-9"
                placeholder="Search subjects..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </div>

          <Separator className="my-6" />

          {/* Layout */}
          <div className="grid grid-cols-12 gap-6">
            {/* Sidebar */}
            <aside className="col-span-12 md:col-span-4 lg:col-span-3">
              <Card className="rounded-sm">
                <CardHeader className="pb-3">
                  <div className="text-sm font-semibold">Semesters</div>
                  <div className="text-xs text-muted-foreground">
                    Select to filter
                  </div>
                </CardHeader>

                <CardContent className="space-y-2">
                  {SEMESTERS.map((s) => {
                    const active = s.id === selectedSemesterId
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSelectedSemesterId(s.id)}
                        className={[
                          "group flex w-full items-center justify-between rounded-sm border px-3 py-2 text-left transition",
                          active
                            ? "bg-accent border-primary/30 ring-1 ring-primary/15"
                            : "hover:bg-muted/30",
                        ].join(" ")}
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="truncate text-sm font-medium">
                              {s.name}
                            </div>
                            {s.isCurrent ? (
                              <Badge
                                variant="secondary"
                                className="rounded-sm text-[11px]"
                              >
                                Current
                              </Badge>
                            ) : null}
                          </div>
                          {s.summary ? (
                            <div className="truncate text-xs text-muted-foreground">
                              {s.summary}
                            </div>
                          ) : null}
                        </div>

                        <ChevronRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5" />
                      </button>
                    )
                  })}
                </CardContent>
              </Card>

              <div className="mt-4 rounded-sm border bg-muted/20 p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                  Quick tip
                </div>
                <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Keep cards consistent: short descriptions + clear stats + tidy
                  progress.
                </div>
              </div>
            </aside>

            {/* Main */}
            <main className="col-span-12 md:col-span-8 lg:col-span-9">
              <Card className="rounded-sm">
                <CardHeader className="pb-2">
                  <div className="text-lg font-semibold">
                    {selectedSemester?.name ?? "Semester"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Subjects in this semester
                  </div>
                </CardHeader>

                <CardContent>
                  {filteredSubjects.length === 0 ? (
                    <div className="rounded-sm border bg-muted/20 p-6">
                      <div className="text-sm font-medium">No subjects found</div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        Try a different search or choose another semester.
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {filteredSubjects.map((s) => (
                        <SubjectCard key={s.id} s={s} />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </main>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}