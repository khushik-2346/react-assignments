import { useState } from "react";
import Header from "./Header";
import StudentList from "./StudentList";
import "./StudentManager.css";

const initialStudents = [
  {
    id: 1,
    name: "Aarav Sharma",
    rollNumber: "CS-2024-001",
    department: "Computer Science",
    semester: 4,
    cgpa: 9.15,
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Ananya Iyer",
    rollNumber: "CS-2024-014",
    department: "Information Technology",
    semester: 4,
    cgpa: 8.85,
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Rohan Verma",
    rollNumber: "CS-2024-023",
    department: "Data Science",
    semester: 4,
    cgpa: 9.42,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Pooja Patel",
    rollNumber: "CS-2024-031",
    department: "Computer Science",
    semester: 4,
    cgpa: 8.35,
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Kabir Mehta",
    rollNumber: "CS-2024-045",
    department: "Cybersecurity",
    semester: 4,
    cgpa: 9.05,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    name: "Sneha Nair",
    rollNumber: "CS-2024-052",
    department: "Artificial Intelligence",
    semester: 4,
    cgpa: 9.68,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
  },
];

export default function StudentApp() {
  const [isSorted, setIsSorted] = useState(false);

  const displayedStudents = isSorted
    ? [...initialStudents].sort((a, b) => b.cgpa - a.cgpa)
    : initialStudents;

  return (
    <div className="student-app">
      <Header
        title="Student Information Management"
        totalStudents={displayedStudents.length}
        onSortToggle={() => setIsSorted(!isSorted)}
        isSorted={isSorted}
      />
      <StudentList students={displayedStudents} />
    </div>
  );
}