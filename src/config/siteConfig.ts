export interface GalleryItem {
  id: number;
  chapter: string;
  title: string;
  caption: string;
  date?: string;
  image: string;
  fallbackGradient?: string;
  symbols?: string[];
}

export interface WishItem {
  id: number;
  title: string;
  text: string;
  category: string;
}

export const FRIENDSHIP_SYMBOLS = ['💎', '💗', '🌏', '🪐', '✨', '🌸', '🌼', '🐒', '🐣', '🔐', '🖇️', '♾️', '🫶🏻', '🫂'] as const;

export interface AudioConfig {
  backgroundMusicPath: string;
  doorOpenSoundPath: string;
  giftOpenSoundPath: string;
  wishRevealSoundPath: string;
  defaultVolumes: {
    backgroundMusic: number;
    doorOpen: number;
    giftOpen: number;
    wishReveal: number;
  };
}

export interface SiteConfig {
  recipientName: string;
  doorPassword: string;
  videoPassword: string;
  birthdayDate: string; // YYYY-MM-DD
  birthdayAge: number;
  friendshipStartDate: string; // YYYY-MM-DD
  youtubeUrl: string;
  youtubeId: string;
  birthdayVideoPath: string;
  slideshowIntervalMs: number;
  gallery: GalleryItem[];
  wishes: WishItem[];
  symbols: typeof FRIENDSHIP_SYMBOLS;
  audio: AudioConfig;
}

export const siteConfig: SiteConfig = {
  recipientName: "JEEVUHHHH",
  doorPassword: "HPYBDY",
  videoPassword: "Vairooowww2112",
  birthdayDate: "2026-10-21",
  birthdayAge: 22,
  friendshipStartDate: "2023-12-01",
  youtubeUrl: "https://youtu.be/osY54GT0T_8?si=PHY-gDeoibfT642h",
  youtubeId: "osY54GT0T_8",
  birthdayVideoPath: "/media/jeevuhhhh-birthday-video-web.mp4",
  slideshowIntervalMs: 4500,

  audio: {
    backgroundMusicPath: "/audio/background-music.mp3",
    doorOpenSoundPath: "/audio/door-open.mp3",
    giftOpenSoundPath: "/audio/gift-open.mp3",
    wishRevealSoundPath: "/audio/wish-reveal.mp3",
    defaultVolumes: {
      backgroundMusic: 0.10,
      doorOpen: 0.50,
      giftOpen: 0.25,
      wishReveal: 0.10,
    },
  },

  symbols: FRIENDSHIP_SYMBOLS,

  gallery: [
    {
      id: 1,
      chapter: "Chapter 01",
      title: "The Beginning",
      caption: "December 2023 — Two strangers who started talking and somehow became each other's safest corner.",
      date: "Dec 2023",
      image: "/photos/memory-1.png",
      fallbackGradient: "from-purple-950 via-indigo-950 to-violet-900",
      symbols: ["🌸", "✨", "🖇️"]
    },
    {
      id: 2,
      chapter: "Chapter 02",
      title: "Random Moments",
      caption: "Late night rants, unprompted roasts, and conversations that stretched until the stars faded.",
      date: "Early 2024",
      image: "/photos/memory-2.png",
      fallbackGradient: "from-violet-950 via-purple-900 to-fuchsia-950",
      symbols: ["🐒", "🐣", "💗"]
    },
    {
      id: 3,
      chapter: "Chapter 03",
      title: "The Memories We Keep",
      caption: "Through heavy days and silent moods, just knowing you are there made everything feel lighter.",
      date: "2024 — 2025",
      image: "/photos/memory-3.png",
      fallbackGradient: "from-slate-950 via-purple-950 to-indigo-900",
      symbols: ["🫂", "💗", "🪐"]
    },
    {
      id: 4,
      chapter: "Chapter 04",
      title: "More Adventures Ahead",
      caption: "Chapter 22 is going to be your grandest era yet. Un dreams, un happiness — ellame reach pannuva.",
      date: "October 2026",
      image: "/photos/memory-4.png",
      fallbackGradient: "from-indigo-950 via-purple-900 to-amber-950",
      symbols: ["🌏", "💎", "✨"]
    },
    {
      id: 5,
      chapter: "Chapter 05",
      title: "Always In My Corner",
      caption: "A bond that requires zero pretension. Just pure comfort, endless teasing, and unconditional support.",
      date: "Forever",
      image: "/photos/memory-5.png",
      fallbackGradient: "from-purple-900 via-fuchsia-950 to-slate-950",
      symbols: ["♾️", "🫶🏻", "🔐"]
    }
  ],

  wishes: [
    {
      id: 1,
      title: "Endless Smiles",
      text: "May you find countless genuine reasons to smile brightly every single day of this brand new year.",
      category: "Joy"
    },
    {
      id: 2,
      title: "Gentle Peace",
      text: "On tough or overwhelming days, may peace find you quickly and wrap you in total calm.",
      category: "Serenity"
    },
    {
      id: 3,
      title: "Fierce Confidence",
      text: "Step boldly into every room knowing you belong and that your voice is powerful and unique.",
      category: "Strength"
    },
    {
      id: 4,
      title: "Dreams Made Real",
      text: "Every ambition you silently whisper into the universe — may you see it come alive step by step.",
      category: "Ambition"
    },
    {
      id: 5,
      title: "Genuine People",
      text: "Surround yourself only with souls who see your light, celebrate your growth, and protect your energy.",
      category: "Bonds"
    },
    {
      id: 6,
      title: "Beautiful Adventures",
      text: "Wander to new places, watch breathtaking sunsets, and collect stories you will recount for decades.",
      category: "Adventures"
    },
    {
      id: 7,
      title: "Triumphs in Passion",
      text: "Whatever skill, work, or art you pour your mind into, may it flourish beyond expectations.",
      category: "Success"
    },
    {
      id: 8,
      title: "Courage to Prioritize You",
      text: "Always remember to choose your own mental space and heart first, without hesitation or guilt.",
      category: "Self-Love"
    },
    {
      id: 9,
      title: "Unstoppable Laughter",
      text: "May you laugh until your stomach aches and tears of pure happiness run down your cheeks.",
      category: "Joy"
    },
    {
      id: 10,
      title: "Doors of Opportunity",
      text: "Opportunities that thrill your imagination and elevate your potential, opening at the exact right moment.",
      category: "Future"
    },
    {
      id: 11,
      title: "Everlasting Friendship",
      text: "Our bond remaining just as honest, comforting, and full of effortless laughter as it is today.",
      category: "Friendship"
    },
    {
      id: 12,
      title: "Unshakable Resilience",
      text: "Whenever hurdles appear, remember how much grace and grit you carry naturally within you.",
      category: "Strength"
    },
    {
      id: 13,
      title: "Wholesome Health",
      text: "Vibrant energy, deep restful sleep, and nourishing wellness for your body and spirit.",
      category: "Wellness"
    },
    {
      id: 14,
      title: "Little Miracles",
      text: "A favorite song playing out of nowhere, crisp morning air, warm tea — tiny magical moments that lift you.",
      category: "Magic"
    },
    {
      id: 15,
      title: "Creative Spark",
      text: "New ideas, artistic inspiration, and the joy of crafting things that make you proud.",
      category: "Creativity"
    },
    {
      id: 16,
      title: "Clarity of Heart",
      text: "Total certainty in who you are and where you are headed, untroubled by noise or doubts.",
      category: "Clarity"
    },
    {
      id: 17,
      title: "Spontaneous Roadtrips",
      text: "Sudden plan drops, open roads, good playlists, and memories etched in night skies.",
      category: "Memories"
    },
    {
      id: 18,
      title: "Financial Abundance",
      text: "Total freedom to treat yourself, travel anywhere, and build the comfortable life you deserve.",
      category: "Prosperity"
    },
    {
      id: 19,
      title: "Softness & Warmth",
      text: "The feeling of being deeply understood, cherished, and valued just for being yourself.",
      category: "Comfort"
    },
    {
      id: 20,
      title: "Proud Milestones",
      text: "Looking back at the end of age 22 and whispering to yourself: 'I really did that.'",
      category: "Pride"
    },
    {
      id: 21,
      title: "Unbreakable Inner Light",
      text: "A spirit so radiant and magnetic that it inspires everyone fortunate enough to cross your path.",
      category: "Light"
    },
    {
      id: 22,
      title: "The Grandest Chapter",
      text: "May Chapter 22 be the chapter where every puzzle piece falls into its rightful, enchanting place. 💜",
      category: "Chapter 22"
    }
  ]
};
