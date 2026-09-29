import StudentCard from "./StudentCard";

export default function StudentList({ students }) {
  if (!students || students.length === 0) {
    return <p className="no-students">No student records found.</p>;
  }

  return (
    <div className="student-grid">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          name={student.name}
          rollNumber={student.rollNumber}
          department={student.department}
          semester={student.semester}
          cgpa={student.cgpa}
          photo={student.photo}
        />
      ))}
    </div>
  );
}