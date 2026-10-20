import React, { useState, useRef } from 'react';
import { Lock, RotateCcw, Maximize, Eye, EyeOff, AlertCircle, Sparkles, Play, ExternalLink } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';
import { audioManager } from '../utils/audioManager';
import { DiamondGem } from './DiamondGem';

interface SecretVideoProps {
  configuredPassword: string;
  videoPath: string;
}

export const SecretVideo: React.FC<SecretVideoProps> = ({
  configuredPassword,
  videoPath,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Persistent unlock state
  const [isUnlocked, setIsUnlocked] = useState(() => {
    try {
      return localStorage.getItem('jeevuhhhh_video_unlocked') === 'true';
    } catch {
      return false;
    }
  });
  
  const [isUnlockingAnim, setIsUnlockingAnim] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Validate password leniently to prevent getting locked out due to typos
  const isValidPasskey = (input: string) => {
    const clean = input.trim().toLowerCase();
    const target = configuredPassword.trim().toLowerCase();
    
    // Direct match (case-insensitive)
    if (clean === target) return true;
    
    // Match variations of 'vairooowww2112' (different count of o's and w's)
    if (/^vair+o+w+2112$/i.test(clean)) return true;
    
    // Allow special friendship identifiers
    if (clean === 'jeevuhhhh' || clean === 'diamond' || clean === '2112' || clean === 'chapter22') return true;
    
    return false;
  };

  const handleUnlockAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (isValidPasskey(passwordInput)) {
      soundFX.playUnlockChord();
      setIsUnlockingAnim(true);

      setTimeout(() => {
        setIsUnlocked(true);
        setIsModalOpen(false);
        setIsUnlockingAnim(false);
        try {
          localStorage.setItem('jeevuhhhh_video_unlocked', 'true');
        } catch {
          // ignore
        }

        // Smoothly bring video into view
        setTimeout(() => {
          containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (videoRef.current) {
            videoRef.current.play().catch(() => {
              // Browser may restrict autoplay until user taps the big play button
            });
          }
        }, 300);
      }, 900);
    } else {
      setErrorMessage("Incorrect passkey. Hint: Vairooowww2112 💎 (or Jeevuhhhh)");
    }
  };

  const handleManualPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Playback error:", err);
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleReplay = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section ref={containerRef} className="relative my-14 sm:my-20 px-3 sm:px-4 max-w-2xl mx-auto z-10 overflow-hidden">
      <div className="rounded-2xl purple-glass-card p-5 sm:p-8 border border-purple-400/25 shadow-[0_20px_50px_rgba(7,2,14,0.85)] relative overflow-hidden">
        {/* Section Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-200 text-[11px] sm:text-xs font-cinzel tracking-widest uppercase mb-2 shadow-sm">
            <span>🔐</span>
            <span>Vault of Private Memories</span>
            <span>💎</span>
          </div>

          <div className="flex justify-center mb-1">
            <DiamondGem size={28} glow={true} />
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl text-purple-100 font-bold tracking-wide">
            One Last Little Surprise
          </h2>
          <p className="font-serif-luxury italic text-purple-300/80 text-sm sm:text-base max-w-md mx-auto mt-1 px-2">
            Some memories are meant to be opened only at the right moment.
          </p>
        </div>

        {/* Video Frame or Locked Teaser */}
        {!isUnlocked ? (
          <div
            onClick={() => setIsModalOpen(true)}
            className="group relative w-full aspect-[4/3] sm:aspect-video rounded-xl bg-gradient-to-br from-[#1b0a2c] via-[#120420] to-[#0a0212] border-2 border-dashed border-purple-500/40 hover:border-amber-400/60 p-4 sm:p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 shadow-xl active:scale-[0.99]"
          >
            <div className="w-16 h-16 rounded-full bg-purple-900/50 border border-purple-400/30 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Lock className="w-8 h-8 text-amber-300" />
            </div>

            <h3 className="font-cinzel text-lg sm:text-xl text-purple-100 font-bold mb-1">
              Private Birthday Memory Video
            </h3>
            <p className="font-serif-luxury italic text-purple-300/80 text-xs sm:text-sm max-w-xs">
              Tap here to enter passkey 🔐 and unlock this exclusive video capsule.
            </p>

            <span className="mt-4 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-900/60 border border-amber-300/30 text-amber-200 font-cinzel text-xs tracking-wider uppercase font-semibold min-h-[44px]">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Unlock Video Capsule 💎</span>
            </span>
          </div>
        ) : (
          /* Unlocked Portrait Video Player (720x1280 mobile aspect ratio) */
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-xs sm:max-w-sm aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-amber-300/40 shadow-2xl animate-scaleUp">
              <video
                ref={videoRef}
                className="w-full h-full object-contain bg-black"
                controls
                playsInline
                preload="metadata"
                onPlay={() => {
                  setIsPlaying(true);
                  audioManager.pauseBackgroundMusic('youtube');
                }}
                onPause={() => {
                  setIsPlaying(false);
                  audioManager.resumeFromYoutube();
                }}
                onEnded={() => {
                  setIsPlaying(false);
                  audioManager.resumeFromYoutube();
                }}
                onError={() => setVideoError(true)}
              >
                <source src={videoPath} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Big Initial Play Button Overlay (Handles iOS/Android Autoplay restriction) */}
              {!isPlaying && !videoError && (
                <div
                  onClick={handleManualPlay}
                  className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer group transition-all"
                >
                  <div className="w-18 h-18 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-purple-950 flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.6)] group-hover:scale-110 transition-transform mb-3">
                    <Play className="w-9 h-9 fill-current translate-x-0.5" />
                  </div>
                  <span className="font-cinzel text-xs tracking-widest uppercase font-bold text-amber-200 bg-black/60 px-3 py-1 rounded-full border border-amber-300/30">
                    Tap to Play Memory Video 🎬
                  </span>
                </div>
              )}

              {/* Quick Action Overlay Buttons */}
              <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10 bg-black/70 backdrop-blur-sm p-1 rounded-lg">
                <button
                  onClick={handleReplay}
                  className="p-1.5 rounded text-purple-200 hover:text-amber-300"
                  aria-label="Replay video"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleFullscreen}
                  className="p-1.5 rounded text-purple-200 hover:text-amber-300"
                  aria-label="Fullscreen"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>

              {/* Graceful Fallback if browser media engine has issues */}
              {videoError && (
                <div className="absolute inset-0 p-5 flex flex-col items-center justify-center text-center bg-gradient-to-br from-purple-950 via-[#160624] to-black">
                  <span className="text-3xl mb-2">🎬</span>
                  <h4 className="font-cinzel text-base text-purple-100 font-bold mb-1">
                    Play Video Directly
                  </h4>
                  <p className="font-serif-luxury italic text-purple-300/80 text-xs mb-3">
                    Your phone browser preferred opening the video in its native player.
                  </p>
                  <a
                    href={videoPath}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-purple-950 font-cinzel font-bold text-xs shadow-lg"
                  >
                    <span>Open Birthday Video</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Direct Open Link fallback below the player */}
            <div className="mt-4 flex items-center justify-center">
              <a
                href={videoPath}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-purple-300/80 hover:text-amber-300 underline font-cinzel"
              >
                <span>Watch in Fullscreen / Native Player</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* Mobile-Friendly Password Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="relative w-full max-w-sm rounded-2xl purple-glass-card p-5 sm:p-6 border border-amber-300/40 shadow-2xl text-center animate-scaleUp mb-2 sm:mb-0"
              onClick={(e) => e.stopPropagation()}
            >
              {isUnlockingAnim ? (
                <div className="py-8 flex flex-col items-center gap-3">
                  <div className="animate-bounce">
                    <DiamondGem size={52} glow={true} />
                  </div>
                  <h4 className="font-cinzel text-lg text-amber-200 font-bold">
                    Opening Secret Vault... 💎
                  </h4>
                </div>
              ) : (
                <>
                  <div className="flex justify-center mb-2">
                    <span className="text-2xl">🔐</span>
                  </div>

                  <h3 className="font-cinzel text-lg font-bold text-purple-100 mb-1">
                    Enter Video Passkey 💎
                  </h3>
                  <p className="font-serif-luxury italic text-purple-300/80 text-xs mb-3">
                    Enter the special key to unlock your birthday video.
                  </p>

                  <form onSubmit={handleUnlockAttempt} className="flex flex-col gap-2.5">
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={passwordInput}
                        onChange={(e) => {
                          setPasswordInput(e.target.value);
                          if (errorMessage) setErrorMessage('');
                        }}
                        placeholder="Enter passkey (e.g. Vairooowww2112)..."
                        className="w-full h-12 px-4 pr-11 rounded-xl bg-purple-950/70 border border-purple-500/40 text-purple-100 placeholder-purple-400/40 focus:outline-none focus:border-amber-300 text-sm shadow-inner"
                        autoComplete="off"
                        autoCapitalize="none"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-400/80 hover:text-amber-300 p-2 cursor-pointer w-9 h-9 flex items-center justify-center"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {errorMessage && (
                      <p className="text-rose-400 text-xs flex items-center justify-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errorMessage}</span>
                      </p>
                    )}

                    <div className="flex gap-2 mt-1">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="w-1/2 h-12 rounded-xl border border-purple-700/40 text-purple-300 hover:bg-purple-900/30 text-xs font-cinzel cursor-pointer active:scale-95"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-1/2 h-12 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-purple-950 font-cinzel font-bold text-xs shadow-md cursor-pointer hover:brightness-110 active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <span>Unlock</span>
                        <span>💎</span>
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
