import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Quote } from 'lucide-react';

/**
 * Testimonials Component
 * 
 * Displays client quotes in a grid layout.
 * Features a staggered slide-up entrance animation for the testimonial cards.
 */
export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entrance for testimonial cards when they enter the viewport
      gsap.from('.testimonial-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="bg-surface-dark text-white py-32 md:py-64 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative mb-32">
          <Quote className="absolute -top-20 -left-10 w-40 h-40 text-quote-green opacity-20 rotate-12" />
          <h2 className="text-4xl md:text-7xl font-serif leading-[1.1] relative z-10">
            Design that speaks.<br />Experiences that connect.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="testimonial-card p-10 bg-white/5 border border-white/10 rounded-3xl">
            <p className="text-xl mb-8 leading-relaxed opacity-80 italic">
              "Working with Teal & Co. completely redefined how we saw our own brand. They didn't just design a logo, they built a story that our customers actually want to be part of."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-quote-green rounded-full flex items-center justify-center text-ink font-bold">M</div>
              <div>
                <p className="font-semibold">Marco Nobel</p>
                <p className="text-sm opacity-50">Founder | Fuse Living</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card p-10 bg-white/5 border border-white/10 rounded-3xl md:mt-20">
            <p className="text-xl mb-8 leading-relaxed opacity-80 italic">
              "The space they designed for us isn't just functional, it's a narrative. Every detail feels intentional and reflects exactly who we are as an organization."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold">N</div>
              <div>
                <p className="font-semibold">Nandish Goudar</p>
                <p className="text-sm opacity-50">Country Director | AIESEC</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
