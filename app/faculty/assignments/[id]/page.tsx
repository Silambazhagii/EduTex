"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDashboardStore } from "@/lib/store/useDashboardStore";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpenCheck, CheckCircle2, Clock } from "lucide-react";

export default function AssignmentDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const assignmentId = params.id;

  const assignments = useDashboardStore((state) => state.assignments);
  const gradeSubmission = useDashboardStore((state) => state.gradeSubmission);

  const assignment = assignments.find((a) => a.id === assignmentId);

  const [scores, setScores] = useState<Record<string, string>>({});

  // 🔒 If assignment not found
  if (!assignment) {
    return (
      <div className="py-12 text-center flex flex-col items-center justify-center text-muted-foreground bg-card border border-border/60 rounded-3xl space-y-4">
        <span>Assignment not found.</span>
        <button
          onClick={() => router.push("/faculty/assignments")}
          className="bg-primary px-4 py-2 rounded-xl text-primary-foreground font-bold"
        >
          Return Back
        </button>
      </div>
    );
  }

  // ✅ SAFE fallback (prevents filter crash)
  const submissions = assignment.submissionList ?? [];

  const pendingCount = submissions.filter(
    (s) => s.status === "Pending"
  ).length;

  const gradedCount = submissions.filter(
    (s) => s.status === "Graded"
  ).length;

  const handleScoreChange = (studentId: string, score: string) => {
    setScores((prev) => ({ ...prev, [studentId]: score }));
  };

  const handleGrade = (studentId: string) => {
    const scoreStr = scores[studentId];

    if (!scoreStr) return;

    const scoreNum = Number(scoreStr);

    if (scoreNum >= 0 && scoreNum <= 100) {
      gradeSubmission(assignment.id, studentId, scoreNum);

      // 🧼 Clear input after grading
      setScores((prev) => ({ ...prev, [studentId]: "" }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => router.push("/faculty/assignments")}
        className="text-sm font-bold text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors mb-2"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Assignments
      </button>

      {/* Assignment Header */}
      <div className="bg-card border border-border/60 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center shrink-0">
            <BookOpenCheck className="w-7 h-7" />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">
              {assignment.title}
            </h1>

            <div className="flex items-center gap-3 text-sm font-bold text-muted-foreground mt-1">
              <span className="uppercase tracking-widest bg-accent px-2 py-0.5 rounded-md">
                {assignment.classCode}
              </span>

              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> Due {assignment.dueDate}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6">
          <div className="text-center">
            <span className="block text-2xl font-black">
              {submissions.length}
              <span className="text-muted-foreground text-sm font-bold">
                /{assignment.totalStudents}
              </span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
              Total Subs
            </span>
          </div>

          <div className="text-center">
            <span className="block text-2xl font-black text-emerald-500">
              {gradedCount}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
              Graded
            </span>
          </div>

          <div className="text-center">
            <span className="block text-2xl font-black text-amber-500">
              {pendingCount}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
              Pending Reqs
            </span>
          </div>
        </div>
      </div>

      {/* Submissions List */}
      <div>
        <h2 className="text-xl font-extrabold tracking-tight mb-4">
          Student Submissions
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {submissions.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground bg-card border border-border/60 rounded-3xl">
              No students have submitted this assignment yet.
            </div>
          ) : (
            submissions.map((sub, i) => (
              <motion.div
                key={sub.studentId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border border-border/60 rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <h3 className="text-lg font-extrabold tracking-tight">
                    {sub.studentName}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground mt-1">
                    <span className="uppercase tracking-widest">
                      {sub.studentId}
                    </span>
                    <span>•</span>
                    <span>Submitted on {sub.submittedAt}</span>
                  </div>
                </div>

                {sub.status === "Graded" ? (
                  <div className="flex items-center gap-3 sm:ml-auto">
                    <div className="text-right">
                      <span className="block text-2xl font-black">
                        {sub.score}
                        <span className="text-sm text-muted-foreground">
                          {" "}
                          / 100
                        </span>
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                        Final Score
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 sm:ml-auto">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Score"
                      value={scores[sub.studentId] || ""}
                      onChange={(e) =>
                        handleScoreChange(sub.studentId, e.target.value)
                      }
                      className="w-20 bg-background border border-border rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />

                    <button
                      onClick={() => handleGrade(sub.studentId)}
                      disabled={!scores[sub.studentId]}
                      className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-primary/90 disabled:opacity-50 transition-colors"
                    >
                      Grade
                    </button>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}