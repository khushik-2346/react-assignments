import { useState } from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import StudentApp from "./assignment2/StudentApp";
import EmployeeApp from "./assignment3/EmployeeApp";
import "./Portfolio.css";

export default function App() {
  const [activeAssignment, setActiveAssignment] = useState(3);

  return (
    <div>
      {/* Top navigation bar to toggle between assignments */}
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "10px",
          padding: "12px 16px",
          background: "#080c14",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          position: "sticky",
          top: 0,
          zIndex: 2000,
        }}
      >
        <button
          onClick={() => setActiveAssignment(1)}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "0.85rem",
            background: activeAssignment === 1 ? "#38bdf8" : "#1e293b",
            color: activeAssignment === 1 ? "#0b0f19" : "#94a3b8",
            transition: "all 0.2s ease",
          }}
        >
          Assignment 1: Portfolio
        </button>

        <button
          onClick={() => setActiveAssignment(2)}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "0.85rem",
            background: activeAssignment === 2 ? "#38bdf8" : "#1e293b",
            color: activeAssignment === 2 ? "#0b0f19" : "#94a3b8",
            transition: "all 0.2s ease",
          }}
        >
          Assignment 2: Student Management
        </button>

        <button
          onClick={() => setActiveAssignment(3)}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "0.85rem",
            background: activeAssignment === 3 ? "#38bdf8" : "#1e293b",
            color: activeAssignment === 3 ? "#0b0f19" : "#94a3b8",
            transition: "all 0.2s ease",
          }}
        >
          Assignment 3: Employee Directory
        </button>
      </nav>

      {/* Render active assignment */}
      {activeAssignment === 1 && (
        <div className="portfolio-container">
          <Navbar />
          <main>
            <About />
            <Education />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>
      )}

      {activeAssignment === 2 && <StudentApp />}

      {activeAssignment === 3 && <EmployeeApp />}
    </div>
  );
}