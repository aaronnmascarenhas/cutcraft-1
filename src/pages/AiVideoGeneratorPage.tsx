import React, { useState } from 'react';
import { 
  Video, 
  Sparkles, 
  Upload, 
  Play, 
  Download, 
  RefreshCw, 
  Wand2, 
  Camera, 
  Sun, 
  Palette, 
  Layers, 
  Check, 
  ArrowRight,
  Film
} from 'lucide-react';
import { AspectRatio } from '../types';
import { CINEMATIC_IMAGE, GAMING_IMAGE, HERO_IMAGE, SAMPLE_VIDEO_PROMPTS } from '../data/mockData';
import { requestCreatorAssist } from '../services/aiService';

interface AiVideoGeneratorPageProps {
  onOpenExportModal: (title: string, aspectRatio: AspectRatio) => void;
  onSendToEditor: (title: string, previewUrl: string, aspectRatio: AspectRatio) => void;
}

export const AiVideoGeneratorPage: React.FC<AiVideoGeneratorPageProps> = ({
  onOpenExportModal,
  onSendToEditor,
}) => {
  const [workflow, setWorkflow] = useState<'text' | 'image'>('text');
  const [prompt, setPrompt] = useState(
    'A neon-lit cyberpunk samurai walking down a rain-slicked Tokyo alley, anamorphic lens flare, slow camera push-in, 8k cinematic photorealism'
  );
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [duration, setDuration] = useState<'5s' | '10s'>('5s');
  const [visualStyle, setVisualStyle] = useState('Cinematic');
  const [cameraMotion, setCameraMotion] = useState('Slow Push In');
  const [lighting, setLighting] = useState('Volumetric Rim Light');

  // Generation status
  const [isGenerating, setIsGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [currentStepText, setCurrentStepText] = useState('');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(GAMING_IMAGE);
  const [isEnhancingPrompt, setIsEnhancingPrompt] = useState(false);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);

  const STYLES = [
    'Cinematic', 'Realistic', 'Anime', '3D Render', 'Documentary', 'Cyberpunk', 'Commercial', 'Gaming'
  ];

  const MOTIONS = [
    'Slow Push In', 'Orbit 360', 'Dolly Left to Right', 'Drone Flyover', 'Static Camera', 'Handheld Organic'
  ];

  const LIGHTINGS = [
    'Volumetric Rim Light', 'Golden Hour Sunset', 'Moody Cyber Neon', 'High-Key Studio Diffused', 'Dramatic Chiaroscuro'
  ];

  const handleEnhancePromptWithAi = async () => {
    setIsEnhancingPrompt(true);
    const result = await requestCreatorAssist('prompt_enhancer', prompt);
    if (result.success && result.data?.enhancedPrompt) {
      setPrompt(result.data.enhancedPrompt);
      if (result.data.cameraMotion) setCameraMotion(result.data.cameraMotion);
      if (result.data.lightingMood) setLighting(result.data.lightingMood);
    }
    setIsEnhancingPrompt(false);
  };

  const handleGenerateVideo = () => {
    setIsGenerating(true);
    setGenProgress(0);
    setCurrentStepText('Analyzing prompt semantic vectors...');

    const interval = setInterval(() => {
      setGenProgress((prev) => {
        if (prev === 20) setCurrentStepText('Synthesizing initial frame latch...');
        if (prev === 45) setCurrentStepText('Applying camera movement interpolation...');
        if (prev === 75) setCurrentStepText('Enhancing temporal coherence with NVENC...');
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          // Alternate visual outputs
          setGeneratedVideoUrl(visualStyle === 'Cinematic' ? CINEMATIC_IMAGE : GAMING_IMAGE);
          return 100;
        }
        return prev + 10;
      });
    }, 280);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setReferenceImage(url);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto text-[#F4F7FF]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <Video className="w-7 h-7 text-[#00D9FF]" />
            <span>AI Video Generator</span>
          </h1>
          <p className="text-xs text-[#9BAFD0] mt-1">
            Transform text prompts and reference photos into cinema-grade video sequences with precision camera motion.
          </p>
        </div>

        {/* Workflow Switcher (Text-to-Video vs Image-to-Video) */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0A1230] border border-[#162B53]">
          <button
            onClick={() => setWorkflow('text')}
            className={`px-4 py-1.5 rounded-lg font-semibold text-xs transition-colors cursor-pointer ${
              workflow === 'text'
                ? 'bg-[#162B53] text-[#00D9FF] shadow-sm'
                : 'text-[#9BAFD0] hover:text-white'
            }`}
          >
            Text to Video
          </button>
          <button
            onClick={() => setWorkflow('image')}
            className={`px-4 py-1.5 rounded-lg font-semibold text-xs transition-colors cursor-pointer ${
              workflow === 'image'
                ? 'bg-[#162B53] text-[#00D9FF] shadow-sm'
                : 'text-[#9BAFD0] hover:text-white'
            }`}
          >
            Image to Video
          </button>
        </div>
      </div>

      {/* Main Grid: Prompt Studio on Left, Video Output on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Prompt Studio & Controls */}
        <div className="lg:col-span-7 space-y-5">
          {/* Reference Image slot if Image to Video is selected */}
          {workflow === 'image' && (
            <div className="p-4 rounded-2xl bg-[#0A1230] border border-[#162B53] space-y-3">
              <label className="text-xs font-semibold text-white block">
                Starting Reference Frame
              </label>
              <div className="flex items-center gap-4">
                <div className="w-28 h-20 rounded-xl bg-[#050817] border border-[#1d356c] overflow-hidden flex items-center justify-center relative">
                  {referenceImage ? (
                    <img src={referenceImage} alt="Ref" className="w-full h-full object-cover" />
                  ) : (
                    <Upload className="w-6 h-6 text-[#9BAFD0]" />
                  )}
                </div>
                <div>
                  <label className="px-4 py-2 rounded-xl bg-[#162B53] hover:bg-[#1f3b73] text-xs font-medium text-white transition-colors cursor-pointer inline-block">
                    Choose Image
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                  <p className="text-[10px] text-[#9BAFD0] mt-1">
                    Upload a high-res photo to use as the first frame of your video.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Prompt Box */}
          <div className="p-4 rounded-2xl bg-[#0A1230] border border-[#162B53] space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-white">Video Prompt</label>
              <button
                onClick={handleEnhancePromptWithAi}
                disabled={isEnhancingPrompt}
                className="flex items-center gap-1.5 text-xs text-[#39F56A] hover:underline disabled:opacity-50 cursor-pointer"
              >
                <Wand2 className={`w-3.5 h-3.5 ${isEnhancingPrompt ? 'animate-spin' : ''}`} />
                <span>{isEnhancingPrompt ? 'Enhancing...' : 'Enhance with Gemini AI'}</span>
              </button>
            </div>

            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your scene, camera movement, character actions, and atmosphere..."
              className="w-full p-3 rounded-xl bg-[#050817] border border-[#1d356c] text-xs text-white placeholder-[#9BAFD0] focus:border-[#00D9FF] focus:outline-none leading-relaxed"
            />

            {/* Clickable Sample Prompts */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-semibold uppercase text-[#9BAFD0] tracking-wider block">
                Inspire Me (Click to Load):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SAMPLE_VIDEO_PROMPTS.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPrompt(sample)}
                    className="text-[10px] px-2.5 py-1 rounded-lg bg-[#101D40] hover:bg-[#162B53] text-[#9BAFD0] hover:text-[#00D9FF] border border-[#1d356c] truncate max-w-xs transition-colors cursor-pointer text-left"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Parameters & Controls Grid */}
          <div className="p-5 rounded-2xl bg-[#0A1230] border border-[#162B53] space-y-4">
            <h3 className="font-bold text-xs text-white uppercase tracking-wider">
              Generation Parameters
            </h3>

            {/* Aspect Ratio & Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] text-[#9BAFD0] block mb-1">Aspect Ratio</label>
                <div className="grid grid-cols-4 gap-1 p-0.5 rounded-lg bg-[#050817] border border-[#1d356c]">
                  {(['16:9', '9:16', '1:1', '4:5'] as AspectRatio[]).map((ar) => (
                    <button
                      key={ar}
                      onClick={() => setAspectRatio(ar)}
                      className={`py-1 rounded font-mono text-[10px] font-semibold transition-colors cursor-pointer ${
                        aspectRatio === ar
                          ? 'bg-[#162B53] text-[#00D9FF]'
                          : 'text-[#9BAFD0] hover:text-white'
                      }`}
                    >
                      {ar}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] text-[#9BAFD0] block mb-1">Duration</label>
                <div className="grid grid-cols-2 gap-1 p-0.5 rounded-lg bg-[#050817] border border-[#1d356c]">
                  {(['5s', '10s'] as const).map((dur) => (
                    <button
                      key={dur}
                      onClick={() => setDuration(dur)}
                      className={`py-1 rounded font-mono text-[10px] font-semibold transition-colors cursor-pointer ${
                        duration === dur
                          ? 'bg-[#162B53] text-[#39F56A]'
                          : 'text-[#9BAFD0] hover:text-white'
                      }`}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Style Selector */}
            <div>
              <label className="text-[11px] text-[#9BAFD0] flex items-center gap-1.5 mb-1.5">
                <Palette className="w-3.5 h-3.5 text-[#00D9FF]" />
                <span>Visual Style</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {STYLES.map((style) => (
                  <button
                    key={style}
                    onClick={() => setVisualStyle(style)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      visualStyle === style
                        ? 'bg-[#162B53] border-[#00D9FF] text-[#00D9FF]'
                        : 'bg-[#101D40] border-[#1d356c] text-[#9BAFD0] hover:text-white'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Camera Motion Selector */}
            <div>
              <label className="text-[11px] text-[#9BAFD0] flex items-center gap-1.5 mb-1.5">
                <Camera className="w-3.5 h-3.5 text-[#39F56A]" />
                <span>Camera Movement</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {MOTIONS.map((motion) => (
                  <button
                    key={motion}
                    onClick={() => setCameraMotion(motion)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      cameraMotion === motion
                        ? 'bg-[#162B53] border-[#39F56A] text-[#39F56A]'
                        : 'bg-[#101D40] border-[#1d356c] text-[#9BAFD0] hover:text-white'
                    }`}
                  >
                    {motion}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Action Button */}
            <button
              onClick={handleGenerateVideo}
              disabled={isGenerating}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#39F56A] hover:opacity-95 text-[#050817] font-extrabold text-sm transition-all shadow-[0_0_25px_rgba(0,217,255,0.4)] active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Sparkles className="w-4 h-4 stroke-[3]" />
              <span>{isGenerating ? 'Synthesizing Video Frames...' : 'Generate AI Video'}</span>
            </button>
          </div>
        </div>

        {/* Right: Output Canvas & Results Gallery */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-[#0A1230] border border-[#162B53] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">Generated Video Output</span>
              <span className="text-[10px] font-mono text-[#00D9FF]">{aspectRatio} · {duration}</span>
            </div>

            {/* Canvas Preview Frame */}
            <div className="relative rounded-xl overflow-hidden bg-black border border-[#233f75] shadow-2xl aspect-video flex items-center justify-center group">
              {isGenerating ? (
                <div className="p-6 text-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-[#00D9FF] animate-spin mx-auto" />
                  <div className="font-bold text-sm text-white">{genProgress}% Complete</div>
                  <p className="text-xs text-[#9BAFD0] font-mono">{currentStepText}</p>
                  <div className="w-48 h-1.5 rounded-full bg-[#101D40] mx-auto overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#00D9FF] to-[#39F56A] transition-all duration-300" 
                      style={{ width: `${genProgress}%` }}
                    />
                  </div>
                </div>
              ) : generatedVideoUrl ? (
                <>
                  <img 
                    src={generatedVideoUrl} 
                    alt="AI Video Result" 
                    className="w-full h-full object-cover"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-[#00D9FF] text-[#050817] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                  {/* Style tag badge */}
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[9px] font-mono text-[#00D9FF] border border-[#00D9FF]/30">
                    {visualStyle} · {cameraMotion}
                  </div>
                </>
              ) : (
                <div className="text-center text-xs text-[#9BAFD0] p-6">
                  Ready to generate. Hit "Generate AI Video" to begin.
                </div>
              )}
            </div>

            {/* Quick Actions for Generated Video */}
            {generatedVideoUrl && !isGenerating && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => onSendToEditor('AI Video Project', generatedVideoUrl, aspectRatio)}
                  className="py-2.5 px-3 rounded-xl bg-[#162B53] hover:bg-[#203c73] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Film className="w-3.5 h-3.5 text-[#39F56A]" />
                  <span>Open in Editor</span>
                </button>

                <button
                  onClick={() => onOpenExportModal('AI Video Generation', aspectRatio)}
                  className="py-2.5 px-3 rounded-xl bg-[#00D9FF] hover:bg-[#00c2e6] text-[#050817] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(0,217,255,0.3)]"
                >
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Download MP4</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
