import { useState } from "react";
import EmployeeCard from "./EmployeeCard";
import EmployeeForm from "./EmployeeForm";
import "./EmployeeDirectory.css";

const initialEmployees = [
  {
    id: "FARM-101",
    name: "Ramesh Patel",
    department: "Crop Production",
    gender: "Male",
    phone: "9823011234",
    localAddress: "Staff Quarters Block A-3, Farm Campus",
    permanentAddress: "Vill. Anandpur, Dist. Kheda, Gujarat",
  },
  {
    id: "FARM-102",
    name: "Sunita Yadav",
    department: "Dairy Management",
    gender: "Female",
    phone: "9876504321",
    localAddress: "Quarter B-12, Green Valley Farms",
    permanentAddress: "House 45, Post Bilaspur, Haryana",
  },
  {
    id: "FARM-103",
    name: "Manoj Kumar",
    department: "Livestock",
    gender: "Male",
    phone: "9123456780",
    localAddress: "Caretaker Cabin 2, North Barn",
    permanentAddress: "Vill. Rampur, Dist. Meerut, UP",
  },
  {
    id: "FARM-104",
    name: "Priya Sharma",
    department: "Horticulture",
    gender: "Female",
    phone: "9781234560",
    localAddress: "Greenhouse Complex Room 4",
    permanentAddress: "Flat 202, Shivalik Apts, Dehradun",
  },
  {
    id: "FARM-105",
    name: "Gurpreet Singh",
    department: "Logistics",
    gender: "Male",
    phone: "9814098765",
    localAddress: "Warehouse Dormitory No. 5",
    permanentAddress: "VPO Kotkapura, Faridkot, Punjab",
  },
];

export default function EmployeeApp() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Filter employees by Search (Name or ID) and Department
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept =
      selectedDept === "All" || emp.department === selectedDept;

    return matchesSearch && matchesDept;
  });

  // Handler to open form for adding new employee
  const handleAddNew = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  // Handler to open form for editing an existing employee
  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  // Handler to delete an employee by ID
  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this employee record?");
    if (confirmed) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    }
  };

  // Handler to save changes (both Add and Edit)
  const handleSave = (employeeData) => {
    if (editingEmployee) {
      // Update existing
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === employeeData.id ? employeeData : emp))
      );
    } else {
      // Prevent duplicate IDs
      const idExists = employees.some(
        (emp) => emp.id.toLowerCase() === employeeData.id.toLowerCase()
      );
      if (idExists) {
        alert("An employee with this ID already exists! Please use a unique ID.");
        return;
      }
      setEmployees((prev) => [employeeData, ...prev]);
    }
  };

  return (
    <div className="employee-app">
      {/* Top Header */}
      <header className="emp-header">
        <div>
          <h1>Farm Employee Directory</h1>
          <p>Manage farm personnel records, assignments, and contacts</p>
        </div>
        <button type="button" className="btn-add" onClick={handleAddNew}>
          + Add New Employee
        </button>
      </header>

      {/* Controls: Search, Filter, and Live Count */}
      <section className="controls-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search by Employee Name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="dept-select"
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
        >
          <option value="All">All Departments</option>
          <option value="Crop Production">Crop Production</option>
          <option value="Livestock">Livestock</option>
          <option value="Dairy Management">Dairy Management</option>
          <option value="Logistics">Logistics</option>
          <option value="Horticulture">Horticulture</option>
        </select>

        <div className="count-badge">
          Showing: {filteredEmployees.length} of {employees.length} Employees
        </div>
      </section>

      {/* Employee Cards Grid */}
      {filteredEmployees.length > 0 ? (
        <div className="employee-grid">
          {filteredEmployees.map((emp) => (
            <EmployeeCard
              key={emp.id}
              employee={emp}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No employee records matched your search or department filter.</p>
        </div>
      )}

      {/* Add / Edit Form Modal */}
      <EmployeeForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editingEmployee={editingEmployee}
      />
    </div>
  );
}