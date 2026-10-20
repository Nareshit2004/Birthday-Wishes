import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Sparkles } from 'lucide-react';
import { audioManager } from '../utils/audioManager';
import { DiamondGem } from './DiamondGem';

interface GiftBoxProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const GiftBox: React.FC<GiftBoxProps> = ({ onOpen, isOpen }) => {
  const [isOpeningAnim, setIsOpeningAnim] = useState(false);
  const [showEmergingDiamond, setShowEmergingDiamond] = useState(false);

  const handleBoxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOpen || isOpeningAnim) return;

    audioManager.playGiftOpen();
    setIsOpeningAnim(true);

    // Confetti burst with deep purple, lavender, champagne gold colors & petals
    confetti({
      particleCount: 65,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#c084fc', '#f5d061', '#e879f9', '#a855f7', '#ffffff'],
    });

    // Let glowing diamond emerge
    setTimeout(() => {
      setShowEmergingDiamond(true);
      confetti({
        particleCount: 35,
        angle: 60,
        spread: 50,
        origin: { x: 0.35, y: 0.6 },
        colors: ['#f5d061', '#d8b4fe'],
      });
      confetti({
        particleCount: 35,
        angle: 120,
        spread: 50,
        origin: { x: 0.65, y: 0.6 },
        colors: ['#c084fc', '#f472b6'],
      });
      onOpen();
      setIsOpeningAnim(false);
    }, 900);
  };

  return (
    <div className="flex flex-col items-center justify-center my-4 sm:my-6 z-20 px-4">
      {!isOpen ? (
        <div className="text-center group cursor-pointer" onClick={handleBoxClick}>
          {/* Animated 3D Gift Box */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto flex items-center justify-center transition-transform duration-500 group-hover:scale-105 active:scale-95">
            {/* Ambient Purple & Gold Aura */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600/30 via-amber-300/20 to-fuchsia-600/30 blur-xl transition-all" />

            {/* Glowing Bow at the Top */}
            <div
              className={`absolute -top-3 z-30 flex items-center justify-center transition-transform duration-700 ${
                isOpeningAnim ? '-translate-y-16 rotate-12 opacity-0' : 'animate-bounce'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-600 shadow-[0_0_15px_rgba(245,208,97,0.8)] border border-amber-100 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-purple-950" />
                </div>
                {/* Ribbon loops */}
                <div className="absolute -left-4 -top-1.5 w-7 h-7 rounded-full border-4 border-amber-300 bg-amber-400/30 rotate-45 -z-10" />
                <div className="absolute -right-4 -top-1.5 w-7 h-7 rounded-full border-4 border-amber-300 bg-amber-400/30 -rotate-45 -z-10" />
              </div>
            </div>

            {/* Gift Box Lid */}
            <div
              className={`absolute top-4 w-32 h-9 sm:w-40 sm:h-11 rounded-t-lg bg-gradient-to-r from-purple-900 via-fuchsia-900 to-purple-950 border-2 border-purple-400/40 shadow-xl z-20 flex items-center justify-center transition-all duration-700 ${
                isOpeningAnim
                  ? '-translate-y-20 -rotate-12 opacity-20'
                  : 'group-hover:-translate-y-1'
              }`}
            >
              {/* Horizontal Gold Ribbon */}
              <div className="w-full h-2.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 shadow-sm" />
            </div>

            {/* Gift Box Body */}
            <div className="absolute bottom-2 w-28 h-24 sm:w-36 sm:h-30 rounded-b-xl bg-gradient-to-b from-purple-950 via-[#180826] to-[#0f0418] border-2 border-purple-500/40 shadow-2xl overflow-hidden flex items-center justify-center z-10">
              {/* Vertical Gold Ribbon */}
              <div className="w-5 h-full bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-600 shadow-[0_0_10px_rgba(245,208,97,0.4)]" />

              {/* Diamond Watermark */}
              <div className="absolute top-2 left-2 opacity-60">
                <DiamondGem size={14} glow={false} />
              </div>
            </div>
          </div>

          {/* Action Prompt with 48px touch target */}
          <div className="mt-4 flex flex-col items-center gap-1.5">
            <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-purple-950/80 border border-amber-400/40 text-amber-200 font-cinzel text-xs sm:text-sm tracking-wider font-semibold shadow-[0_0_15px_rgba(245,208,97,0.2)] group-hover:border-amber-300 transition-all active:scale-95 min-h-[48px]">
              <Gift className="w-4 h-4 text-amber-300" />
              <span>Tap to Open Your Birthday Gift 💎</span>
            </span>
            <span className="font-serif-luxury italic text-purple-300/70 text-xs">
              A private letter and special surprises are tucked inside
            </span>
          </div>
        </div>
      ) : (
        /* Emerging Diamond after Open */
        <div className="flex flex-col items-center gap-2 text-center animate-fadeIn">
          {showEmergingDiamond && (
            <div className="animate-bounce">
              <DiamondGem size={48} glow={true} />
            </div>
          )}
          <div className="flex items-center gap-2 text-purple-300/80 font-cinzel text-xs tracking-widest uppercase">
            <span>🌸</span>
            <span>Gift Opened With Love</span>
            <span>💎💗</span>
          </div>
        </div>
      )}
    </div>
  );
};
