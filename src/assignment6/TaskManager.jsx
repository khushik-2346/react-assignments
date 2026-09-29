import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./TaskManager.css";

// Initial seed data meeting required fields: Description, Priority, Category, Due, Status
const INITIAL_TASKS = [
  {
    id: "1",
    description: "Prepare React Router architecture documentation",
    priority: "High",
    category: "Academics",
    due: "2026-08-28",
    status: "Completed",
  },
  {
    id: "2",
    description: "Design mock UI wireframes for Task Manager SPA",
    priority: "Medium",
    category: "Design",
    due: "2026-09-05",
    status: "Pending",
  },
  {
    id: "3",
    description: "Implement Protected Route with authentication guard",
    priority: "High",
    category: "Development",
    due: "2026-09-12",
    status: "Pending",
  },
  {
    id: "4",
    description: "Optimize database queries for inventory system",
    priority: "Low",
    category: "Development",
    due: "2026-09-20",
    status: "Completed",
  },
];

// --- PROTECTED ROUTE GUARD ---
function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return (
      <div className="auth-warning">
        <h3>🔒 Access Restricted</h3>
        <p>
          You must be logged in to access the <strong>Add Task</strong> page.
        </p>
        <p style={{ fontSize: "0.85rem", marginTop: "0.5rem", color: "#fef08a" }}>
          Tip: Click the <strong>"Simulate Login"</strong> button in the top-right
          navigation bar to toggle authentication and test route protection.
        </p>
      </div>
    );
  }
  return children;
}

// --- 1. DASHBOARD PAGE ---
function Dashboard({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const pending = total - completed;
  const highPriority = tasks.filter(
    (t) => t.priority === "High" && t.status === "Pending"
  ).length;

  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Tasks</span>
          <span className="stat-number">{total}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Pending</span>
          <span className="stat-number" style={{ color: "#38bdf8" }}>
            {pending}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Completed</span>
          <span className="stat-number" style={{ color: "#34d399" }}>
            {completed}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Urgent (High)</span>
          <span className="stat-number" style={{ color: "#f87171" }}>
            {highPriority}
          </span>
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <h3 style={{ marginBottom: "1rem", color: "#f8fafc" }}>Recent Overview</h3>
        <div className="tasks-list">
          {tasks.slice(0, 3).map((task) => (
            <div key={task.id} className="task-card">
              <div className="task-main">
                <div
                  className={`task-desc ${
                    task.status === "Completed" ? "crossed" : ""
                  }`}
                >
                  {task.description}
                </div>
                <div className="task-meta">
                  <span
                    className={`badge badge-${task.priority.toLowerCase()}`}
                  >
                    {task.priority}
                  </span>
                  <span className="badge badge-category">{task.category}</span>
                  <span className="task-due">Due: {task.due}</span>
                </div>
              </div>
              <Link to={`/tasks/${task.id}`} className="btn-icon">
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- 2. TASKS LIST PAGE (With Category & Priority Filters) ---
function TasksList({ tasks, onToggle, onDelete }) {
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");

  const filteredTasks = tasks.filter((task) => {
    const matchPriority =
      filterPriority === "All" || task.priority === filterPriority;
    const matchCategory =
      filterCategory === "All" || task.category === filterCategory;
    return matchPriority && matchCategory;
  });

  return (
    <div>
      <div className="filter-bar">
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Academics">Academics</option>
          <option value="Development">Development</option>
          <option value="Design">Design</option>
          <option value="Personal">Personal</option>
        </select>
      </div>

      <div className="tasks-list">
        {filteredTasks.length === 0 ? (
          <p style={{ textAlign: "center", color: "#64748b", padding: "2rem" }}>
            No tasks match the selected filters.
          </p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`task-card ${
                task.status === "Completed" ? "completed" : ""
              }`}
            >
              <div className="task-main">
                <div
                  className={`task-desc ${
                    task.status === "Completed" ? "crossed" : ""
                  }`}
                >
                  {task.description}
                </div>
                <div className="task-meta">
                  <span
                    className={`badge badge-${task.priority.toLowerCase()}`}
                  >
                    {task.priority}
                  </span>
                  <span className="badge badge-category">{task.category}</span>
                  <span className="task-due">📅 Due: {task.due}</span>
                  <span
                    style={{
                      color:
                        task.status === "Completed" ? "#34d399" : "#fbbf24",
                      fontWeight: "700",
                    }}
                  >
                    • {task.status}
                  </span>
                </div>
              </div>

              <div className="task-actions">
                <button
                  className="btn-icon complete"
                  onClick={() => onToggle(task.id)}
                >
                  {task.status === "Completed" ? "↺ Mark Pending" : "✓ Complete"}
                </button>
                <Link to={`/tasks/${task.id}`} className="btn-icon">
                  Details
                </Link>
                <button
                  className="btn-icon delete"
                  onClick={() => onDelete(task.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// --- 3. TASK DETAILS PAGE (Dynamic Route with useParams) ---
function TaskDetails({ tasks, onToggle, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <div className="task-detail-card" style={{ textAlign: "center" }}>
        <h3>Task Not Found</h3>
        <p style={{ color: "#94a3b8", margin: "1rem 0" }}>
          No task exists with ID #{id}.
        </p>
        <button className="btn-icon" onClick={() => navigate("/tasks")}>
          ← Back to Tasks
        </button>
      </div>
    );
  }

  return (
    <div className="task-detail-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h2 style={{ fontSize: "1.4rem", color: "#f8fafc" }}>Task Details</h2>
        <span
          className={`badge badge-${task.priority.toLowerCase()}`}
          style={{ fontSize: "0.85rem" }}
        >
          {task.priority} Priority
        </span>
      </div>

      <div className="detail-row">
        <span className="detail-label">Task ID</span>
        <span style={{ fontFamily: "monospace" }}>#{task.id}</span>
      </div>

      <div className="detail-row">
        <span className="detail-label">Description</span>
        <span style={{ fontWeight: 600 }}>{task.description}</span>
      </div>

      <div className="detail-row">
        <span className="detail-label">Category</span>
        <span>{task.category}</span>
      </div>

      <div className="detail-row">
        <span className="detail-label">Due Date</span>
        <span>{task.due}</span>
      </div>

      <div className="detail-row">
        <span className="detail-label">Current Status</span>
        <span
          style={{
            color: task.status === "Completed" ? "#34d399" : "#fbbf24",
            fontWeight: "700",
          }}
        >
          {task.status}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginTop: "1.75rem",
          justifyContent: "flex-end",
        }}
      >
        <button className="btn-icon" onClick={() => navigate("/tasks")}>
          ← Back
        </button>
        <button
          className="btn-icon complete"
          onClick={() => {
            onToggle(task.id);
          }}
        >
          {task.status === "Completed" ? "↺ Mark Pending" : "✓ Mark Completed"}
        </button>
        <button
          className="btn-icon delete"
          onClick={() => {
            onDelete(task.id);
            navigate("/tasks");
          }}
        >
          Delete Task
        </button>
      </div>
    </div>
  );
}

// --- 4. COMPLETED TASKS PAGE ---
function CompletedTasks({ tasks, onToggle, onDelete }) {
  const completed = tasks.filter((t) => t.status === "Completed");

  return (
    <div>
      <h3 style={{ marginBottom: "1.2rem", color: "#34d399" }}>
        Completed Tasks ({completed.length})
      </h3>

      <div className="tasks-list">
        {completed.length === 0 ? (
          <p style={{ textAlign: "center", color: "#64748b", padding: "2rem" }}>
            No completed tasks yet. Finish a task from the Tasks tab!
          </p>
        ) : (
          completed.map((task) => (
            <div key={task.id} className="task-card completed">
              <div className="task-main">
                <div className="task-desc crossed">{task.description}</div>
                <div className="task-meta">
                  <span
                    className={`badge badge-${task.priority.toLowerCase()}`}
                  >
                    {task.priority}
                  </span>
                  <span className="badge badge-category">{task.category}</span>
                  <span className="task-due">Completed</span>
                </div>
              </div>

              <div className="task-actions">
                <button
                  className="btn-icon complete"
                  onClick={() => onToggle(task.id)}
                >
                  ↺ Restore
                </button>
                <Link to={`/tasks/${task.id}`} className="btn-icon">
                  Details
                </Link>
                <button
                  className="btn-icon delete"
                  onClick={() => onDelete(task.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// --- 5. ADD TASK FORM (Protected Route) ---
function AddTask({ onAddTask }) {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Development");
  const [due, setDue] = useState("2026-08-28");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      description: description.trim(),
      priority,
      category,
      due,
      status: "Pending",
    };

    onAddTask(newTask);
    navigate("/tasks");
  };

  return (
    <div className="task-form-card">
      <h2 style={{ marginBottom: "1.5rem", fontSize: "1.35rem", color: "#f8fafc" }}>
        Create New Task
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Description</label>
          <input
            type="text"
            required
            placeholder="e.g. Implement routing and authorization guards"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Development">Development</option>
            <option value="Academics">Academics</option>
            <option value="Design">Design</option>
            <option value="Personal">Personal</option>
          </select>
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            required
            value={due}
            onChange={(e) => setDue(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-submit">
          Save & Publish Task
        </button>
      </form>
    </div>
  );
}

// --- MAIN TASK MANAGER CONTAINER COMPONENT ---
export default function TaskManager() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleToggleStatus = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === "Completed" ? "Pending" : "Completed",
            }
          : t
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  return (
    <BrowserRouter>
      <div className="task-app">
        <header className="task-header">
          <h1>Task Manager Application</h1>
          <p>Single Page Architecture with React Router, Nested Views & Protected Routes</p>
        </header>

        {/* Router Sub-Navigation */}
        <nav className="task-nav">
          <div className="task-nav-links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `task-nav-link ${isActive ? "active" : ""}`
              }
              end
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `task-nav-link ${isActive ? "active" : ""}`
              }
            >
              All Tasks
            </NavLink>
            <NavLink
              to="/completed"
              className={({ isActive }) =>
                `task-nav-link ${isActive ? "active" : ""}`
              }
            >
              Completed
            </NavLink>
            <NavLink
              to="/add-task"
              className={({ isActive }) =>
                `task-nav-link ${isActive ? "active" : ""}`
              }
            >
              + Add Task (Protected)
            </NavLink>
          </div>

          <button
            type="button"
            className={`auth-toggle-btn ${isAuthenticated ? "logged-in" : ""}`}
            onClick={() => setIsAuthenticated(!isAuthenticated)}
          >
            {isAuthenticated
              ? "✓ Status: Logged In (Click to Logout)"
              : "✕ Status: Guest (Click to Login)"}
          </button>
        </nav>

        {/* Routes Switcher */}
        <Routes>
          <Route path="/" element={<Dashboard tasks={tasks} />} />
          <Route
            path="/tasks"
            element={
              <TasksList
                tasks={tasks}
                onToggle={handleToggleStatus}
                onDelete={handleDeleteTask}
              />
            }
          />
          <Route
            path="/tasks/:id"
            element={
              <TaskDetails
                tasks={tasks}
                onToggle={handleToggleStatus}
                onDelete={handleDeleteTask}
              />
            }
          />
          <Route
            path="/completed"
            element={
              <CompletedTasks
                tasks={tasks}
                onToggle={handleToggleStatus}
                onDelete={handleDeleteTask}
              />
            }
          />
          <Route
            path="/add-task"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AddTask onAddTask={handleAddTask} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}