"use client";

interface StudyMaterial {
  title: string;
  description: string;
  subject: string;
  tags: string[];
  url: string;
  type: 'Interactive' | 'Documentation' | 'Tutorial' | 'Reference';
  buttons: {
    label: string;
    url: string;
    variant: 'primary' | 'secondary' | 'outline';
  }[];
}

const studyMaterials: StudyMaterial[] = [
  {
    title: "Image Processing",
    description: "Interactive flashcards covering fundamental concepts of digital image processing. Learn about spatial and intensity quantization, sampling theory, filtering techniques, and essential algorithms through question-answer cards with AI-powered explanations.",
    subject: "Computer Vision",
    tags: ["Digital Image Processing", "Sampling", "Quantization", "Filtering", "Algorithms"],
    url: "/image-processing/index.html",
    type: "Interactive",
    buttons: [
      { label: "Access Materials", url: "/image-processing/index.html", variant: "primary" },
    ]
  },
  {
    title: "Network Management",
    description: "Comprehensive study materials covering network protocols, administration, monitoring, and troubleshooting. Includes practical examples, interactive demonstrations, and real-world scenarios.",
    subject: "Networking",
    tags: ["Networking", "Protocols", "Network Admin", "Monitoring", "TCP/IP"],
    url: "/network-management/index.html",
    type: "Documentation",
    buttons: [
      { label: "Access Materials", url: "/network-management/index.html", variant: "primary" },
    ]
  }
];

const getTagColor = (tag: string, index: number) => {
  const colors = [
    'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700/50',
    'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50',
    'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700/50',
    'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700/50',
    'bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-700/50',
  ];
  return colors[index % colors.length];
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Interactive':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      );
    case 'Documentation':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'Tutorial':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 000-5H9v5zm0 0H7.5a2.5 2.5 0 000 5H9v-5z" />
        </svg>
      );
    default:
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z" />
        </svg>
      );
  }
};

export default function StudyMaterials() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with proper spacing for NavBar and background image */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/background.jpg')",
          }}
        />
        
        {/* Background overlay */}
        <div className="absolute inset-0 bg-background/60 dark:bg-background/70" />
        
        {/* Hero content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20 mb-6 backdrop-blur-sm">
              Study Materials
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight drop-shadow-lg">
            Exam
            <span className="bg-gradient-to-r from-accent via-accent to-accent/80 bg-clip-text text-transparent"> Preparation</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-foreground/90 max-w-3xl mx-auto leading-relaxed mb-12 drop-shadow-md">
            The stuff I used to learn and prepare for my exams.
            Interactive flashcards and study materials that helped me through university.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <a 
              href="#materials"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-lg font-semibold 
                        hover:bg-accent/90 transition-all duration-200 transform hover:scale-105 hover:shadow-lg
                        backdrop-blur-sm border border-accent/20"
            >
              Browse Materials
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-accent drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Materials Grid Section */}
      <section id="materials" className="py-16 px-6 bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              My Study Collection
            </h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Personal study materials and flashcards I created during my time at university.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {studyMaterials.map((material, index) => (
              <a
                key={index}
                href={material.url}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-background via-background/95 to-background/90 
                          border backdrop-blur-sm transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl h-full flex flex-col
                          border-muted/60 hover:border-accent/40 shadow-lg hover:shadow-xl cursor-pointer"
              >
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5 
                               opacity-0 group-hover:opacity-100 transition-all duration-700" />
                
                <div className="relative p-8 h-full flex flex-col">
                  {/* Header Section */}
                  <header className="mb-6 flex-shrink-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1.5 rounded-lg border border-accent/20">
                          {material.subject}
                        </span>
                      </div>
                      <div className="text-accent bg-accent/10 p-1.5 rounded-lg">
                        {getTypeIcon(material.type)}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-accent 
                                  transition-colors duration-500 leading-tight tracking-tight">
                      {material.title}
                    </h3>
                    
                    {/* Visual separator */}
                    <div className="w-12 h-0.5 bg-gradient-to-r from-accent/60 to-transparent mb-4 
                                   group-hover:w-16 transition-all duration-500" />
                    
                    <p className="text-secondary group-hover:text-foreground/90 transition-colors duration-500 
                                 leading-relaxed text-sm font-medium line-clamp-4">
                      {material.description}
                    </p>
                  </header>

                  {/* Tags Section - Bottom aligned within flexible space */}
                  <div className="mb-8 flex-grow flex flex-col justify-end">
                    <div className="flex flex-wrap gap-2">
                      {material.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-all duration-300
                                     hover:scale-105 cursor-default shadow-sm h-fit
                                     ${getTagColor(tag, tagIndex)}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Visual indicator for clickable card */}
                  <div className="mt-auto flex-shrink-0">
                    <div className="w-full h-px bg-gradient-to-r from-muted/30 via-muted/20 to-muted/30 mb-4 
                                   group-hover:from-accent/40 group-hover:via-accent/30 group-hover:to-accent/40 
                                   transition-all duration-500" />
                    <div className="flex items-center justify-center gap-2 text-accent/70 group-hover:text-accent transition-colors duration-300">
                      <span className="text-sm font-medium">Click to open</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent 
                                 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}