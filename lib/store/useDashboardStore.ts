import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// --- Types ---
export type ClassItem = {
  id: string;
  name: string;
  code: string;
  room: string;
  students: number;
};

export type ScheduleItem = {
  id: string;
  time: string;
  meridiem: string;
  title: string;
  room: string;
  active: boolean;
};

export type Submission = {
  studentId: string;
  studentName: string;
  submittedAt: string;
  status: 'Graded' | 'Pending';
  score?: number;
};

export type Assignment = {
  id: string;
  title: string;
  classCode: string;
  dueDate: string;
  status: 'Pending' | 'Reviewed';
  submissions: number;
  totalStudents: number;
  submissionList: Submission[];
};

export type StudentAttendance = {
  studentId: string;
  name: string;
  isPresent: boolean;
};

export type AttendanceRecord = {
  classId: string;
  overallPercentage: number;
  lastUpdated: string;
  students: StudentAttendance[];
};

// --- Mock Initial Data ---
const generateMockStudents = (count: number): StudentAttendance[] => {
  return Array.from({ length: count }, (_, i) => ({
    studentId: `STU${1000 + i}`,
    name: `Student ${String.fromCharCode(65 + (i % 26))} ${i + 1}`,
    isPresent: Math.random() > 0.15 // 85% chance of being present initially
  }));
};

const calcOverall = (students: StudentAttendance[]) => Math.round((students.filter(s => s.isPresent).length / students.length) * 100);

const mockStudentsClass1 = generateMockStudents(24);
const mockStudentsClass2 = generateMockStudents(26);
const mockStudentsClass3 = generateMockStudents(25);

const initialClasses: ClassItem[] = [
  { id: '1', name: 'Software Engineering', code: 'CS302', room: '302', students: 24 },
  { id: '2', name: 'Database Systems', code: 'CS305', room: 'Lab 4', students: 26 },
  { id: '3', name: 'Artificial Intelligence', code: 'CS401', room: 'Auditorium', students: 25 },
];

const initialSchedule: ScheduleItem[] = [
  { id: '1', time: "09:00", meridiem: "AM", title: "Software Eng", room: "302", active: false },
  { id: '2', time: "10:15", meridiem: "AM", title: "Project Mentoring", room: "Lab 4", active: true },
  { id: '3', time: "12:00", meridiem: "PM", title: "Faculty Meeting", room: "Conf. B", active: false },
  { id: '4', time: "02:00", meridiem: "PM", title: "Integration Review", room: "Virtual", active: false },
  { id: '5', time: "03:30", meridiem: "PM", title: "Research Seminar", room: "Auditorium", active: false },
];

const mockSubmissionsList1: Submission[] = [
  { studentId: 'S101', studentName: 'John Doe', submittedAt: 'Feb 18, 10:20 AM', status: 'Pending' },
  { studentId: 'S102', studentName: 'Jane Smith', submittedAt: 'Feb 19, 02:15 PM', status: 'Graded', score: 92 },
  { studentId: 'S103', studentName: 'Michael Johnson', submittedAt: 'Feb 20, 08:30 AM', status: 'Pending' },
  { studentId: 'S104', studentName: 'Emily Davis', submittedAt: 'Feb 20, 11:45 AM', status: 'Pending' },
];

const mockSubmissionsList2: Submission[] = [
  { studentId: 'S105', studentName: 'Chris Lee', submittedAt: 'Mar 01, 09:00 AM', status: 'Pending' },
  { studentId: 'S106', studentName: 'Sarah Connor', submittedAt: 'Mar 02, 10:30 AM', status: 'Pending' },
];

const mockSubmissionsList3: Submission[] = [
  { studentId: 'S107', studentName: 'Alice Brown', submittedAt: 'Feb 15, 08:00 AM', status: 'Graded', score: 88 },
  { studentId: 'S108', studentName: 'Bob White', submittedAt: 'Feb 16, 02:45 PM', status: 'Graded', score: 95 },
  { studentId: 'S109', studentName: 'Charlie Green', submittedAt: 'Feb 17, 11:15 AM', status: 'Graded', score: 78 },
];

const initialAssignments: Assignment[] = [
  { id: '1', title: 'Agile Case Study', classCode: 'CS302', dueDate: 'Feb 28', status: 'Pending', submissions: 19, totalStudents: 24, submissionList: mockSubmissionsList1 },
  { id: '2', title: 'SQL Normalization', classCode: 'CS305', dueDate: 'Mar 05', status: 'Pending', submissions: 10, totalStudents: 26, submissionList: mockSubmissionsList2 },
  { id: '3', title: 'Neural Net Implementation', classCode: 'CS401', dueDate: 'Feb 20', status: 'Reviewed', submissions: 25, totalStudents: 25, submissionList: mockSubmissionsList3 },
];

const initialAttendance: AttendanceRecord[] = [
  { classId: '1', overallPercentage: calcOverall(mockStudentsClass1), lastUpdated: 'Today, 09:00 AM', students: mockStudentsClass1 },
  { classId: '2', overallPercentage: calcOverall(mockStudentsClass2), lastUpdated: 'Yesterday', students: mockStudentsClass2 },
  { classId: '3', overallPercentage: calcOverall(mockStudentsClass3), lastUpdated: '2 days ago', students: mockStudentsClass3 },
];

// --- Store Interface ---
interface DashboardState {
  classes: ClassItem[];
  schedule: ScheduleItem[];
  assignments: Assignment[];
  attendance: AttendanceRecord[];
  
  // Actions
  addClass: (newClass: ClassItem) => void;
  deleteClass: (id: string) => void;
  addAssignment: (newAssignment: Assignment) => void;
  markAssignmentReviewed: (id: string) => void;
  gradeSubmission: (assignmentId: string, studentId: string, score: number) => void;
  updateAttendance: (record: AttendanceRecord) => void;
  toggleStudentAttendance: (classId: string, studentId: string) => void;
}

// --- Store Implementation ---
export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      classes: initialClasses,
      schedule: initialSchedule,
      assignments: initialAssignments,
      attendance: initialAttendance,

      addClass: (newClass) => set((state) => ({ classes: [...state.classes, newClass] })),
      deleteClass: (id) => set((state) => ({ classes: state.classes.filter(c => c.id !== id) })),
      
      addAssignment: (newAssignment) => set((state) => ({ assignments: [...state.assignments, newAssignment] })),
      markAssignmentReviewed: (id) => set((state) => ({
        assignments: state.assignments.map(a => a.id === id ? { ...a, status: 'Reviewed' } : a)
      })),

      gradeSubmission: (assignmentId, studentId, score) => set((state) => ({
        assignments: state.assignments.map(a => {
          if (a.id === assignmentId) {
            const updatedSubmissions = a.submissionList.map(sub => 
              sub.studentId === studentId ? { ...sub, score, status: 'Graded' as const } : sub
            );
            return { ...a, submissionList: updatedSubmissions };
          }
          return a;
        })
      })),

      updateAttendance: (record) => set((state) => {
        const existing = state.attendance.find(a => a.classId === record.classId);
        if (existing) {
          return {
            attendance: state.attendance.map(a => a.classId === record.classId ? record : a)
          };
        }
        return { attendance: [...state.attendance, record] };
      }),

      toggleStudentAttendance: (classId, studentId) => set((state) => ({
        attendance: state.attendance.map(a => {
          if (a.classId === classId) {
            const updatedStudents = a.students.map(s => 
              s.studentId === studentId ? { ...s, isPresent: !s.isPresent } : s
            );
            return {
              ...a,
              students: updatedStudents,
              overallPercentage: calcOverall(updatedStudents),
              lastUpdated: 'Just now'
            };
          }
          return a;
        })
      }))
    }),
    {
      name: 'edutex-faculty-storage-v4', // Force refresh mock data key
    }
  )
);
