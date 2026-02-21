"use client"

import * as React from "react"
import Link from "next/link"
import {
    ArrowLeft,
    Calendar,
    ChevronRight,
    Download,
    FileText,
    Layers,
    ListChecks,
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
import { useParams } from "next/navigation"

type Semester = { id: string; name: string; isCurrent?: boolean }

type Subject = {
    id: string
    semesterId: string
    title: string
    description: string
    credits: number
    assignments: number
    units: number
    progressPct: number
}

const SEMESTERS: Semester[] = [
    { id: "sem-6", name: "Semester 6", isCurrent: true },
    { id: "sem-5", name: "Semester 5" },
    { id: "sem-4", name: "Semester 4" },
    { id: "sem-3", name: "Semester 3" },
    { id: "sem-2", name: "Semester 2" },
    { id: "sem-1", name: "Semester 1" },
]

const SUBJECTS: Subject[] = [
    {
        id: "discovering-self",
        semesterId: "sem-6",
        title: "Discovering Self",
        description:
            "An experiential journey for engineers to decode internal architecture and self-awareness.",
        credits: 3,
        assignments: 2,
        units: 32,
        progressPct: 34,
    },
    {
        id: "fundamentals-business",
        semesterId: "sem-6",
        title: "Fundamentals of Business Management",
        description:
            "Intro to business thinking: strategy, planning, market basics, and execution foundations.",
        credits: 3,
        assignments: 1,
        units: 33,
        progressPct: 12,
    },
    {
        id: "formal-language-automata",
        semesterId: "sem-6",
        title: "Formal Language and Automata Theory",
        description:
            "How computers process languages: models, grammars, and automata foundations.",
        credits: 4,
        assignments: 3,
        units: 56,
        progressPct: 25,
    },
    {
        id: "computer-networks",
        semesterId: "sem-6",
        title: "Computer Networks",
        description:
            "Network layers, protocols, routing, reliability, and real-world data transport.",
        credits: 4,
        assignments: 2,
        units: 58,
        progressPct: 27,
    },
    {
        id: "work-integration-vi",
        semesterId: "sem-6",
        title: "Integrated Work with a Partner Company VI",
        description:
            "Structured workplace-style track simulating professional work integration outcomes.",
        credits: 8,
        assignments: 0,
        units: 199,
        progressPct: 0,
    },
]

function DotCanvas({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative rounded-2xl border bg-background p-6">
            <div
                className="absolute inset-0 -z-10 rounded-2xl"
                style={{
                    backgroundImage:
                        "radial-gradient(hsl(var(--border)) 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                    opacity: 0.35,
                }}
            />
            {children}
        </div>
    )
}

function SegmentedProgress({ value }: { value: number }) {
    const v = Math.max(0, Math.min(100, value))
    return (
        <div className="space-y-2">
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                    className="absolute inset-0 opacity-60"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px)",
                        backgroundSize: "10px 100%",
                    }}
                />
                <div
                    className="absolute left-0 top-0 h-full rounded-full bg-foreground/70"
                    style={{ width: `${v}%` }}
                />
            </div>
            <div className="text-xs text-muted-foreground tabular-nums">
                {v}% Completed
            </div>
        </div>
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
        <TooltipProvider delayDuration={120}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{icon}</span>
                        <span className="text-foreground tabular-nums">{value}</span>
                    </div>
                </TooltipTrigger>
                <TooltipContent className="text-xs">{label}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

function SemesterSidebar({
    activeSemesterId,
    setActiveSemesterId,
    subjectId,
    query,
    setQuery,
}: {
    activeSemesterId: string
    setActiveSemesterId: (id: string) => void
    subjectId: string
    query: string
    setQuery: (v: string) => void
}) {
    const subjects = React.useMemo(() => {
        const list = SUBJECTS.filter((s) => s.semesterId === activeSemesterId)
        const q = query.trim().toLowerCase()
        if (!q) return list
        return list.filter((s) => s.title.toLowerCase().includes(q))
    }, [activeSemesterId, query])

    return (
        <Card className="overflow-hidden">
            <CardHeader className="pb-3">
                <div className="text-sm font-semibold">Semesters</div>
                <div className="text-xs text-muted-foreground">Select to filter</div>
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
                                        ? "bg-muted/40 border-foreground/15 shadow-sm"
                                        : "hover:bg-muted/20",
                                ].join(" ")}
                            >
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <div className="truncate text-sm font-medium">{s.name}</div>
                                        {s.isCurrent ? (
                                            <Badge variant="secondary" className="h-5 rounded-md">
                                                Current
                                            </Badge>
                                        ) : null}
                                    </div>
                                    <div className="mt-0.5 text-xs text-muted-foreground">
                                        {s.isCurrent ? "Active term" : "Past term"}
                                    </div>
                                </div>
                                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-40 group-hover:opacity-100" />
                            </button>
                        )
                    })}
                </div>

                <Separator className="my-4" />

                <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search subjects…"
                        className="h-9 pl-9"
                    />
                </div>

                <div className="mt-3 space-y-1">
                    <div className="px-1 text-xs font-medium text-muted-foreground">
                        Subjects
                    </div>
                    {subjects.slice(0, 10).map((s) => {
                        const active = s.id === subjectId
                        return (
                            <Link
                                key={s.id}
                                href={`/student/${s.id}`}
                                className={[
                                    "block rounded-lg px-2 py-2 text-sm transition",
                                    active
                                        ? "bg-muted/40 text-foreground"
                                        : "text-muted-foreground hover:bg-muted/20 hover:text-foreground",
                                ].join(" ")}
                            >
                                <div className="line-clamp-1">{s.title}</div>
                            </Link>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}

export default function LivebookSubjectPage() {
    const params = useParams()
    const subject =
        SUBJECTS.find((s) => s.id === params.subjectId) ?? SUBJECTS[0]

    const [activeSemesterId, setActiveSemesterId] = React.useState(subject.semesterId)
    const [query, setQuery] = React.useState("")

    return (
        <div className="min-h-screen bg-background">
            {/* Top header */}
            <div className="border-b">
                <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
                    <div className="leading-tight">
                        <div className="text-sm text-muted-foreground">Student</div>
                        <div className="text-xl font-semibold">Livebooks</div>
                    </div>
                </div>
            </div>

            <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-6 py-6">
                {/* Sidebar */}
                <aside className="col-span-12 md:col-span-3">
                    <SemesterSidebar
                        activeSemesterId={activeSemesterId}
                        setActiveSemesterId={setActiveSemesterId}
                        subjectId={subject.id}
                        query={query}
                        setQuery={setQuery}
                    />
                </aside>

                {/* Main */}
                <main className="col-span-12 md:col-span-9">
                    <DotCanvas>
                        <Link
                            href="/student/"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to subjects
                        </Link>

                        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            <div className="space-y-2">
                                <div className="text-2xl font-semibold">{subject.title}</div>
                                <div className="max-w-2xl text-sm text-muted-foreground">
                                    {subject.description}
                                </div>

                                <div className="mt-3 flex flex-wrap items-center gap-6 border-t pt-3">
                                    <Stat
                                        icon={<Sparkles className="h-4 w-4 text-muted-foreground" />}
                                        label="Credits"
                                        value={subject.credits}
                                    />
                                    <Stat
                                        icon={<ListChecks className="h-4 w-4 text-muted-foreground" />}
                                        label="Assignments"
                                        value={subject.assignments}
                                    />
                                    <Stat
                                        icon={<Layers className="h-4 w-4 text-muted-foreground" />}
                                        label="Units"
                                        value={subject.units}
                                    />
                                </div>
                            </div>

                            <div className="w-full max-w-sm rounded-xl border bg-muted/20 p-4">
                                <SegmentedProgress value={subject.progressPct} />
                            </div>
                        </div>

                        <Separator className="my-6" />

                        <Card>
                            <CardHeader className="pb-3">
                                <div className="text-sm font-semibold">Subject Workspace</div>
                                <div className="text-xs text-muted-foreground">
                                    Notes • Upcoming sessions • Assessments • About
                                </div>
                            </CardHeader>

                            <CardContent>
                                <Tabs defaultValue="notes">
                                    <TabsList className="grid w-full grid-cols-4">
                                        <TabsTrigger value="notes">Notes</TabsTrigger>
                                        <TabsTrigger value="sessions">Sessions</TabsTrigger>
                                        <TabsTrigger value="assessments">Assessments</TabsTrigger>
                                        <TabsTrigger value="about">About</TabsTrigger>
                                    </TabsList>

                                    {/* NOTES */}
                                    <TabsContent value="notes" className="mt-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm font-semibold">Downloads</div>
                                            <Button variant="outline" size="sm">
                                                <Upload className="mr-2 h-4 w-4" />
                                                Upload
                                            </Button>
                                        </div>

                                        <div className="rounded-xl border p-4">
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="min-w-0">
                                                    <div className="text-sm font-medium">
                                                        Module Pack — Overview
                                                    </div>
                                                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                                        <Badge variant="secondary" className="rounded-md">
                                                            PDF
                                                        </Badge>
                                                        <span>•</span>
                                                        <span>Updated recently</span>
                                                    </div>
                                                </div>
                                                <Button size="sm" variant="outline">
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Download
                                                </Button>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    {/* SESSIONS */}
                                    <TabsContent value="sessions" className="mt-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm font-semibold">Upcoming</div>
                                            <Button variant="outline" size="sm">
                                                <Calendar className="mr-2 h-4 w-4" />
                                                View calendar
                                            </Button>
                                        </div>

                                        <div className="grid gap-3 md:grid-cols-2">
                                            <div className="rounded-xl border p-4">
                                                <div className="text-sm font-semibold">
                                                    Session — Concepts + Q&A
                                                </div>
                                                <div className="mt-1 text-xs text-muted-foreground">
                                                    27 Feb • 11:30 AM - 12:30 PM
                                                </div>
                                            </div>
                                            <div className="rounded-xl border p-4">
                                                <div className="text-sm font-semibold">
                                                    Session — Practice Workshop
                                                </div>
                                                <div className="mt-1 text-xs text-muted-foreground">
                                                    28 Feb • 1:15 PM - 2:10 PM
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    {/* ASSESSMENTS */}
                                    <TabsContent value="assessments" className="mt-4 space-y-4">
                                        <div className="rounded-xl border p-4">
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <div className="text-sm font-semibold">
                                                        Assessment — Submission
                                                    </div>
                                                    <div className="mt-1 text-xs text-muted-foreground">
                                                        Due soon
                                                    </div>
                                                </div>
                                                <Badge variant="secondary">Not Started</Badge>
                                            </div>

                                            <div className="mt-3 text-sm text-muted-foreground">
                                                Upload your file and add a short note for evaluation.
                                            </div>

                                            <div className="mt-4 grid gap-3 md:grid-cols-2">
                                                <Input type="file" />
                                                <Textarea placeholder="Note to evaluator…" />
                                            </div>

                                            <div className="mt-3 flex gap-2">
                                                <Button size="sm">
                                                    <Upload className="mr-2 h-4 w-4" />
                                                    Submit
                                                </Button>
                                                <Button size="sm" variant="outline">
                                                    <FileText className="mr-2 h-4 w-4" />
                                                    View rubric
                                                </Button>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    {/* ABOUT */}
                                    <TabsContent value="about" className="mt-4 space-y-3">
                                        <div className="rounded-xl border p-4">
                                            <div className="text-sm font-semibold">Description</div>
                                            <div className="mt-2 text-sm text-muted-foreground">
                                                {subject.description}
                                            </div>
                                        </div>

                                        <div className="rounded-xl border p-4">
                                            <div className="text-sm font-semibold">Meta</div>
                                            <div className="mt-2 text-sm text-muted-foreground">
                                                Credits: {subject.credits} • Units: {subject.units} •
                                                Assignments: {subject.assignments}
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </DotCanvas>
                </main>
            </div>
        </div>
    )
}