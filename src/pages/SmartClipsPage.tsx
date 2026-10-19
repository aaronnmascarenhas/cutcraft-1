import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Scissors, 
  Link as LinkIcon, 
  Play, 
  Pause, 
  Sparkles, 
  Clock, 
  Flame, 
  Check, 
  ArrowRight, 
  Download, 
  Film, 
  RefreshCw,
  Video,
  Eye,
  Sliders,
  Type
} from 'lucide-react';
import { AspectRatio, ClipSegment, NavigationPage } from '../types';
import { PODCAST_IMAGE, GAMING_IMAGE, CINEMATIC_IMAGE } from '../data/mockData';

interface SmartClipsPageProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenClipInEditor: (clip: ClipSegment) => void;
  onOpenExportModal: (title: string, aspectRatio: AspectRatio) => void;
}

export const SmartClipsPage: React.FC<SmartClipsPageProps> = ({
  onNavigate,
  onOpenClipInEditor,
  onOpenExportModal,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'long' | 'short' | 'url'>('long');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [importedVideoName, setImportedVideoName] = useState<string | null>(null);
  const [importedVideoUrl, setImportedVideoUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [highlightClips, setHighlightClips] = useState<ClipSegment[]>([]);
  const [selectedClip, setSelectedClip] = useState<ClipSegment | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAspect, setCurrentAspect] = useState<AspectRatio>('9:16');
  const [captionStyle, setCaptionStyle] = useState('Viral Green');
  const [activeWordIdx, setActiveWordIdx] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  const SAMPLE_DETECTED_CLIPS: ClipSegment[] = [
    {
      id: 'clip-1',
      title: 'The AI Secret 99% Of People Miss',
      startTime: 14,
      endTime: 46,
      duration: '00:32',
      score: 98,
      hookText: 'Most people think AI is coming for their jobs...',
      aspectRatio: '9:16',
      transcriptExcerpt: 'Most people think AI is coming for their jobs, but the reality is someone using AI is who replaces you. Let me break down the exact 3 daily habits to stay ahead.',
      previewUrl: PODCAST_IMAGE
    },
    {
      id: 'clip-2',
      title: 'Why Creators Burn Out In 90 Days',
      startTime: 82,
      endTime: 118,
      duration: '00:36',
      score: 94,
      hookText: 'The reason 90% of channels quit before 1,000 subscribers...',
      aspectRatio: '9:16',
      transcriptExcerpt: 'The reason 90% of channels quit before 1,000 subscribers is they spend 8 hours editing what should take 45 minutes with smart clipping automation.',
      previewUrl: GAMING_IMAGE
    },
    {
      id: 'clip-3',
      title: 'The 10x Retention Formula',
      startTime: 185,
      endTime: 222,
      duration: '00:37',
      score: 91,
      hookText: 'Look at your first 3 seconds retention drop-off...',
      aspectRatio: '9:16',
      transcriptExcerpt: 'Look at your first 3 seconds retention drop-off. If you do not have a visual pattern interrupt and punchy green captions, 70% of swipers are gone forever.',
      previewUrl: CINEMATIC_IMAGE
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImportedVideoName(file.name);
      setImportedVideoUrl(url);
      startAiClippingPipeline(file.name);
    }
  };

  const handleUseSampleVideo = () => {
    setImportedVideoName('lex_ai_interview_highlight_4k.mp4');
    setImportedVideoUrl(PODCAST_IMAGE);
    startAiClippingPipeline('lex_ai_interview_highlight_4k.mp4');
  };

  const handleImportUrl = () => {
    if (!youtubeUrl.trim()) return;
    setImportedVideoName(`YouTube: ${youtubeUrl.trim().slice(0, 30)}...`);
    setImportedVideoUrl(PODCAST_IMAGE);
    startAiClippingPipeline('youtube_stream_1080p.mp4');
  };

  const startAiClippingPipeline = (filename: string) => {
    setIsProcessing(true);
    setCurrentStep(1); // 1: Import, 2: Transcribing, 3: Finding Highlights, 4: Reframing, 5: Ready

    setTimeout(() => setCurrentStep(2), 600);
    setTimeout(() => setCurrentStep(3), 1200);
    setTimeout(() => setCurrentStep(4), 1800);
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(5);
      setHighlightClips(SAMPLE_DETECTED_CLIPS);
      setSelectedClip(SAMPLE_DETECTED_CLIPS[0]);
    }, 2400);
  };

  const words = selectedClip?.transcriptExcerpt.split(' ') || [];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto text-[#F4F7FF]">
      {/* Top Title & Subtitle - Echoing reference screenshots */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          Smart Clips
        </h1>
        <div className="inline-block px-3 py-0.5 rounded-full bg-[#101D40] border border-[#39F56A]/40 text-[#39F56A] font-mono text-xs font-semibold">
          PRESETLY AI AUTO-CLIPPING ENGINE
        </div>
        <p className="text-xs md:text-sm text-[#9BAFD0] leading-relaxed pt-1">
          Long videos into short clips — transcribed, cut, reframed and captioned on this computer. Free, and nothing is uploaded unless you turn Cloud Boost on.
        </p>
      </div>

      {/* Visual Timeline Graphic with 3 vertical phone placeholders - matching reference screenshot 1 & 2 */}
      <div className="relative max-w-xl mx-auto p-4 rounded-2xl bg-[#0A1230] border border-[#162B53] shadow-inner">
        <div className="h-6 rounded-lg bg-[#101D40] relative flex items-center px-4 overflow-hidden">
          {/* Animated playback line */}
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-white shadow-[0_0_8px_white]" />
          {/* Highlight segments */}
          <div className="h-3 w-16 rounded bg-[#39F56A] shadow-[0_0_10px_#39F56A] mx-8" />
          <div className="h-3 w-20 rounded bg-[#39F56A] shadow-[0_0_10px_#39F56A] mx-10" />
          <div className="h-3 w-16 rounded bg-[#39F56A] shadow-[0_0_10px_#39F56A] mx-8" />
        </div>

        {/* 3 Vertical Phone Placeholders */}
        <div className="grid grid-cols-3 gap-6 pt-4 px-8">
          {[1, 2, 3].map((idx) => (
            <div 
              key={idx} 
              className="aspect-[9/14] rounded-xl bg-[#101D40] border border-[#1d356c] flex flex-col justify-end p-2 items-center"
            >
              <div className="w-8 h-1.5 rounded-full bg-[#39F56A] shadow-[0_0_6px_#39F56A] mb-1" />
              <div className="w-5 h-1 rounded-full bg-[#00D9FF]" />
            </div>
          ))}
        </div>
      </div>

      {/* "What are you starting with?" Section - Echoing reference screenshots */}
      {highlightClips.length === 0 && !isProcessing && (
        <div className="space-y-6 pt-2">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-white">What are you starting with?</h2>
            <p className="text-xs text-[#9BAFD0]">Everything else — captions, styling, aspect ratio — comes next, with a preview.</p>
          </div>

          {/* 3 Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: Upload a long video */}
            <button
              onClick={() => {
                setSelectedMethod('long');
                fileInputRef.current?.click();
              }}
              className={`p-6 rounded-2xl border text-left transition-all duration-200 cursor-pointer shadow-lg flex flex-col justify-between ${
                selectedMethod === 'long'
                  ? 'bg-[#101D40] border-[#39F56A] shadow-[0_0_20px_rgba(57,245,106,0.18)]'
                  : 'bg-[#0A1230] border-[#162B53] hover:border-[#2b4c8c]'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#162B53] border border-[#39F56A]/50 flex items-center justify-center text-[#39F56A] mb-4">
                  <Scissors className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-white">Upload a long video</h3>
                <p className="text-xs text-[#9BAFD0] mt-2 leading-relaxed">
                  A podcast, lecture, interview or livestream. CutCraft finds the moments worth posting.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#14234b] text-[11px] font-semibold text-[#39F56A]">
                Recommended for Podcasts
              </div>
            </button>

            {/* Card 2: Upload short clips */}
            <button
              onClick={() => {
                setSelectedMethod('short');
                fileInputRef.current?.click();
              }}
              className={`p-6 rounded-2xl border text-left transition-all duration-200 cursor-pointer shadow-lg flex flex-col justify-between ${
                selectedMethod === 'short'
                  ? 'bg-[#101D40] border-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,0.18)]'
                  : 'bg-[#0A1230] border-[#162B53] hover:border-[#2b4c8c]'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#162B53] border border-[#00D9FF]/50 flex items-center justify-center text-[#00D9FF] mb-4">
                  <Upload className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-white">Upload short clips</h3>
                <p className="text-xs text-[#9BAFD0] mt-2 leading-relaxed">
                  Already cut it yourself? Captions and styling only — your edit is left alone.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#14234b] text-[11px] font-semibold text-[#00D9FF]">
                Style Existing Cuts
              </div>
            </button>

            {/* Card 3: Paste a YouTube URL */}
            <button
              onClick={() => setSelectedMethod('url')}
              className={`p-6 rounded-2xl border text-left transition-all duration-200 cursor-pointer shadow-lg flex flex-col justify-between ${
                selectedMethod === 'url'
                  ? 'bg-[#101D40] border-[#8B5CFF] shadow-[0_0_20px_rgba(139,92,255,0.18)]'
                  : 'bg-[#0A1230] border-[#162B53] hover:border-[#2b4c8c]'
              }`}
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#162B53] border border-[#8B5CFF]/50 flex items-center justify-center text-[#8B5CFF] mb-4">
                  <LinkIcon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-white">Paste a YouTube URL</h3>
                <p className="text-xs text-[#9BAFD0] mt-2 leading-relaxed">
                  For videos you own or have permission to use. Imported at up to 1080p.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#14234b] text-[11px] font-semibold text-[#8B5CFF]">
                Import Direct Link
              </div>
            </button>
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileUpload}
          />

          {/* Primary Action Button Bar */}
          <div className="p-4 rounded-2xl bg-[#0A1230] border border-[#162B53] flex flex-col sm:flex-row items-center justify-between gap-4">
            {selectedMethod === 'url' ? (
              <div className="w-full flex items-center gap-2">
                <input
                  type="text"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#050817] border border-[#1d356c] text-xs text-white placeholder-[#9BAFD0] focus:border-[#39F56A] focus:outline-none font-mono"
                />
                <button
                  onClick={handleImportUrl}
                  className="px-5 py-2.5 rounded-xl bg-[#39F56A] hover:bg-[#31e05e] text-[#050817] font-bold text-xs transition-all shadow-[0_0_15px_rgba(57,245,106,0.3)] active:scale-95 whitespace-nowrap cursor-pointer"
                >
                  Import Stream
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-3 w-full justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 rounded-xl bg-[#39F56A] hover:bg-[#31e05e] text-[#050817] font-extrabold text-xs transition-all shadow-[0_0_20px_rgba(57,245,106,0.35)] active:scale-95 cursor-pointer flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4 stroke-[3]" />
                    <span>Choose a video...</span>
                  </button>
                  <span className="text-xs text-[#9BAFD0] hidden md:inline">
                    or drop one anywhere on this window
                  </span>
                </div>

                {/* Instant Sample Test Button */}
                <button
                  onClick={handleUseSampleVideo}
                  className="px-4 py-2 rounded-xl bg-[#101D40] hover:bg-[#162B53] border border-[#1d356c] text-xs font-medium text-[#00D9FF] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Try Demo Podcast Footage</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Processing Pipeline Stepper Indicator */}
      {isProcessing && (
        <div className="p-8 rounded-2xl bg-[#0A1230] border border-[#1d356c] space-y-6 text-center">
          <div className="inline-flex p-3 rounded-2xl bg-[#101D40] border border-[#39F56A]/50 text-[#39F56A] shadow-[0_0_30px_rgba(57,245,106,0.2)]">
            <RefreshCw className="w-8 h-8 animate-spin" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">AI Clipping Pipeline Active</h3>
            <p className="text-xs text-[#9BAFD0] font-mono">
              File: {importedVideoName} · Processing on NVIDIA RTX 4090
            </p>
          </div>

          <div className="max-w-md mx-auto grid grid-cols-4 gap-2 text-[10px]">
            {[
              { num: 1, label: 'Import' },
              { num: 2, label: 'Transcribing' },
              { num: 3, label: 'Finding Highlights' },
              { num: 4, label: 'Reframing 9:16' }
            ].map((st) => (
              <div 
                key={st.num} 
                className={`p-2 rounded-lg border text-center transition-all ${
                  currentStep >= st.num 
                    ? 'bg-[#101D40] border-[#39F56A] text-[#39F56A] font-bold' 
                    : 'bg-[#050817] border-[#162B53] text-[#9BAFD0]'
                }`}
              >
                <div>0{st.num}</div>
                <div>{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Generated Highlights Workspace */}
      {highlightClips.length > 0 && !isProcessing && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#0A1230] border border-[#162B53]">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#39F56A] shadow-[0_0_8px_#39F56A]" />
                <h3 className="font-bold text-sm text-white">
                  3 Viral Highlights Identified
                </h3>
              </div>
              <p className="text-xs text-[#9BAFD0] mt-0.5">
                From {importedVideoName || 'Interview Footage'} · Transcribed with word timestamps
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setHighlightClips([]);
                  setImportedVideoName(null);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#101D40] text-xs text-[#9BAFD0] hover:text-white transition-colors"
              >
                Upload Different Video
              </button>
            </div>
          </div>

          {/* Dual Column: Video Preview with Live Captions & Clip Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Video Player with Dynamic 9:16 / 1:1 Reframe and Viral Captions */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-3 rounded-2xl bg-[#0A1230] border border-[#1d356c] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">Preview Reframe</span>
                  {/* Aspect Ratio Switcher */}
                  <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#050817] border border-[#162B53]">
                    {(['9:16', '1:1', '16:9'] as AspectRatio[]).map((aspect) => (
                      <button
                        key={aspect}
                        onClick={() => setCurrentAspect(aspect)}
                        className={`px-2 py-0.5 rounded font-mono text-[10px] font-semibold transition-colors ${
                          currentAspect === aspect
                            ? 'bg-[#162B53] text-[#39F56A]'
                            : 'text-[#9BAFD0] hover:text-white'
                        }`}
                      >
                        {aspect}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Video Canvas Container with Aspect constraint */}
                <div className="relative mx-auto bg-black rounded-xl overflow-hidden border border-[#233f75] shadow-2xl flex items-center justify-center aspect-[9/16] max-h-[460px] w-full">
                  <img
                    src={selectedClip?.previewUrl || PODCAST_IMAGE}
                    alt="Clip Frame"
                    className="w-full h-full object-cover"
                  />

                  {/* Play/Pause Center Overlay */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#39F56A] text-[#050817] flex items-center justify-center shadow-[0_0_20px_rgba(57,245,106,0.6)] group-hover:scale-110 transition-transform">
                      {isPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      )}
                    </div>
                  </button>

                  {/* Top Hook Score Pill */}
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/80 backdrop-blur-md border border-[#39F56A]/40 text-[10px] font-mono text-[#39F56A] flex items-center gap-1">
                    <Flame className="w-3 h-3 text-[#39F56A]" />
                    <span>Viral Score {selectedClip?.score}/100</span>
                  </div>

                  {/* Live Animated Caption Overlay (Viral Green style) */}
                  <div className="absolute bottom-8 left-4 right-4 pointer-events-none text-center">
                    <div className="inline-block p-2 rounded-lg bg-black/85 border border-[#39F56A]/50 backdrop-blur-md shadow-2xl max-w-[90%]">
                      <p className="font-extrabold text-xs md:text-sm tracking-wide text-white drop-shadow-[0_2px_4px_black]">
                        {words.slice(0, 8).map((word, wIdx) => {
                          const isHigh = wIdx === 2 || wIdx === 4;
                          return (
                            <span 
                              key={wIdx} 
                              className={`inline-block mx-0.5 transition-all ${
                                isHigh 
                                  ? 'text-[#39F56A] scale-110 underline decoration-2' 
                                  : 'text-white'
                              }`}
                            >
                              {word}
                            </span>
                          );
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Safe Area Markers */}
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-[9px] font-mono text-[#9BAFD0]">
                    Safe Margin OK
                  </div>
                </div>

                {/* Controls under player */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#9BAFD0]">
                    <Clock className="w-3.5 h-3.5 text-[#39F56A]" />
                    <span>{selectedClip?.duration} clip</span>
                  </div>

                  <button
                    onClick={() => selectedClip && onOpenExportModal(selectedClip.title, currentAspect)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#39F56A] hover:bg-[#31e05e] text-[#050817] font-bold text-xs transition-all shadow-[0_0_12px_rgba(57,245,106,0.3)] active:scale-95 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Export MP4</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Clip Cards List with Edit in Timeline */}
            <div className="lg:col-span-7 space-y-3">
              <h4 className="font-bold text-xs text-[#9BAFD0] uppercase tracking-wider">
                Select A Generated Clip
              </h4>

              <div className="space-y-3">
                {highlightClips.map((clip) => {
                  const isSelected = selectedClip?.id === clip.id;
                  return (
                    <div
                      key={clip.id}
                      onClick={() => setSelectedClip(clip)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#101D40] border-[#39F56A] shadow-[0_0_20px_rgba(57,245,106,0.18)]'
                          : 'bg-[#0A1230] border-[#162B53] hover:border-[#2b4c8c]'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white group-hover:text-[#39F56A]">
                            {clip.title}
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#162B53] text-[#39F56A] border border-[#39F56A]/30">
                            {clip.score}% Viral
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-[#00D9FF]">
                          {clip.duration}
                        </span>
                      </div>

                      <p className="text-xs text-[#9BAFD0] mt-2 italic line-clamp-2">
                        "{clip.transcriptExcerpt}"
                      </p>

                      <div className="mt-4 pt-3 border-t border-[#14234b] flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[10px] text-[#9BAFD0]">
                          <span>Reframed to 9:16</span>
                          <span>·</span>
                          <span className="text-[#39F56A]">Viral Green Subtitles</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenClipInEditor(clip);
                            }}
                            className="px-3 py-1 rounded-lg bg-[#162B53] hover:bg-[#1d356c] text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Film className="w-3 h-3 text-[#39F56A]" />
                            <span>Edit in Timeline</span>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenExportModal(clip.title, currentAspect);
                            }}
                            className="px-3 py-1 rounded-lg bg-[#39F56A] hover:bg-[#31e05e] text-[#050817] text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Download className="w-3 h-3 stroke-[2.5]" />
                            <span>Export</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
