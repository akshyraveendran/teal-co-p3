import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

/**
 * Hero Component
 * 
 * The landing section of the site.
 * Features a split-text entrance animation and a parallax scroll-trigger 
 * that scales and fades the headline as the user scrolls down.
 */
export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split the main headline into words and wrap each in a double-span 
      // for the "masked reveal" animation effect.
      const headlineWords = headlineRef.current?.innerText.split(' ');
      if (headlineRef.current) {
        headlineRef.current.innerHTML = headlineWords?.map(word => 
          `<span class="split-word"><span class="split-word-inner inline-block">${word}</span></span>`
        ).join(' ') || '';
      }

      const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.5 } });

      // Sequenced entrance animations: headline -> subtext -> CTA
      tl.from('.split-word-inner', {
        yPercent: 100,
        stagger: 0.05,
        delay: 0.5
      })
      .from(subtextRef.current, {
        opacity: 0,
        y: 20,
        duration: 1
      }, '-=1')
      .from(ctaRef.current, {
        scale: 0.6,
        rotate: -6,
        opacity: 0,
        duration: 1
      }, '-=1');

      // Parallax scroll effect: shrinks and fades headline during scroll
      gsap.to(headlineRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        },
        scale: 0.8,
        y: -50,
        opacity: 0.5
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="hero" 
      ref={sectionRef} 
      className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-bg"
    >
      <div className="max-w-5xl w-full">
        <h1 
          ref={headlineRef}
          className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.9] text-ink mb-12"
        >
          Turning ideas into visual stories.
        </h1>
        
        <p 
          ref={subtextRef}
          className="text-lg md:text-xl text-ink-soft max-w-xl mx-auto mb-10 leading-relaxed font-medium"
        >
          A creative studio shaping branding, social experiences, and spaces that tell meaningful stories.
        </p>

        <button 
          ref={ctaRef}
          data-cursor="link-pill"
          className="bg-accent text-white px-8 py-4 rounded-full flex items-center gap-3 text-sm font-semibold tracking-wide hover:scale-105 transition-transform"
        >
          Discover our work <ArrowRight size={18} />
        </button>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30 animate-bounce">
        <div className="w-[1px] h-12 bg-ink" />
      </div>
    </section>
  );
}
