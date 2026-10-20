import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Image as ImageIcon, Sparkles, Film } from 'lucide-react';
import type { GalleryItem } from '../config/siteConfig';
import { DiamondGem } from './DiamondGem';

interface MemorySlideshowProps {
  items: GalleryItem[];
  intervalMs?: number;
}

export const MemorySlideshow: React.FC<MemorySlideshowProps> = ({
  items,
  intervalMs = 4500,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [progress, setProgress] = useState(0);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(true);

  const totalItems = items.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
    setProgress(0);
  }, [totalItems]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    setProgress(0);
  }, [totalItems]);

  // Handle Visibility and Intersection Observation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPlaying(false);
      } else {
        setIsPlaying(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Timer for automatic transition with smooth progress bar
  useEffect(() => {
    if (!isPlaying || !isIntersecting || totalItems <= 1) return;

    const stepMs = 50;
    const increment = (stepMs / intervalMs) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(interval);
  }, [isPlaying, isIntersecting, intervalMs, nextSlide, totalItems]);

  const currentItem = items[currentIndex];
  const isImageFailed = imageErrors[currentItem.id];

  return (
    <section
      id="memories-gallery"
      ref={galleryRef}
      className="relative my-14 sm:my-20 px-3 sm:px-4 max-w-3xl mx-auto z-10 scroll-mt-20 overflow-hidden"
    >
      {/* Section Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-200 text-[11px] sm:text-xs font-cinzel tracking-widest uppercase mb-2 shadow-sm">
          <Film className="w-3.5 h-3.5 text-amber-300" />
          <span>Our Little Movie • Visual Chronicle</span>
        </div>

        <div className="flex justify-center mb-2">
          <DiamondGem size={28} glow={true} />
        </div>

        <h2 className="font-cinzel text-2xl sm:text-4xl text-purple-100 font-bold tracking-wide">
          Our Kind of Crazy, Our Kind of Forever 💗
        </h2>
        <p className="font-serif-luxury italic text-purple-300/80 text-sm sm:text-base max-w-md mx-auto mt-1 px-2">
          Sweet memories, unprompted silliness, and moments that became unforgettable chapters.
        </p>
      </div>

      {/* Main Slideshow Frame - Optimized for Portrait Mobile Viewing */}
      <div className="relative rounded-2xl purple-glass-card overflow-hidden shadow-[0_20px_50px_rgba(7,2,14,0.85)] border border-purple-400/25">
        {/* Subtle Progress Bar */}
        <div className="w-full h-1 bg-purple-950/60 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-amber-300 to-fuchsia-400 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Featured Photo Display with max-height ~55svh */}
        <div className="relative w-full h-[52svh] min-h-[300px] max-h-[460px] flex items-center justify-center bg-[#0d0517] overflow-hidden">
          {/* Ambient blurred backdrop so faces are NEVER cropped */}
          {!isImageFailed && (
            <div
              className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-35 scale-110 pointer-events-none"
              style={{ backgroundImage: `url(${currentItem.image})` }}
            />
          )}

          {/* Actual Photo or Editorial Fallback */}
          {!isImageFailed ? (
            <img
              src={currentItem.image}
              alt={currentItem.title}
              onError={() =>
                setImageErrors((prev) => ({ ...prev, [currentItem.id]: true }))
              }
              className="relative z-10 max-h-full max-w-full object-contain p-2 sm:p-4 rounded-xl transition-all duration-700 ease-out"
              loading="lazy"
            />
          ) : (
            <div
              className={`relative z-10 w-full h-full p-6 flex flex-col items-center justify-center text-center bg-gradient-to-br ${
                currentItem.fallbackGradient || 'from-purple-950 to-indigo-950'
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-purple-900/40 border border-amber-300/30 flex items-center justify-center mb-4">
                <ImageIcon className="w-8 h-8 text-amber-300/80" />
              </div>
              <span className="font-cinzel text-xs tracking-widest uppercase text-amber-300/80 mb-1">
                {currentItem.chapter}
              </span>
              <h3 className="font-cinzel text-xl text-purple-100 font-semibold mb-2">
                {currentItem.title}
              </h3>
              <p className="font-serif-luxury italic text-purple-200/90 text-sm sm:text-base max-w-xs leading-relaxed">
                "{currentItem.caption}"
              </p>
            </div>
          )}

          {/* Previous / Next 48px Touch Navigation Controls */}
          <button
            onClick={prevSlide}
            aria-label="Previous photograph"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-purple-950/75 hover:bg-purple-900 border border-purple-400/30 text-purple-200 hover:text-amber-300 flex items-center justify-center backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next photograph"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-purple-950/75 hover:bg-purple-900 border border-purple-400/30 text-purple-200 hover:text-amber-300 flex items-center justify-center backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Editorial Caption Bar with Personalized Emojis */}
        <div className="p-4 sm:p-6 bg-gradient-to-t from-[#140620] via-[#1a0a2a] to-[#140620] border-t border-purple-500/20">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-[11px] uppercase tracking-widest text-amber-300 font-semibold px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                  {currentItem.chapter}
                </span>
                {currentItem.date && (
                  <span className="text-[11px] text-purple-300/70 font-sans">
                    • {currentItem.date}
                  </span>
                )}
              </div>

              {/* Memory Mood Symbols */}
              {currentItem.symbols && (
                <div className="flex items-center gap-1 text-sm bg-purple-900/40 px-2 py-0.5 rounded-full border border-purple-700/30">
                  {currentItem.symbols.map((sym, i) => (
                    <span key={i}>{sym}</span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="font-cinzel text-lg sm:text-xl text-purple-100 font-bold">
                {currentItem.title}
              </h3>
              <p className="font-serif-luxury italic text-purple-200/95 text-sm sm:text-base mt-1 leading-snug">
                {currentItem.caption}
              </p>
            </div>

            {/* Controls & Progress Dots */}
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                className="w-11 h-11 rounded-full bg-purple-900/60 hover:bg-purple-800 border border-purple-400/30 text-purple-200 hover:text-amber-300 flex items-center justify-center transition-all cursor-pointer active:scale-90"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <div className="flex items-center gap-1.5">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setProgress(0);
                    }}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer min-w-[12px] ${
                      idx === currentIndex
                        ? 'w-6 bg-amber-300'
                        : 'w-2.5 bg-purple-700/60 hover:bg-purple-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 text-center">
        <span className="text-[11px] text-purple-400/70 font-serif-luxury italic inline-flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-300" />
          A moving reel of laughter, comfort, and memories 💎
        </span>
      </div>
    </section>
  );
};
