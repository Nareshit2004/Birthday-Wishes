import { siteConfig } from '../config/siteConfig';

type AudioListener = () => void;

class AudioManager {
  private bgAudio: HTMLAudioElement | null = null;
  private isBgStarted: boolean = false;
  private isUserPaused: boolean = false;
  private isMuted: boolean = false;
  private wasPlayingBeforeYoutube: boolean = false;
  private wasPlayingBeforeGift: boolean = false;
  private isGiftPlaying: boolean = false;
  private readonly fixedBgVolume: number = siteConfig.audio.defaultVolumes.backgroundMusic; // Fixed 10% volume (0.10)
  private lastWishSoundTime: number = 0;
  private listeners: Set<AudioListener> = new Set();

  // Web Audio Context for synthesized fallback if audio files are not present
  private audioCtx: AudioContext | null = null;

  constructor() {
    // Lazy initialization on first client-side access
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  // Initialize or get the single shared background audio element with fixed 0.30 volume
  private getBgAudio(): HTMLAudioElement | null {
    if (typeof window === 'undefined') return null;

    if (!this.bgAudio) {
      const audio = new Audio();
      audio.src = siteConfig.audio.backgroundMusicPath;
      audio.loop = true;
      audio.volume = this.fixedBgVolume;
      audio.preload = 'auto';

      audio.addEventListener('error', () => {
        // Handled silently: user may place MP3 file in public/audio/
      });

      this.bgAudio = audio;
    }
    return this.bgAudio;
  }

  // Start background music following explicit user gesture (e.g. entering secret door)
  public startBackgroundMusic(): void {
    if (this.isUserPaused) return;

    const audio = this.getBgAudio();
    if (!audio) return;

    this.isBgStarted = true;
    audio.volume = this.isMuted ? 0 : this.fixedBgVolume;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.notify();
        })
        .catch(() => {
          // Handled gracefully: browser autoplay policy or missing MP3
          this.notify();
        });
    }
  }

  public pauseBackgroundMusic(reason: 'user' | 'youtube' | 'gift' = 'user'): void {
    const audio = this.getBgAudio();
    if (reason === 'user') {
      this.isUserPaused = true;
    } else if (reason === 'youtube') {
      this.wasPlayingBeforeYoutube = !this.isUserPaused && !this.isMuted && audio !== null && !audio.paused;
    }

    if (audio && !audio.paused) {
      audio.pause();
    }
    this.notify();
  }

  public resumeFromYoutube(): void {
    if (this.wasPlayingBeforeYoutube && !this.isUserPaused && !this.isMuted && !this.isGiftPlaying) {
      const audio = this.getBgAudio();
      if (audio) {
        audio.volume = this.fixedBgVolume;
        audio.play().catch(() => {});
      }
    }
    this.wasPlayingBeforeYoutube = false;
    this.notify();
  }

  public togglePlay(): void {
    const audio = this.getBgAudio();
    if (!audio) return;

    if (audio.paused) {
      this.isUserPaused = false;
      this.isBgStarted = true;
      audio.volume = this.isMuted ? 0 : this.fixedBgVolume;
      audio.play().catch(() => {});
    } else {
      this.isUserPaused = true;
      audio.pause();
    }
    this.notify();
  }

  public toggleMute(): void {
    this.isMuted = !this.isMuted;
    const audio = this.getBgAudio();
    if (audio) {
      audio.volume = this.isMuted ? 0 : this.fixedBgVolume;
    }
    this.notify();
  }

  public getStatus() {
    const audio = this.getBgAudio();
    return {
      isPlaying: audio ? !audio.paused && this.isBgStarted : false,
      isMuted: this.isMuted,
      isUserPaused: this.isUserPaused,
      volume: this.fixedBgVolume,
    };
  }

  // --- SOUND EFFECTS ---

  // Custom Door-Opening Sound (Volume ~ 0.60)
  public playDoorOpen(): void {
    if (this.isMuted) return;

    try {
      const sfx = new Audio(siteConfig.audio.doorOpenSoundPath);
      sfx.volume = siteConfig.audio.defaultVolumes.doorOpen;
      sfx.play().catch(() => {
        this.fallbackSynthesizedChord();
      });
    } catch {
      this.fallbackSynthesizedChord();
    }
  }

  // Custom Gift-Hamper Sound (Volume ~ 0.60)
  // Pauses background music, plays gift sound, and automatically resumes background music on finish
  public playGiftOpen(): void {
    if (this.isGiftPlaying) return; // Prevent repeated clicks from creating overlapping instances

    const bg = this.getBgAudio();
    const wasPlaying = !this.isUserPaused && !this.isMuted && bg !== null && !bg.paused;
    this.wasPlayingBeforeGift = wasPlaying;

    // 1. Immediately pause background music
    if (bg && !bg.paused) {
      bg.pause();
    }
    this.isGiftPlaying = true;
    this.notify();

    // 2. Resume callback executed once when sound finishes naturally or encounters error
    let hasEnded = false;
    const handleGiftCompletion = () => {
      if (hasEnded) return;
      hasEnded = true;
      this.isGiftPlaying = false;

      // 5. Resume background music automatically from its previous playback position
      // Do not resume if visitor had manually paused or muted
      if (this.wasPlayingBeforeGift && !this.isUserPaused && !this.isMuted && !this.wasPlayingBeforeYoutube) {
        const currentBg = this.getBgAudio();
        if (currentBg) {
          currentBg.volume = this.fixedBgVolume;
          currentBg.play().catch(() => {});
        }
      }
      this.wasPlayingBeforeGift = false;
      this.notify();
    };

    if (this.isMuted) {
      handleGiftCompletion();
      return;
    }

    try {
      const sfx = new Audio(siteConfig.audio.giftOpenSoundPath);
      sfx.volume = siteConfig.audio.defaultVolumes.giftOpen;

      const cleanup = () => {
        sfx.removeEventListener('ended', onEnded);
        sfx.removeEventListener('error', onError);
      };

      const onEnded = () => {
        cleanup();
        handleGiftCompletion();
      };

      const onError = () => {
        cleanup();
        this.fallbackSynthesizedHarp(handleGiftCompletion);
      };

      // 4. Wait until the gift sound finishes playing naturally
      sfx.addEventListener('ended', onEnded, { once: true });
      sfx.addEventListener('error', onError, { once: true });

      const playPromise = sfx.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          onError();
        });
      }
    } catch {
      this.fallbackSynthesizedHarp(handleGiftCompletion);
    }
  }

  // Custom Birthday Wish Reveal Sound (Volume ~ 0.40, with 160ms throttle)
  public playWishReveal(): void {
    if (this.isMuted) return;

    const now = Date.now();
    if (now - this.lastWishSoundTime < 160) {
      return; // prevent overlapping on rapid taps
    }
    this.lastWishSoundTime = now;

    try {
      const sfx = new Audio(siteConfig.audio.wishRevealSoundPath);
      sfx.volume = siteConfig.audio.defaultVolumes.wishReveal;
      sfx.play().catch(() => {
        this.fallbackSynthesizedChime();
      });
    } catch {
      this.fallbackSynthesizedChime();
    }
  }

  // --- CELESTIAL SYNTHESIZED FALLBACKS ---
  private fallbackSynthesizedChord() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [329.63, 415.30, 493.88, 659.25, 987.77];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.025, now + idx * 0.08 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 2.0);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 2.1);
      });
    } catch {
      // Continue silently
    }
  }

  private fallbackSynthesizedHarp(onEnd?: () => void) {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) {
        onEnd?.();
        return;
      }
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0, now + i * 0.06);
        gain.gain.linearRampToValueAtTime(0.025, now + i * 0.06 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 1.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 1.7);
      });
      if (onEnd) {
        setTimeout(onEnd, 1750);
      }
    } catch {
      onEnd?.();
    }
  }

  private fallbackSynthesizedChime() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880.00, now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.02, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.2);
    } catch {
      // Continue silently
    }
  }
}

export const audioManager = new AudioManager();
