import React from 'react';
import { Heart, Sparkles, ArrowUp, Compass } from 'lucide-react';
import { DiamondGem } from './DiamondGem';
import { FRIENDSHIP_SYMBOLS } from '../config/siteConfig';

interface ClosingSceneProps {
  recipientName: string;
}

export const ClosingScene: React.FC<ClosingSceneProps> = ({ recipientName }) => {
  const scrollToGallery = () => {
    const gallery = document.getElementById('memories-gallery');
    if (gallery) {
      gallery.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative pt-14 pb-24 px-4 text-center z-10 overflow-hidden border-t border-purple-900/40">
      {/* Central Glowing Diamond as Visual Anchor */}
      <div className="flex justify-center mb-5 animate-pulse-subtle">
        <DiamondGem size={56} glow={true} />
      </div>

      {/* Shared Friendship Emojis Row Wrapped for Mobile */}
      <div className="max-w-md mx-auto mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 px-3">
        {FRIENDSHIP_SYMBOLS.map((sym, idx) => (
          <span
            key={idx}
            className="w-8 h-8 rounded-full bg-purple-950/60 border border-purple-600/25 flex items-center justify-center text-sm sm:text-base shadow-sm hover:scale-110 transition-transform"
          >
            {sym}
          </span>
        ))}
      </div>

      <div className="max-w-xl mx-auto px-2">
        <p className="font-serif-luxury italic text-purple-300 text-sm sm:text-base mb-2">
          "Different little moments. One special bond."
        </p>

        <h2 className="font-cinzel text-2xl sm:text-4xl text-purple-100 font-bold tracking-wide mb-2">
          Chapter 22 Begins Today.
        </h2>

        <p className="font-cursive text-3xl sm:text-4xl text-amber-300/95 my-3">
          Happy Birthday, my {recipientName} 💎
        </p>

        <p className="font-serif-luxury italic text-purple-200/90 text-sm sm:text-lg max-w-md mx-auto leading-relaxed mb-6">
          More laughter, more memories, more adventures — and more of our own little universe. ♾️
        </p>

        {/* Action Button: Relive Our Memories - 48px touch target */}
        <div className="flex items-center justify-center mb-10">
          <button
            onClick={scrollToGallery}
            className="min-h-[48px] px-6 py-3 rounded-full font-cinzel text-xs sm:text-sm font-semibold tracking-wider text-amber-100 bg-gradient-to-r from-purple-800 via-fuchsia-900 to-purple-800 hover:from-purple-700 hover:to-fuchsia-800 border border-amber-300/40 shadow-[0_4px_20px_rgba(168,85,247,0.3)] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Compass className="w-4 h-4 text-amber-300" />
            <span>Relive Our Memories</span>
            <ArrowUp className="w-4 h-4 text-amber-300" />
          </button>
        </div>

        {/* Handcrafted Signature */}
        <div className="pt-6 border-t border-purple-900/40 flex flex-col items-center gap-1.5 text-xs text-purple-400/80 font-serif-luxury">
          <p className="italic text-sm sm:text-base text-purple-300/90 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Made with love, especially for {recipientName}.</span>
            <Heart className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
          </p>
          <span className="text-[11px] font-sans text-purple-500/60">
            October 21, 2026 • Chapter 22 Edition 💎
          </span>
        </div>
      </div>
    </footer>
  );
};
