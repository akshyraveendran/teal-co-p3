import { cn } from '../lib/utils';
import gsap from 'gsap';

interface DockNavProps {
  activeSection: string;
}

/**
 * DockNav Component
 * 
 * A floating navigation bar that provides quick access to major sections.
 * Highlights the active section based on the scroll position.
 */
export function DockNav({ activeSection }: DockNavProps) {
  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'footer', label: 'Work' }
  ];

  const handleScroll = (id: string) => {
    // Uses GSAP ScrollToPlugin for smooth, easing-controlled jumps to sections
    gsap.to(window, {
      scrollTo: `#${id}`,
      duration: 1.2,
      ease: 'power4.inOut'
    });
  };

  return (
    <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex items-center bg-white/10 backdrop-blur-md px-2 py-2 rounded-full border border-white/20">
      <div className="flex items-center">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleScroll(section.id)}
            className={cn(
              "px-4 py-2 text-[10px] uppercase tracking-widest transition-all duration-500 rounded-full",
              activeSection === section.id 
                ? "bg-accent text-white" 
                : "text-ink/60 hover:text-ink hover:bg-black/5"
            )}
          >
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
