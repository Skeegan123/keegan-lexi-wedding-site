'use client'

import { useState, useEffect, useCallback } from 'react'
import clsx from 'clsx'

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date()
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  // Only run on the client using useEffect
  useEffect(() => {
    setTimeLeft(calculateTimeLeft()); // Initialize countdown on mount
    setHasMounted(true); // Mark as mounted to trigger fade-in

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, calculateTimeLeft]);

  // Add this variable at the beginning of the component
  const textSizeClass = "text-2xl md:text-3xl"; // Reduced from text-4xl md:text-6xl

  // Update the placeholder component
  const placeholder = (
    <div className="flex justify-center items-baseline opacity-0">
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <span className={`${textSizeClass} font-bold tabular-nums w-12 text-center`}>
            00
          </span>
          <span className="text-xs md:text-sm mt-1 w-12 text-center">
            Days
          </span>
        </div>
        <span className={`${textSizeClass} font-bold mx-1`}>:</span>
      </div>
      {/* Repeat this block for hours, minutes, and seconds placeholders */}
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <span className={`${textSizeClass} font-bold tabular-nums w-12 text-center`}>
            00
          </span>
          <span className="text-xs md:text-sm mt-1 w-12 text-center">
            Hours
          </span>
        </div>
        <span className={`${textSizeClass} font-bold mx-1`}>:</span>
      </div>
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <span className={`${textSizeClass} font-bold tabular-nums w-12 text-center`}>
            00
          </span>
          <span className="text-xs md:text-sm mt-1 w-12 text-center">
            Minutes
          </span>
        </div>
        <span className={`${textSizeClass} font-bold mx-1`}>:</span>
      </div>
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <span className={`${textSizeClass} font-bold tabular-nums w-12 text-center`}>
            00
          </span>
          <span className="text-xs md:text-sm mt-1 w-12 text-center">
            Seconds
          </span>
        </div>
      </div>
    </div>
  );

  if (!timeLeft) {
    // Render the invisible placeholder while loading
    return placeholder;
  }

  return (
    <div className={clsx("text-center transition-opacity duration-1000", { "opacity-0": !hasMounted, "opacity-100": hasMounted })}>
      <div className="flex flex-start">
        {Object.entries(timeLeft).map(([key, value], index, array) => (
          <div key={key} className="flex">
            <div className="flex flex-col items-center">
              <span className={`${textSizeClass} font-bold tabular-nums w-16 text-center`}>
                {value.toString().padStart(2, '0')}
              </span>
              <span className="text-xs md:text-sm mt-1 w-12 text-center">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </span>
            </div>
            {index < array.length - 1 && (
              <span className={`${textSizeClass} font-bold mx-1`}>:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
