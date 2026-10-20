import React from 'react';
import { Sparkles, Coffee, Smile, MessageCircleHeart, ShieldCheck } from 'lucide-react';

export const FriendshipNote: React.FC = () => {
  const facets = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-amber-300" />,
      title: "Quiet Care",
      desc: "You look out for people without needing applause or the spotlight. Your kindness is instinctive and pure."
    },
    {
      icon: <Smile className="w-5 h-5 text-purple-300" />,
      title: "Making Heavy Days Light",
      desc: "A single silly comment or unexpected reaction from you can turn around an exhausting, stressful afternoon."
    },
    {
      icon: <Coffee className="w-5 h-5 text-amber-300" />,
      title: "Zero Pretension",
      desc: "There is never any need to put up filters or perform. With you, conversations are as natural as breathing."
    },
    {
      icon: <MessageCircleHeart className="w-5 h-5 text-purple-300" />,
      title: "Late Night Real Talk",
      desc: "From goofy memes to deep reflections on life, we can drift between nonsense and profound thoughts effortlessly."
    }
  ];

  return (
    <section className="relative my-20 px-4 max-w-4xl mx-auto z-10">
      <div className="rounded-3xl purple-glass-card p-6 sm:p-10 border border-purple-400/25 relative overflow-hidden">
        {/* Subtle decorative background watermarks */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-200 text-xs font-cinzel tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>The Little Things That Matter</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-4xl text-purple-100 font-bold tracking-wide">
            For the girl who makes ordinary moments special.
          </h2>
          <p className="font-serif-luxury italic text-purple-300/80 text-base sm:text-lg max-w-xl mx-auto mt-2">
            The beauty of a genuine friendship is that it never has to be flawless to be irreplaceable.
          </p>
        </div>

        {/* Facet Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          {facets.map((facet, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-purple-950/40 border border-purple-700/20 hover:border-amber-400/30 transition-all flex flex-col gap-2"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-900/50 border border-purple-600/30 flex items-center justify-center">
                {facet.icon}
              </div>
              <h3 className="font-cinzel text-lg text-purple-100 font-semibold">
                {facet.title}
              </h3>
              <p className="text-sm text-purple-200/80 leading-relaxed font-sans">
                {facet.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Closing Sentiment */}
        <div className="mt-8 pt-6 border-t border-purple-800/40 text-center font-serif-luxury text-base sm:text-lg text-purple-200/90 italic">
          "Finding a friend who listens, laughs at your dumb jokes, and stands by you through every season is one of life's greatest blessings."
          <span className="block font-sans text-xs text-amber-300/80 uppercase tracking-widest mt-2 not-italic">
            Forever Cherished 💜
          </span>
        </div>
      </div>
    </section>
  );
};
