import React, { useState, useEffect } from 'react';
import { MailOpen, FastForward, Heart } from 'lucide-react';
import { DiamondGem } from './DiamondGem';

interface BirthdayLetterProps {
  isOpen: boolean;
  recipientName: string;
}

export const BirthdayLetter: React.FC<BirthdayLetterProps> = ({ isOpen, recipientName }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const letterParagraphs = [
    `Dear ${recipientName} 💎,`,

    `Some people enter our lives quietly and unexpectedly, and before we even realize it, they become an irreplaceable part of everyday life. Looking back, that is exactly how our story unfolded.`,

    `Un kooda pesura random conversations kooda sila neram en day ah better aakidum. Just sharing the most ordinary stories, teasing each other without any filter, or listening to silly rants after a long exhausting day — and suddenly everything feels lighter. Like Shobana in Thiruchitrambalam or Anu in Oh My Kadavule, you have this rare gift of bringing pure comfort into my world without even trying.`,

    `Nee evlo care panra nu unakke sila neram puriyadhu. Your little gestures, your genuine concern, the way you check in when things get heavy — those small things mean far more than you realize. You have a heart of pure gold, and you protect the people you care about with effortless warmth.`,

    `Un life la nee deserve panra happiness, peace, success ellame unakku kidaikkanum. At 22, you are standing at the threshold of so many extraordinary beginnings. Don't ever doubt your worth, your talent, or the magic you carry. Walk into this chapter with unshakeable confidence, knowing that the universe has breathtaking adventures waiting for you.`,

    `Namakkulla irukkura indha friendship eppovume ipdiye genuine ah, happy ah irukkanum. We don't need perfection, and we don't need to put on any act. Just pure honesty, endless laughter, and the unspoken certainty that whatever happens, we stand by each other.`,

    `Happy 22nd Birthday, my Jeevuhhhh. Some bonds don't need a name to mean the world. Ours will always have its own little place in my heart. 💜`
  ];

  const fullLetterContent = letterParagraphs.join('\n\n');

  useEffect(() => {
    if (!isOpen) return;

    let index = 0;
    setDisplayedText('');
    setIsTypingComplete(false);

    const timer = setInterval(() => {
      index += 4;
      if (index >= fullLetterContent.length) {
        setDisplayedText(fullLetterContent);
        setIsTypingComplete(true);
        clearInterval(timer);
      } else {
        setDisplayedText(fullLetterContent.slice(0, index));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [isOpen, fullLetterContent]);

  const handleInstantReveal = () => {
    setDisplayedText(fullLetterContent);
    setIsTypingComplete(true);
  };

  if (!isOpen) return null;

  return (
    <section className="relative max-w-2xl mx-auto my-8 sm:my-12 px-3 sm:px-4 z-20 animate-fadeIn">
      {/* Ornate Envelope Container */}
      <div className="relative rounded-2xl bg-gradient-to-b from-[#1e0d30] via-[#150722] to-[#0d0417] border border-amber-300/30 p-5 sm:p-8 shadow-[0_20px_60px_rgba(10,2,20,0.8),0_0_30px_rgba(168,85,247,0.15)]">
        {/* Envelope Header with 44px min height touch target */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-purple-800/40 pb-3 mb-5">
          <div className="flex items-center gap-2 text-amber-200">
            <MailOpen className="w-4 h-4 text-amber-300" />
            <span className="font-cinzel text-xs sm:text-sm tracking-widest uppercase font-semibold">
              The Birthday Parchment 💎
            </span>
          </div>

          {!isTypingComplete && (
            <button
              onClick={handleInstantReveal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-purple-900/60 hover:bg-purple-800 border border-purple-400/30 text-purple-200 text-xs font-cinzel transition-all cursor-pointer min-h-[44px] active:scale-95"
            >
              <FastForward className="w-3.5 h-3.5 text-amber-300" />
              <span>Read Full Letter</span>
            </button>
          )}
        </div>

        {/* Letter Body - 16-18px readable text with generous line-height */}
        <div className="font-serif-luxury text-[16px] sm:text-[18px] text-purple-100/95 leading-[1.8] sm:leading-[1.85] whitespace-pre-line tracking-wide">
          {displayedText}
          {!isTypingComplete && (
            <span className="inline-block w-2 h-4 bg-amber-300 ml-1 animate-pulse align-middle" />
          )}
        </div>

        {/* Postscript Footer Note */}
        {isTypingComplete && (
          <div className="mt-6 pt-5 border-t border-purple-800/40 flex flex-wrap items-center justify-between gap-2 text-xs text-purple-300/80 font-sans">
            <span className="inline-flex items-center gap-1.5 text-amber-300/90">
              <DiamondGem size={16} glow={false} />
              Written from the heart for Chapter 22
            </span>
            <span className="inline-flex items-center gap-1">
              Pure Friendship <Heart className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
