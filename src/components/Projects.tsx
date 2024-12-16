import ProjectCard from './ProjectCard';

// Projects.tsx
interface Project {
  title: string;
  description: string;
  link: string;
  presentationLink?: string;  // Optional presentation link
  tags: string[];
}

const projects: Project[] = [
  {
    title: "The Dawn",
    description: "Advanced 3D web application showcasing humanity's future through interactive storytelling. Features procedural planet generation, space stations, and physics-based vehicle systems using Three.js.",
    link: "/thedawn",
    presentationLink: "/thedawn-presentation",
    tags: ["Three.js", "JavaScript", "WebGL", "Vite", "3D Graphics"]
  },
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
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}