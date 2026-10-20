import React, { useState } from 'react';
import { Star, X, Heart, CheckCircle2 } from 'lucide-react';
import type { WishItem } from '../config/siteConfig';
import { audioManager } from '../utils/audioManager';
import { DiamondGem } from './DiamondGem';

interface TwentyTwoWishesProps {
  wishes: WishItem[];
}

export const TwentyTwoWishes: React.FC<TwentyTwoWishesProps> = ({ wishes }) => {
  const [unlockedIds, setUnlockedIds] = useState<Set<number>>(new Set());
  const [activeWish, setActiveWish] = useState<WishItem | null>(null);

  const handleStarClick = (wish: WishItem) => {
    const isNewlyRevealed = !unlockedIds.has(wish.id);
    if (isNewlyRevealed) {
      audioManager.playWishReveal();
      setUnlockedIds((prev) => new Set(prev).add(wish.id));
    }
    setActiveWish(wish);
  };

  const handleUnlockAll = () => {
    setUnlockedIds(new Set(wishes.map((w) => w.id)));
  };

  return (
    <section className="relative my-14 sm:my-20 px-3 sm:px-4 max-w-3xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-200 text-[11px] sm:text-xs font-cinzel tracking-widest uppercase mb-2 shadow-sm">
          <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          <span>The Celestial Constellation</span>
          <span>🪐✨</span>
        </div>

        <div className="flex justify-center mb-2">
          <DiamondGem size={28} glow={true} />
        </div>

        <h2 className="font-cinzel text-2xl sm:text-4xl text-purple-100 font-bold tracking-wide">
          Twenty-Two Wishes for Age 22 💎
        </h2>
        <p className="font-serif-luxury italic text-purple-200/80 text-sm sm:text-base max-w-md mx-auto mt-1 px-2">
          Each glowing star holds one heartfelt blessing for the magnificent year ahead. Tap each star to reveal its secret.
        </p>

        {/* Progress Tracker */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs font-cinzel text-purple-300/80">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/20">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
            <span>
              Unlocked {unlockedIds.size} of {wishes.length} Wishes
            </span>
          </div>

          {unlockedIds.size < wishes.length && (
            <button
              onClick={handleUnlockAll}
              className="text-amber-300 hover:text-amber-200 underline underline-offset-4 cursor-pointer transition-colors min-h-[44px] flex items-center"
            >
              Light Up All Stars
            </button>
          )}
        </div>
      </div>

      {/* Mobile-Friendly Grid: 2 columns on small phones, 3 on larger phones, 4-6 on tablet/desktop */}
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 sm:gap-3 max-w-2xl mx-auto">
        {wishes.map((wish) => {
          const isUnlocked = unlockedIds.has(wish.id);
          return (
            <button
              key={wish.id}
              onClick={() => handleStarClick(wish)}
              className={`group relative p-3 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer min-h-[58px] active:scale-95 ${
                isUnlocked
                  ? 'bg-purple-900/40 border border-amber-300/40 shadow-[0_0_15px_rgba(245,208,97,0.2)]'
                  : 'bg-purple-950/40 border border-purple-700/30 hover:border-purple-400/60'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
                  isUnlocked
                    ? 'bg-gradient-to-tr from-amber-400 to-yellow-200 text-purple-950 shadow-[0_0_10px_rgba(245,208,97,0.8)]'
                    : 'bg-purple-900/60 text-purple-300'
                }`}
              >
                <Star
                  className={`w-3.5 h-3.5 ${
                    isUnlocked ? 'fill-purple-950' : 'fill-none'
                  }`}
                />
              </div>

              <span className="font-cinzel text-xs font-semibold text-purple-200">
                #{String(wish.id).padStart(2, '0')}
              </span>

              <span className="text-[10px] text-purple-300/70 truncate max-w-full font-sans">
                {wish.category}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Wish Mobile Sheet / Modal */}
      {activeWish && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveWish(null)}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl purple-glass-card p-6 border border-amber-300/40 shadow-2xl text-center animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close 48px touch target */}
            <button
              onClick={() => setActiveWish(null)}
              className="absolute top-3 right-3 w-10 h-10 rounded-full bg-purple-900/60 text-purple-200 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close wish dialog"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 text-purple-950 shadow-md flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 fill-purple-950" />
            </div>

            <span className="font-cinzel text-[11px] uppercase tracking-widest text-amber-300 font-semibold px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30">
              Wish #{activeWish.id} • {activeWish.category}
            </span>

            <h3 className="font-cinzel text-xl text-purple-100 font-bold mt-3 mb-2">
              {activeWish.title}
            </h3>

            <p className="font-serif-luxury italic text-purple-200/95 text-base sm:text-lg leading-relaxed">
              "{activeWish.text}"
            </p>

            <div className="mt-5 pt-3 border-t border-purple-800/40 flex items-center justify-center gap-1.5 text-xs text-purple-300/70 font-sans">
              <Heart className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
              <span>For Your 22nd Birthday 💎</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
