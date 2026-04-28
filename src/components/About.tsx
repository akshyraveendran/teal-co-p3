import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * About Component
 * 
 * Features a scroll-driven text reveal effect where each word's opacity 
 * increases as the user scrolls through the section.
 */
export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const text = textRef.current;
      if (!text) return;

      // Split text into individual words wrapped in spans for character-level control
      const words = text.innerText.split(' ');
      text.innerHTML = words.map(word => `<span class="opacity-10">${word}</span>`).join(' ');

      const spans = text.querySelectorAll('span');

      // Create scroll-driven reveal animation (scrub: 1 for smooth transition)
      gsap.to(spans, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1,
        },
        opacity: 1,
        color: '#0a0a0a',
        stagger: 0.1,
        ease: 'none'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="relative min-h-screen py-32 md:py-64 flex items-center justify-center bg-bg px-6"
    >
      <div className="max-w-4xl">
        <p 
          ref={textRef}
          className="text-4xl md:text-6xl font-serif leading-tight tracking-tight text-ink-soft select-none"
        >
          We are Teal & Co., a creative studio built on storytelling through design. 
          From shaping brand identities to crafting social experiences and designing thoughtful spaces, 
          we turn ideas into visuals that connect. 
          Sometimes, it starts with a quiet thought — we’re here to shape it into something real.
        </p>
      </div>

      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block rotate-12">
        <div className="p-6 bg-white shadow-2xl border border-ink/5 max-w-[200px]">
          <p className="font-hand text-xl text-ink leading-tight">
            Sometimes it starts with a quiet thought.
          </p>
          <div className="mt-4 w-12 h-[1px] bg-accent" />
        </div>
      </div>
    </section>
  );
}
