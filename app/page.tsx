// app/student/page.tsx
"use client"

/**
 * Updated to match your latest screenshot request:
 * ✅ First column contains BOTH Profile + Schedule card (stacked, same column width)
 * ✅ Right column is ONLY the Apps grid (improved spacing + tile styling)
 * ✅ Minimal, not dense, Kalvium/EduTex style
 */

import * as React from "react"
import Link from "next/link"
import {
  BookOpen,
  Mail,
  CalendarDays,
  MessageCircle,
  LifeBuoy,
  GraduationCap,
  BadgeCheck,
  ClipboardList,
  IdCard,
  LayoutGrid,
  ClipboardCheck,
  Info,
  ExternalLink,
  ChevronRight,
  Coffee,
  User,
  Search,
  Bell,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// ------------------------------
// Demo data (API-ready)
// ------------------------------
type AppTile = {
  id: string
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  external?: boolean
}

type ScheduleItem = {
  id: string
  start: string
  end: string
  title: string
  hostEmail?: string
  description?: string
  statusTag?: "Absent" | "Present" | "Info"
}

const demo = {
  brand: "EduTex",
  user: {
    fullName: "Kopperun Silambazhagii",
    cohort: "Squad 50",
    batch: "Class of 2027",
    program: "BCA (Hons) With Specialization in Software Product Engineering",
    college: "Yenepoya University",
  },
  appsTitle: "Your EduTex Apps",
  apps: [
    { id: "a1", label: "Livebooks", href: "/student/livebooks", icon: BookOpen },
    { id: "a2", label: "Dojo", href: "/student/dojo", icon: BadgeCheck },
    { id: "a3", label: "Mail", href: "/student/mail", icon: Mail },
    { id: "a4", label: "Chat", href: "/student/chat", icon: MessageCircle },
    { id: "a5", label: "Calendar", href: "/student/calendar", icon: CalendarDays },
    { id: "a6", label: "EduTex Support", href: "/student/support", icon: LifeBuoy },
    { id: "a7", label: "Markers", href: "/student/markers", icon: ClipboardCheck },
    { id: "a8", label: "My Internships", href: "/student/internships", icon: GraduationCap },
    { id: "a9", label: "Showcase", href: "/student/showcase", icon: LayoutGrid },
    { id: "a10", label: "Attendance Hub", href: "/student/attendance", icon: IdCard },
    { id: "a11", label: "Attempts Corner", href: "/student/attempts", icon: ClipboardList },
    { id: "a12", label: "Info Center", href: "/student/info", icon: Info },
  ] satisfies AppTile[],
  myDay: {
    viewAllHref: "/student/schedule",
    items: [
      {
        id: "s1",
        start: "9:30 AM",
        end: "10:30 AM",
        title: "Growth Hour",
        hostEmail: "leela.krishna@edutex.com",
        description: "Growth! Growth! Growth!",
        statusTag: "Absent",
      },
      {
        id: "s2",
        start: "10:30 AM",
        end: "11:30 AM",
        title: "Fundamentals of Business Models",
        hostEmail: "mentor@edutex.com",
        description: "Basics of business thinking and product foundations.",
        statusTag: "Info",
      },
      {
        id: "s3",
        start: "11:30 AM",
        end: "12:30 PM",
        title: "Discovering Self",
        hostEmail: "coach@edutex.com",
        description: "Reflection + communication exercises.",
        statusTag: "Info",
      },
    ] satisfies ScheduleItem[],
  },
}

// ------------------------------
// Helpers
// ------------------------------
function subtleCardClass() {
  return "rounded-none border border-border bg-background shadow-none"
}

function gridPaperStyle(opacity = 0.35) {
  return {
    backgroundImage:
      "linear-gradient(to right, rgba(15, 23, 42, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.06) 1px, transparent 1px)",
    backgroundSize: "26px 26px",
    opacity,
  } as React.CSSProperties
}

function dottedPaperStyle() {
  return {
    backgroundImage: "radial-gradient(rgba(15, 23, 42, 0.12) 1px, transparent 1px)",
    backgroundSize: "18px 18px",
  } as React.CSSProperties
}

// ------------------------------
// Page
// ------------------------------
export default function StudentDashboardEduTex() {
  const [activeId, setActiveId] = React.useState<string | null>(
    demo.myDay.items.length ? demo.myDay.items[0].id : null
  )
  const active = demo.myDay.items.find((x) => x.id === activeId) ?? null

  return (
    <div className="min-h-screen bg-background">
 

      {/* Accent line */}
      <div className="h-1 w-full bg-red-500" />

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Two columns like the reference:
            Left column: Profile + Schedule
            Right column: Apps grid */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 space-y-8">
            {/* Profile */}
            <Card className={`${subtleCardClass()} overflow-hidden`}>
              <div className="relative">
                <div className="absolute inset-0" style={gridPaperStyle()} />
                <CardContent className="relative p-10">
                  <div className="flex items-start justify-between gap-8">
                    <div className="min-w-0">
                      <h1 className="text-3xl font-semibold tracking-tight">
                        Hi {demo.user.fullName} <span className="align-middle">👋</span>
                      </h1>

                      <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {demo.user.cohort}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          {demo.user.batch}
                        </span>
                      </div>

                      <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="rounded-none shrink-0">
                            Program
                          </Badge>
                          <div className="leading-relaxed">{demo.user.program}</div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="rounded-none shrink-0">
                            College
                          </Badge>
                          <div className="leading-relaxed">{demo.user.college}</div>
                        </div>
                      </div>
                    </div>

                    {/* Logo box */}
                    <div className="shrink-0">
                      <div className="rounded-none border border-border bg-background p-4">
                        <div className="h-16 w-16 rounded-none border border-border bg-muted/40 flex items-center justify-center">
                          <span className="text-[10px] text-muted-foreground">LOGO</span>
                        </div>
                        <div className="mt-3 text-center text-[10px] font-medium text-muted-foreground tracking-wide">
                          UNIVERSITY
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>

            {/* Schedule (same column, fits under profile) */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-semibold">My Day</div>
                <Button asChild variant="ghost" className="rounded-none px-2 text-muted-foreground">
                  <Link href={demo.myDay.viewAllHref} className="inline-flex items-center gap-1">
                    View Schedule <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <Card className={`${subtleCardClass()} overflow-hidden`}>
                <div className="relative" style={dottedPaperStyle()}>
                  <div className="grid md:grid-cols-12">
                    {/* Left list */}
                    <div className="md:col-span-4 border-r border-border bg-background/70">
                      {demo.myDay.items.length === 0 ? (
                        <div className="p-6 text-sm text-muted-foreground">No sessions today.</div>
                      ) : (
                        <div>
                          {demo.myDay.items.map((item) => {
                            const isActive = item.id === activeId
                            return (
                              <button
                                key={item.id}
                                onClick={() => setActiveId(item.id)}
                                className={[
                                  "w-full text-left p-5 transition",
                                  "border-b border-border",
                                  isActive ? "bg-background" : "hover:bg-muted/40",
                                ].join(" ")}
                              >
                                <div className="text-sm text-muted-foreground">
                                  {item.start} - {item.end}
                                </div>
                                <div className="mt-2 text-sm font-semibold">{item.title}</div>
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>

                    {/* Right details */}
                    <div className="md:col-span-8">
                      {demo.myDay.items.length === 0 ? (
                        <div className="flex min-h-[280px] items-center justify-center p-10">
                          <div className="text-center">
                            <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-none border border-border bg-background">
                              <Coffee className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="mt-3 text-sm text-muted-foreground">
                              Looks like nothing is planned
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="min-h-[280px] p-8">
                          {active ? (
                            <>
                              <div className="text-lg font-semibold">{active.title}</div>

                              <div className="mt-2 space-y-2 text-sm text-muted-foreground">
                                {active.hostEmail ? (
                                  <div className="inline-flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>{active.hostEmail}</span>
                                  </div>
                                ) : null}
                                {active.description ? <div>{active.description}</div> : null}
                              </div>

                              <div className="mt-8">
                                {active.statusTag === "Absent" ? (
                                  <div className="space-y-2 text-sm">
                                    <div className="inline-flex items-center gap-2 text-muted-foreground">
                                      <span className="h-2 w-2 rounded-full bg-muted-foreground/60" />
                                      Absent
                                    </div>
                                    <div className="text-muted-foreground">
                                      Ah! You&apos;re marked as absent. Please reach out to your mentor
                                      if you think it is a mistake.
                                    </div>
                                  </div>
                                ) : active.statusTag ? (
                                  <Badge variant="outline" className="rounded-none">
                                    {active.statusTag}
                                  </Badge>
                                ) : null}
                              </div>
                            </>
                          ) : null}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* RIGHT COLUMN: Improved apps grid */}
          <div className="lg:col-span-4">
            <div className="mb-3 text-sm font-medium text-muted-foreground">{demo.appsTitle}</div>

            {/* Improvements:
                - consistent tile size
                - subtle hover
                - icon centered
                - label bar like reference
                - better spacing/padding */}
            <div className="grid grid-cols-3 gap-4">
              {demo.apps.map((app) => (
                <ImprovedAppTile key={app.id} app={app} />
              ))}
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

// ------------------------------
// Improved App Tile (better UX)
// ------------------------------
function ImprovedAppTile({ app }: { app: AppTile }) {
  const Icon = app.icon

  const tile = (
    <div className="group rounded">
      <div className="aspect-square rounded w-full border border-border bg-accent flex items-center justify-center transition group-hover:bg-muted/45">
        <Icon className="h-7 w-7 text-muted-foreground transition group-hover:text-foreground" />
      </div>
      <div className="border border-t-0 border-border bg-background px-2 py-2 text-center">
        <div className="text-[11px] font-medium leading-tight">{app.label}</div>
      </div>
    </div>
  )

  if (app.external) {
    return (
      <a
        href={app.href}
        target="_blank"
        rel="noreferrer"
        className="relative block rounded-none"
        aria-label={app.label}
      >
        {tile}
        <ExternalLink className="pointer-events-none absolute right-2 top-2 h-4 w-4 text-muted-foreground" />
      </a>
    )
  }

  return (
    <Link href={app.href} className="relative block rounded-none" aria-label={app.label}>
      {tile}
    </Link>
  )
}