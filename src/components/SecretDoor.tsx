import React, { useState } from 'react';
import { Eye, EyeOff, Sparkles } from 'lucide-react';
import { audioManager } from '../utils/audioManager';
import { DiamondGem } from './DiamondGem';

interface SecretDoorProps {
  configuredPassword: string;
  onUnlocked: () => void;
}

export const SecretDoor: React.FC<SecretDoorProps> = ({ configuredPassword, onUnlocked }) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isOpening, setIsOpening] = useState(false);
  const [isFullyOpen, setIsFullyOpen] = useState(false);
  const [shakeDoor, setShakeDoor] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (passwordInput.trim() === configuredPassword) {
      audioManager.playDoorOpen();
      audioManager.startBackgroundMusic();
      setIsOpening(true);

      // Trigger door opening sequence
      setTimeout(() => {
        setIsFullyOpen(true);
        setTimeout(() => {
          onUnlocked();
        }, 1500);
      }, 2100);
    } else {
      setShakeDoor(true);
      setErrorMessage("That key doesn't fit this door. Try her special name.");
      setTimeout(() => setShakeDoor(false), 600);
    }
  };

  if (isFullyOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-[#09040e] flex flex-col items-center justify-center p-6 text-center animate-fadeIn select-none">
        <div className="relative mb-6 animate-pulse-subtle">
          <DiamondGem size={64} glow={true} />
        </div>
        <h2 className="font-cinzel text-2xl sm:text-3xl text-purple-100 font-bold tracking-wide mb-3">
          Welcome to our little universe, Jeevuhhhh 💎
        </h2>
        <p className="font-serif-luxury italic text-purple-300/90 text-base sm:text-xl max-w-sm mx-auto">
          One special person. A million little memories.
        </p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#07030b] min-h-[100svh] flex flex-col items-center justify-between py-6 px-4 overflow-y-auto overflow-x-hidden select-none">
      {/* Background celestial glow behind doors */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div
          className={`w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] rounded-full transition-all duration-1000 ${
            isOpening
              ? 'bg-gradient-to-r from-purple-500 via-amber-200 to-fuchsia-400 opacity-90 blur-[70px] scale-125'
              : 'bg-purple-900/30 opacity-40 blur-[90px] scale-100'
          }`}
        />
      </div>

      {/* Top Header text */}
      <div
        className={`w-full max-w-sm text-center z-10 transition-all duration-700 pt-2 ${
          isOpening ? 'opacity-0 -translate-y-6 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-800/40 text-purple-200 text-[11px] sm:text-xs tracking-widest uppercase mb-2 font-cinzel">
          <span>🔐</span>
          <span>Chapter 22 Entrance</span>
          <span>💎</span>
        </div>
        <h1 className="font-cinzel text-xl sm:text-3xl text-purple-100 font-semibold tracking-wide leading-tight">
          A little world, made only for you.
        </h1>
        <p className="font-serif-luxury italic text-purple-300/80 text-sm sm:text-lg mt-1">
          Someone very special turns 22.
        </p>
      </div>

      {/* Double Door Assembly - Fully Scaled for Mobile Viewports */}
      <div
        className={`relative w-[240px] h-[300px] sm:w-[280px] sm:h-[360px] md:w-[340px] md:h-[420px] my-auto door-perspective z-10 shrink-0 ${
          shakeDoor ? 'animate-bounce' : ''
        }`}
      >
        {/* Door Frame Arch */}
        <div className="absolute -inset-2.5 rounded-t-[140px] border-2 border-purple-500/30 bg-purple-950/20 shadow-[0_0_40px_rgba(147,51,234,0.25)] pointer-events-none" />
        <div className="absolute -inset-1 rounded-t-[135px] border border-amber-400/25 pointer-events-none" />

        {/* Interior glow leaking through doors */}
        <div
          className={`absolute inset-0 rounded-t-[130px] bg-gradient-to-b from-amber-100 via-purple-300 to-fuchsia-400 transition-opacity duration-1000 ${
            isOpening ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Doors Container */}
        <div className="relative w-full h-full flex overflow-hidden rounded-t-[130px]">
          {/* Left Door */}
          <div
            className={`w-1/2 h-full bg-gradient-to-br from-[#1b0c2a] via-[#12061e] to-[#090210] border-r border-[#3b1757] door-leaf-left relative shadow-2xl flex flex-col justify-between p-2.5 sm:p-3 ${
              isOpening ? 'door-open-left' : ''
            }`}
            style={{
              boxShadow: isOpening
                ? 'none'
                : 'inset -4px 0 12px rgba(0,0,0,0.8), inset 2px 2px 6px rgba(245,208,97,0.15)',
            }}
          >
            {/* Upper panel */}
            <div className="w-full h-1/3 rounded-t-[50px] border border-purple-500/25 p-1 flex items-center justify-center bg-purple-950/20">
              <div className="w-full h-full rounded-t-[45px] border border-amber-400/20 flex items-center justify-center">
                <span className="font-cinzel text-amber-200/50 text-[10px] tracking-widest">XXII</span>
              </div>
            </div>

            {/* Middle panel & Left handle */}
            <div className="relative w-full h-1/3 border border-purple-500/20 my-1 rounded flex items-center justify-end pr-1 bg-purple-950/10">
              <div className="w-2.5 sm:w-3.5 h-12 sm:h-14 rounded-full bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-700 shadow-md border border-amber-200/60 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-amber-900" />
              </div>
            </div>

            {/* Bottom panel */}
            <div className="w-full h-1/3 border border-purple-500/25 rounded p-1 bg-purple-950/20">
              <div className="w-full h-full border border-amber-400/20 rounded flex items-center justify-center">
                <div className="w-2 h-2 rotate-45 border border-amber-300/30" />
              </div>
            </div>
          </div>

          {/* Right Door */}
          <div
            className={`w-1/2 h-full bg-gradient-to-bl from-[#1b0c2a] via-[#12061e] to-[#090210] border-l border-[#3b1757] door-leaf-right relative shadow-2xl flex flex-col justify-between p-2.5 sm:p-3 ${
              isOpening ? 'door-open-right' : ''
            }`}
            style={{
              boxShadow: isOpening
                ? 'none'
                : 'inset 4px 0 12px rgba(0,0,0,0.8), inset -2px 2px 6px rgba(245,208,97,0.15)',
            }}
          >
            {/* Upper panel */}
            <div className="w-full h-1/3 rounded-t-[50px] border border-purple-500/25 p-1 flex items-center justify-center bg-purple-950/20">
              <div className="w-full h-full rounded-t-[45px] border border-amber-400/20 flex items-center justify-center">
                <span className="font-cinzel text-amber-200/50 text-[10px] tracking-widest">2026</span>
              </div>
            </div>

            {/* Middle panel & Right handle */}
            <div className="relative w-full h-1/3 border border-purple-500/20 my-1 rounded flex items-center justify-start pl-1 bg-purple-950/10">
              <div className="w-2.5 sm:w-3.5 h-12 sm:h-14 rounded-full bg-gradient-to-r from-amber-700 via-yellow-500 to-amber-300 shadow-md border border-amber-200/60 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-amber-900" />
              </div>
            </div>

            {/* Bottom panel */}
            <div className="w-full h-1/3 border border-purple-500/25 rounded p-1 bg-purple-950/20">
              <div className="w-full h-full border border-amber-400/20 rounded flex items-center justify-center">
                <div className="w-2 h-2 rotate-45 border border-amber-300/30" />
              </div>
            </div>
          </div>
        </div>

        {/* Central Diamond Seal */}
        {!isOpening && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-transform hover:scale-110 active:scale-95">
            <DiamondGem size={42} glow={true} />
          </div>
        )}
      </div>

      {/* Password Form with Diamond Motif & 48px Touch Targets */}
      <div
        className={`w-full max-w-sm z-10 pb-4 transition-all duration-700 ${
          isOpening ? 'opacity-0 translate-y-6 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex justify-center mb-2">
          <DiamondGem size={26} glow={true} />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm select-none">
              🔐
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="Enter her secret password..."
              className="w-full h-12 pl-10 pr-12 rounded-xl bg-purple-950/70 border border-purple-500/40 text-purple-100 placeholder-purple-400/40 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-purple-500/20 text-sm shadow-inner transition-all"
              autoComplete="off"
              autoCapitalize="none"
              aria-label="Secret Door Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-400/80 hover:text-amber-300 transition-colors w-9 h-9 flex items-center justify-center cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {errorMessage && (
            <p className="text-rose-400 text-xs text-center font-medium px-2 animate-fadeIn">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="w-full h-12 rounded-xl font-cinzel text-xs sm:text-sm font-semibold tracking-wider text-amber-100 bg-gradient-to-r from-purple-800 via-fuchsia-900 to-purple-800 hover:from-purple-700 hover:to-fuchsia-800 border border-amber-300/40 shadow-[0_4px_20px_rgba(168,85,247,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            ENTER HER WORLD 💎
          </button>
        </form>

        <p className="text-center text-purple-400/60 text-xs mt-2 font-serif-luxury italic">
          Hint: Her lovely unique name (Starts with J)
        </p>
      </div>
    </div>
  );
};
