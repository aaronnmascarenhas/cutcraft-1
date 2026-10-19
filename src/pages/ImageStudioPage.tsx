import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Sparkles, 
  Download, 
  Type, 
  Layers, 
  Upload, 
  RefreshCw, 
  Check, 
  Sliders,
  Maximize2
} from 'lucide-react';
import { AspectRatio } from '../types';
import { HERO_IMAGE, GAMING_IMAGE, CINEMATIC_IMAGE, PODCAST_IMAGE } from '../data/mockData';

export const ImageStudioPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'thumbnail' | 'generator'>('thumbnail');

  // Thumbnail Builder State
  const [thumbnailTitle, setThumbnailTitle] = useState('STOP DOING THIS!');
  const [thumbnailSubtitle, setThumbnailSubtitle] = useState('The 10x Secret Revealed');
  const [selectedBadge, setSelectedBadge] = useState('AI TRICK');
  const [badgeColor, setBadgeColor] = useState('#39F56A');
  const [backgroundType, setBackgroundType] = useState<string>('gaming');
  const [facePosition, setFacePosition] = useState<'right' | 'left' | 'none'>('right');
  const [borderGlow, setBorderGlow] = useState(true);

  // General Image Generator State
  const [prompt, setPrompt] = useState('Futuristic holographic AI creative workstation glowing in dark room, 8k render');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImg, setGeneratedImg] = useState<string>(HERO_IMAGE);

  const getBackgroundUrl = () => {
    if (backgroundType === 'gaming') return GAMING_IMAGE;
    if (backgroundType === 'podcast') return PODCAST_IMAGE;
    if (backgroundType === 'cinematic') return CINEMATIC_IMAGE;
    return HERO_IMAGE;
  };

  const handleDownloadThumbnail = () => {
    // Generate text/json descriptor or download image asset
    const a = document.createElement('a');
    a.href = getBackgroundUrl();
    a.download = `cutcraft_thumbnail_${Date.now()}.jpg`;
    a.click();
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedImg(backgroundType === 'gaming' ? CINEMATIC_IMAGE : GAMING_IMAGE);
    }, 1500);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto text-[#F4F7FF]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <ImageIcon className="w-7 h-7 text-[#8B5CFF]" />
            <span>Image Studio & Thumbnail Creator</span>
          </h1>
          <p className="text-xs text-[#9BAFD0] mt-1">
            Design high-CTR YouTube thumbnails and generate promotional creator artwork in seconds.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0A1230] border border-[#162B53]">
          <button
            onClick={() => setActiveTab('thumbnail')}
            className={`px-4 py-1.5 rounded-lg font-semibold text-xs transition-colors cursor-pointer ${
              activeTab === 'thumbnail' ? 'bg-[#162B53] text-[#39F56A] shadow-sm' : 'text-[#9BAFD0]'
            }`}
          >
            YouTube Thumbnail Studio
          </button>
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-4 py-1.5 rounded-lg font-semibold text-xs transition-colors cursor-pointer ${
              activeTab === 'generator' ? 'bg-[#162B53] text-[#8B5CFF] shadow-sm' : 'text-[#9BAFD0]'
            }`}
          >
            Text to Image Gen
          </button>
        </div>
      </div>

      {activeTab === 'thumbnail' ? (
        /* YouTube Thumbnail Studio */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-4">
            {/* Title & Headline Controls */}
            <div className="p-5 rounded-2xl bg-[#0A1230] border border-[#162B53] space-y-3">
              <h3 className="font-bold text-xs text-white uppercase tracking-wider flex items-center gap-2">
                <Type className="w-3.5 h-3.5 text-[#39F56A]" />
                <span>Text Overlays</span>
              </h3>

              <div>
                <label className="text-[11px] text-[#9BAFD0] block mb-1">Catchy Headline (All Caps)</label>
                <input
                  type="text"
                  value={thumbnailTitle}
                  onChange={(e) => setThumbnailTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#050817] border border-[#1d356c] text-xs font-extrabold text-white focus:border-[#39F56A] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#9BAFD0] block mb-1">Supporting Hook Subtitle</label>
                <input
                  type="text"
                  value={thumbnailSubtitle}
                  onChange={(e) => setThumbnailSubtitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#050817] border border-[#1d356c] text-xs text-[#9BAFD0] focus:border-[#00D9FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] text-[#9BAFD0] block mb-1.5">CTR Attention Badge</label>
                <div className="flex flex-wrap gap-1.5">
                  {['AI TRICK', '10X RESULTS', 'SHOCKING', 'NEW 2026', 'DON\'T MISS'].map((b) => (
                    <button
                      key={b}
                      onClick={() => setSelectedBadge(b)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono transition-colors cursor-pointer ${
                        selectedBadge === b
                          ? 'bg-[#162B53] text-[#39F56A] border border-[#39F56A]'
                          : 'bg-[#101D40] text-[#9BAFD0] border border-[#1d356c]'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Background & Styling Controls */}
            <div className="p-5 rounded-2xl bg-[#0A1230] border border-[#162B53] space-y-3">
              <h3 className="font-bold text-xs text-white uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#00D9FF]" />
                <span>Visual Composition</span>
              </h3>

              <div>
                <label className="text-[11px] text-[#9BAFD0] block mb-1.5">Background Theme</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'gaming', label: 'Cyber City' },
                    { id: 'podcast', label: 'Studio Warm' },
                    { id: 'cinematic', label: 'Nordic Peak' },
                  ].map((bg) => (
                    <button
                      key={bg.id}
                      onClick={() => setBackgroundType(bg.id)}
                      className={`p-2 rounded-xl border text-center text-xs font-medium transition-colors cursor-pointer ${
                        backgroundType === bg.id
                          ? 'bg-[#162B53] border-[#00D9FF] text-white'
                          : 'bg-[#101D40] border-[#1d356c] text-[#9BAFD0]'
                      }`}
                    >
                      {bg.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-[#9BAFD0]">Subtle Green Neon Border</span>
                <button
                  onClick={() => setBorderGlow(!borderGlow)}
                  className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                    borderGlow ? 'bg-[#39F56A]' : 'bg-[#162B53]'
                  }`}
                >
                  <span 
                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                      borderGlow ? 'translate-x-4' : 'translate-x-0'
                    }`} 
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Right: 16:9 Thumbnail Live Canvas */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 rounded-2xl bg-[#0A1230] border border-[#162B53] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">Live YouTube Thumbnail (1280x720)</span>
                <span className="text-[10px] font-mono text-[#39F56A]">High-CTR Layout</span>
              </div>

              {/* The Live Composition Frame */}
              <div 
                className={`relative rounded-xl overflow-hidden aspect-video bg-black shadow-2xl flex items-center justify-center transition-all ${
                  borderGlow ? 'border-2 border-[#39F56A] shadow-[0_0_30px_rgba(57,245,106,0.25)]' : 'border border-[#233f75]'
                }`}
              >
                <img
                  src={getBackgroundUrl()}
                  alt="Thumbnail Canvas"
                  className="w-full h-full object-cover"
                />

                {/* Dark Vignette Scrim on Left for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent pointer-events-none" />

                {/* Badges and Text Overlay */}
                <div className="absolute left-6 top-6 bottom-6 flex flex-col justify-between max-w-sm pointer-events-none z-10">
                  {/* Badge */}
                  <div>
                    <span className="inline-block px-3 py-1 rounded-md bg-[#39F56A] text-[#050817] font-black text-xs uppercase tracking-wider shadow-lg">
                      {selectedBadge}
                    </span>
                  </div>

                  {/* Main Bold Headline */}
                  <div className="space-y-1">
                    <h2 
                      className="font-black text-2xl md:text-3xl text-white tracking-tight uppercase leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,1)]"
                      style={{ WebkitTextStroke: '1px black' }}
                    >
                      {thumbnailTitle}
                    </h2>
                    <p className="font-bold text-xs md:text-sm text-[#00D9FF] drop-shadow-md">
                      {thumbnailSubtitle}
                    </p>
                  </div>

                  <div className="text-[10px] text-white/70 font-mono">
                    CutCraft Studio · YouTube 1080p
                  </div>
                </div>
              </div>

              {/* Download Action */}
              <button
                onClick={handleDownloadThumbnail}
                className="w-full py-3 rounded-xl bg-[#39F56A] hover:bg-[#31e05e] text-[#050817] font-extrabold text-xs transition-all shadow-[0_0_15px_rgba(57,245,106,0.3)] active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>Download High-Resolution Thumbnail</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Text to Image Generator */
        <div className="p-6 rounded-2xl bg-[#0A1230] border border-[#162B53] space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white">Prompt</label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#050817] border border-[#1d356c] text-xs text-white focus:outline-none focus:border-[#8B5CFF]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {(['16:9', '9:16', '1:1'] as AspectRatio[]).map((ar) => (
                <button
                  key={ar}
                  onClick={() => setAspectRatio(ar)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-medium ${
                    aspectRatio === ar ? 'bg-[#162B53] text-[#8B5CFF]' : 'text-[#9BAFD0]'
                  }`}
                >
                  {ar}
                </button>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-6 py-2.5 rounded-xl bg-[#8B5CFF] hover:bg-[#7a4ce6] text-white font-bold text-xs transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isGenerating ? 'Synthesizing...' : 'Generate Image'}
            </button>
          </div>

          <div className="relative rounded-xl overflow-hidden bg-black max-w-xl mx-auto aspect-video border border-[#1d356c]">
            <img src={generatedImg} alt="Generated visual" className="w-full h-full object-cover" />
          </div>
        </div>
      )}
    </div>
  );
};
