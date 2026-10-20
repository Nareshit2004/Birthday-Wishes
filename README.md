# JEEVUHHHH — CHAPTER 22 💜
### A Handcrafted Luxury Interactive Birthday Experience

An editorial, cinematic digital birthday gift created for **JEEVUHHHH** on her **22nd Birthday (21 October 2026)**.

---

## ✨ Features & Architecture

1. **The Secret Door (Opening Experience)**
   - Symmetrical 3D double doors with gold filigree, ornate handles, and deep midnight purple atmosphere.
   - Password gate (Passkey: `Jeevuhhhh`) marked with 🔐 and glowing 💎.
   - Web Audio API celestial chime chord on unlock.
   - 3D door rotation reveals: *"Welcome to our little universe, Jeevuhhhh 💎"* with glowing diamond illumination.

2. **Hero Birthday Celebration & Gift Box**
   - Displays *"HAPPY 22ND BIRTHDAY, JEEVUHHHH 💎💗"* with cosmic quote: *"In this huge 🌏, among a million little stories, ours will always have its own special place. 🪐✨"*.
   - Dynamic date tracker calibrated to the local calendar (turning 22 on 21 October 2026).
   - Realistic 3D gift box with glowing bow and ribbons.
   - Tap-to-open interaction with multi-stage confetti and an emerging glowing faceted diamond.

3. **Personalized Tanglish Birthday Letter**
   - Heartfelt, comforting, playful best-friend bond inspired by *Thiruchitrambalam* (Shobana & Thiru) and *Oh My Kadavule* (Anu & Arjun).
   - Progressive typewriter animation with an instant "Read Full Letter" toggle and 16-18px readable typography.
   - Strictly conforms to the zero-forbidden-words restriction across all text, captions, and code.

4. **Live Friendship Counter & Dedicated Diamond Message**
   - Configurable start date: `2023-12-01` (1 December 2023).
   - Mobile-first 2-row layout: Primary row for Years, Months, Days; Secondary row for Hours, Minutes, Seconds.
   - Dedicated section: *"You're My Diamond, Jeevuhhhh 💎"* celebrating our special shared inside word in authentic Tanglish.

5. **Our Little Movie (Memories Slideshow)**
   - Autoplay carousel with 4.5-second crossfades and gentle ken-burns zoom.
   - Chapter titles, handwritten captions, dates, and progress indicator.
   - Aspect-ratio preservation with blurred ambient backdrop so faces are never cropped.
   - Pauses automatically when tab is hidden or element is scrolled off-screen.

6. **Twenty-Two Wishes for Age 22**
   - Celestial constellation of 22 unique glowing stars.
   - Tap to reveal each personalized wish with synthesized music box chimes.
   - Live unlock progress counter and "Light Up All Stars" option.

7. **A Special Friendship Note**
   - Highlights the effortless comfort, quiet care, silly jokes, and genuine loyalty of true friendship.

8. **Our Song, Our Little World**
   - Interactive purple vinyl record turntable with moving tonearm.
   - Embeds YouTube track (`osY54GT0T_8`) on user click.
   - Direct link fallback to external YouTube page.

9. **Secret Birthday Video Capsule**
   - Framed teaser requiring a second passkey (`Vairooowww2112`).
   - Security-focused deferred loading: the video element source is never injected into the DOM until after successful verification.
   - Complete custom controls: play/pause, replay, mute/unmute, and fullscreen.

10. **Closing Scene**
    - "Chapter 22 Begins Today."
    - Smooth scroll button ("Relive Our Memories") to return directly to the gallery.
    - Delicate animated butterfly and handcrafted signature.

---

## 🔐 Configuration Guide (`src/config/siteConfig.ts`)

All parameters are centralized in `src/config/siteConfig.ts`:

| Configuration Key | Current Value | Description |
|---|---|---|
| `doorPassword` | `Jeevuhhhh` | Passkey for the entrance double doors |
| `videoPassword` | `Vairooowww2112` | Passkey for the secret birthday video capsule |
| `birthdayDate` | `2026-10-21` | Recipient's 22nd birthday date (YYYY-MM-DD) |
| `birthdayAge` | `22` | Birthday milestone age |
| `friendshipStartDate` | `2023-12-01` | Date friendship began (YYYY-MM-DD) |
| `youtubeUrl` | `https://youtu.be/osY54GT0T_8?si=PHY-gDeoibfT642h` | YouTube song URL |
| `youtubeId` | `osY54GT0T_8` | Extracted YouTube video ID |
| `birthdayVideoPath` | `/media/jeevuhhhh-birthday-video.mp4` | Relative path to local video file |
| `audio.backgroundMusicPath` | `/audio/background-music.mp3` | Continuous atmospheric soundtrack |
| `audio.doorOpenSoundPath` | `/audio/door-open.mp3` | Sound effect on entrance door unlock |
| `audio.giftOpenSoundPath` | `/audio/gift-open.mp3` | Sound effect on opening gift hamper |
| `audio.wishRevealSoundPath` | `/audio/wish-reveal.mp3` | Sound effect when revealing a star wish |
| `gallery` | Array of 5 chapters | Photo list with chapter names, captions, dates |
| `wishes` | Array of 22 items | 22 unique wishes for age 22 |

---

## 🎵 Custom Audio System (`public/audio/`)

Place your own audio files inside `public/audio/`:

| Filename | Purpose | Recommended Format | Default Volume |
|---|---|---|---|
| `background-music.mp3` | Soft background soundtrack playing continuously after unlock | MP3, 128–192 kbps, gentle instrumental loop | 0.10 (fixed 10% mild) |
| `door-open.mp3` | Triggered once on successful entrance door unlock | MP3, celestial chime or magical portal sound | 0.10 (mild 10%) |
| `gift-open.mp3` | Triggered when the 3D gift box is opened | MP3, celebratory chime or sparkle burst | 0.10 (mild 10%) |
| `wish-reveal.mp3` | Triggered when a concealed star wish is newly unlocked | MP3, delicate star chime / bell tone | 0.10 (mild 10%) |

### Audio System Highlights:
- **Mild 10% Volume**: All audio (background music and sound effects) is set to a gentle `0.10` in the HTML Audio API without intrusive sliders.
- **Gift Hamper Pause & Auto-Resume**: Opening the gift hamper immediately pauses background music for the exact duration of the gift sound effect, then resumes from its previous playback position once the sound naturally finishes.
- **Single Shared Instance**: Background music persists smoothly across section scrolling without re-instantiation or restart glitches.
- **Gesture-Activated**: Conforms strictly to mobile Safari/Chrome autoplay policies; starts playback following the initial door unlock gesture.
- **YouTube & Video Smart Pausing**: When playing the YouTube song or the private birthday video, background music automatically pauses to avoid audio clash, and resumes gracefully when stopped.
- **Independent Sound Effects**: Door, gift, and wish sound effects use dedicated instances and do not interrupt or reset background music volume.
- **Discreet Mobile Control**: Clean floating play/pause pill in the corner that respects user preferences.
- **Graceful Fallback**: If an MP3 is missing, the site continues smoothly with subtle synthesized audio or silent fallback without breaking.

## 📸 Adding Your Own Photographs

1. Place your photo files inside:
   ```
   public/photos/
   ```
   For example:
   - `public/photos/memory-1.jpg`
   - `public/photos/memory-2.jpg`
   - `public/photos/memory-3.jpg`
   - `public/photos/memory-4.jpg`
   - `public/photos/memory-5.jpg`

2. Open `src/config/siteConfig.ts` and update the `image` property in the `gallery` array:
   ```ts
   {
     id: 1,
     chapter: "Chapter 01",
     title: "The Beginning",
     caption: "Your custom caption here...",
     date: "Dec 2023",
     image: "/photos/memory-1.jpg",
   }
   ```
   *(High quality artistic SVG vectors are already provided as defaults so the site looks stunning right out of the box).*

---

## 🎬 Adding the Secret Birthday Video

1. Place your video MP4 file at:
   ```
   public/media/jeevuhhhh-birthday-video.mp4
   ```
2. The player will automatically detect and play the video once the second passkey (`Vairooowww2112`) is entered.

> **Security Note:**
> In client-side single-page applications, frontend password verification acts as a visual privacy curtain. If you intend to host completely confidential media online against users who inspect network requests, serve the video from an authenticated endpoint (e.g., Supabase / Firebase Storage with signed URLs or Cloudflare Stream with server-side token generation).

---

## 🚀 Running the Project Locally

```bash
# Navigate to project folder
cd "C:\Users\Naresh Kumar K\.gemini\antigravity\scratch\jeevuhhhh-chapter-22"

# Install dependencies (if not already installed)
npm install

# Start Vite local development server
npm run dev

# Build production bundle
npm run build
```

---

## 🌐 Free One-Click Deployment

This project builds a clean static single-page application (`dist/`), making it ready for instant deployment:

- **Vercel**: Import the repository and set build command to `npm run build`, output directory to `dist`.
- **Netlify**: Drag and drop the `dist/` folder or link the repository with publish directory `dist`.
- **Cloudflare Pages**: Connect Git repository, framework preset `Vite`, build command `npm run build`, output directory `dist`.
