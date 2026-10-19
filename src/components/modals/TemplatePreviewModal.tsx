import React from 'react';
import { 
  X, 
  Play, 
  Sparkles, 
  Layers, 
  Clock, 
  Check, 
  ArrowRight,
  Share2,
  Bookmark
} from 'lucide-react';
import { TemplateItem } from '../../types';

interface TemplatePreviewModalProps {
  template: TemplateItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUseTemplate: (template: TemplateItem) => void;
}

export const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  template,
  isOpen,
  onClose,
  onUseTemplate,
}) => {
  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#0A1230] border border-[#1d356c] shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden text-xs text-[#F4F7FF]">
        {/* Header */}
        <div className="p-4 bg-[#050817] border-b border-[#14234b] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#162B53] text-[#39F56A] border border-[#39F56A]/30">
              {template.category}
            </span>
            <span className="text-[#9BAFD0] text-xs">Template Preview</span>
          </div>
          <button onClick={onClose} className="text-[#9BAFD0] hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Visual Showcase */}
          <div className="relative rounded-xl overflow-hidden bg-[#050817] border border-[#1d356c] aspect-video md:aspect-[9/12] flex items-center justify-center group shadow-inner">
            <img 
              src={template.thumbnailUrl} 
              alt={template.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Scrim and animated caption simulation */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4">
              <div className="p-2.5 rounded-lg bg-[#050817]/85 border border-[#39F56A]/40 backdrop-blur-sm text-center">
                <span className="text-white font-extrabold text-sm drop-shadow">
                  STOP SCROLLING: <span className="text-[#39F56A]">WATCH THIS</span>
                </span>
                <div className="text-[10px] text-[#00D9FF] font-mono mt-0.5">
                  Preset: {template.captionStyle.replace('-', ' ').toUpperCase()}
                </div>
              </div>
            </div>

            <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-white border border-white/10 flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#39F56A]" />
              <span>{template.duration}</span>
            </div>
          </div>

          {/* Details & Specifications */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                {template.title}
              </h2>
              <p className="text-xs text-[#9BAFD0] mt-1.5 leading-relaxed">
                {template.description}
              </p>

              {/* Specs */}
              <div className="space-y-2 mt-4 pt-4 border-t border-[#14234b]">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#9BAFD0]">Aspect Ratio</span>
                  <span className="font-mono font-semibold text-white">{template.aspectRatio}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#9BAFD0]">Caption Preset</span>
                  <span className="font-semibold text-[#39F56A]">{template.captionStyle}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#9BAFD0]">Ideal Platforms</span>
                  <span className="text-[#00D9FF]">Reels · Shorts · TikTok</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#9BAFD0]">Included Tracks</span>
                  <span className="text-white">Video, Subtitle, SFX Track</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {template.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-[#101D40] text-[#9BAFD0] border border-[#1d356c]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-4 border-t border-[#14234b]">
              <button
                onClick={() => {
                  onUseTemplate(template);
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#39F56A] hover:bg-[#31e05e] text-[#050817] font-bold text-xs transition-all shadow-[0_0_20px_rgba(57,245,106,0.35)] active:scale-95 cursor-pointer"
              >
                <span>Use This Template</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="flex items-center gap-2">
                <button 
                  onClick={onClose}
                  className="flex-1 py-2 rounded-lg bg-[#101D40] hover:bg-[#162B53] text-[#9BAFD0] hover:text-white transition-colors text-center"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
