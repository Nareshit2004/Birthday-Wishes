import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, Infinity, Heart } from 'lucide-react';
import { DiamondGem } from './DiamondGem';

interface FriendshipCounterProps {
  startDateStr: string;
}

interface Duration {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const FriendshipCounter: React.FC<FriendshipCounterProps> = ({ startDateStr }) => {
  const calculateDuration = (): Duration => {
    const now = new Date();
    const [y, m, d] = startDateStr.split('-').map(Number);
    const start = new Date(y, m - 1, d, 0, 0, 0);

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();
    let hours = now.getHours() - start.getHours();
    let minutes = now.getMinutes() - start.getMinutes();
    let seconds = now.getSeconds() - start.getSeconds();

    if (seconds < 0) {
      seconds += 60;
      minutes--;
    }
    if (minutes < 0) {
      minutes += 60;
      hours--;
    }
    if (hours < 0) {
      hours += 24;
      days--;
    }
    if (days < 0) {
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }
    if (months < 0) {
      months += 12;
      years--;
    }

    return {
      years: Math.max(0, years),
      months: Math.max(0, months),
      days: Math.max(0, days),
      hours: Math.max(0, hours),
      minutes: Math.max(0, minutes),
      seconds: Math.max(0, seconds),
    };
  };

  const [duration, setDuration] = useState<Duration>(calculateDuration);

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(calculateDuration());
    }, 1000);

    return () => clearInterval(interval);
  }, [startDateStr]);

  const primaryUnits = [
    { label: 'Years', value: duration.years },
    { label: 'Months', value: duration.months },
    { label: 'Days', value: duration.days },
  ];

  const secondaryUnits = [
    { label: 'Hours', value: duration.hours },
    { label: 'Minutes', value: duration.minutes },
    { label: 'Seconds', value: duration.seconds },
  ];

  return (
    <section className="relative my-12 sm:my-16 px-3 sm:px-4 max-w-2xl mx-auto z-10 text-center">
      {/* Decorative Badge */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-200 text-[11px] sm:text-xs font-cinzel tracking-widest uppercase mb-3 shadow-sm">
        <Clock className="w-3.5 h-3.5 text-amber-300" />
        <span>Our Friendship Journey</span>
        <Infinity className="w-3.5 h-3.5 text-purple-400" />
      </div>

      <div className="flex justify-center mb-2">
        <DiamondGem size={28} glow={true} />
      </div>

      <h2 className="font-cinzel text-xl sm:text-3xl text-purple-100 font-bold tracking-wide mb-1">
        Every Second, Another Memory 💎
      </h2>

      <p className="font-serif-luxury italic text-purple-200/80 text-sm sm:text-base max-w-md mx-auto mb-6">
        From December 1, 2023, to every little moment we haven't lived yet. 💜
      </p>

      {/* Mobile-First 2-Row Counter Grid (Primary: Years, Months, Days; Secondary: Hours, Mins, Secs) */}
      <div className="flex flex-col gap-2.5 max-w-lg mx-auto">
        {/* Primary Row: Years, Months, Days */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {primaryUnits.map((unit) => (
            <div
              key={unit.label}
              className="purple-glass-card rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />
              <span className="font-cinzel text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-100 to-amber-200">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest font-sans font-semibold text-amber-300/80 mt-0.5">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* Secondary Row: Hours, Minutes, Seconds */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {secondaryUnits.map((unit) => (
            <div
              key={unit.label}
              className="purple-glass-card rounded-2xl p-2.5 sm:p-3 flex flex-col items-center justify-center relative overflow-hidden bg-purple-950/40"
            >
              <span className="font-cinzel text-xl sm:text-2xl font-bold text-purple-200">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase tracking-widest font-sans text-purple-400/80 mt-0.5">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="font-serif-luxury italic text-purple-300/80 text-xs sm:text-sm mt-5 flex items-center justify-center gap-1.5 px-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>And somehow, every little memory became part of our story.</span>
        <Heart className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
      </p>
    </section>
  );
};
