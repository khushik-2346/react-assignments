export default function Education() {
  const educationList = [
    {
      degree: "Bachelor of Computer Applications / Science",
      institution: "University",
      year: "2023 - Present",
      details: "Studying Web Development, Data Structures, and Software Engineering."
    },
    {
      degree: "Higher Secondary Education",
      institution: "School",
      year: "Completed",
      details: "Science stream with Mathematics and Computer Science."
    }
  ];

  return (
    <section id="education" className="section alt-bg">
      <h2>Education</h2>
      <div className="cards-grid">
        {educationList.map((item, index) => (
          <div key={index} className="card">
            <h3>{item.degree}</h3>
            <span className="card-subtitle">{item.institution} ({item.year})</span>
            <p>{item.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
}