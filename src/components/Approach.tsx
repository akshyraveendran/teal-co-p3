import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Approach Component
 * 
 * Displays the company's methodology in a structured list.
 * Features entrance animations for both content rows and decorative lines
 * triggered by scroll position.
 */
export function Approach() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate approach rows: slide up and fade in with stagger
      gsap.from('.approach-row', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out'
      });

      // Animate decorative lines: expand from left to right
      gsap.from('.approach-line', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        scaleX: 0,
        duration: 1.5,
        ease: 'expo.out',
        transformOrigin: 'left center'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="approach" ref={containerRef} className="py-32 md:py-64 bg-bg px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20">
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter">Our Approach</h2>
          <div className="mt-8 md:mt-0 relative">
            <span className="font-hand text-3xl text-ink-soft absolute -top-12 right-0 -rotate-12 w-48 text-right leading-tight">
              Where I’ve been
            </span>
          </div>
        </div>

        <div className="border-t border-ink/10 relative">
          <div className="approach-line absolute top-0 left-0 w-full h-[1px] bg-ink/10" />
          
          <div className="flex flex-col">
            <div className="approach-row grid grid-cols-1 md:grid-cols-3 py-12 border-b border-ink/5 items-center gap-4">
              <span className="text-2xl font-serif">Concept</span>
              <span className="text-ink-soft/60 md:col-span-2">We begin with ideas and intent</span>
            </div>
            
            <div className="approach-row grid grid-cols-1 md:grid-cols-3 py-12 border-b border-ink/5 items-center gap-4">
              <span className="text-2xl font-serif">Design</span>
              <span className="text-ink-soft/60 md:col-span-2">We translate them into visual systems</span>
            </div>
            
            <div className="approach-row grid grid-cols-1 md:grid-cols-3 py-12 border-b border-ink/5 items-center gap-4">
              <span className="text-2xl font-serif">Refinement</span>
              <span className="text-ink-soft/60 md:col-span-2">We shape every detail with purpose</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
