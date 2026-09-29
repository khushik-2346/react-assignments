export default function Skills() {
  const skills = [
    "React.js",
    "JavaScript (ES6+)",
    "HTML5 & CSS3",
    "Git & GitHub",
    "Responsive Web Design",
    "Vite"
  ];

  return (
    <section id="skills" className="section">
      <h2>Skills</h2>
      <div className="skills-container">
        {skills.map((skill, index) => (
          <span key={index} className="skill-badge">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}