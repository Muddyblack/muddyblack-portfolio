
// Projects.tsx
interface Project {
  title: string;
  description: string;
  link: string;
}

const projects: Project[] = [
  {
    title: "Project 1",
    description: "Description of first project",
    link: "#"
  },
  {
    title: "Project 2",
    description: "Description of second project",
    link: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-12">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group p-6 bg-background border border-muted rounded-xl
                         hover:border-accent transition-all duration-300
                         hover:shadow-xl hover:shadow-accent/5
                         hover:translate-y-[-4px]"
            >
              <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-secondary group-hover:text-foreground/80 transition-colors">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}