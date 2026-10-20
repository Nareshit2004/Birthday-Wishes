import React, { useState, useEffect } from 'react';
import { Play, Pause, Music } from 'lucide-react';
import { audioManager } from '../utils/audioManager';

export const AudioToggle: React.FC = () => {
  const [status, setStatus] = useState(audioManager.getStatus());

  useEffect(() => {
    const unsubscribe = audioManager.subscribe(() => {
      setStatus(audioManager.getStatus());
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    audioManager.togglePlay();
  };

  const isMusicActive = status.isPlaying && !status.isMuted && !status.isUserPaused;

  return (
    <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-40 select-none">
      <button
        onClick={handleToggle}
        className={`h-11 px-3.5 rounded-full flex items-center gap-2 border backdrop-blur-md transition-all shadow-lg cursor-pointer active:scale-95 ${
          isMusicActive
            ? 'bg-purple-900/80 border-amber-300/40 text-amber-200 shadow-[0_0_15px_rgba(245,208,97,0.25)]'
            : 'bg-purple-950/70 border-purple-600/30 text-purple-300'
        }`}
        aria-label={isMusicActive ? 'Pause background music' : 'Play background music'}
        title={isMusicActive ? 'Background Music: Playing' : 'Background Music: Paused'}
      >
        <Music
          className={`w-3.5 h-3.5 ${isMusicActive ? 'text-amber-300 animate-spin-slow' : 'text-purple-400'}`}
        />

        <span className="font-cinzel text-[11px] font-semibold tracking-wider">
          {isMusicActive ? 'Music On' : 'Music Off'}
        </span>

        {isMusicActive ? (
          <Pause className="w-3.5 h-3.5 text-amber-300 ml-0.5" />
        ) : (
          <Play className="w-3.5 h-3.5 text-purple-300 ml-0.5" />
        )}
      </button>
    </div>
  );
};
