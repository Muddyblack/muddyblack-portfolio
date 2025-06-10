'use client';
import { Github, ExternalLink, Presentation, Shield, Users, Globe } from 'lucide-react';

interface ProjectButton {
  label: string;
  url: string;
  variant: 'primary' | 'secondary' | 'outline' | 'github';
  icon?: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  buttons: ProjectButton[];
  featured?: boolean;
}

const getButtonIcon = (icon?: string, variant?: string, label?: string) => {
  if (icon === 'github' || variant === 'github') return <Github size={16} />;
  if (icon === 'presentation' || label?.toLowerCase().includes('presentation')) return <Presentation size={16} />;
  if (icon === 'admin' || label?.toLowerCase().includes('admin')) return <Shield size={16} />;
  if (icon === 'users') return <Users size={16} />;
  if (label?.toLowerCase().includes('live') || label?.toLowerCase().includes('site')) return <Globe size={16} />;
  return <ExternalLink size={16} />;
};

const getButtonStyles = (variant: string) => {
  const baseStyles = "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border";
  
  switch (variant) {
    case 'primary':
      return `${baseStyles} bg-accent/10 text-accent border-accent/20 hover:bg-accent/20 hover:border-accent/30`;
    case 'secondary':
      return `${baseStyles} bg-muted/50 text-foreground/80 border-muted/50 hover:bg-muted/70 hover:text-foreground`;
    case 'github':
      return `${baseStyles} bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800`;
    case 'outline':
    default:
      return `${baseStyles} bg-transparent text-foreground/70 border-muted hover:bg-muted/30 hover:text-foreground`;
  }
};

const getTagColor = (tag: string, index: number) => {
  const colors = [
    'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50',
    'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50',
    'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700/50',
    'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700/50',
    'bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-700/50',
    'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700/50',
  ];
  return colors[index % colors.length];
};

export default function ProjectCard({ title, description, tags, buttons, featured }: ProjectCardProps) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-background via-background/95 to-background/90 
                    border backdrop-blur-sm transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl h-full flex flex-col
                    ${featured 
                      ? 'border-accent/40 shadow-xl shadow-accent/10 hover:border-accent/60 hover:shadow-accent/20' 
                      : 'border-muted/60 hover:border-accent/40 shadow-lg hover:shadow-xl'
                    }`}>
      
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5 
                     opacity-0 group-hover:opacity-100 transition-all duration-700" />
      
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-5 right-5 z-10">
          <div className="bg-gradient-to-r from-accent via-accent/90 to-accent/80 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
            Featured
          </div>
        </div>
      )}
      
      <div className="relative p-8 h-full flex flex-col">
        {/* Header Section */}
        <header className="mb-6 flex-shrink-0">
          <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-accent 
                       transition-colors duration-500 leading-tight tracking-tight">
            {title}
          </h3>
          
          {/* Visual separator */}
          <div className="w-12 h-0.5 bg-gradient-to-r from-accent/60 to-transparent mb-4 
                         group-hover:w-16 transition-all duration-500" />
          
          <p className="text-secondary group-hover:text-foreground/90 transition-colors duration-500 
                       leading-relaxed text-sm font-medium">
            {description}
          </p>
        </header>

        {/* Tags Section - Bottom aligned within flexible space */}
        <div className="mb-8 flex-grow flex flex-col justify-end">
          <div className="flex content-start flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-all duration-300
                           hover:scale-105 cursor-default shadow-sm h-fit
                           ${getTagColor(tag, index)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Actions Section - Consistent positioning with aligned border */}
        <div className="mt-auto flex-shrink-0">
          <div className="w-full h-px bg-gradient-to-r from-muted/30 via-muted/20 to-muted/30 mb-4 
                         group-hover:from-accent/40 group-hover:via-accent/30 group-hover:to-accent/40 
                         transition-all duration-500" />
          <div className="flex flex-wrap gap-2">
            {buttons.map((button, index) => (
              <a
                key={index}
                href={button.url}
                target={button.url.startsWith('/') ? '_self' : '_blank'}
                rel={button.url.startsWith('/') ? '' : 'noopener noreferrer'}
                className={getButtonStyles(button.variant)}
              >
                {getButtonIcon(button.icon, button.variant, button.label)}
                <span>{button.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent 
                       transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
      </div>
    </div>
  );
}
