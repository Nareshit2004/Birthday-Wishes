import React, { useMemo } from 'react';
import { Sparkles, Crown } from 'lucide-react';
import { DiamondGem } from './DiamondGem';

interface BirthdayRevealProps {
  recipientName: string;
  birthdayDate: string;
}

export const BirthdayReveal: React.FC<BirthdayRevealProps> = ({ recipientName, birthdayDate }) => {
  // Check if visitor's local date is on or after the birthday date
  const statusMessage = useMemo(() => {
    const today = new Date();
    const target = new Date(`${birthdayDate}T00:00:00`);

    const isToday =
      today.getFullYear() === target.getFullYear() &&
      today.getMonth() === target.getMonth() &&
      today.getDate() === target.getDate();

    if (isToday) {
      return "Today is the day! October 21 — The entire universe celebrates you! 👑💎";
    }

    if (today < target) {
      const diffMs = target.getTime() - today.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      if (hours < 24) {
        return `Counting down the final ${hours}h ${mins}m until October 21! 💜`;
      }
      return "Counting down the days to your magical day ✨";
    }

    return "Celebrating the queen of our world every single day 💎💗";
  }, [birthdayDate]);

  return (
    <section className="relative pt-8 sm:pt-12 pb-10 sm:pb-14 px-4 text-center max-w-3xl mx-auto z-10 overflow-hidden">
      {/* Central Diamond Signature Motif */}
      <div className="flex justify-center mb-4">
        <DiamondGem size={46} glow={true} />
      </div>

      {/* Decorative Top Pill */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-200 text-[11px] sm:text-xs font-cinzel tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
        <Crown className="w-3.5 h-3.5 text-amber-300" />
        <span>Chapter 22 • 21 October 2026</span>
        <span>🪐✨</span>
      </div>

      {/* Main Birthday Headings with Balanced Line Breaks */}
      <h1 className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-wide leading-tight text-white mb-2">
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-fuchsia-200 to-amber-200 drop-shadow-[0_4px_20px_rgba(168,85,247,0.4)]">
          HAPPY 22ND BIRTHDAY
        </span>
        <span className="font-cursive text-3xl sm:text-5xl md:text-6xl block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-100">
          {recipientName} 💎💗
        </span>
      </h1>

      {/* Original Tanglish & Diamond Quotes */}
      <p className="font-serif-luxury text-base sm:text-xl text-purple-200/95 italic max-w-xl mx-auto mt-3 leading-relaxed px-2">
        "Some people are special, some memories are priceless, and some friendships feel like finding a diamond in the middle of an ordinary day."
      </p>

      {/* Cosmic Motif Line */}
      <div className="my-3 flex items-center justify-center gap-2 text-xs sm:text-sm font-sans text-purple-300/80 px-4">
        <span>In this huge 🌏, among a million little stories, ours will always have its own special place. 🪐✨</span>
      </div>

      <p className="font-serif-luxury text-sm sm:text-lg text-amber-300/90 italic">
        "Un birthday, un happiness, un dreams — ellame beautiful ah nadakkanum."
      </p>

      {/* Live Date Status Badge */}
      <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-950/70 border border-amber-400/30 text-amber-200 text-xs font-medium shadow-md backdrop-blur-md">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>{statusMessage}</span>
      </div>
    </section>
  );
};
