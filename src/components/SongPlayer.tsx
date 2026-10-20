import React, { useState } from 'react';
import { Music, Play, Pause, ExternalLink, Disc3, Sparkles, Volume2 } from 'lucide-react';
import { audioManager } from '../utils/audioManager';
import { DiamondGem } from './DiamondGem';

interface SongPlayerProps {
  youtubeUrl: string;
  youtubeId: string;
}

export const SongPlayer: React.FC<SongPlayerProps> = ({ youtubeUrl, youtubeId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);

  const togglePlayback = () => {
    if (!showEmbed) {
      setShowEmbed(true);
      setIsPlaying(true);
      audioManager.pauseBackgroundMusic('youtube');
    } else {
      const nextPlaying = !isPlaying;
      setIsPlaying(nextPlaying);
      if (nextPlaying) {
        audioManager.pauseBackgroundMusic('youtube');
      } else {
        audioManager.resumeFromYoutube();
      }
    }
  };

  return (
    <section className="relative my-14 sm:my-20 px-3 sm:px-4 max-w-2xl mx-auto z-10">
      <div className="rounded-2xl purple-glass-card p-5 sm:p-8 border border-purple-400/25 shadow-[0_20px_50px_rgba(7,2,14,0.8)]">
        {/* Section Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-200 text-[11px] sm:text-xs font-cinzel tracking-widest uppercase mb-2 shadow-sm">
            <Music className="w-3.5 h-3.5 text-amber-300" />
            <span>Soundtrack of Our Memories</span>
          </div>

          <div className="flex justify-center mb-1">
            <DiamondGem size={28} glow={true} />
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl text-purple-100 font-bold tracking-wide">
            Our Song, Our Little World 🪐✨
          </h2>
          <p className="font-serif-luxury italic text-purple-300/80 text-sm sm:text-base max-w-md mx-auto mt-1 px-2">
            Every song holds a timestamp in time — melodies that echo memories only we understand.
          </p>
        </div>

        {/* Music Player Turntable Card - Mobile Stack Layout */}
        <div className="flex flex-col items-center gap-6 bg-gradient-to-b from-[#170826] via-[#1f0b33] to-[#170826] rounded-2xl p-5 sm:p-6 border border-purple-500/20 text-center">
          {/* Vinyl Disc Container */}
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
            <div
              className={`w-full h-full rounded-full bg-[#0d0714] border-4 border-[#2b1042] shadow-[0_0_25px_rgba(0,0,0,0.9)] flex items-center justify-center transition-all ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
              style={{
                backgroundImage:
                  'repeating-radial-gradient(circle, #0e0517 0, #0e0517 3px, #1a0a2a 4px, #0e0517 6px)',
              }}
            >
              {/* Center Label */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-purple-800 via-fuchsia-700 to-amber-500 p-1 flex items-center justify-center shadow-inner">
                <div className="w-full h-full rounded-full bg-[#1b082c] border border-amber-300/40 flex flex-col items-center justify-center text-center p-1">
                  <Disc3 className="w-4 h-4 text-amber-300 animate-spin-slow" />
                  <span className="text-[7px] font-cinzel text-amber-200 mt-0.5 tracking-wider font-bold">
                    CHAPTER 22 💎
                  </span>
                </div>
              </div>
            </div>

            {/* Tonearm Visual */}
            <div
              className={`absolute -top-2 right-2 w-12 h-20 border-r-4 border-amber-400/80 transition-transform duration-700 pointer-events-none ${
                isPlaying ? 'rotate-12 translate-x-1' : '-rotate-12'
              }`}
              style={{ transformOrigin: 'top right' }}
            >
              <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-amber-400" />
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-cinzel text-purple-300/80">
            <Volume2 className="w-3.5 h-3.5 text-amber-300" />
            <span>{isPlaying ? 'Now Playing Melody' : 'Ready to Spin'}</span>
          </div>

          {/* Embedded YouTube Player when activated */}
          {showEmbed && (
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-purple-500/40 shadow-xl bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&enablejsapi=1`}
                title="Our Special Song"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}

          {/* One-handed 48px touch controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 w-full">
            <button
              onClick={togglePlayback}
              className="h-12 px-6 rounded-xl font-cinzel text-xs sm:text-sm font-semibold tracking-wider text-purple-950 bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-300 hover:from-amber-200 hover:to-yellow-200 border border-amber-100 shadow-[0_0_20px_rgba(245,208,97,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              {showEmbed && isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-purple-950" />
                  <span>Pause Song</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-purple-950" />
                  <span>{showEmbed ? 'Resume Song' : 'Play Embedded Song'}</span>
                </>
              )}
            </button>

            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-5 rounded-xl font-cinzel text-xs sm:text-sm font-semibold tracking-wider text-purple-200 bg-purple-900/50 hover:bg-purple-800/70 border border-purple-500/30 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Open in YouTube</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
            </a>
          </div>

          <p className="text-[11px] text-purple-400/70 font-sans flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300" />
            Audio initiated purely on user tap in accordance with mobile audio policies.
          </p>
        </div>
      </div>
    </section>
  );
};
