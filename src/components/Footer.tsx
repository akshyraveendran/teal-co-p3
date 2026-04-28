import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';

/**
 * Footer Component
 * 
 * The final section of the site containing contact information and social links.
 * Features a large headline entrance and a playful "sticker" pop-in effect.
 */
export function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main headline slides up and fades in
      gsap.from(headlineRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out'
      });
      
      // Floating sticker pops in with a "back" ease for extra personality
      gsap.from('.footer-sticker', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        scale: 0,
        rotate: -20,
        duration: 1,
        delay: 0.5,
        ease: 'back.out(2)'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer id="footer" ref={sectionRef} className="bg-surface-dark text-white min-h-screen flex flex-col justify-between py-20 px-8 relative overflow-hidden">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="relative">
          <h2 ref={headlineRef} className="text-[12vw] font-bold tracking-tighter leading-none mb-10">
            Work with us.
          </h2>
          
          <div className="footer-sticker absolute -top-10 -right-20 bg-accent text-white px-6 py-3 rounded-full font-hand text-2xl rotate-12 shadow-xl whitespace-nowrap">
            You know you want to
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 items-end pt-20 border-t border-white/10 mt-auto">
        <div className="flex flex-col gap-6">
          <a href="mailto:hello@tealandco.in" className="text-3xl md:text-5xl font-serif hover:text-quote-green transition-colors flex items-center gap-4">
            hello@tealandco.in <ArrowUpRight className="opacity-40" />
          </a>
          <div className="flex gap-8">
            <a href="https://www.instagram.com/tealandco.in/" target="_blank" rel="noreferrer" className="text-sm uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
              Instagram
            </a>
            <a href="#" className="text-sm uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-20 md:mt-0 flex flex-col items-end gap-2 text-[10px] uppercase tracking-[0.2em] opacity-40">
          <span>© 2026 Teal & Co.</span>
          <span>Definitely not my first draft</span>
        </div>
      </div>
    </footer>
  );
}
