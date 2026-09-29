export default function StudentCard({ name, rollNumber, department, semester, cgpa, photo }) {
  return (
    <div className="student-card">
      <div className="card-avatar">
        <img src={photo} alt={name} />
      </div>
      <div className="card-info">
        <h3 className="student-name">{name}</h3>
        <p><strong>Roll No:</strong> {rollNumber}</p>
        <p><strong>Department:</strong> {department}</p>
        <p><strong>Semester:</strong> {semester}</p>
        <div className="cgpa-pill">
          <span>CGPA:</span> <strong>{cgpa.toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
}