"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, Moon, Sun } from "lucide-react";

export default function NavBar() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
                className="border-2 border-accent transition-transform group-hover:scale-105"
                fill
                priority
              />
            </div>
            <span className="text-foreground font-semibold text-lg">Home</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="#projects" 
              className="text-secondary hover:text-primary transition-all hover:translate-y-[-2px]"
            >
              Projects
            </Link>
            <Link 
              href="https://github.com/muddyblack" 
              className="px-5 py-2.5 border border-accent rounded-lg text-foreground 
                       hover:bg-accent hover:text-white transition-all hover:translate-y-[-2px]"
            >
              GitHub Profile
            </Link>
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-lg hover:bg-muted/20 transition-all"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={22} className="text-foreground" /> : 
                       <Moon size={22} className="text-foreground" />}
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted/20 transition-colors"
          >
            <Menu size={24} className="text-foreground" />
          </button>
        </div>

        <div className={`md:hidden transform transition-all duration-300 ${
          isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-[-20px] opacity-0 pointer-events-none'
        }`}>
          <div className="py-4 space-y-3">
            <Link 
              href="#projects"
              className="block px-4 py-3 text-foreground hover:bg-muted/20 rounded-lg transition-colors"
            >
              Projects
            </Link>
            <Link 
              href="https://github.com/muddyblack"
              className="block px-4 py-3 text-foreground hover:bg-muted/20 rounded-lg transition-colors"
            >
              GitHub Profile
            </Link>
            <button
              onClick={toggleDarkMode}
              className="w-full text-left px-4 py-3 text-foreground hover:bg-muted/20 rounded-lg transition-colors"
            >
              {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}