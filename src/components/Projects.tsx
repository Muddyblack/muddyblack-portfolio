import ProjectCard from './ProjectCard';

interface ProjectButton {
  label: string;
  url: string;
  variant: 'primary' | 'secondary' | 'outline' | 'github';
  icon?: string;
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  buttons: ProjectButton[];
  featured?: boolean;
}

const projects: Project[] = [
   {
    title: "Digital Signage App",
    description: "React-based digital signage application with Google Drive sync, weather widgets, and scheduling features. Supports both web and terminal display modes.",
    tags: ["React", "Node.js", "Google Drive API", "WebSocket"],
    buttons: [
      { label: "Live Demo", url: "https://slideshow.stuv-ravensburg.de/", variant: "primary" },
      { label: "View on GitHub", url: "https://github.com/asta-dhbw/Terminal-Slide-Show", variant: "github", icon: "github" }
    ],
    featured: true
  },
  {
    title: "STUV Website",
    description: "Comprehensive ecosystem management platform for DHBW Ravensburg Student Union. Features automated event management with digital signage integration, Instagram advertising, live room usage tracking, role-based admin system with Google Workspace integration, community feedback forms, and automated user provisioning with security dashboards.",
    tags: ["Next.js", "TypeScript", "Role Management", "Google API", "Automation", "Dashboard"],
    buttons: [
      { label: "Live Site", url: "https://beta.stuv-ravensburg.de", variant: "primary" },
      { label: "Admin Panel", url: "https://admin.stuv-ravensburg.de/login", variant: "secondary" },
      { label: "GitHub", url: "https://github.com/it-stuv-ravensburg", variant: "github", icon: "github" }
    ],
    featured: true
  },
  {
    title: "The Dawn",
    description: "Advanced 3D web application showcasing humanity's future through interactive storytelling. Features procedural planet generation, space stations, and physics-based vehicle systems using Three.js.",
    tags: ["Three.js", "JavaScript", "WebGL", "Vite", "3D Graphics"],
    buttons: [
      { label: "View Project", url: "/thedawn", variant: "primary" },
      { label: "Presentation", url: "/thedawn-presentation", variant: "secondary" }
    ],
    featured: true
  },
  {
    title: "Smart Home WiFi Bulb",
    description: "Custom IoT hardware project featuring a WiFi-enabled smart bulb designed for open-source software integration. Complete self-designed solution including PCB design, 3D printed housing, and soldering work. Developed as a study project to create affordable smart home lighting with full customization capabilities.",
    tags: ["IoT", "Hardware", "WiFi", "3D Printing", "PCB Design", "Smart Home"],
    buttons: [
      { label: "View Project", url: "https://bb.muddyblack.de/hardware", variant: "primary" },
    ],
    featured: true
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent via-accent/80 to-accent mx-auto mb-6" />
          <p className="text-secondary text-lg max-w-3xl mx-auto leading-relaxed">
            Here are some of my recent projects. Each one represents a unique challenge and learning experience.
          </p>
        </div>
        
        {/* Projects Grid - Better alignment with consistent spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="flex">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}