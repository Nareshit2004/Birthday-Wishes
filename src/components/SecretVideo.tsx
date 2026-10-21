import React, { useState, useRef } from 'react';
import {
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Volume2,
  VolumeX,
  RefreshCw,
  Film,
} from 'lucide-react';
import { soundFX } from '../utils/soundEffects';
import { audioManager } from '../utils/audioManager';
import { DiamondGem } from './DiamondGem';

interface SecretVideoProps {
  configuredPassword: string;
  videoPath?: string;
  driveEmbedUrl?: string;
  driveDirectUrl?: string;
}

export const SecretVideo: React.FC<SecretVideoProps> = ({
  configuredPassword,
  videoPath = '/media/jeevuhhhh-birthday-video-web.mp4',
  driveEmbedUrl = 'https://drive.google.com/file/d/1KGjovNkj2468mQy4EtEHu6_IphIRlDpE/preview',
  driveDirectUrl = 'https://drive.google.com/file/d/1KGjovNkj2468mQy4EtEHu6_IphIRlDpE/view?usp=sharing',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Persistent unlock state - only render iframe after unlocking
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem('jeevuhhhh_video_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  const [isUnlockingAnim, setIsUnlockingAnim] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [isBgMusicPaused, setIsBgMusicPaused] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Validate password leniently to prevent getting locked out due to mobile keyboard autocorrect
  const isValidPasskey = (input: string) => {
    const clean = input.trim().toLowerCase();
    const target = configuredPassword.trim().toLowerCase();

    // Direct match (case-insensitive)
    if (clean === target) return true;

    // Match variations of 'vairooowww2112' (different count of o's and w's)
    if (/^vair+o+w+2112$/i.test(clean)) return true;

    // Allow special friendship identifiers
    if (
      clean === 'jeevuhhhh' ||
      clean === 'diamond' ||
      clean === '2112' ||
      clean === 'chapter22' ||
      clean === 'hpybdy'
    ) {
      return true;
    }

    return false;
  };

  const handleUnlockAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (isValidPasskey(passwordInput)) {
      soundFX.playUnlockChord();
      setIsUnlockingAnim(true);

      // Pause background music so the video's audio is crystal clear
      audioManager.pauseBackgroundMusic('youtube');
      setIsBgMusicPaused(true);

      setTimeout(() => {
        setIsUnlocked(true);
        setIsIframeLoading(true);
        setIsModalOpen(false);
        setIsUnlockingAnim(false);

        try {
          localStorage.setItem('jeevuhhhh_video_unlocked', 'true');
        } catch {
          // ignore
        }

        // Smooth scroll to player on mobile
        setTimeout(() => {
          containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);
      }, 700);
    } else {
      setErrorMessage('Incorrect passkey. Please check the secret code and try again.');
    }
  };

  const handleToggleBgMusic = () => {
    if (isBgMusicPaused) {
      audioManager.resumeFromYoutube();
      setIsBgMusicPaused(false);
    } else {
      audioManager.pauseBackgroundMusic('youtube');
      setIsBgMusicPaused(true);
    }
  };

  const handleReloadPlayer = () => {
    setIsIframeLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const handleLockReset = () => {
    try {
      localStorage.removeItem('jeevuhhhh_video_unlocked');
    } catch {
      // ignore
    }
    setIsUnlocked(false);
    setPasswordInput('');
    setIsIframeLoading(true);
    audioManager.resumeFromYoutube();
    setIsBgMusicPaused(false);
  };

  return (
    <section
      ref={containerRef}
      className="relative my-14 sm:my-20 px-3 sm:px-4 max-w-2xl mx-auto z-10 overflow-hidden"
    >
      <div className="rounded-2xl purple-glass-card p-4 sm:p-8 border border-purple-400/25 shadow-[0_20px_50px_rgba(7,2,14,0.85)] relative overflow-hidden">
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
            <div className="w-16 h-16 rounded-full bg-purple-900/50 border border-purple-400/30 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-[0_0_20px_rgba(168,85,247,0.3)]">
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
          /* Unlocked Responsive Google Drive Video Player */
          <div className="w-full flex flex-col items-center animate-fadeIn">
            {/* Background Audio Status Pill */}
            <div className="w-full max-w-sm mb-3 flex items-center justify-between px-3 py-1.5 rounded-xl bg-purple-950/70 border border-purple-500/30 text-purple-200 text-xs">
              <span className="flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-amber-300" />
                <span className="font-cinzel text-[11px] text-amber-200">Chapter 22 Video Player</span>
              </span>
              <button
                type="button"
                onClick={handleToggleBgMusic}
                className="flex items-center gap-1 text-[11px] hover:text-amber-300 text-purple-300 cursor-pointer underline"
              >
                {isBgMusicPaused ? (
                  <>
                    <VolumeX className="w-3 h-3 text-amber-400" />
                    <span>Music Paused (Resume)</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3 h-3 text-purple-300" />
                    <span>Pause Music</span>
                  </>
                )}
              </button>
            </div>

            {/* Video Frame Container - 9:16 mobile aspect ratio */}
            <div className="w-full max-w-sm mx-auto relative rounded-2xl overflow-hidden bg-black border-2 border-amber-300/50 shadow-[0_0_35px_rgba(217,119,6,0.3)] aspect-[9/16] min-h-[480px] sm:min-h-[560px]">
              {/* Animated Loading Overlay while Google Drive initializes */}
              {isIframeLoading && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-[#0c0414] text-center">
                  <div className="relative mb-4">
                    <div className="w-14 h-14 rounded-full border-2 border-purple-500/30 border-t-amber-300 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <DiamondGem size={22} glow={true} />
                    </div>
                  </div>
                  <h4 className="font-cinzel text-base text-amber-200 font-bold mb-1">
                    Connecting to Video Vault... 💎
                  </h4>
                  <p className="font-serif-luxury italic text-purple-300/80 text-xs max-w-xs">
                    Loading your personalized Chapter 22 birthday video.
                  </p>
                </div>
              )}

              {/* Top-Right Quick Action Toolbar */}
              <div className="absolute top-2.5 right-2.5 z-30 flex items-center gap-1.5 bg-black/75 backdrop-blur-md p-1 rounded-lg border border-purple-500/30">
                <button
                  type="button"
                  onClick={handleReloadPlayer}
                  className="p-1.5 rounded text-purple-200 hover:text-amber-300 transition-colors"
                  title="Reload Video"
                  aria-label="Reload Video"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <a
                  href={driveDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded text-purple-200 hover:text-amber-300 transition-colors"
                  title="Open directly in Google Drive"
                  aria-label="Open in Google Drive"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* The Google Drive Embedded Preview Iframe */}
              <iframe
                key={iframeKey}
                src={driveEmbedUrl}
                title="For My Jeevuhhhh — Chapter 22 Birthday Video"
                className="w-full h-full border-0 rounded-2xl bg-black"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                loading="eager"
                onLoad={() => setIsIframeLoading(false)}
              />
            </div>

            {/* Direct Open in Drive CTA & Support Actions */}
            <div className="w-full max-w-sm mt-4 flex flex-col gap-2.5">
              <a
                href={driveDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-purple-950 font-cinzel font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(251,191,36,0.4)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <ExternalLink className="w-4 h-4 text-purple-950" />
                <span>Open in Google Drive App 🎬</span>
              </a>

              {/* Helpful tip & Re-lock control */}
              <div className="flex items-center justify-between text-xs text-purple-300/80 px-1 pt-1">
                <a
                  href={videoPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-amber-300 underline font-cinzel text-[11px]"
                >
                  <span>Alternative Video Stream</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  type="button"
                  onClick={handleLockReset}
                  className="hover:text-purple-100 text-[11px] underline cursor-pointer"
                >
                  Re-lock Vault 🔐
                </button>
              </div>

              <div className="mt-1 p-2.5 rounded-xl bg-purple-950/50 border border-purple-500/20 text-purple-300/70 text-[11px] text-center font-serif-luxury italic">
                <span>
                  💡 If preview requests sign-in, tap &ldquo;Open in Google Drive App&rdquo; above to play immediately on mobile.
                </span>
              </div>
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
                        placeholder="Enter passkey..."
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
