import { useState } from 'react';
import { siteConfig } from './config/siteConfig';
import { StarryBackground } from './components/StarryBackground';
import { SecretDoor } from './components/SecretDoor';
import { BirthdayReveal } from './components/BirthdayReveal';
import { GiftBox } from './components/GiftBox';
import { BirthdayLetter } from './components/BirthdayLetter';
import { FriendshipCounter } from './components/FriendshipCounter';
import { DiamondFriendshipMessage } from './components/DiamondFriendshipMessage';
import { MemorySlideshow } from './components/MemorySlideshow';
import { TwentyTwoWishes } from './components/TwentyTwoWishes';
import { FriendshipNote } from './components/FriendshipNote';
import { SongPlayer } from './components/SongPlayer';
import { SecretVideo } from './components/SecretVideo';
import { ClosingScene } from './components/ClosingScene';
import { AudioToggle } from './components/AudioToggle';

export function App() {
  const [isDoorUnlocked, setIsDoorUnlocked] = useState(false);
  const [isGiftOpened, setIsGiftOpened] = useState(false);

  return (
    <div className="relative min-h-[100svh] bg-[#09040e] text-[#f1e8f8] selection:bg-purple-700 selection:text-white overflow-x-hidden">
      {/* Background Celestial Stars & Nebulae */}
      <StarryBackground />

      {/* Audio toggle button */}
      <AudioToggle />

      {/* Secret Door Gate */}
      {!isDoorUnlocked ? (
        <SecretDoor
          configuredPassword={siteConfig.doorPassword}
          onUnlocked={() => setIsDoorUnlocked(true)}
        />
      ) : (
        <main className="relative z-10 w-full max-w-full animate-fadeIn pb-safe">
          {/* Hero Birthday Reveal */}
          <BirthdayReveal
            recipientName={siteConfig.recipientName}
            birthdayDate={siteConfig.birthdayDate}
          />

          {/* Realistic 3D Gift Box */}
          <GiftBox
            isOpen={isGiftOpened}
            onOpen={() => setIsGiftOpened(true)}
          />

          {/* Heartfelt Birthday Letter in Tanglish */}
          <BirthdayLetter
            isOpen={isGiftOpened}
            recipientName={siteConfig.recipientName}
          />

          {/* Live Friendship Duration Counter */}
          <FriendshipCounter
            startDateStr={siteConfig.friendshipStartDate}
          />

          {/* Dedicated Diamond Friendship Message */}
          <DiamondFriendshipMessage
            recipientName={siteConfig.recipientName}
          />

          {/* Memories Slideshow - Our Little Movie */}
          <MemorySlideshow
            items={siteConfig.gallery}
            intervalMs={siteConfig.slideshowIntervalMs}
          />

          {/* 22 Celestial Wishes for Age 22 */}
          <TwentyTwoWishes
            wishes={siteConfig.wishes}
          />

          {/* A Special Friendship Note */}
          <FriendshipNote />

          {/* Music Section - YouTube Player */}
          <SongPlayer
            youtubeUrl={siteConfig.youtubeUrl}
            youtubeId={siteConfig.youtubeId}
          />

          {/* Password Protected Video Capsule */}
          <SecretVideo
            configuredPassword={siteConfig.videoPassword}
            videoPath={siteConfig.birthdayVideoPath}
            driveEmbedUrl={siteConfig.googleDriveEmbedUrl}
            driveDirectUrl={siteConfig.googleDriveDirectUrl}
          />

          {/* Closing Scene with Shared Symbols */}
          <ClosingScene
            recipientName={siteConfig.recipientName}
          />
        </main>
      )}
    </div>
  );
}

export default App;
