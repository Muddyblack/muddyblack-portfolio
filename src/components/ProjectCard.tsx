'use client';
import { Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
  presentationLink?: string;
  tags: string[];
}

export default function ProjectCard({ title, description, link, presentationLink, tags }: ProjectCardProps) {
  const handleClick = () => {
    if (!presentationLink) {
      window.open(link, link.startsWith('/') ? '_self' : '_blank');
    }
  };

  return (
    <div 
      className={`group block p-6 bg-background border border-muted rounded-xl
                hover:border-accent transition-all duration-300
                hover:shadow-xl hover:shadow-accent/5
                hover:translate-y-[-4px] relative
                ${!presentationLink ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-accent transition-colors flex items-center gap-2">
          {title}
          {link.includes('github.com') && (
            <Github size={18} className="inline-block opacity-70" />
          )}
        </h3>
        <p className="text-secondary group-hover:text-foreground/80 transition-colors">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, tagIndex) => (
          <span 
            key={tagIndex}
            className="text-xs px-2 py-1 rounded-full bg-muted/50 text-secondary
                     group-hover:bg-accent/10 group-hover:text-accent transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      {presentationLink && (
        <div className="flex gap-2 mt-auto">
          <a 
            href={link}
            className="flex-1 px-4 py-2 text-center text-accent hover:text-white border border-accent
                     rounded-lg hover:bg-accent transition-all"
            target={link.startsWith('/') ? '_self' : '_blank'}
            rel={link.startsWith('/') ? '' : 'noopener noreferrer'}
            onClick={(e) => e.stopPropagation()}
          >
            View Project
          </a>
          <a 
            href={presentationLink}
            className="flex-1 px-4 py-2 text-center bg-accent text-white rounded-lg
                     hover:bg-accent/90 transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            Presentation
          </a>
        </div>
      )}
    </div>
  );
}
