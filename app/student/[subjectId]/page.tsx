"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
    Calendar,
    ChevronRight,
    Download,
    FileText,
    Layers,
    ListChecks,
    Search,
    Sparkles,
    Upload,
    Clock,
    CheckCircle2,
    BookOpen,
    Play
} from "lucide-react"

import { useParams, useRouter } from "next/navigation"

// --- Types & Dummy Data ---
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
]

const SUBJECTS: Subject[] = [
    {
        id: "discovering-self",
        semesterId: "sem-6",
        title: "Discovering Self",
        description: "An experiential journey for engineers to decode internal architecture and self-awareness.",
        credits: 3, assignments: 2, units: 32, progressPct: 34,
    },
    {
        id: "fundamentals-business",
        semesterId: "sem-6",
        title: "Fundamentals of Business Management",
        description: "Intro to business thinking: strategy, planning, market basics, and execution foundations.",
        credits: 3, assignments: 1, units: 33, progressPct: 12,
    },
    {
        id: "formal-language-automata",
        semesterId: "sem-6",
        title: "Formal Language and Automata Theory",
        description: "How computers process languages: models, grammars, and automata foundations.",
        credits: 4, assignments: 3, units: 56, progressPct: 25,
    },
    {
        id: "computer-networks",
        semesterId: "sem-6",
        title: "Computer Networks",
        description: "Network layers, protocols, routing, reliability, and real-world data transport.",
        credits: 4, assignments: 2, units: 58, progressPct: 27,
    },
]

// --- Components ---

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

    const router = useRouter()

    return (
        <div className="card !p-5 flex flex-col h-full bg-card/60 backdrop-blur-xl">
            <div className="mb-4">
                <h3 className="text-sm font-black text-primary">Semesters</h3>
                <p className="text-xs text-muted-foreground font-semibold">Select term to filter</p>
            </div>

            <div className="space-y-2 mb-6">
                {SEMESTERS.map((s) => {
                    const active = s.id === activeSemesterId
                    return (
                        <button
                            key={s.id}
                            onClick={() => setActiveSemesterId(s.id)}
                            className={`group flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all ${
                                active ? "bg-primary/10 border-primary/30 shadow-sm" : "bg-background border-border hover:bg-accent/50 hover:border-border"
                            }`}
                        >
                            <div>
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className={`text-sm font-black ${active ? "text-primary" : "text-foreground group-hover:text-primary transition-colors"}`}>{s.name}</span>
                                    {s.isCurrent && (
                                        <span className="px-2 py-0.5 bg-primary rounded-md text-[9px] font-black uppercase tracking-widest text-primary-foreground">Current</span>
                                    )}
                                </div>
                                <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                                    {s.isCurrent ? "Active Term" : "Past Term"}
                                </div>
                            </div>
                            <ChevronRight className={`w-4 h-4 ${active ? "text-primary" : "text-muted-foreground group-hover:text-primary group-hover:translate-x-1"} transition-all`} />
                        </button>
                    )
                })}
            </div>

            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search subjects…"
                    className="w-full h-10 pl-9 pr-4 rounded-xl border border-border bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm transition-all"
                />
            </div>

            <div className="flex-1 overflow-y-auto pr-1 space-y-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/20">
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 mt-2 px-1">Subjects List</div>
                {subjects.map((s) => {
                    const active = s.id === subjectId
                    return (
                        <button
                            key={s.id}
                            onClick={() => router.push(`/student/${s.id}`)}
                            className={`w-full text-left rounded-xl px-3 py-2.5 transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                                active ? "bg-primary text-primary-foreground font-bold shadow-md" : "bg-transparent text-foreground hover:bg-accent hover:text-primary font-semibold"
                            }`}
                        >
                            <span className="text-xs line-clamp-1">{s.title}</span>
                        </button>
                    )
                })}
                {subjects.length === 0 && (
                  <div className="text-center p-4 border border-dashed border-border rounded-xl">
                    <p className="text-xs font-semibold text-muted-foreground">No subjects found.</p>
                  </div>
                )}
            </div>
        </div>
    )
}

function StatCard({ icon, label, value, highlight }: { icon: React.ReactNode, label: string, value: number | string, highlight?: boolean }) {
    return (
        <div className={`p-4 rounded-2xl border flex flex-col items-center justify-center text-center transition-all ${
            highlight ? "bg-primary/10 border-primary/20 shadow-sm" : "bg-card border-border/50"
        }`}>
            <div className={`w-8 h-8 rounded-full mb-2 flex items-center justify-center ${highlight ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground"}`}>
                {icon}
            </div>
            <span className={`text-xl font-black mb-0.5 ${highlight ? "text-primary" : "text-foreground"}`}>{value}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</span>
        </div>
    )
}

export default function LivebookSubjectPage() {
    const params = useParams()
    const subjectIdStr = Array.isArray(params.subjectId) ? params.subjectId[0] : params.subjectId
    const subject = SUBJECTS.find((s) => s.id === subjectIdStr) ?? SUBJECTS[0]

    const [activeSemesterId, setActiveSemesterId] = React.useState(subject.semesterId)
    const [query, setQuery] = React.useState("")
    const [activeTab, setActiveTab] = React.useState("notes")

    return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full pb-8">
          
          {/* Sidebar */}
          <div className="md:col-span-3">
              <SemesterSidebar
                  activeSemesterId={activeSemesterId}
                  setActiveSemesterId={setActiveSemesterId}
                  subjectId={subject.id}
                  query={query}
                  setQuery={setQuery}
              />
          </div>

          {/* Main Space */}
          <div className="md:col-span-9 flex flex-col gap-6">
              
              {/* Subject Hero */}
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="card !p-8 bg-gradient-to-br from-card to-accent/20 overflow-hidden relative border-primary/10 shadow-lg">
                  <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
                  
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
                      <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                              <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                                  <BookOpen className="w-6 h-6" />
                              </div>
                              <span className="px-3 py-1 bg-background border border-border rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm text-foreground">
                                  Subject Overview
                              </span>
                          </div>
                          <h1 className="text-3xl font-black tracking-tight mb-2 text-primary">{subject.title}</h1>
                          <p className="text-sm font-semibold text-muted-foreground leading-relaxed max-w-xl">
                              {subject.description}
                          </p>
                      </div>

                      <div className="flex flex-col items-center shrink-0 w-full lg:w-48">
                         <div className="w-32 h-32 relative mb-4">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="64" cy="64" r="56" fill="none" strokeWidth="12" className="stroke-accent" />
                              <circle cx="64" cy="64" r="56" fill="none" strokeWidth="12" className="stroke-primary" strokeLinecap="round" strokeDasharray={`${(subject.progressPct / 100) * 351.8} 351.8`} />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                               <span className="text-2xl font-black">{subject.progressPct}%</span>
                            </div>
                         </div>
                         <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground w-full text-center">Course Completion</p>
                      </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border/50">
                      <StatCard icon={<Sparkles size={16}/>} label="Credits" value={subject.credits} />
                      <StatCard icon={<Layers size={16}/>} label="Units" value={subject.units} />
                      <StatCard icon={<ListChecks size={16}/>} label="Assignments" value={subject.assignments} highlight={subject.assignments > 0} />
                  </div>
              </motion.div>

              {/* Subject Workspace Tabs */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card !p-2 flex-1 flex flex-col min-h-[400px]">
                 
                 <div className="flex overflow-x-auto gap-2 p-2 bg-accent/30 rounded-2xl border border-border/50 mb-4 items-center">
                    {["notes", "sessions", "assessments", "about"].map((tab) => (
                       <button
                         key={tab}
                         onClick={() => setActiveTab(tab)}
                         className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                            activeTab === tab ? "bg-background shadow-md text-primary border border-primary/20 scale-100" : "text-muted-foreground hover:bg-background/50 hover:text-foreground scale-95"
                         }`}
                       >
                          {tab}
                       </button>
                    ))}
                 </div>

                 <div className="flex-1 p-4 relative">
                    <AnimatePresence mode="wait">
                       {/* NOTES VIEW */}
                       {activeTab === "notes" && (
                          <motion.div key="notes" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4 h-full">
                              <div className="flex items-center justify-between mb-2">
                                  <h3 className="font-black text-lg text-foreground">Course Notes & Resources</h3>
                                  <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-xl text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-all">
                                      <Upload size={14} /> Upload Custom Note
                                  </button>
                              </div>
                              <div className="p-4 rounded-2xl border bg-card hover:border-primary/30 transition-colors group flex justify-between items-center shadow-sm">
                                  <div className="flex items-center gap-4">
                                      <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-background transition-colors">
                                          <FileText size={20} />
                                      </div>
                                      <div>
                                          <h4 className="font-extrabold text-sm mb-1">Module Pack — Unit 1 Overview</h4>
                                          <p className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                                             <span className="px-1.5 py-0.5 bg-background rounded border text-[10px] uppercase tracking-widest font-black">PDF</span>
                                             Updated 2 days ago
                                          </p>
                                      </div>
                                  </div>
                                  <button className="w-10 h-10 rounded-full border border-border bg-accent flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all">
                                      <Download size={16} />
                                  </button>
                              </div>
                          </motion.div>
                       )}

                       {/* SESSIONS VIEW */}
                       {activeTab === "sessions" && (
                          <motion.div key="sessions" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">
                              <div className="flex items-center justify-between mb-2">
                                  <h3 className="font-black text-lg text-foreground">Upcoming Sessions</h3>
                                  <button className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-xl text-xs font-bold hover:bg-muted transition-all text-secondary-foreground">
                                      <Calendar size={14} /> View in Calendar
                                  </button>
                              </div>
                              <div className="grid sm:grid-cols-2 gap-4">
                                  <div className="p-5 rounded-2xl border border-border/60 bg-gradient-to-br from-card to-accent/30 shadow-sm relative overflow-hidden">
                                      <div className="absolute top-0 right-0 p-4 opacity-10"><Clock size={48} /></div>
                                      <span className="px-2 py-1 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-lg text-[9px] font-black uppercase tracking-widest inline-block mb-3">Lecture</span>
                                      <h4 className="font-extrabold text-sm mb-2 relative z-10">Concepts & Foundations</h4>
                                      <p className="text-xs font-bold text-muted-foreground flex items-center gap-1.5"><Calendar size={12}/> 27 Feb <span className="mx-1">•</span> <Clock size={12}/> 11:30 AM</p>
                                  </div>
                                  <div className="p-5 rounded-2xl border border-primary/30 bg-primary/5 shadow-sm relative overflow-hidden ring-1 ring-primary/20">
                                      <div className="absolute top-0 right-0 p-4 opacity-10 text-primary"><Play size={48} /></div>
                                      <span className="px-2 py-1 bg-purple-500/10 text-purple-600 border border-purple-500/20 rounded-lg text-[9px] font-black uppercase tracking-widest inline-block mb-3">Live Practice</span>
                                      <h4 className="font-extrabold text-sm mb-2 text-primary relative z-10">Hands-on Workshop</h4>
                                      <p className="text-xs font-bold text-muted-foreground flex items-center gap-1.5"><Calendar size={12}/> 28 Feb <span className="mx-1">•</span> <Clock size={12}/> 1:15 PM</p>
                                  </div>
                              </div>
                          </motion.div>
                       )}

                       {/* ASSESSMENTS VIEW */}
                       {activeTab === "assessments" && (
                          <motion.div key="assessments" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">
                              <h3 className="font-black text-lg text-foreground mb-2">Pending Assessments</h3>
                              <div className="p-6 rounded-3xl border bg-card shadow-sm">
                                  <div className="flex justify-between items-start mb-4">
                                      <div>
                                          <h4 className="font-extrabold text-sm text-primary mb-1">Unit 1 Analysis Document</h4>
                                          <p className="text-xs font-bold text-muted-foreground flex items-center gap-1"><Clock size={12}/> Due Tomorrow at 11:59 PM</p>
                                      </div>
                                      <span className="px-3 py-1 bg-destructive/10 text-destructive border border-destructive/20 rounded-full text-[10px] font-black uppercase tracking-widest">Not Started</span>
                                  </div>

                                  <div className="bg-accent/40 rounded-2xl p-4 border border-border/50 mb-4">
                                      <p className="text-sm font-semibold text-muted-foreground">Upload your completed analysis file here. Ensure formatting follows the initial rubric setup.</p>
                                  </div>

                                  <div className="grid sm:grid-cols-2 gap-4 mb-5">
                                      <div className="h-24 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center bg-background/50 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors">
                                          <Upload className="w-5 h-5 text-muted-foreground mb-2" />
                                          <span className="text-xs font-bold text-muted-foreground">Click to upload file</span>
                                      </div>
                                      <textarea 
                                        className="w-full h-24 rounded-xl border border-border bg-background p-3 text-sm font-medium resize-none focus:outline-none focus:ring-2 focus:ring-primary/20" 
                                        placeholder="Add an optional note to your evaluator..."
                                      />
                                  </div>

                                  <div className="flex gap-3">
                                      <button className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-black shadow-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                                          <CheckCircle2 size={16} /> Submit Assignment
                                      </button>
                                      <button className="flex-1 bg-background border border-border py-2.5 rounded-xl text-sm font-extrabold text-muted-foreground hover:bg-accent hover:text-foreground transition-colors flex items-center justify-center gap-2">
                                          <FileText size={16} /> View Rubric
                                      </button>
                                  </div>
                              </div>
                          </motion.div>
                       )}

                       {/* ABOUT VIEW */}
                       {activeTab === "about" && (
                          <motion.div key="about" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">
                              <h3 className="font-black text-lg text-foreground mb-2">About Subject</h3>
                              <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-6">
                                  <div>
                                     <h4 className="text-sm font-black text-muted-foreground uppercase tracking-widest mb-2">Description</h4>
                                     <p className="text-sm font-semibold text-foreground leading-relaxed">{subject.description}</p>
                                  </div>
                                  <div className="h-px w-full bg-border" />
                                  <div>
                                     <h4 className="text-sm font-black text-muted-foreground uppercase tracking-widest mb-3">Syllabus Breakdown</h4>
                                     <div className="space-y-3">
                                        <div className="flex justify-between items-center bg-accent/30 p-3 rounded-xl border border-border/50">
                                            <span className="text-xs font-bold text-foreground">Unit 1: Fundamentals</span>
                                            <span className="text-[10px] font-black uppercase text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">Completed</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-primary/5 p-3 rounded-xl border border-primary/20">
                                            <span className="text-xs font-bold text-primary">Unit 2: Core Analysis</span>
                                            <span className="text-[10px] font-black uppercase text-primary bg-background border border-primary/20 px-2 py-1 rounded">In Progress</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-background p-3 rounded-xl border border-border/50 opacity-60 flex items-center gap-2">
                                            <span className="text-xs font-bold text-muted-foreground line-clamp-1">Unit 3: Advanced Applications</span>
                                            <span className="text-[10px] shrink-0 font-black uppercase text-muted-foreground bg-accent border border-border px-2 py-1 rounded">Locked</span>
                                        </div>
                                     </div>
                                  </div>
                              </div>
                          </motion.div>
                       )}
                    </AnimatePresence>
                 </div>
              </motion.div>
              
          </div>
      </div>
    )
}