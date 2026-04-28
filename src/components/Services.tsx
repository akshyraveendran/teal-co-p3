import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '../lib/utils';

const SERVICES = [
  {
    id: '01',
    title: 'Branding',
    description: 'Transforming brand stories into strong, memorable visual identities.',
    meta: {
      discipline: 'Brand Identity',
      role: 'Creative Direction & Design',
      timeline: 'Ongoing'
    },
    color: 'bg-[#f0f0f0]'
  },
  {
    id: '02',
    title: 'Social Media',
    description: 'Crafting engaging digital experiences and consistent online presence.',
    meta: {
      discipline: 'Digital Design',
      role: 'Content & Visual Strategy',
      timeline: 'Ongoing'
    },
    color: 'bg-[#e8e8e8]'
  },
  {
    id: '03',
    title: 'Interior Design',
    description: 'Designing functional and aesthetic spaces that reflect narrative and purpose.',
    meta: {
      discipline: 'Spatial Design',
      role: 'Concept to Execution',
      timeline: 'Ongoing'
    },
    color: 'bg-[#e0e0e0]'
  }
];

/**
 * Services Component
 * 
 * Displays a list of services using a pinned, stacked card effect.
 * Each card stays fixed at the top as the user scrolls, while scaling 
 * and fading out to make way for the next card.
 */
export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.service-card');
      
      cards.forEach((card, i) => {
        // We don't need to scale down the last card as nothing follows it
        if (i === cards.length - 1) return;

        // Create the stacking effect: current card shrinks and fades as we scroll 
        // past it into the next card's "territory".
        gsap.to(card, {
          scale: 0.95,
          opacity: 0.5,
          scrollTrigger: {
            trigger: card,
            start: 'top top',
            end: '+=100%', // Ends when the next card has fully scrolled in
            scrub: true,
            pin: true,    // Pin the card at the top
            pinSpacing: false // Don't add space below; allow the next card to overlap
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={containerRef} className="relative bg-bg">
      <div className="sticky top-0 h-20 flex items-center px-10 z-[50] mix-blend-difference text-white">
        <h2 className="text-xl font-medium tracking-tight">Services (03)</h2>
      </div>

      <div className="flex flex-col">
        {SERVICES.map((service, i) => (
          <div 
            key={service.id}
            className={cn(
              "service-card min-h-screen w-full sticky top-0 flex flex-col md:flex-row items-stretch border-t border-ink/5 p-10 md:p-20",
              service.color
            )}
          >
            <div className="flex-1 flex flex-col justify-between py-10">
              <div>
                <span className="text-xs font-mono mb-4 block opacity-40">{service.id}</span>
                <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">{service.title}</h3>
                <p className="text-xl md:text-2xl max-w-md text-ink-soft leading-snug">{service.description}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-20 pt-10 border-t border-ink/10">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest opacity-40 mb-2">Discipline</h4>
                  <p className="text-sm font-medium">{service.meta.discipline}</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest opacity-40 mb-2">Role</h4>
                  <p className="text-sm font-medium">{service.meta.role}</p>
                </div>
                <div className="hidden md:block">
                  <h4 className="text-[10px] uppercase tracking-widest opacity-40 mb-2">Timeline</h4>
                  <p className="text-sm font-medium">{service.meta.timeline}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center relative min-h-[300px]">
              <div className="w-full aspect-[4/3] bg-ink/5 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                <div className="w-full h-full flex items-center justify-center text-ink/10 font-black text-4xl italic uppercase">
                  {service.title}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
