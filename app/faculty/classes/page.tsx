"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import {
  BookOpen,
  Users,
  ListChecks,
  FileText,
  Search,
} from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

type Offering = {
  id: string
  subjectTitle: string
  className: string
  semester: string
  totalStudents: number
  assignments: number
  pendingSubmissions: number
}

const OFFERINGS: Offering[] = [
  {
    id: "off-1",
    subjectTitle: "Computer Networks",
    className: "BCA Sem 6 • Section A",
    semester: "Semester 6",
    totalStudents: 58,
    assignments: 3,
    pendingSubmissions: 12,
  },
  {
    id: "off-2",
    subjectTitle: "Formal Language & Automata",
    className: "BCA Sem 6 • Section B",
    semester: "Semester 6",
    totalStudents: 61,
    assignments: 2,
    pendingSubmissions: 4,
  },
]

function Stat({ icon, value }: { icon: React.ReactNode; value: number }) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      {icon}
      <span className="tabular-nums">{value}</span>
    </div>
  )
}

export default function TeacherPage() {
  const [q, setQ] = useState("")

  const filtered = useMemo(() => {
    if (!q.trim()) return OFFERINGS
    return OFFERINGS.filter(
      (o) =>
        o.subjectTitle.toLowerCase().includes(q.toLowerCase()) ||
        o.className.toLowerCase().includes(q.toLowerCase())
    )
  }, [q])

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1200px] px-6 py-6">
        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Teacher</div>
            <div className="text-2xl font-semibold tracking-tight">
              My Classes
            </div>
          </div>

          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9 rounded-sm"
              placeholder="Search class or subject..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>

        <Separator className="my-6" />

        {/* Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((o) => (
            <Link key={o.id} href={`/teacher/${o.id}`}>
              <Card className="rounded-sm border hover:bg-muted/10 transition h-full">
                <CardHeader className="pb-2">
                  <div className="text-sm font-semibold line-clamp-2">
                    {o.subjectTitle}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {o.className}
                  </div>
                  <div className="mt-2">
                    <Badge variant="secondary" className="rounded-sm text-[11px]">
                      {o.semester}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="mt-auto">
                  <Separator className="my-3" />
                  <div className="flex items-center justify-between">
                    <Stat
                      icon={<Users className="h-4 w-4" />}
                      value={o.totalStudents}
                    />
                    <Stat
                      icon={<ListChecks className="h-4 w-4" />}
                      value={o.assignments}
                    />
                    <Stat
                      icon={<FileText className="h-4 w-4" />}
                      value={o.pendingSubmissions}
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}