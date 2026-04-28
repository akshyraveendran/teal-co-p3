import { useEffect, useState } from 'react';

/**
 * TopBar Component
 * 
 * A fixed header displaying the company name and a live clock synced to PST.
 * Uses a mix-blend-difference effect to stay visible over any background.
 */
export function TopBar() {
  const [time, setTime] = useState('');

  useEffect(() => {
    /**
     * Updates the time state every second.
     * Hardcoded to 'America/Los_Angeles' (PST) to match the brand's home time.
     */
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'America/Los_Angeles'
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(now) + ' PST');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-[100] mix-blend-difference text-white uppercase text-[10px] tracking-[0.2em] px-8 py-6 flex justify-between items-start font-mono pointer-events-none">
      <div className="flex flex-col gap-1">
        <span>TEAL & CO.</span>
      </div>
      
      <div className="hidden md:block opacity-60">
        <span>Lines</span>
      </div>

      <div className="flex items-center gap-2">
        <span>{time}</span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          OPENS FOR WORK
        </span>
      </div>
    </header>
  );
}
