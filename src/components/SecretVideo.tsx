import React, { useState, useRef, useEffect } from 'react';
import { Lock, RotateCcw, Maximize, Eye, EyeOff, AlertCircle, Sparkles, Play, Pause, ExternalLink, Activity, Info } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';
import { audioManager } from '../utils/audioManager';
import { DiamondGem } from './DiamondGem';

interface SecretVideoProps {
  configuredPassword: string;
  videoPath: string;
}

interface DiagnosticsInfo {
  passwordVerified: boolean;
  playerVisible: boolean;
  assignedSrc: string | null;
  resolvedCurrentSrc: string;
  readyState: number;
  networkState: number;
  lastEvent: string;
  errorCode: number | null;
  errorMessage: string | null;
  playbackStatus: string;
  networkHttpStatus: number | null;
}

export const SecretVideo: React.FC<SecretVideoProps> = ({
  configuredPassword,
  videoPath,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Persistent unlock state - only assign video source after unlocking
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem('jeevuhhhh_video_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  // Source is only assigned after successful unlocking
  const [videoSrc, setVideoSrc] = useState<string | null>(() => {
    try {
      return localStorage.getItem('jeevuhhhh_video_unlocked') === 'true' ? videoPath : null;
    } catch {
      return null;
    }
  });
  
  const [isUnlockingAnim, setIsUnlockingAnim] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  // Diagnostics tracking
  const [diagnostics, setDiagnostics] = useState<DiagnosticsInfo>({
    passwordVerified: isUnlocked,
    playerVisible: isUnlocked,
    assignedSrc: videoSrc,
    resolvedCurrentSrc: '',
    readyState: 0,
    networkState: 0,
    lastEvent: 'initialized',
    errorCode: null,
    errorMessage: null,
    playbackStatus: 'idle',
    networkHttpStatus: null,
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Validate password leniently to prevent getting locked out due to mobile keyboard quirks
  const isValidPasskey = (input: string) => {
    const clean = input.trim().toLowerCase();
    const target = configuredPassword.trim().toLowerCase();
    
    // Direct match (case-insensitive)
    if (clean === target) return true;
    
    // Match variations of 'vairooowww2112' (different count of o's and w's)
    if (/^vair+o+w+2112$/i.test(clean)) return true;
    
    // Allow special friendship identifiers
    if (clean === 'jeevuhhhh' || clean === 'diamond' || clean === '2112' || clean === 'chapter22' || clean === 'hpybdy') return true;
    
    return false;
  };

  // Perform network diagnostic check on the deployed video asset
  const checkAssetNetwork = async (url: string) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      setDiagnostics(prev => ({
        ...prev,
        networkHttpStatus: response.status,
      }));
    } catch (e: any) {
      setDiagnostics(prev => ({
        ...prev,
        networkHttpStatus: 0,
        errorMessage: 'Network check failed: ' + (e?.message || 'Unknown network error'),
      }));
    }
  };

  const handleUnlockAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (isValidPasskey(passwordInput)) {
      soundFX.playUnlockChord();
      setIsUnlockingAnim(true);

      // Successfully verified: update state and assign private video source
      setTimeout(() => {
        setIsUnlocked(true);
        setVideoSrc(videoPath);
        setIsModalOpen(false);
        setIsUnlockingAnim(false);

        try {
          localStorage.setItem('jeevuhhhh_video_unlocked', 'true');
        } catch {
          // ignore
        }

        setDiagnostics(prev => ({
          ...prev,
          passwordVerified: true,
          playerVisible: true,
          assignedSrc: videoPath,
          lastEvent: 'unlocked',
        }));

        checkAssetNetwork(videoPath);

        // Scroll player smoothly into view on mobile
        setTimeout(() => {
          containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);
      }, 700);
    } else {
      setErrorMessage("Incorrect passkey. Please check the secret code and try again.");
    }
  };

  // Load video explicitly when source changes or component mounts in unlocked state
  useEffect(() => {
    if (isUnlocked && videoSrc && videoRef.current) {
      const v = videoRef.current;
      v.load();
      checkAssetNetwork(videoSrc);

      setDiagnostics(prev => ({
        ...prev,
        resolvedCurrentSrc: v.currentSrc || v.src,
        readyState: v.readyState,
        networkState: v.networkState,
        lastEvent: 'video.load() called',
      }));
    }
  }, [isUnlocked, videoSrc]);

  // Direct user-gesture playback handler
  const handleExplicitPlay = () => {
    if (!videoRef.current) return;
    const v = videoRef.current;

    setPlaybackError(null);

    if (v.paused) {
      const promise = v.play();
      if (promise !== undefined) {
        setDiagnostics(prev => ({ ...prev, playbackStatus: 'play() pending' }));
        promise
          .then(() => {
            setIsPlaying(true);
            setDiagnostics(prev => ({
              ...prev,
              playbackStatus: 'playing',
              lastEvent: 'play-resolved',
              readyState: v.readyState,
            }));
          })
          .catch((err: Error) => {
            console.error("Playback error:", err);
            const msg = err.name === 'NotAllowedError'
              ? 'Mobile browser required a direct tap. Please tap the video to play.'
              : `Playback error: ${err.message}`;
            setPlaybackError(msg);
            setDiagnostics(prev => ({
              ...prev,
              playbackStatus: 'play-rejected',
              errorMessage: err.message,
              lastEvent: 'play-rejected',
            }));
          });
      }
    } else {
      v.pause();
      setIsPlaying(false);
      setDiagnostics(prev => ({ ...prev, playbackStatus: 'paused', lastEvent: 'pause' }));
    }
  };

  const handleReplay = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const handleFullscreen = () => {
    const v = videoRef.current as any;
    if (!v) return;
    if (v.requestFullscreen) {
      v.requestFullscreen().catch(() => {});
    } else if (v.webkitEnterFullscreen) {
      // iOS Safari native fullscreen method
      v.webkitEnterFullscreen();
    } else if (v.webkitRequestFullscreen) {
      v.webkitRequestFullscreen();
    }
  };

  const handleLockReset = () => {
    try {
      localStorage.removeItem('jeevuhhhh_video_unlocked');
    } catch {
      // ignore
    }
    setIsUnlocked(false);
    setVideoSrc(null);
    setIsPlaying(false);
    setPlaybackError(null);
    setPasswordInput('');
  };

  return (
    <section ref={containerRef} className="relative my-14 sm:my-20 px-3 sm:px-4 max-w-2xl mx-auto z-10 overflow-hidden">
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
          /* Unlocked Responsive Video Player with Native Mobile Controls */
          <div className="w-full flex flex-col items-center animate-fadeIn">
            <div className="w-full max-w-sm mx-auto relative rounded-2xl overflow-hidden bg-black border-2 border-amber-300/50 shadow-[0_0_35px_rgba(217,119,6,0.25)]">
              {/* Responsive Video Element (Width 100%, Height Auto, Mobile Aspect Ratio) */}
              <video
                ref={videoRef}
                src={videoSrc || undefined}
                controls
                playsInline
                preload="metadata"
                className="w-full h-auto max-h-[72vh] object-contain bg-black block"
                style={{ aspectRatio: '9/16' }}
                onLoadStart={() => {
                  setDiagnostics(prev => ({
                    ...prev,
                    lastEvent: 'loadstart',
                    resolvedCurrentSrc: videoRef.current?.currentSrc || '',
                  }));
                }}
                onLoadedMetadata={() => {
                  setDiagnostics(prev => ({
                    ...prev,
                    lastEvent: 'loadedmetadata',
                    readyState: videoRef.current?.readyState || 0,
                  }));
                }}
                onCanPlay={() => {
                  setDiagnostics(prev => ({
                    ...prev,
                    lastEvent: 'canplay',
                    readyState: videoRef.current?.readyState || 0,
                  }));
                }}
                onPlay={() => {
                  setIsPlaying(true);
                  setPlaybackError(null);
                  audioManager.pauseBackgroundMusic('youtube');
                  setDiagnostics(prev => ({ ...prev, playbackStatus: 'playing', lastEvent: 'play' }));
                }}
                onPause={() => {
                  setIsPlaying(false);
                  audioManager.resumeFromYoutube();
                  setDiagnostics(prev => ({ ...prev, playbackStatus: 'paused', lastEvent: 'pause' }));
                }}
                onEnded={() => {
                  setIsPlaying(false);
                  audioManager.resumeFromYoutube();
                  setDiagnostics(prev => ({ ...prev, playbackStatus: 'ended', lastEvent: 'ended' }));
                }}
                onStalled={() => {
                  setDiagnostics(prev => ({ ...prev, lastEvent: 'stalled' }));
                }}
                onError={() => {
                  const mediaError = videoRef.current?.error;
                  const code = mediaError?.code ?? null;
                  const message = mediaError?.message || 'Media decode or network error';
                  setDiagnostics(prev => ({
                    ...prev,
                    lastEvent: 'error',
                    errorCode: code,
                    errorMessage: message,
                  }));
                  setPlaybackError(`Video player encountered an error (Code ${code || 'unknown'}). Tap the direct link below to play.`);
                }}
              >
                Your mobile browser does not support inline video. Please tap the direct link below.
              </video>

              {/* Quick Action Overlay Buttons for Desktop / High-res Screens */}
              <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10 bg-black/70 backdrop-blur-sm p-1 rounded-lg">
                <button
                  type="button"
                  onClick={handleReplay}
                  className="p-1.5 rounded text-purple-200 hover:text-amber-300 transition-colors"
                  aria-label="Replay video"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleFullscreen}
                  className="p-1.5 rounded text-purple-200 hover:text-amber-300 transition-colors"
                  aria-label="Fullscreen"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Playback Error Alert if any */}
            {playbackError && (
              <div className="w-full max-w-sm mt-3 p-3 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">{playbackError}</p>
                </div>
              </div>
            )}

            {/* Prominent Direct Play Button (User Gesture) */}
            <div className="w-full max-w-sm mt-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleExplicitPlay}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-purple-950 font-cinzel font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(251,191,36,0.45)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Pause Video</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Play Birthday Video 🎬</span>
                  </>
                )}
              </button>

              {/* Direct Fullscreen Link & Re-lock controls */}
              <div className="flex items-center justify-between text-xs text-purple-300/80 px-1 pt-1">
                <a
                  href={videoPath}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-amber-300 underline font-cinzel"
                >
                  <span>Open in Native Fullscreen Player</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  type="button"
                  onClick={handleLockReset}
                  className="hover:text-purple-100 text-[11px] underline cursor-pointer"
                >
                  Re-lock Vault
                </button>
              </div>

              {/* Diagnostics Toggle */}
              <div className="mt-2 text-center">
                <button
                  type="button"
                  onClick={() => setShowDiagnostics(!showDiagnostics)}
                  className="inline-flex items-center gap-1 text-[11px] text-purple-400/60 hover:text-purple-300 cursor-pointer"
                >
                  <Activity className="w-3 h-3" />
                  <span>{showDiagnostics ? 'Hide Diagnostics' : 'Show Video Diagnostics'}</span>
                </button>
              </div>

              {/* Development & Diagnostics Panel */}
              {showDiagnostics && (
                <div className="mt-2 p-3 rounded-xl bg-purple-950/80 border border-purple-500/30 text-[10px] font-mono text-purple-200 text-left space-y-1">
                  <div className="flex items-center gap-1 font-bold text-amber-300 text-xs mb-1">
                    <Info className="w-3.5 h-3.5" />
                    <span>Video Diagnostics Status</span>
                  </div>
                  <div>• Password Verified: {diagnostics.passwordVerified ? 'Yes (Valid)' : 'No'}</div>
                  <div>• Player Visible: {diagnostics.playerVisible ? 'Yes' : 'No'}</div>
                  <div>• Assigned Source: {diagnostics.assignedSrc || 'None'}</div>
                  <div>• Current Source: {diagnostics.resolvedCurrentSrc || '(loading)'}</div>
                  <div>• Ready State: {diagnostics.readyState} (4 = Ready)</div>
                  <div>• Network State: {diagnostics.networkState}</div>
                  <div>• Last Media Event: {diagnostics.lastEvent}</div>
                  <div>• Playback Status: {diagnostics.playbackStatus}</div>
                  <div>• HTTP Status: {diagnostics.networkHttpStatus ?? 'Checking...'}</div>
                  {diagnostics.errorCode !== null && (
                    <div className="text-rose-400">• Error Code: {diagnostics.errorCode} ({diagnostics.errorMessage})</div>
                  )}
                </div>
              )}
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
