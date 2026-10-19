import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Check, 
  Film, 
  Cpu, 
  Sparkles,
  Zap
} from 'lucide-react';
import { AspectRatio } from '../../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  aspectRatio: AspectRatio;
  duration?: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  title,
  aspectRatio,
  duration = '00:30',
}) => {
  const [format, setFormat] = useState<'mp4' | 'webm' | 'gif'>('mp4');
  const [resolution, setResolution] = useState<'1080p' | '4k' | '720p'>('1080p');
  const [fps, setFps] = useState<60 | 30>(60);
  const [burnCaptions, setBurnCaptions] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const handleStartExport = () => {
    setIsExporting(true);
    setProgress(0);
    setIsCompleted(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          setIsCompleted(true);
          return 100;
        }
        return prev + 15;
      });
    }, 250);
  };

  const handleDownload = () => {
    // Generate a downloadable text/json asset placeholder representing the exported clip package
    const data = JSON.stringify({
      cutCraftExport: {
        title,
        resolution,
        aspectRatio,
        fps,
        format,
        burnedCaptions: burnCaptions,
        engine: 'Presetly CutCraft Studio NVENC AV1',
        timestamp: new Date().toISOString()
      }
    }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '_')}_export.json`;
    a.click();
    URL.revokeObjectURL(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0A1230] border border-[#1d356c] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden text-xs text-[#F4F7FF]">
        {/* Header */}
        <div className="p-4 bg-[#050817] border-b border-[#14234b] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-[#39F56A]" />
            <h3 className="font-bold text-sm text-white">Export Video Project</h3>
          </div>
          <button onClick={onClose} className="text-[#9BAFD0] hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div>
            <div className="text-[10px] text-[#9BAFD0] uppercase tracking-wider">Project Title</div>
            <div className="font-semibold text-sm text-white mt-0.5 truncate">{title}</div>
            <div className="text-[11px] text-[#9BAFD0] font-mono mt-0.5">
              Duration: {duration} · Aspect Ratio: {aspectRatio}
            </div>
          </div>

          {/* Format & Resolution options */}
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-medium text-[#9BAFD0] block mb-1.5">Output Format</label>
              <div className="grid grid-cols-3 gap-2">
                {(['mp4', 'webm', 'gif'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setFormat(fmt)}
                    className={`py-2 px-3 rounded-lg border font-mono font-bold text-xs uppercase transition-all cursor-pointer ${
                      format === fmt
                        ? 'bg-[#162B53] border-[#39F56A] text-[#39F56A]'
                        : 'bg-[#101D40] border-[#1d356c] text-[#9BAFD0]'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-medium text-[#9BAFD0] block mb-1.5">Resolution</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '1080p', label: '1080p Full HD', badge: 'Recommended' },
                  { id: '4k', label: '4K Ultra HD', badge: 'RTX Super' },
                  { id: '720p', label: '720p HD', badge: 'Fast Web' },
                ].map((res) => (
                  <button
                    key={res.id}
                    onClick={() => setResolution(res.id as any)}
                    className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                      resolution === res.id
                        ? 'bg-[#162B53] border-[#39F56A] text-white'
                        : 'bg-[#101D40] border-[#1d356c] text-[#9BAFD0]'
                    }`}
                  >
                    <div className="font-semibold text-xs">{res.label}</div>
                    <div className="text-[9px] text-[#39F56A] font-mono mt-0.5">{res.badge}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-medium text-[#9BAFD0] block mb-1.5">Framerate</label>
              <div className="grid grid-cols-2 gap-2">
                {[60, 30].map((frameRate) => (
                  <button
                    key={frameRate}
                    onClick={() => setFps(frameRate as any)}
                    className={`py-2 px-3 rounded-lg border font-mono text-xs transition-all cursor-pointer ${
                      fps === frameRate
                        ? 'bg-[#162B53] border-[#00D9FF] text-[#00D9FF] font-bold'
                        : 'bg-[#101D40] border-[#1d356c] text-[#9BAFD0]'
                    }`}
                  >
                    {frameRate} FPS {frameRate === 60 ? '(Ultra Smooth)' : '(Standard)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Captions switch */}
            <div className="p-3 rounded-xl bg-[#101D40] border border-[#1d356c] flex items-center justify-between">
              <div>
                <div className="font-semibold text-xs text-white">Burn Captions Directly into Video</div>
                <div className="text-[10px] text-[#9BAFD0]">Styles and animations are permanently baked into the pixels</div>
              </div>
              <button
                onClick={() => setBurnCaptions(!burnCaptions)}
                className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                  burnCaptions ? 'bg-[#39F56A]' : 'bg-[#162B53]'
                }`}
              >
                <span 
                  className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    burnCaptions ? 'translate-x-4' : 'translate-x-0'
                  }`} 
                />
              </button>
            </div>

            {/* NVIDIA Acceleration badge */}
            <div className="p-2.5 rounded-lg bg-[#050817] border border-[#39F56A]/30 text-[10px] text-[#9BAFD0] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-[#39F56A]" />
                <span>NVIDIA NVENC Dual AV1 Hardware Acceleration active</span>
              </div>
              <span className="font-mono text-[#39F56A] font-bold">~180 FPS</span>
            </div>
          </div>

          {/* Exporting Progress */}
          {isExporting && (
            <div className="space-y-2 p-3 rounded-xl bg-[#050817] border border-[#1d356c]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#F4F7FF] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#39F56A] animate-pulse" />
                  Rendering Video Frames...
                </span>
                <span className="font-mono text-[#39F56A] font-bold">{progress}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-[#101D40] overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#39F56A] to-[#00D9FF] transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-[10px] text-[#9BAFD0] font-mono">
                Applying karaoke caption highlight sync...
              </div>
            </div>
          )}

          {isCompleted && (
            <div className="p-3 rounded-xl bg-[#101D40] border border-[#39F56A]/50 text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-[#39F56A] font-bold text-xs">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Video Render Complete!</span>
              </div>
              <p className="text-[10px] text-[#9BAFD0]">Ready for TikTok, Reels, YouTube Shorts, and Instagram.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#050817] border-t border-[#14234b] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs text-[#9BAFD0] hover:text-white transition-colors"
          >
            Cancel
          </button>

          {!isCompleted ? (
            <button
              onClick={handleStartExport}
              disabled={isExporting}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#39F56A] hover:bg-[#31e05e] text-[#050817] font-bold text-xs transition-all shadow-[0_0_15px_rgba(57,245,106,0.3)] active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Zap className="w-4 h-4 stroke-[2.5]" />
              <span>{isExporting ? 'Encoding with NVENC...' : 'Start Render'}</span>
            </button>
          ) : (
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#00D9FF] hover:bg-[#00c2e6] text-[#050817] font-bold text-xs transition-all shadow-[0_0_15px_rgba(0,217,255,0.4)] active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Download Media Package</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
