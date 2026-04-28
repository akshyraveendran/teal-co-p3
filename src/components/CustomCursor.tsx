import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * CustomCursor Component
 * 
 * Provides a highly interactive custom cursor experience.
 * Consists of a center dot and a lagging outer ring.
 * Features reactive scaling and styling when hovering over interactive elements.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Update center dot position (near-instant follow)
      gsap.to(dot, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      // Update outer ring position (lagging follow for organic feel)
      gsap.to(ring, {
        x: clientX,
        y: clientY,
        duration: 0.4,
        ease: 'power2.out'
      });
    };

    const onPointerOver = (e: Event) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, [data-cursor]');
      const cursorType = (target.closest('[data-cursor]') as HTMLElement)?.dataset.cursor;

      if (isClickable) {
        // Standard hover: scale ring and change color
        gsap.to(ring, { scale: 1.5, borderColor: '#22c55e', duration: 0.3 });
        
        // Specialized hover for specific UI elements (e.g., CTA buttons)
        if (cursorType === 'link-pill') {
          gsap.to(ring, { 
            width: 80, 
            height: 32, 
            borderRadius: 16, 
            backgroundColor: 'rgba(42, 43, 255, 0.2)', 
            scale: 1, 
            duration: 0.3 
          });
        }
      }
    };

    const onPointerOut = () => {
      // Reset cursor to default state
      gsap.to(ring, { 
        scale: 1, 
        borderColor: 'currentColor', 
        width: 40, 
        height: 40, 
        borderRadius: '50%', 
        backgroundColor: 'transparent', 
        duration: 0.3 
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onPointerOver);
    window.addEventListener('mouseout', onPointerOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onPointerOver);
      window.removeEventListener('mouseout', onPointerOut);
    };
  }, []);

  return (
    <>
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-ink rounded-full z-[999] pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:block" 
      />
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-ink/20 rounded-full z-[998] pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:block transition-colors duration-300" 
      />
    </>
  );
}
