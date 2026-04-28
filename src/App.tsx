/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Lenis from '@studio-freight/lenis';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Testimonials } from './components/Testimonials';
import { MarqueeCTA } from './components/MarqueeCTA';
import { Approach } from './components/Approach';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { DockNav } from './components/DockNav';
import { TopBar } from './components/TopBar';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/**
 * Root Application Component
 * 
 * Manages the global layout, smooth scrolling (Lenis), and section tracking.
 * Coordinates GSAP ScrollTrigger updates with the smooth scroll engine.
 */
export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ScrollTrigger defaults
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });

    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom exponential easing
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Synchronize GSAP ticker with Lenis requestAnimationFrame (RAF)
    function update(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Ensure ScrollTrigger refreshes whenever Lenis scrolls
    lenis.on('scroll', ScrollTrigger.update);

    // Track active section to update the DockNav component's state
    const sections = ['hero', 'about', 'services', 'testimonials', 'marquee', 'approach', 'footer'];
    sections.forEach((id) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) setActiveSection(id);
        },
      });
    });

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={scrollRef} className="relative min-h-screen">
      <CustomCursor />
      <TopBar />
      <main>
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <MarqueeCTA />
        <Approach />
        <Footer />
      </main>
      <DockNav activeSection={activeSection} />
    </div>
  );
}

