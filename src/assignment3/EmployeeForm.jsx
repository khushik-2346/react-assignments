import { useState, useEffect } from "react";

const initialFormState = {
  id: "",
  name: "",
  department: "Crop Production",
  gender: "Female",
  phone: "",
  localAddress: "",
  permanentAddress: "",
};

export default function EmployeeForm({ isOpen, onClose, onSave, editingEmployee }) {
  const [formData, setFormData] = useState(initialFormState);

  // Populate form if editing an existing employee, otherwise reset
  useEffect(() => {
    if (editingEmployee) {
      setFormData(editingEmployee);
    } else {
      setFormData(initialFormState);
    }
  }, [editingEmployee, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.id.trim()) {
      alert("Please fill in Name and Employee ID.");
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>{editingEmployee ? "Edit Employee Details" : "Add New Farm Employee"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Employee ID</label>
              <input
                type="text"
                name="id"
                placeholder="e.g. FARM-101"
                value={formData.id}
                onChange={handleChange}
                disabled={!!editingEmployee}
                required
              />
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="Crop Production">Crop Production</option>
                <option value="Livestock">Livestock</option>
                <option value="Dairy Management">Dairy Management</option>
                <option value="Logistics">Logistics</option>
                <option value="Horticulture">Horticulture</option>
              </select>
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group form-group-full">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group form-group-full">
              <label>Local Address</label>
              <textarea
                name="localAddress"
                rows="2"
                placeholder="Current stay or quarters on the farm"
                value={formData.localAddress}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group form-group-full">
              <label>Permanent Address</label>
              <textarea
                name="permanentAddress"
                rows="2"
                placeholder="Permanent home address"
                value={formData.permanentAddress}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              {editingEmployee ? "Save Changes" : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}