export default function Header({ title, totalStudents, onSortToggle, isSorted }) {
  return (
    <header className="header-container">
      <div className="header-content">
        <div>
          <h1>{title}</h1>
          <p className="student-count">Total Students: {totalStudents}</p>
        </div>
        <button className="sort-btn" onClick={onSortToggle}>
          {isSorted ? "Reset Order" : "Sort by CGPA (High to Low)"}
        </button>
      </div>
    </header>
  );
}