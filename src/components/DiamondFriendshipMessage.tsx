import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { DiamondGem } from './DiamondGem';

interface DiamondFriendshipMessageProps {
  recipientName: string;
}

export const DiamondFriendshipMessage: React.FC<DiamondFriendshipMessageProps> = ({ recipientName }) => {
  return (
    <section className="relative my-12 sm:my-16 px-3 sm:px-4 max-w-2xl mx-auto z-10">
      <div className="rounded-2xl purple-glass-card p-5 sm:p-8 border border-amber-300/35 relative overflow-hidden shadow-[0_15px_40px_rgba(7,2,14,0.7)]">
        {/* Background Ambient Glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Section Header with Diamond */}
        <div className="flex flex-col items-center text-center mb-5">
          <DiamondGem size={38} glow={true} className="mb-2" />
          <h2 className="font-cinzel text-xl sm:text-2xl text-purple-100 font-bold tracking-wide">
            You're My Diamond, {recipientName} 💎
          </h2>
          <span className="text-[11px] font-sans uppercase tracking-widest text-amber-300/80 mt-1">
            Our Inside Word • Our Special Language
          </span>
        </div>

        {/* Tanglish Message Body */}
        <div className="font-serif-luxury text-[16px] sm:text-[18px] text-purple-100/95 leading-[1.8] sm:leading-[1.85] space-y-4">
          <p>
            Ellarum diamond nu oru word use pannalaam, but namakku adhu oru word mattum illa. Adhoda meaning namma friendship kooda serndhu special aagiduchu. 💎
          </p>
          <p>
            Diamond evalo rare and precious-oh, adhey maadhiri dhaan indha bond-um. We have our own silly codes, random emojis, unprompted roasts, and conversations that nobody else would ever understand. And honestly, that is what makes this friendship so effortless and irreplaceable.
          </p>
          <p>
            Nee 22-la enter aagumbodhu, just remember how deeply valued and celebrated you are. Ini varra chapters-layum nariya sirikanum, nariya memories collect pannanum, and our little world should keep shining brighter than ever.
          </p>
        </div>

        {/* Signoff */}
        <div className="mt-6 pt-4 border-t border-purple-800/40 flex items-center justify-between text-xs text-purple-300/80 font-sans">
          <span className="flex items-center gap-1.5 text-amber-300/90">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Always My Diamond</span>
          </span>
          <span className="flex items-center gap-1">
            Chapter 22 <Heart className="w-3 h-3 text-purple-400 fill-purple-400" />
          </span>
        </div>
      </div>
    </section>
  );
};
