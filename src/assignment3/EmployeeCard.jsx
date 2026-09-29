export default function EmployeeCard({ employee, onEdit, onDelete }) {
  return (
    <div className="employee-card">
      <div>
        <div className="card-top">
          <h3>{employee.name}</h3>
          <span className="emp-id-badge">{employee.id}</span>
        </div>

        <p className="emp-detail">
          <strong>Department:</strong> {employee.department}
        </p>
        <p className="emp-detail">
          <strong>Gender:</strong> {employee.gender}
        </p>
        <p className="emp-detail">
          <strong>Phone:</strong> {employee.phone}
        </p>
        <p className="emp-detail">
          <strong>Local Address:</strong> {employee.localAddress}
        </p>
        <p className="emp-detail">
          <strong>Permanent Address:</strong> {employee.permanentAddress}
        </p>
      </div>

      <div className="card-actions">
        <button
          type="button"
          className="btn-edit"
          onClick={() => onEdit(employee)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn-delete"
          onClick={() => onDelete(employee.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}