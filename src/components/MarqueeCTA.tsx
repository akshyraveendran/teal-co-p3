import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * MarqueeCTA Component
 * 
 * An infinite horizontal scrolling text marquee.
 * Uses GSAP to translate the text row based on half of its total width
 * for a seamless looping effect.
 */
export function MarqueeCTA() {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const row = rowRef.current;
      if (!row) return;

      // Calculate half width for seamless looping (assuming the row has 2 copies of the content)
      const totalWidth = row.scrollWidth / 2;

      // Infinite loop animation: resets to 0 after reaching -totalWidth
      gsap.to(row, {
        x: -totalWidth,
        duration: 20,
        ease: 'none',
        repeat: -1,
        onUpdate: function() {
          // Velocity tracking could be added here for scroll-speed linking
        }
      });
    }, rowRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="marquee" className="bg-bg py-20 border-y border-ink/5 overflow-hidden group cursor-pointer">
      <a href="https://linkedin.com/in/" className="block">
        <div ref={rowRef} className="flex whitespace-nowrap items-center text-5xl md:text-[8vw] font-bold tracking-tighter uppercase leading-none">
          <span className="flex items-center gap-10">
            Let's build something meaningful together ↗
            <div className="w-12 h-12 md:w-32 md:h-32 bg-accent rounded-2xl flex items-center justify-center -rotate-6 group-hover:rotate-12 transition-transform duration-500">
              <div className="w-1/2 h-1/2 border-t-4 border-r-4 border-white rotate-45 translate-x-[-10%] translate-y-[10%]" />
            </div>
          </span>
          <span className="flex items-center gap-10 ml-10">
            Let's build something meaningful together ↗
            <div className="w-12 h-12 md:w-32 md:h-32 bg-accent rounded-2xl flex items-center justify-center -rotate-6 group-hover:rotate-12 transition-transform duration-500">
              <div className="w-1/2 h-1/2 border-t-4 border-r-4 border-white rotate-45 translate-x-[-10%] translate-y-[10%]" />
            </div>
          </span>
        </div>
      </a>
    </section>
  );
}
