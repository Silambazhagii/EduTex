"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import {
  ArrowLeft,
  Upload,
  Check,
  X,
} from "lucide-react"
import Link from "next/link"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type Submission = {
  id: string
  student: string
  status: "Submitted" | "Approved" | "Rejected"
  marks?: number
}

const SUBMISSIONS: Submission[] = [
  { id: "1", student: "Arjun", status: "Submitted" },
  { id: "2", student: "Meera", status: "Approved", marks: 82 },
  { id: "3", student: "Rahul", status: "Submitted" },
]

export default function TeacherDetailPage() {
  const params = useParams<{ offeringId: string }>()
  const [submissions, setSubmissions] = useState(SUBMISSIONS)

  function updateStatus(id: string, status: Submission["status"]) {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status } : s
      )
    )
  }

  function updateMarks(id: string, marks: number) {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, marks } : s
      )
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1200px] px-6 py-6">

        <div className="flex items-center justify-between">
          <Button asChild variant="outline" className="rounded-sm">
            <Link href="/teacher">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>

          <div className="text-lg font-semibold">
            Offering ID: {params.offeringId}
          </div>
        </div>

        <Separator className="my-6" />

        <Tabs defaultValue="assignments">
          <TabsList className="rounded-sm">
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
          </TabsList>

          {/* Resources */}
          <TabsContent value="resources" className="mt-4">
            <Card className="rounded-sm">
              <CardHeader>
                <div className="text-sm font-semibold">Upload Resource</div>
              </CardHeader>
              <CardContent>
                <Button className="rounded-sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload File
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assignments */}
          <TabsContent value="assignments" className="mt-4">
            <Card className="rounded-sm">
              <CardHeader>
                <div className="text-sm font-semibold">
                  Create Assignment
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input placeholder="Assignment Title" className="rounded-sm" />
                <Button className="rounded-sm">
                  Create Assignment
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submissions */}
          <TabsContent value="submissions" className="mt-4">
            <Card className="rounded-sm">
              <CardHeader>
                <div className="text-sm font-semibold">
                  Student Submissions
                </div>
              </CardHeader>
              <CardContent className="space-y-3">

                {submissions.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between rounded-sm border p-3"
                  >
                    <div>
                      <div className="text-sm font-medium">
                        {s.student}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        Status:
                        <Badge
                          className="ml-2 rounded-sm"
                          variant="secondary"
                        >
                          {s.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Marks"
                        className="w-20 rounded-sm"
                        value={s.marks ?? ""}
                        onChange={(e) =>
                          updateMarks(s.id, Number(e.target.value))
                        }
                      />

                      <Button
                        size="sm"
                        className="rounded-sm"
                        onClick={() => updateStatus(s.id, "Approved")}
                      >
                        <Check className="h-4 w-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-sm"
                        onClick={() => updateStatus(s.id, "Rejected")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>

      </div>
    </div>
  )
}