import { CaptionPreset, Project, TemplateItem, MediaAsset } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_editing_canvas_1792404324285.jpg';
export const PODCAST_IMAGE = '/src/assets/images/thumbnail_podcast_sample_1792404324156.jpg';
export const GAMING_IMAGE = '/src/assets/images/thumbnail_gaming_sample_1792404324784.jpg';
export const CINEMATIC_IMAGE = '/src/assets/images/thumbnail_cinematic_sample_1792404325190.jpg';

// 12 Visual Caption Presets
export const CAPTION_PRESETS: CaptionPreset[] = [
  {
    id: 'viral-green',
    name: 'Viral Green',
    description: 'Electric green punchy keywords with bold black stroke used by top TikTok & Reels creators',
    fontFamily: 'Impact, "Plus Jakarta Sans", sans-serif',
    fontSize: 32,
    textColor: '#FFFFFF',
    highlightColor: '#39F56A',
    strokeColor: '#000000',
    strokeWidth: 4,
    shadow: true,
    animationStyle: 'pop',
    positionY: 76,
    sampleWord: 'MASSIVE',
    samplePhrase: 'This will get you MASSIVE views',
    tag: 'Trending'
  },
  {
    id: 'bold-creator',
    name: 'Bold Creator',
    description: 'High-contrast yellow & white typography with modern dynamic scale pop',
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: 30,
    textColor: '#FFFFFF',
    highlightColor: '#FDE047',
    strokeColor: '#000000',
    strokeWidth: 3,
    shadow: true,
    animationStyle: 'pop',
    positionY: 74,
    sampleWord: 'SECRET',
    samplePhrase: 'The hidden SECRET they hide',
    tag: 'Popular'
  },
  {
    id: 'minimal-white',
    name: 'Minimal White',
    description: 'Clean Scandinavian editorial subtitle styling with subtle dark box scrim',
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: 24,
    textColor: '#F4F7FF',
    highlightColor: '#FFFFFF',
    strokeColor: 'transparent',
    strokeWidth: 0,
    shadow: false,
    backgroundColor: 'rgba(5, 8, 23, 0.75)',
    animationStyle: 'fade',
    positionY: 82,
    sampleWord: 'clarity',
    samplePhrase: 'Simple design brings clarity to the story',
    tag: 'Clean'
  },
  {
    id: 'neon-cyber',
    name: 'Neon Cyber',
    description: 'Vibrant cyan and magenta glow designed for tech and gaming content',
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 28,
    textColor: '#00D9FF',
    highlightColor: '#FF007F',
    strokeColor: '#050817',
    strokeWidth: 3,
    shadow: true,
    animationStyle: 'glow',
    positionY: 78,
    sampleWord: 'NEURAL',
    samplePhrase: 'Activate the NEURAL coprocessor now',
    tag: 'Sci-Fi'
  },
  {
    id: 'cinematic-subtitle',
    name: 'Cinematic Subtitle',
    description: 'Classic cinema serif with letterspaced styling and delicate drop shadow',
    fontFamily: 'Georgia, serif',
    fontSize: 22,
    textColor: '#FFFBEB',
    highlightColor: '#FBBF24',
    strokeColor: '#000000',
    strokeWidth: 2,
    shadow: true,
    animationStyle: 'fade',
    positionY: 86,
    sampleWord: 'Destiny',
    samplePhrase: 'In the silence of the dawn, Destiny awaits',
    tag: 'Film'
  },
  {
    id: 'podcast-pro',
    name: 'Podcast Pro',
    description: 'Double-line synchronized karaoke highlighting for long-form discussion clips',
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: 28,
    textColor: '#E2E8F0',
    highlightColor: '#38BDF8',
    strokeColor: '#0F172A',
    strokeWidth: 2,
    shadow: true,
    backgroundColor: 'rgba(10, 18, 48, 0.85)',
    animationStyle: 'typewriter',
    positionY: 75,
    sampleWord: 'DIFFERENCE',
    samplePhrase: 'And that is the real DIFFERENCE between them',
    tag: 'Podcast'
  },
  {
    id: 'gaming-energy',
    name: 'Gaming Energy',
    description: 'Angular italic display type with glowing flame-orange highlights',
    fontFamily: 'Impact, sans-serif',
    fontSize: 34,
    textColor: '#FFFFFF',
    highlightColor: '#FB923C',
    strokeColor: '#7C2D12',
    strokeWidth: 4,
    shadow: true,
    animationStyle: 'pop',
    positionY: 72,
    sampleWord: 'CLUTCH',
    samplePhrase: 'He pulled off an insane CLUTCH play',
    tag: 'Gaming'
  },
  {
    id: 'karaoke-highlight',
    name: 'Karaoke Highlight',
    description: 'Smooth glowing pill tracking behind words as audio progresses',
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: 26,
    textColor: '#CBD5E1',
    highlightColor: '#39F56A',
    strokeColor: 'transparent',
    strokeWidth: 0,
    shadow: true,
    backgroundColor: 'rgba(16, 29, 64, 0.9)',
    animationStyle: 'pop',
    positionY: 80,
    sampleWord: 'PERFECT',
    samplePhrase: 'Timing has to be absolutely PERFECT here',
    tag: 'Viral'
  },
  {
    id: 'clean-corporate',
    name: 'Clean Corporate',
    description: 'Polished brand-safe subtitles with subtle rounded backdrop',
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: 22,
    textColor: '#FFFFFF',
    highlightColor: '#60A5FA',
    strokeColor: 'transparent',
    strokeWidth: 0,
    shadow: false,
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    animationStyle: 'fade',
    positionY: 84,
    sampleWord: 'Revenue',
    samplePhrase: 'Driving quarterly Revenue growth across channels',
    tag: 'B2B'
  },
  {
    id: 'retro-vhs',
    name: 'Retro VHS',
    description: '1990s broadcast yellow with chromatic aberration and scanline aesthetic',
    fontFamily: '"Courier New", monospace',
    fontSize: 26,
    textColor: '#FEF08A',
    highlightColor: '#F87171',
    strokeColor: '#1E293B',
    strokeWidth: 3,
    shadow: true,
    animationStyle: 'typewriter',
    positionY: 82,
    sampleWord: 'PLAY',
    samplePhrase: 'TRACK 04 // REC 1998 [PLAY]',
    tag: 'Retro'
  },
  {
    id: 'luxury-editorial',
    name: 'Luxury Editorial',
    description: 'High-fashion gold and champagne typography for lifestyle creators',
    fontFamily: 'Didot, "Playfair Display", serif',
    fontSize: 25,
    textColor: '#FEF9C3',
    highlightColor: '#EAB308',
    strokeColor: '#000000',
    strokeWidth: 1,
    shadow: true,
    animationStyle: 'fade',
    positionY: 82,
    sampleWord: 'Timeless',
    samplePhrase: 'Crafted with elegance for Timeless luxury',
    tag: 'Luxury'
  },
  {
    id: 'anime-pop',
    name: 'Anime Pop',
    description: 'Exuberant Japanese manga style with purple border and bubble bounce',
    fontFamily: 'Arial Black, sans-serif',
    fontSize: 32,
    textColor: '#FFFFFF',
    highlightColor: '#C084FC',
    strokeColor: '#581C87',
    strokeWidth: 5,
    shadow: true,
    animationStyle: 'pop',
    positionY: 74,
    sampleWord: 'POWER',
    samplePhrase: 'Unleash your true hidden POWER!',
    tag: 'Anime'
  }
];

// Initial seeded projects
export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'How AI Changes Everything (Podcast Cut)',
    type: 'smart-clip',
    aspectRatio: '9:16',
    duration: '00:42',
    lastEdited: '12 minutes ago',
    thumbnailUrl: PODCAST_IMAGE,
    captionPresetId: 'viral-green',
    isFavorite: true,
    fileSize: '34.2 MB'
  },
  {
    id: 'proj-2',
    title: 'Cyberpunk Game Night Clip #04',
    type: 'video',
    aspectRatio: '9:16',
    duration: '00:28',
    lastEdited: '2 hours ago',
    thumbnailUrl: GAMING_IMAGE,
    captionPresetId: 'neon-cyber',
    isFavorite: true,
    fileSize: '19.8 MB'
  },
  {
    id: 'proj-3',
    title: 'Nordic Explorer Cinematic Reel',
    type: 'ai-video',
    aspectRatio: '16:9',
    duration: '01:15',
    lastEdited: 'Yesterday',
    thumbnailUrl: CINEMATIC_IMAGE,
    captionPresetId: 'cinematic-subtitle',
    isFavorite: false,
    fileSize: '88.5 MB'
  },
  {
    id: 'proj-4',
    title: 'Stop Making This YouTube Mistake',
    type: 'thumbnail',
    aspectRatio: '16:9',
    duration: 'Thumbnail',
    lastEdited: '3 days ago',
    thumbnailUrl: HERO_IMAGE,
    isFavorite: false,
    fileSize: '4.2 MB'
  }
];

// 14+ Creator Templates
export const CREATOR_TEMPLATES: TemplateItem[] = [
  {
    id: 'tpl-1',
    title: 'Viral Hook & Strobe Split',
    category: 'YouTube Shorts',
    aspectRatio: '9:16',
    description: 'Instant 3-second attention hook with electric green karaoke subtitles and snap zoom transitions.',
    duration: '00:30',
    thumbnailUrl: PODCAST_IMAGE,
    tags: ['Shorts', 'Viral', 'Green Hook'],
    isPopular: true,
    captionStyle: 'viral-green'
  },
  {
    id: 'tpl-2',
    title: 'Cyber Gaming Highlight Reel',
    category: 'Gaming',
    aspectRatio: '9:16',
    description: 'High-octane kill montage with audio reactive beat cuts, glowing neon text, and camera shake.',
    duration: '00:25',
    thumbnailUrl: GAMING_IMAGE,
    tags: ['Gaming', 'Twitch', 'Cyberpunk'],
    isPopular: true,
    captionStyle: 'neon-cyber'
  },
  {
    id: 'tpl-3',
    title: 'Cinema Golden Hour Montage',
    category: 'Cinematic',
    aspectRatio: '16:9',
    description: 'Letterboxed 2.39:1 aspect ratio with gentle cinematic zooms, soft color grading, and elegant titles.',
    duration: '01:00',
    thumbnailUrl: CINEMATIC_IMAGE,
    tags: ['Film', 'Travel', 'Landscape'],
    isPopular: true,
    captionStyle: 'cinematic-subtitle'
  },
  {
    id: 'tpl-4',
    title: 'Podcast 2-Camera Speaker Switcher',
    category: 'Podcasts',
    aspectRatio: '9:16',
    description: 'Smart auto-framing on active speaker with waveform visualizer bar and bold clean subtitles.',
    duration: '00:45',
    thumbnailUrl: PODCAST_IMAGE,
    tags: ['Interview', 'Dual Speaker', 'Clean'],
    isPopular: true,
    captionStyle: 'podcast-pro'
  },
  {
    id: 'tpl-5',
    title: 'Tech Review Spec Breakdown',
    category: 'Tech Reviews',
    aspectRatio: '16:9',
    description: 'Floating glass spec cards, animated metric counters, and b-roll macro focus transitions.',
    duration: '00:50',
    thumbnailUrl: HERO_IMAGE,
    tags: ['Tech', 'Specs', 'Hardware'],
    captionStyle: 'minimal-white'
  },
  {
    id: 'tpl-6',
    title: 'Instagram Aesthetic Reel',
    category: 'Instagram Reels',
    aspectRatio: '9:16',
    description: 'Editorial lifestyle flow with luxury serif typography, soft paper textures, and film grain.',
    duration: '00:20',
    thumbnailUrl: CINEMATIC_IMAGE,
    tags: ['Reels', 'Lifestyle', 'Luxury'],
    captionStyle: 'luxury-editorial'
  },
  {
    id: 'tpl-7',
    title: 'Step-by-Step AI Tutorial',
    category: 'Tutorials',
    aspectRatio: '16:9',
    description: 'Screen recording frame with cursor zoom, chapter badges, and clear bullet-point animations.',
    duration: '01:30',
    thumbnailUrl: HERO_IMAGE,
    tags: ['Education', 'How To', 'Software'],
    captionStyle: 'clean-corporate'
  },
  {
    id: 'tpl-8',
    title: 'TikTok Viral Sound Lip-Sync',
    category: 'TikTok',
    aspectRatio: '9:16',
    description: 'Bouncing energetic anime captions synchronized with trending audio beats and comic zooms.',
    duration: '00:15',
    thumbnailUrl: GAMING_IMAGE,
    tags: ['TikTok', 'Fun', 'High Energy'],
    captionStyle: 'anime-pop'
  },
  {
    id: 'tpl-9',
    title: 'Fitness Workout Timer & Reps',
    category: 'Fitness',
    aspectRatio: '9:16',
    description: 'On-screen countdown circular timer, heart rate simulation graphic, and exercise tags.',
    duration: '00:40',
    thumbnailUrl: CINEMATIC_IMAGE,
    tags: ['Gym', 'Timer', 'Motivation'],
    captionStyle: 'gaming-energy'
  },
  {
    id: 'tpl-10',
    title: 'Motivational Speech Spark',
    category: 'Motivational',
    aspectRatio: '9:16',
    description: 'Dramatic black and white backdrop with gold highlighted keywords and heavy bass drops.',
    duration: '00:35',
    thumbnailUrl: PODCAST_IMAGE,
    tags: ['Mindset', 'Shorts', 'Inspiration'],
    captionStyle: 'bold-creator'
  },
  {
    id: 'tpl-11',
    title: 'Product Drop Showcase 3D',
    category: 'Product Ads',
    aspectRatio: '1:1',
    description: 'Clean rotating product spotlight with pricing badge, call-to-action bar, and reviews tag.',
    duration: '00:20',
    thumbnailUrl: HERO_IMAGE,
    tags: ['E-Commerce', 'Square', 'Sales'],
    captionStyle: 'clean-corporate'
  },
  {
    id: 'tpl-12',
    title: 'AI Generative Story Short',
    category: 'AI-Generated',
    aspectRatio: '9:16',
    description: 'Veo and Midjourney style cinematic continuous morph with ambient sci-fi soundscape.',
    duration: '00:30',
    thumbnailUrl: GAMING_IMAGE,
    tags: ['Generative', 'Futuristic', 'Veo'],
    captionStyle: 'neon-cyber'
  }
];

// Initial Assets
export const INITIAL_ASSETS: MediaAsset[] = [
  {
    id: 'asset-1',
    name: 'podcast_studio_master.mp4',
    type: 'video',
    size: '142.4 MB',
    url: PODCAST_IMAGE,
    uploadedAt: 'Oct 18, 2026',
    duration: '14:20',
    dimensions: '1920x1080'
  },
  {
    id: 'asset-2',
    name: 'cyberpunk_character_cut.mp4',
    type: 'video',
    size: '88.1 MB',
    url: GAMING_IMAGE,
    uploadedAt: 'Oct 17, 2026',
    duration: '03:15',
    dimensions: '1080x1920'
  },
  {
    id: 'asset-3',
    name: 'mountain_epic_4k.jpg',
    type: 'image',
    size: '12.8 MB',
    url: CINEMATIC_IMAGE,
    uploadedAt: 'Oct 16, 2026',
    dimensions: '3840x2160'
  },
  {
    id: 'asset-4',
    name: 'deep_electronic_drone.wav',
    type: 'audio',
    size: '18.2 MB',
    url: '',
    uploadedAt: 'Oct 15, 2026',
    duration: '02:40'
  }
];

// AI Studio Tools Catalog
export interface StudioToolItem {
  id: string;
  name: string;
  category: 'video' | 'audio' | 'image' | 'creator';
  description: string;
  badge: 'Local RTX' | 'Cloud AI' | 'Browser WASM' | 'Real Assist';
  icon: string;
  route: string;
}

export const STUDIO_TOOLS: StudioToolItem[] = [
  {
    id: 'long-to-short',
    name: 'Smart Clips (Long to Short)',
    category: 'video',
    description: 'Feed any podcast, interview, or lecture. AI finds the top 5 moments, reframes to 9:16, and styles captions automatically.',
    badge: 'Local RTX',
    icon: 'Scissors',
    route: 'smart-clips'
  },
  {
    id: 'ai-video-gen',
    name: 'AI Video Generator',
    category: 'video',
    description: 'Transform prompts and reference frames into cinematic video sequences with camera control.',
    badge: 'Cloud AI',
    icon: 'Video',
    route: 'ai-video'
  },
  {
    id: 'video-enhancement',
    name: 'RTX Video Super Resolution',
    category: 'video',
    description: 'Upscale blurry 1080p footage to crisp 4K with deep learning edge recovery and noise reduction.',
    badge: 'Local RTX',
    icon: 'Sparkles',
    route: 'nvidia-lab'
  },
  {
    id: 'auto-subtitles',
    name: 'Auto Subtitles & Strobe Captions',
    category: 'audio',
    description: 'Transcribe speech in seconds with word-by-word highlight animation in 12 creator presets.',
    badge: 'Browser WASM',
    icon: 'Captions',
    route: 'editor'
  },
  {
    id: 'audio-cleanup',
    name: 'AI Voice Clarity & Denoise',
    category: 'audio',
    description: 'Remove air conditioning hum, room reverb, and background clutter while boosting vocal punch.',
    badge: 'Local RTX',
    icon: 'Mic',
    route: 'editor'
  },
  {
    id: 'thumbnail-builder',
    name: 'YouTube Thumbnail Studio',
    category: 'image',
    description: 'Create high-CTR 16:9 thumbnails with editable text, background glow, and visual hierarchy recommendations.',
    badge: 'Cloud AI',
    icon: 'Image',
    route: 'image-studio'
  },
  {
    id: 'bg-removal',
    name: 'AI Background Matting',
    category: 'video',
    description: 'Isolate subjects without a physical green screen using real-time segmentation neural models.',
    badge: 'Local RTX',
    icon: 'Layers',
    route: 'editor'
  },
  {
    id: 'ai-title-generator',
    name: 'Viral Video Title Generator',
    category: 'creator',
    description: 'Get 5 high-CTR, algorithm-tested video titles tailored to your topic using Gemini 3.8 Flash.',
    badge: 'Real Assist',
    icon: 'Type',
    route: 'ai-studio'
  },
  {
    id: 'hook-writer',
    name: '3-Second Hook Architect',
    category: 'creator',
    description: 'Craft curiosity gap opening lines that stop viewers from swiping away in the first 3 seconds.',
    badge: 'Real Assist',
    icon: 'Zap',
    route: 'ai-studio'
  },
  {
    id: 'hashtag-caption-engine',
    name: 'Viral Captions & Hashtags',
    category: 'creator',
    description: 'Generate engaging social captions with target keywords and optimized hashtag clusters.',
    badge: 'Real Assist',
    icon: 'Hash',
    route: 'ai-studio'
  }
];

// Sample prompts for AI video generator
export const SAMPLE_VIDEO_PROMPTS = [
  'A neon-lit cyberpunk samurai walking down a rain-slicked Tokyo alley, anamorphic lens flare, slow camera push-in, 8k cinematic photorealism',
  'Drone sweep over majestic snowy mountain peaks during golden sunset, volumetric clouds, golden light shafts, 60fps cinematic 4k',
  'Macro shot of an intricate mechanical watch movement with spinning brass gears and sapphire crystals, studio lighting, shallow depth of field',
  'Futuristic electric sports car drifting on a wet asphalt circuit at night, tire smoke, glowing LED brake lights, cinematic motion blur'
];

// ==================== CREATOR ACADEMY LEARNING PATHS ====================
import { AcademyPath, StarterKitItem, AiToolCatalogItem, PortfolioItem } from '../types';

export const ACADEMY_PATHS: AcademyPath[] = [
  {
    id: 'path-beginner',
    name: 'Beginner Creator',
    description: 'Learn the core fundamentals of creating your first video without feeling overwhelmed.',
    icon: 'GraduationCap',
    badge: 'Level 1',
    lessons: [
      {
        id: 'lesson-1-1',
        pathId: 'path-beginner',
        title: 'Anatomy of a Scroll-Stopping Video',
        description: 'Understand the 3-second hook, pacing, and visual pattern interrupts that hold retention.',
        difficulty: 'Beginner',
        duration: '4 min',
        completed: true,
        objectives: [
          'Understand why viewers swipe away in the first 3 seconds',
          'Learn the 3 hook types: Curiosity Gap, Bold Claim, and Visual Surprise',
          'Set up safe area margins for TikTok, Reels, and Shorts'
        ],
        practicalSummary: 'Viewers decide within 1.5 seconds whether to stay. Your visual hook must immediately support your opening audio hook.',
        exercise: 'Open Smart Clips and import a raw video or sample to analyze where the first 3-second cut lands.',
        targetTool: 'smart-clips',
        actionLabel: 'Practice in Smart Clips'
      },
      {
        id: 'lesson-1-2',
        pathId: 'path-beginner',
        title: 'Mastering the 9:16 Vertical Format',
        description: 'How to reframe landscape horizontal video into vertical without cutting off speakers.',
        difficulty: 'Beginner',
        duration: '5 min',
        completed: false,
        objectives: [
          'Switch between 9:16, 1:1, and 16:9 aspect ratios effortlessly',
          'Position speaker faces within the upper-third safe zone',
          'Avoid UI overlap from TikTok/Reels like and comment buttons'
        ],
        practicalSummary: 'Keep important faces and action in the upper 60% of the vertical frame to prevent platform icons from obscuring them.',
        exercise: 'Open the Video Editor, toggle the aspect ratio to 9:16, and check the safe area guides.',
        targetTool: 'editor',
        actionLabel: 'Practice in Video Editor'
      },
      {
        id: 'lesson-1-3',
        pathId: 'path-beginner',
        title: 'Adding Viral Karaoke Captions',
        description: 'Apply animated keyword pop presets like Viral Green to keep silent scrollers watching.',
        difficulty: 'Beginner',
        duration: '6 min',
        completed: false,
        objectives: [
          'Generate subtitles from speech in one click',
          'Pick high-contrast keyword colors (Viral Green, Cyber Cyan)',
          'Sync word-by-word pop animations for maximal viewer engagement'
        ],
        practicalSummary: '80% of short-form videos are watched on mute. Punchy word-by-word captions directly boost watch time by over 40%.',
        exercise: 'Select the Viral Green caption preset and preview the animated keyword pop in real time.',
        targetTool: 'editor',
        actionLabel: 'Try Caption Presets'
      }
    ]
  },
  {
    id: 'path-editing',
    name: 'Video Editing Fundamentals',
    description: 'Cut out dead air, split clips, build multi-track timelines, and pace your story like a pro.',
    icon: 'Film',
    badge: 'Level 2',
    lessons: [
      {
        id: 'lesson-2-1',
        pathId: 'path-editing',
        title: 'The Ripple Cut: Eliminating Filler Words',
        description: 'How to cut out "ums", long breaths, and silences to make your dialogue flow seamlessly.',
        difficulty: 'Beginner',
        duration: '5 min',
        completed: true,
        objectives: [
          'Identify silent gaps in the audio waveform track',
          'Use the Split (S) tool to isolate filler pauses',
          'Close the gap with ripple editing'
        ],
        practicalSummary: 'Trimming 0.3s between phrases condenses a 60-second video to 40 seconds, dramatically improving completion rate.',
        exercise: 'Open the editor timeline, locate pauses on the Audio A1 track, and split the clip.',
        targetTool: 'editor',
        actionLabel: 'Open Timeline Editor'
      },
      {
        id: 'lesson-2-2',
        pathId: 'path-editing',
        title: 'Pacing & Rhythm: Visual Transitions',
        description: 'Change camera angles or zoom levels every 3 to 4 seconds to reset viewer focus.',
        difficulty: 'Intermediate',
        duration: '7 min',
        completed: false,
        objectives: [
          'Apply subtle punch-in zooms (1.1x to 1.25x) on key statements',
          'Layer B-roll footage over audio dialogue',
          'Maintain natural speech flow while shifting visual perspective'
        ],
        practicalSummary: 'Never leave the exact same camera shot on screen for more than 4 seconds in short-form content.',
        exercise: 'Practice punch-in zooms using the zoom slider in the CutCraft editor.',
        targetTool: 'editor',
        actionLabel: 'Practice in Editor'
      }
    ]
  },
  {
    id: 'path-shortform',
    name: 'Short-Form Content Creator',
    description: 'Turn podcasts, live streams, and long tutorials into high-impact TikTok, Shorts, and Reels.',
    icon: 'Scissors',
    badge: 'Viral',
    lessons: [
      {
        id: 'lesson-3-1',
        pathId: 'path-shortform',
        title: 'Smart Clipping Long Videos with AI',
        description: 'Use neural scene analysis to instantly find the 3 most viral moments in an interview.',
        difficulty: 'Beginner',
        duration: '4 min',
        completed: false,
        objectives: [
          'Import long podcasts or YouTube URLs directly',
          'Review AI virality scores and hook predictions',
          'Batch export 3 clips in under 2 minutes'
        ],
        practicalSummary: 'CutCraft processes speech semantics locally to pinpoint high-sentiment, punchline, and controversy segments.',
        exercise: 'Launch Smart Clips and run highlight detection on sample footage.',
        targetTool: 'smart-clips',
        actionLabel: 'Launch Smart Clips'
      }
    ]
  },
  {
    id: 'path-aivideo',
    name: 'AI Video Creator',
    description: 'Master text-to-video prompts, camera motions, and cinematic lighting with Veo and local AI.',
    icon: 'Video',
    badge: 'Next-Gen',
    lessons: [
      {
        id: 'lesson-4-1',
        pathId: 'path-aivideo',
        title: 'Formula for Cinema-Grade Video Prompts',
        description: 'Combine Subject + Action + Environment + Camera Movement + Lighting for photorealism.',
        difficulty: 'Intermediate',
        duration: '6 min',
        completed: false,
        objectives: [
          'Avoid vague prompts like "cool video" in favor of structured prompts',
          'Control camera dynamics: Slow Push-in, Orbit 360, Drone Flyover',
          'Use Gemini AI to enhance basic prompts into 8K cinema scripts'
        ],
        practicalSummary: 'Specifying lens focal length (e.g. Leica 35mm f/1.4) and volumetric atmospheric lighting instantly elevates generation quality.',
        exercise: 'Use the AI Prompt Enhancer in the AI Video Generator to upgrade a 5-word idea.',
        targetTool: 'ai-video',
        actionLabel: 'Try AI Video Generator'
      }
    ]
  },
  {
    id: 'path-thumbnails',
    name: 'Thumbnail Designer',
    description: 'Design high-CTR 16:9 thumbnails with editable text, background glow, and visual hierarchy.',
    icon: 'Image',
    badge: 'Growth',
    lessons: [
      {
        id: 'lesson-5-1',
        pathId: 'path-thumbnails',
        title: 'High-CTR Visual Hierarchy & Badges',
        description: 'Why 3 words or less on a thumbnail drives 3x more clicks than cluttered sentences.',
        difficulty: 'Beginner',
        duration: '5 min',
        completed: false,
        objectives: [
          'Pick bold, high-contrast headline text (STOP DOING THIS, 10X SECRET)',
          'Add attention-grabbing badges like NEW 2026 or AI TRICK',
          'Use subtle neon outer borders to stand out on dark mode mobile feeds'
        ],
        practicalSummary: 'Thumbnails are viewed small on mobile screens. Contrast and text size matter 10x more than fine details.',
        exercise: 'Open the YouTube Thumbnail Studio and customize a 16:9 thumbnail.',
        targetTool: 'image-studio',
        actionLabel: 'Design a Thumbnail'
      }
    ]
  },
  {
    id: 'path-nvidia',
    name: 'NVIDIA & Local AI Workflows',
    description: 'Run private speech transcription, 4K super resolution, and AV1 video encoding on your GPU.',
    icon: 'Cpu',
    badge: 'Hardware',
    lessons: [
      {
        id: 'lesson-6-1',
        pathId: 'path-nvidia',
        title: 'GPU vs Cloud: 100% Private Local Editing',
        description: 'How to transcribe and export video with zero cloud latency and no recurring subscription costs.',
        difficulty: 'Intermediate',
        duration: '6 min',
        completed: false,
        objectives: [
          'Verify your NVIDIA RTX GPU and NVENC hardware encoder status',
          'Understand TensorRT and DirectML ONNX inference',
          'Benchmark timeline export speeds at up to 180 FPS'
        ],
        practicalSummary: 'Local NVENC hardware encoding is 5x faster than CPU rendering and never sends your footage over the internet.',
        exercise: 'Visit the NVIDIA Lab and run the hardware export benchmark test.',
        targetTool: 'nvidia-lab',
        actionLabel: 'Explore NVIDIA Lab'
      }
    ]
  }
];

// ==================== FREE STARTER KITS ====================
export const STARTER_KITS: StarterKitItem[] = [
  {
    id: 'kit-viral-captions',
    title: 'Viral Caption Starter Pack',
    category: 'captions',
    description: '12 ready-to-use animated creator caption presets including Viral Green, Bold Creator, and Neon Cyber.',
    format: '12 Presets Built-in',
    free: true,
    requiresDownload: false,
    previewUrl: PODCAST_IMAGE,
    badge: 'Most Popular',
    actionTarget: 'editor',
    actionText: 'Use in Editor',
    details: 'Supports word-by-word karaoke highlighting, custom fonts, stroke width, and drop shadow.'
  },
  {
    id: 'kit-shorts-templates',
    title: 'Top 10 High-Retention Shorts Templates',
    category: 'templates',
    description: 'Pre-timed 9:16 layouts designed specifically for YouTube Shorts, TikTok, and Instagram Reels.',
    format: '10 Video Presets',
    free: true,
    requiresDownload: false,
    previewUrl: GAMING_IMAGE,
    badge: 'Creator Essential',
    actionTarget: 'templates',
    actionText: 'Browse Templates',
    details: 'Includes beat-synced cuts, split-screen speaker layouts, and hook strobe markers.'
  },
  {
    id: 'kit-thumbnail-pack',
    title: 'YouTube CTR Thumbnail Kit',
    category: 'thumbnails',
    description: 'High-converting 16:9 canvas layouts with attention badges, gradient scrims, and glow borders.',
    format: '16:9 Canvas Kit',
    free: true,
    requiresDownload: false,
    previewUrl: HERO_IMAGE,
    badge: 'High CTR',
    actionTarget: 'image-studio',
    actionText: 'Open in Studio',
    details: 'Fully editable typography with live preview and instant high-res PNG export.'
  },
  {
    id: 'kit-ai-prompts',
    title: 'Cinema-Grade AI Prompt Library',
    category: 'prompts',
    description: '50+ battle-tested prompts for photorealistic AI video and futuristic concept art.',
    format: '50+ Prompts',
    free: true,
    requiresDownload: false,
    previewUrl: CINEMATIC_IMAGE,
    badge: 'Veo & Midjourney',
    actionTarget: 'ai-video',
    actionText: 'Load in AI Video Gen',
    details: 'Covers camera motion, lighting modifiers, camera lenses, and cinematic atmospheric effects.'
  },
  {
    id: 'kit-audio-sfx',
    title: 'Creator Sound FX & Transitions',
    category: 'audio',
    description: 'Royalty-free whooshes, camera snaps, pop sounds, and cinematic drone risers for pacing.',
    format: 'WAV & WebAudio',
    free: true,
    requiresDownload: false,
    previewUrl: PODCAST_IMAGE,
    badge: '100% Royalty Free',
    actionTarget: 'editor',
    actionText: 'Audition in Editor',
    details: 'Tested to enhance 3-second pattern interrupts and topic shifts.'
  },
  {
    id: 'kit-color-luts',
    title: 'Moody Film & Cyber Color Presets',
    category: 'grading',
    description: 'Instant color adjustments for cinematic teal & orange, moody midnight, and high-contrast glow.',
    format: 'CSS & Canvas LUT',
    free: true,
    requiresDownload: false,
    previewUrl: CINEMATIC_IMAGE,
    badge: 'Pro Grading',
    actionTarget: 'editor',
    actionText: 'Apply in Editor',
    details: 'Hardware accelerated in real time using CSS matrix filters and WebGL.'
  }
];

// ==================== AI TOOL FINDER CATALOG ====================
export const AI_TOOL_CATALOG: AiToolCatalogItem[] = [
  {
    id: 'cat-long-to-short',
    name: 'Smart Clips (Long to Short)',
    goal: 'Turn long videos, podcasts or lectures into vertical short clips',
    category: 'Video Repurposing',
    supportedInputs: 'MP4, MOV, WebM, YouTube URLs up to 1080p',
    supportedOutputs: '9:16 Vertical Video with burned-in subtitles',
    availability: 'Integrated',
    processingType: '100% Local Private',
    hardwareReq: 'Any modern GPU (NVIDIA RTX accelerated)',
    apiReq: 'None (Runs locally)',
    isFree: true,
    targetPage: 'smart-clips',
    popularSearch: ['convert long video', 'podcast to shorts', 'highlights', 'reframe']
  },
  {
    id: 'cat-auto-captions',
    name: 'Auto Subtitles & Strobe Captions',
    goal: 'Generate subtitles with animated word highlights',
    category: 'Captions & Text',
    supportedInputs: 'Video dialogue audio',
    supportedOutputs: 'Viral Green subtitles, SRT, burned MP4',
    availability: 'Integrated',
    processingType: 'Hybrid Edge',
    hardwareReq: 'Standard Browser or RTX GPU',
    apiReq: 'Whisper / Local Model',
    isFree: true,
    targetPage: 'editor',
    popularSearch: ['subtitles', 'captions', 'viral green', 'karaoke', 'transcribe']
  },
  {
    id: 'cat-ai-video',
    name: 'AI Video Generator',
    goal: 'Generate cinema-grade video sequences from text or image prompts',
    category: 'Generative AI',
    supportedInputs: 'Text prompt, reference image',
    supportedOutputs: 'MP4 Video (16:9, 9:16, 1:1, 4:5)',
    availability: 'Cloud AI',
    processingType: 'Cloud Boost',
    hardwareReq: 'Web Browser',
    apiReq: 'Veo / Cloud AI Video Provider',
    isFree: true,
    targetPage: 'ai-video',
    popularSearch: ['generate video', 'text to video', 'ai video', 'veo', 'b-roll']
  },
  {
    id: 'cat-thumbnail-builder',
    name: 'YouTube Thumbnail Studio',
    goal: 'Create high-CTR YouTube thumbnails with bold text and badges',
    category: 'Image & Graphics',
    supportedInputs: 'Custom text, images, background styles',
    supportedOutputs: 'High-res 1280x720 JPG/PNG',
    availability: 'Integrated',
    processingType: '100% Local Private',
    hardwareReq: 'Standard Browser',
    apiReq: 'None',
    isFree: true,
    targetPage: 'image-studio',
    popularSearch: ['thumbnail', 'youtube cover', 'high ctr', 'badges', 'graphics']
  },
  {
    id: 'cat-rtx-vsr',
    name: 'RTX Video Super Resolution',
    goal: 'Upscale 1080p source clips to crisp 4K with deep learning edge recovery',
    category: 'Video Enhancement',
    supportedInputs: '1080p video footage',
    supportedOutputs: '4K enhanced video stream',
    availability: 'Local GPU Accelerated',
    processingType: '100% Local Private',
    hardwareReq: 'NVIDIA GeForce RTX 30/40 series',
    apiReq: 'NVIDIA Studio Driver',
    isFree: true,
    targetPage: 'nvidia-lab',
    popularSearch: ['4k upscale', 'denoise', 'sharpen', 'super resolution', 'rtx']
  },
  {
    id: 'cat-creator-mentor',
    name: 'AI Creator Mentor',
    goal: 'Get instant answers, workflow guidance, and beginner coaching',
    category: 'Creator Copilot',
    supportedInputs: 'Natural language questions',
    supportedOutputs: 'Practical creative advice, tool recommendations',
    availability: 'Cloud AI',
    processingType: 'Hybrid Edge',
    hardwareReq: 'Standard Browser',
    apiReq: 'Gemini 3.8 Flash',
    isFree: true,
    targetPage: 'mentor',
    popularSearch: ['how to edit', 'help', 'mentor', 'first video', 'strategy']
  },
  {
    id: 'cat-idea-lab',
    name: 'Creator Idea Lab',
    goal: 'Generate viral video ideas, hooks, and scene-by-scene script outlines',
    category: 'Ideation & Scripts',
    supportedInputs: 'Content niche, target audience, platform',
    supportedOutputs: 'Full video concepts with 3s hooks and shot lists',
    availability: 'Integrated',
    processingType: 'Hybrid Edge',
    hardwareReq: 'Standard Browser',
    apiReq: 'Gemini 3.8 Flash',
    isFree: true,
    targetPage: 'idea-lab',
    popularSearch: ['video ideas', 'hook generator', 'script outline', 'content calendar']
  },
  {
    id: 'cat-video-coach',
    name: 'AI Video Coach',
    goal: 'Evaluate hook strength, pacing, caption readability, and get before/after fixes',
    category: 'Content Optimization',
    supportedInputs: 'Video concept, transcript, or edit notes',
    supportedOutputs: 'Diagnostic scorecard with actionable improvement tips',
    availability: 'Integrated',
    processingType: 'Hybrid Edge',
    hardwareReq: 'Standard Browser',
    apiReq: 'Gemini 3.8 Flash',
    isFree: true,
    targetPage: 'coach',
    popularSearch: ['review video', 'audit', 'retention score', 'feedback', 'improve']
  }
];

// ==================== INITIAL PORTFOLIO SHOWCASE ====================
export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'The AI Work Revolution Explained',
    category: 'YouTube Shorts',
    aspectRatio: '9:16',
    viewsEstimate: '245K views',
    toolsUsed: ['Smart Clips', 'Viral Green Subtitles', 'NVENC 60fps'],
    thumbnailUrl: PODCAST_IMAGE,
    description: 'High-retention 35-second vertical clip featuring dual-speaker framing and punchy keyword highlights.',
    isPublic: true,
    completedDate: 'Oct 14, 2026'
  },
  {
    id: 'port-2',
    title: 'Cyberpunk Game Night Highlight Reel',
    category: 'Gaming',
    aspectRatio: '9:16',
    viewsEstimate: '82K views',
    toolsUsed: ['Video Editor', 'Neon Cyber Captions', 'Audio Denoise'],
    thumbnailUrl: GAMING_IMAGE,
    description: 'Fast-paced gameplay edit with beat-synced zoom transitions and glowing cyan subtitle tracking.',
    isPublic: true,
    completedDate: 'Oct 12, 2026'
  },
  {
    id: 'port-3',
    title: 'Nordic Explorer Cinematic Reel',
    category: 'Cinematic',
    aspectRatio: '16:9',
    viewsEstimate: '110K views',
    toolsUsed: ['AI Video Generator', 'Cinematic Subtitles', 'RTX 4K Upscale'],
    thumbnailUrl: CINEMATIC_IMAGE,
    description: 'Landscape cinematic travel montage generated from text prompts and refined in the multi-track timeline.',
    isPublic: true,
    completedDate: 'Oct 8, 2026'
  }
];

