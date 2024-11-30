// Projects.tsx
interface Project {
  title: string;
  description: string;
  link: string;
  tags: string[];
}

const projects: Project[] = [
  {
    title: "Digital Signage App",
    description: "React-based digital signage application with Google Drive sync, weather widgets, and scheduling features. Supports both web and terminal display modes.",
    link: "https://github.com/asta-dhbw/Terminal-Slide-Show",
    tags: ["React", "Node.js", "Google Drive API", "WebSocket"]
  },
  {
    title: "STUV Website",
    description: "Next.js website for DHBW Ravensburg Student Union featuring 3D campus navigation, event management, and student resources.",
    link: "https://github.com/Muddyblack/STUVSITE",
    tags: ["Next.js", "TypeScript", "Three.js", "Tailwind"]
  },
  {
    title: "Quotix API",
    description: "TypeScript/Node.js quote management API with filtering, caching, and dark/light theme UI implementation.",
    link: "https://github.com/Muddyblack/quotix",
    tags: ["TypeScript", "Node.js", "Express", "REST API"]
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-foreground mb-4">
          Featured Projects
        </h2>
        <p className="text-secondary mb-12 max-w-2xl">
          Here are some of my recent projects. Each one represents a unique challenge and learning experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <a 
              href={project.link}
              key={index} 
              className="group block p-6 bg-background border border-muted rounded-xl
                       hover:border-accent transition-all duration-300
                       hover:shadow-xl hover:shadow-accent/5
                       hover:translate-y-[-4px]"
            >
              <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-secondary group-hover:text-foreground/80 transition-colors mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="text-xs px-2 py-1 rounded-full bg-muted/50 text-secondary
                             group-hover:bg-accent/10 group-hover:text-accent transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}