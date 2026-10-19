import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Scissors, 
  Trash2, 
  Type, 
  Volume2, 
  VolumeX, 
  Download, 
  Sparkles, 
  Sliders, 
  Layers, 
  Clock, 
  Maximize2,
  ZoomIn,
  ZoomOut,
  Plus
} from 'lucide-react';
import { AspectRatio, CaptionPreset, ClipSegment } from '../types';
import { CAPTION_PRESETS, PODCAST_IMAGE } from '../data/mockData';

interface VideoEditorPageProps {
  initialClip?: ClipSegment | null;
  onOpenExportModal: (title: string, aspectRatio: AspectRatio) => void;
  selectedCaptionPreset: CaptionPreset;
  onSelectCaptionPreset: (preset: CaptionPreset) => void;
}

export const VideoEditorPage: React.FC<VideoEditorPageProps> = ({
  initialClip,
  onOpenExportModal,
  selectedCaptionPreset,
  onSelectCaptionPreset,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(12.4); // seconds
  const totalDuration = 42.0; // seconds
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(initialClip?.aspectRatio || '9:16');
  const [volume, setVolume] = useState(85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState<'video' | 'audio' | 'captions'>('video');
  const [activePreset, setActivePreset] = useState<CaptionPreset>(selectedCaptionPreset || CAPTION_PRESETS[0]);

  // Video adjustments
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(105);
  const [saturation, setSaturation] = useState(110);

  // Transcript words for caption preview
  const [captionText, setCaptionText] = useState(
    initialClip?.hookText || 'This will get you MASSIVE views in 2026'
  );

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1 * playbackSpeed;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed, totalDuration]);

  const formatTimecode = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    const frames = Math.floor((secs % 1) * 30);
    return `00:${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}:${frames.toString().padStart(2, '0')}`;
  };

  const handlePresetSelect = (preset: CaptionPreset) => {
    setActivePreset(preset);
    onSelectCaptionPreset(preset);
  };

  return (
    <div className="h-[calc(100vh-3.5rem-1.75rem)] flex flex-col bg-[#050817] text-[#F4F7FF] select-none overflow-hidden">
      {/* Top Toolbar */}
      <div className="h-11 border-b border-[#101D40] bg-[#0A1230] px-4 flex items-center justify-between text-xs">
        {/* Left: Project title & Aspect switcher */}
        <div className="flex items-center gap-3">
          <span className="font-bold text-white truncate max-w-xs">
            {initialClip?.title || 'Untitled Studio Project'}
          </span>
          <span className="text-[#101D40]">|</span>

          {/* Aspect Ratio Buttons */}
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#050817] border border-[#162B53]">
            {(['9:16', '16:9', '1:1', '4:5'] as AspectRatio[]).map((aspect) => (
              <button
                key={aspect}
                onClick={() => setAspectRatio(aspect)}
                className={`px-2 py-0.5 rounded font-mono text-[10px] font-semibold transition-colors cursor-pointer ${
                  aspectRatio === aspect
                    ? 'bg-[#162B53] text-[#39F56A] shadow-sm'
                    : 'text-[#9BAFD0] hover:text-white'
                }`}
              >
                {aspect}
              </button>
            ))}
          </div>
        </div>

        {/* Center: Playhead Timecode Display */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-[#39F56A] font-bold">{formatTimecode(currentTime)}</span>
          <span className="text-[#9BAFD0]">/</span>
          <span className="text-[#9BAFD0]">{formatTimecode(totalDuration)}</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Playback speed */}
          <button
            onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1)}
            className="px-2 py-1 rounded bg-[#101D40] border border-[#162B53] text-[10px] font-mono text-[#00D9FF] hover:bg-[#162B53] transition-colors"
            title="Playback Speed"
          >
            {playbackSpeed}x
          </button>

          <button
            onClick={() => onOpenExportModal(initialClip?.title || 'CutCraft Project', aspectRatio)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#39F56A] hover:bg-[#31e05e] text-[#050817] font-bold text-xs transition-all shadow-[0_0_12px_rgba(57,245,106,0.3)] active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Export Clip</span>
          </button>
        </div>
      </div>

      {/* Main Studio View: Video Canvas & Controls */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-[#050817]">
        {/* Left/Center: Video Player Stage */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center p-4 relative bg-[#030612] overflow-hidden">
          {/* Video Container Box conforming to Aspect Ratio */}
          <div 
            className={`relative rounded-xl overflow-hidden shadow-2xl border border-[#162B53] bg-black flex items-center justify-center transition-all ${
              aspectRatio === '9:16'
                ? 'aspect-[9/16] h-[360px] md:h-[400px]'
                : aspectRatio === '16:9'
                ? 'aspect-[16/9] w-full max-w-lg'
                : aspectRatio === '1:1'
                ? 'aspect-square h-[340px]'
                : 'aspect-[4/5] h-[360px]'
            }`}
            style={{
              filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`
            }}
          >
            <img 
              src={initialClip?.previewUrl || PODCAST_IMAGE} 
              alt="Video Canvas" 
              className="w-full h-full object-cover"
            />

            {/* Live Visual Caption Overlay (Styled with activePreset) */}
            <div 
              className="absolute left-3 right-3 text-center pointer-events-none transition-all"
              style={{ bottom: `${100 - activePreset.positionY}%` }}
            >
              <div 
                className="inline-block p-2 rounded-lg max-w-[92%]"
                style={{
                  backgroundColor: activePreset.backgroundColor || 'transparent',
                  fontFamily: activePreset.fontFamily,
                  textShadow: activePreset.shadow ? '0 2px 8px rgba(0,0,0,0.9)' : 'none',
                }}
              >
                <p 
                  className="font-extrabold uppercase tracking-wide leading-tight transition-transform duration-150"
                  style={{
                    fontSize: `${activePreset.fontSize}px`,
                    color: activePreset.textColor,
                    WebkitTextStroke: activePreset.strokeWidth > 0 ? `${activePreset.strokeWidth}px ${activePreset.strokeColor}` : 'none'
                  }}
                >
                  {captionText.split(' ').map((word, idx) => {
                    const isKey = word.toUpperCase() === 'MASSIVE' || word.toUpperCase() === 'SECRET' || word.toUpperCase() === 'VIEWS';
                    return (
                      <span 
                        key={idx}
                        className="inline-block mx-1"
                        style={{
                          color: isKey ? activePreset.highlightColor : activePreset.textColor,
                          transform: isKey && activePreset.animationStyle === 'pop' ? 'scale(1.12)' : 'none'
                        }}
                      >
                        {word}
                      </span>
                    );
                  })}
                </p>
              </div>
            </div>

            {/* Play/Pause Center Overlay */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/10 transition-colors group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-[#39F56A] text-[#050817] flex items-center justify-center shadow-[0_0_20px_rgba(57,245,106,0.6)] group-hover:scale-110 transition-transform">
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </div>
            </button>
          </div>

          {/* Under-canvas Transport controls */}
          <div className="mt-3 flex items-center gap-4 text-xs text-[#9BAFD0]">
            <button 
              onClick={() => setCurrentTime(Math.max(0, currentTime - 5))}
              className="hover:text-white transition-colors p-1"
              title="Step Back 5s"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 rounded-full bg-[#101D40] hover:bg-[#162B53] text-[#39F56A] flex items-center justify-center transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <button 
              onClick={() => setCurrentTime(Math.min(totalDuration, currentTime + 5))}
              className="hover:text-white transition-colors p-1"
              title="Step Forward 5s"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 pl-3 border-l border-[#101D40]">
              <button onClick={() => setIsMuted(!isMuted)} className="hover:text-white">
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input 
                type="range" 
                min={0} 
                max={100} 
                value={isMuted ? 0 : volume} 
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  setIsMuted(false);
                }}
                className="w-16 accent-[#39F56A] h-1 bg-[#101D40] rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Tabbed Inspector: Presets & Color */}
        <div className="lg:col-span-4 border-l border-[#101D40] bg-[#0A1230] p-4 flex flex-col gap-4 overflow-y-auto no-scrollbar">
          <div className="space-y-1">
            <h3 className="font-bold text-xs text-white">Visual Caption Presets</h3>
            <p className="text-[10px] text-[#9BAFD0]">Select a viral layout to instantly re-theme subtitles:</p>
          </div>

          {/* Caption Preset Grid */}
          <div className="grid grid-cols-2 gap-2">
            {CAPTION_PRESETS.map((preset) => {
              const isSelected = activePreset.id === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handlePresetSelect(preset)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#162B53] border-[#39F56A] shadow-[0_0_12px_rgba(57,245,106,0.2)]'
                      : 'bg-[#101D40] border-[#1d356c] hover:border-[#2b4c8c]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white truncate">{preset.name}</span>
                    <div 
                      className="w-3 h-3 rounded-full border border-black/40 shrink-0" 
                      style={{ backgroundColor: preset.highlightColor }} 
                    />
                  </div>
                  <div className="text-[9px] text-[#9BAFD0] mt-1 font-mono line-clamp-1">
                    {preset.tag} · {preset.animationStyle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Edit Caption Text */}
          <div className="space-y-1.5 pt-2 border-t border-[#14234b]">
            <label className="text-[11px] font-semibold text-white block">Active Caption Text</label>
            <input 
              type="text" 
              value={captionText}
              onChange={(e) => setCaptionText(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-[#050817] border border-[#162B53] text-xs text-white focus:border-[#39F56A] focus:outline-none"
            />
          </div>

          {/* Color Adjustments */}
          <div className="space-y-2.5 pt-2 border-t border-[#14234b]">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-white">
              <Sliders className="w-3.5 h-3.5 text-[#00D9FF]" />
              <span>Color & Enhancements</span>
            </div>

            <div className="space-y-2 text-[10px]">
              <div>
                <div className="flex justify-between text-[#9BAFD0] mb-0.5">
                  <span>Brightness</span>
                  <span className="font-mono text-white">{brightness}%</span>
                </div>
                <input 
                  type="range" 
                  min={80} 
                  max={130} 
                  value={brightness} 
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full accent-[#39F56A] h-1 bg-[#101D40] rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[#9BAFD0] mb-0.5">
                  <span>Contrast</span>
                  <span className="font-mono text-white">{contrast}%</span>
                </div>
                <input 
                  type="range" 
                  min={80} 
                  max={140} 
                  value={contrast} 
                  onChange={(e) => setContrast(Number(e.target.value))}
                  className="w-full accent-[#00D9FF] h-1 bg-[#101D40] rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[#9BAFD0] mb-0.5">
                  <span>Saturation</span>
                  <span className="font-mono text-white">{saturation}%</span>
                </div>
                <input 
                  type="range" 
                  min={70} 
                  max={150} 
                  value={saturation} 
                  onChange={(e) => setSaturation(Number(e.target.value))}
                  className="w-full accent-[#8B5CFF] h-1 bg-[#101D40] rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Track Timeline Dock */}
      <div className="h-44 border-t border-[#101D40] bg-[#0A1230] flex flex-col">
        {/* Timeline Tool Header */}
        <div className="h-9 border-b border-[#14234b] px-4 flex items-center justify-between text-xs bg-[#050817]">
          <div className="flex items-center gap-3">
            <button 
              className="flex items-center gap-1 text-[#9BAFD0] hover:text-[#39F56A] transition-colors"
              title="Split Clip at Playhead (S)"
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>Split</span>
            </button>
            <button 
              className="flex items-center gap-1 text-[#9BAFD0] hover:text-rose-400 transition-colors"
              title="Delete Selected Clip (Del)"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
            <button 
              className="flex items-center gap-1 text-[#9BAFD0] hover:text-white transition-colors"
              title="Add Caption Marker"
            >
              <Plus className="w-3.5 h-3.5 text-[#39F56A]" />
              <span>Add Marker</span>
            </button>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-2 text-[#9BAFD0]">
            <ZoomOut className="w-3.5 h-3.5 cursor-pointer hover:text-white" onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.25))} />
            <span className="text-[10px] font-mono">{Math.round(zoomLevel * 100)}%</span>
            <ZoomIn className="w-3.5 h-3.5 cursor-pointer hover:text-white" onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.25))} />
          </div>
        </div>

        {/* Tracks View */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-2 relative bg-[#070D22]">
          {/* Animated Red Playhead */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-[#39F56A] shadow-[0_0_8px_#39F56A] z-20 pointer-events-none transition-all"
            style={{ left: `${(currentTime / totalDuration) * 92 + 4}%` }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#39F56A] -ml-1 -mt-1 shadow-md" />
          </div>

          <div className="space-y-1.5 h-full flex flex-col justify-center">
            {/* Track 1: Captions */}
            <div className="h-6 rounded-md bg-[#101D40] border border-[#1d356c] flex items-center px-2 text-[10px] text-[#39F56A] relative overflow-hidden">
              <span className="w-16 shrink-0 font-semibold text-[9px] uppercase tracking-wider text-[#9BAFD0]">Captions</span>
              <div className="flex-1 flex gap-1">
                <span className="px-2 py-0.5 rounded bg-[#162B53] border border-[#39F56A]/40 truncate">
                  "This will get you MASSIVE views"
                </span>
                <span className="px-2 py-0.5 rounded bg-[#162B53] border border-[#1d356c] truncate">
                  "Let me break down the habits"
                </span>
              </div>
            </div>

            {/* Track 2: Video Frames */}
            <div className="h-10 rounded-md bg-[#162B53] border border-[#39F56A]/50 flex items-center px-2 text-[10px] text-white relative overflow-hidden shadow-inner">
              <span className="w-16 shrink-0 font-semibold text-[9px] uppercase tracking-wider text-[#9BAFD0]">Video V1</span>
              <div className="flex-1 flex gap-2 overflow-hidden h-full py-1">
                {[1, 2, 3, 4, 5, 6].map((thumb) => (
                  <div key={thumb} className="w-16 h-full rounded bg-[#0A1230] border border-[#233f75] shrink-0 overflow-hidden">
                    <img src={PODCAST_IMAGE} alt="Thumbnail strip" className="w-full h-full object-cover opacity-80" />
                  </div>
                ))}
              </div>
            </div>

            {/* Track 3: Audio Waveform */}
            <div className="h-6 rounded-md bg-[#101D40] border border-[#1d356c] flex items-center px-2 text-[10px] text-[#00D9FF] relative overflow-hidden">
              <span className="w-16 shrink-0 font-semibold text-[9px] uppercase tracking-wider text-[#9BAFD0]">Audio A1</span>
              {/* Simulated Waveform bars */}
              <div className="flex-1 flex items-center gap-0.5 h-full py-1 overflow-hidden">
                {Array.from({ length: 60 }).map((_, barIdx) => {
                  const heights = [30, 70, 95, 60, 40, 85, 100, 45, 20, 80, 65, 90];
                  const h = heights[barIdx % heights.length];
                  return (
                    <div 
                      key={barIdx} 
                      className="w-1 rounded-full bg-[#00D9FF]/75"
                      style={{ height: `${h}%` }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
