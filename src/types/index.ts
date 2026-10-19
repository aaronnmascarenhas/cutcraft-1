export type NavigationPage = 
  | 'home'
  | 'ai-studio'
  | 'editor'
  | 'smart-clips'
  | 'ai-video'
  | 'image-studio'
  | 'templates'
  | 'projects'
  | 'assets'
  | 'nvidia-lab'
  | 'settings'
  | 'academy'
  | 'mentor'
  | 'wizard'
  | 'idea-lab'
  | 'coach'
  | 'progress'
  | 'starter-kits'
  | 'tool-finder'
  | 'portfolio';

export type AspectRatio = '9:16' | '16:9' | '1:1' | '4:5';

export interface Project {
  id: string;
  title: string;
  type: 'smart-clip' | 'video' | 'ai-video' | 'thumbnail';
  aspectRatio: AspectRatio;
  duration: string;
  lastEdited: string;
  thumbnailUrl: string;
  captionPresetId?: string;
  isFavorite: boolean;
  fileSize?: string;
  category?: string;
  description?: string;
}

export interface ClipSegment {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
  duration: string;
  score: number; // Viral prediction score e.g. 96
  hookText: string;
  aspectRatio: AspectRatio;
  transcriptExcerpt: string;
  previewUrl?: string;
}

export interface CaptionPreset {
  id: string;
  name: string;
  description: string;
  fontFamily: string;
  fontSize: number; // in pt/px
  textColor: string;
  highlightColor: string;
  strokeColor: string;
  strokeWidth: number;
  shadow: boolean;
  backgroundColor?: string;
  animationStyle: 'pop' | 'typewriter' | 'slide-up' | 'glow' | 'fade' | 'none';
  positionY: number; // percentage from top, e.g. 75
  sampleWord: string;
  samplePhrase: string;
  tag: string;
}

export interface TemplateItem {
  id: string;
  title: string;
  category: string;
  aspectRatio: AspectRatio;
  description: string;
  duration: string;
  thumbnailUrl: string;
  tags: string[];
  isPopular?: boolean;
  captionStyle: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'image' | 'caption';
  size: string;
  url: string;
  uploadedAt: string;
  duration?: string;
  dimensions?: string;
}

export interface SystemStatusData {
  engine: string;
  electronReady: boolean;
  webCodecsSupported: boolean;
  geminiLiveConnected: boolean;
  nvidiaEngine: {
    driver: string;
    hardwareModel: string;
    cudaCores: number;
    tensorCores: number;
    nvencAvailable: boolean;
    tensorRtStatus: string;
    powerState: string;
    vramAllocatedMb: number;
    vramTotalMb: number;
    telemetrySource: string;
  };
}

export interface AiAssistResult {
  success: boolean;
  isLiveAi: boolean;
  data?: any;
  rawText?: string;
}

// ==================== NEW CREATOR SUITE TYPES ====================

export interface AcademyLesson {
  id: string;
  pathId: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  completed: boolean;
  objectives: string[];
  practicalSummary: string;
  exercise: string;
  targetTool: NavigationPage;
  actionLabel: string;
}

export interface AcademyPath {
  id: string;
  name: string;
  description: string;
  icon: string;
  badge: string;
  lessons: AcademyLesson[];
}

export interface StarterKitItem {
  id: string;
  title: string;
  category: 'captions' | 'templates' | 'thumbnails' | 'prompts' | 'audio' | 'grading';
  description: string;
  format: string;
  free: boolean;
  requiresDownload: boolean;
  previewUrl?: string;
  badge: string;
  actionTarget: NavigationPage;
  actionText: string;
  details: string;
}

export interface AiToolCatalogItem {
  id: string;
  name: string;
  goal: string;
  category: string;
  supportedInputs: string;
  supportedOutputs: string;
  availability: 'Integrated' | 'Local GPU Accelerated' | 'Cloud AI';
  processingType: '100% Local Private' | 'Hybrid Edge' | 'Cloud Boost';
  hardwareReq: string;
  apiReq: string;
  isFree: boolean;
  targetPage: NavigationPage;
  popularSearch: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  aspectRatio: AspectRatio;
  viewsEstimate: string;
  toolsUsed: string[];
  thumbnailUrl: string;
  description: string;
  isPublic: boolean;
  completedDate: string;
  videoUrl?: string;
}
