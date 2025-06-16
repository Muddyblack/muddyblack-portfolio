"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const isDarkMode = 
      localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  if (!mounted) return null;

  const isStudyMaterialsActive = pathname.startsWith('/study-materials');

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 relative overflow-hidden rounded-full transition-transform group-hover:scale-110">
              <Image
                src="/logo.png"
                alt="MB"
                className="transition-transform group-hover:scale-105"
                fill
                priority
              />
            </div>
            <span className={`font-semibold text-lg ${
              scrolled ? 'text-foreground' : 'dark:text-foreground text-white'
            }`}>Home</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="#about" 
              className={`hover:text-primary transition-all hover:translate-y-[-2px] ${
                scrolled ? 'text-secondary' : 'dark:text-secondary text-white'
              }`}
            >
              About
            </Link>
            <Link 
              href="#projects" 
              className={`hover:text-primary transition-all hover:translate-y-[-2px] ${
                scrolled ? 'text-secondary' : 'dark:text-secondary text-white'
              }`}
            >
              Projects
            </Link>
            <Link 
              href="/study-materials" 
              className={`hover:text-primary transition-all hover:translate-y-[-2px] ${
                isStudyMaterialsActive ? 'text-primary' : 
                scrolled ? 'text-secondary' : 'dark:text-secondary text-white'
              }`}
            >
              Study Materials
            </Link>
            <Link 
              href="https://github.com/muddyblack" 
              className={`px-5 py-2.5 border border-accent rounded-lg hover:bg-accent hover:text-white 
                        transition-all hover:translate-y-[-2px] ${
                scrolled ? 'text-foreground' : 'dark:text-foreground text-white'
              }`}
            >
              GitHub Profile
            </Link>
            <button
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-lg hover:bg-muted/20 transition-all ${
                scrolled ? 'text-foreground' : 'dark:text-foreground text-white'
              }`}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={22} /> : <Moon size={22} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg hover:bg-muted/20 transition-all ${
              scrolled ? 'text-foreground' : 'dark:text-foreground text-white'
            }`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Only renders when open */}
        {isMenuOpen && (
          <div className="md:hidden overflow-hidden">
            <div className="py-4 space-y-2 border-t border-muted/20">
              <Link 
                href="#about"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  scrolled ? 'text-foreground hover:bg-muted/20' : 'text-white hover:bg-white/10'
                }`}
              >
                About
              </Link>
              <Link 
                href="#projects"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  scrolled ? 'text-foreground hover:bg-muted/20' : 'text-white hover:bg-white/10'
                }`}
              >
                Projects
              </Link>
              <Link 
                href="/study-materials"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  isStudyMaterialsActive ? 'text-primary bg-primary/10' :
                  scrolled ? 'text-foreground hover:bg-muted/20' : 'text-white hover:bg-white/10'
                }`}
              >
                Study Materials
              </Link>
              <Link 
                href="https://github.com/muddyblack"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  scrolled ? 'text-foreground hover:bg-muted/20' : 'text-white hover:bg-white/10'
                }`}
              >
                GitHub Profile
              </Link>
              <button
                onClick={() => {
                  toggleDarkMode();
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-2 ${
                  scrolled ? 'text-foreground hover:bg-muted/20' : 'text-white hover:bg-white/10'
                }`}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}