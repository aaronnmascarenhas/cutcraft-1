import React, { useState } from 'react';
import { 
  Wand2, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Film, 
  Scissors, 
  Video, 
  Upload, 
  Sparkles, 
  Play, 
  Type, 
  Layers
} from 'lucide-react';
import { AspectRatio, CaptionPreset, ClipSegment, NavigationPage } from '../types';
import { CAPTION_PRESETS, PODCAST_IMAGE, GAMING_IMAGE, CINEMATIC_IMAGE } from '../data/mockData';

interface FirstVideoWizardPageProps {
  onFinishWizard: (clip: ClipSegment, captionPreset: CaptionPreset) => void;
  onNavigate: (page: NavigationPage) => void;
}

export const FirstVideoWizardPage: React.FC<FirstVideoWizardPageProps> = ({
  onFinishWizard,
  onNavigate,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Wizard state
  const [targetPlatform, setTargetPlatform] = useState('YouTube Short / Reels');
  const [sourceType, setSourceType] = useState<'sample' | 'upload' | 'ai_prompt' | 'template'>('sample');
  const [sampleType, setSampleType] = useState<'podcast' | 'gaming' | 'cinematic'>('podcast');
  const [aiPrompt, setAiPrompt] = useState('A sleek futuristic creative studio with neon lighting');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('viral-green');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('9:16');
  const [projectTitle, setProjectTitle] = useState('My First Viral Short');

  const selectedPreset = CAPTION_PRESETS.find(p => p.id === selectedPresetId) || CAPTION_PRESETS[0];

  const getSourcePreview = () => {
    if (sampleType === 'gaming') return GAMING_IMAGE;
    if (sampleType === 'cinematic') return CINEMATIC_IMAGE;
    return PODCAST_IMAGE;
  };

  const handleComplete = () => {
    const newClip: ClipSegment = {
      id: `wizard-${Date.now()}`,
      title: projectTitle,
      startTime: 0,
      endTime: 30,
      duration: '00:30',
      score: 97,
      hookText: 'Stop scrolling! Here is the secret...',
      aspectRatio,
      transcriptExcerpt: 'Stop scrolling! Here is the secret that completely changed my content workflow in 2026.',
      previewUrl: getSourcePreview(),
    };
    onFinishWizard(newClip, selectedPreset);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-4xl mx-auto text-[#F5F8FF]">
      {/* Wizard Header */}
      <div className="space-y-1 text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#112653] border border-[#203B70] text-[#39E75F] text-xs font-semibold">
          <Wand2 className="w-3.5 h-3.5" />
          <span>CutCraft Guided Setup</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">
          First Video Project Wizard
        </h1>
        <p className="text-xs text-[#A8BEDF]">
          Follow 5 simple steps to set up your video, captions, and layout without technical confusion.
        </p>
      </div>

      {/* Progress Track */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono text-[#A8BEDF]">
          <span>Step {currentStep} of 5</span>
          <span className="text-[#39E75F] font-bold">
            {currentStep === 1 && 'Target Format'}
            {currentStep === 2 && 'Media Source'}
            {currentStep === 3 && 'Caption Style'}
            {currentStep === 4 && 'Aspect & Settings'}
            {currentStep === 5 && 'Preview & Launch'}
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-[#0D1B46] border border-[#203B70] overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#39E75F] to-[#00D9FF] transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Wizard Card Body */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#0D1B46] border border-[#203B70] space-y-6 shadow-xl">
        {/* Step 1: Choose What to Create */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-white">1. What kind of video are you making?</h2>
              <p className="text-xs text-[#A8BEDF] mt-0.5">Select your primary content destination.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              {[
                { id: 'YouTube Short / Reels', title: 'YouTube Short / Reel', desc: 'Fast vertical 9:16 video under 60 seconds' },
                { id: 'TikTok Video', title: 'TikTok Video', desc: 'High energy vertical storytelling' },
                { id: 'Long-Form YouTube', title: 'YouTube Video', desc: '16:9 landscape tutorial or discussion' },
                { id: 'Podcast Clip', title: 'Podcast Clip', desc: 'Dual-speaker conversation with subtitles' },
                { id: 'AI-Generated Scene', title: 'AI-Generated Video', desc: 'Cinematic visual sequence from a text prompt' },
                { id: 'Product Showcase', title: 'Product Advertisement', desc: 'Sleek promo reel for social e-commerce' },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => setTargetPlatform(fmt.id)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    targetPlatform === fmt.id
                      ? 'bg-[#183566] border-[#39E75F] shadow-[0_0_15px_rgba(57,231,95,0.25)]'
                      : 'bg-[#112653] border-[#203B70] hover:border-[#39E75F]/40'
                  }`}
                >
                  <div className="font-semibold text-xs text-white">{fmt.title}</div>
                  <div className="text-[10px] text-[#A8BEDF] mt-1">{fmt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Choose the Source */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-white">2. Where is your video footage coming from?</h2>
              <p className="text-xs text-[#A8BEDF] mt-0.5">You can use your own video or start instantly with demo creator footage.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setSourceType('sample')}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  sourceType === 'sample' 
                    ? 'bg-[#183566] border-[#39E75F] shadow-sm' 
                    : 'bg-[#112653] border-[#203B70] hover:border-[#39E75F]/40'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#39E75F] mb-2" />
                <div className="font-semibold text-xs text-white">Use Sample Footage</div>
                <div className="text-[10px] text-[#A8BEDF] mt-1">Instant practice with professional 4K footage.</div>
              </button>

              <button
                onClick={() => setSourceType('upload')}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  sourceType === 'upload' 
                    ? 'bg-[#183566] border-[#39E75F] shadow-sm' 
                    : 'bg-[#112653] border-[#203B70] hover:border-[#39E75F]/40'
                }`}
              >
                <Upload className="w-4 h-4 text-[#00D9FF] mb-2" />
                <div className="font-semibold text-xs text-white">Upload Your Video</div>
                <div className="text-[10px] text-[#A8BEDF] mt-1">Drop an MP4 or MOV file from your computer.</div>
              </button>

              <button
                onClick={() => setSourceType('ai_prompt')}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  sourceType === 'ai_prompt' 
                    ? 'bg-[#183566] border-[#39E75F] shadow-sm' 
                    : 'bg-[#112653] border-[#203B70] hover:border-[#39E75F]/40'
                }`}
              >
                <Video className="w-4 h-4 text-[#8B5CFF] mb-2" />
                <div className="font-semibold text-xs text-white">AI Video Prompt</div>
                <div className="text-[10px] text-[#A8BEDF] mt-1">Generate raw video from a descriptive prompt.</div>
              </button>
            </div>

            {sourceType === 'sample' && (
              <div className="p-4 rounded-xl bg-[#00002A] border border-[#203B70] space-y-2">
                <span className="text-xs font-semibold text-white block">Choose Sample Scene:</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'podcast', label: 'Podcast Discussion (Lex AI)' },
                    { id: 'gaming', label: 'Cyberpunk Gaming Action' },
                    { id: 'cinematic', label: 'Nordic Peak Landscape' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSampleType(s.id as any)}
                      className={`p-2 rounded-lg text-xs font-medium border text-center transition-colors cursor-pointer ${
                        sampleType === s.id ? 'bg-[#183566] border-[#39E75F] text-[#39E75F]' : 'border-[#203B70] text-[#A8BEDF]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {sourceType === 'ai_prompt' && (
              <div className="p-4 rounded-xl bg-[#00002A] border border-[#203B70] space-y-2">
                <label className="text-xs font-semibold text-white block">Prompt Description:</label>
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#0D1B46] border border-[#203B70] text-xs text-white focus:outline-none focus:border-[#39E75F]"
                />
              </div>
            )}
          </div>
        )}

        {/* Step 3: Choose Visual Style & Caption Preset */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-white">3. Pick your caption preset style</h2>
              <p className="text-xs text-[#A8BEDF] mt-0.5">Captions are automatically synchronized to dialogue.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {CAPTION_PRESETS.slice(0, 6).map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedPresetId(preset.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedPresetId === preset.id
                      ? 'bg-[#183566] border-[#39E75F] shadow-[0_0_15px_rgba(57,231,95,0.25)]'
                      : 'bg-[#112653] border-[#203B70] hover:border-[#39E75F]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{preset.name}</span>
                    <div 
                      className="w-3.5 h-3.5 rounded-full border border-black/40"
                      style={{ backgroundColor: preset.highlightColor }}
                    />
                  </div>
                  <div className="text-[10px] text-[#A8BEDF] mt-1 font-mono line-clamp-1">
                    "{preset.samplePhrase}"
                  </div>
                  <div className="mt-2 text-[9px] text-[#39E75F] font-mono">
                    {preset.tag} · {preset.animationStyle}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Aspect Ratio & Name */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-white">4. Project details & Aspect ratio</h2>
              <p className="text-xs text-[#A8BEDF] mt-0.5">Name your project and select your canvas dimensions.</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-white block mb-1">Project Name</label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#00002A] border border-[#203B70] text-xs text-white focus:border-[#39E75F] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white block mb-1">Canvas Aspect Ratio</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['9:16', '16:9', '1:1'] as AspectRatio[]).map((ar) => (
                    <button
                      key={ar}
                      onClick={() => setAspectRatio(ar)}
                      className={`p-3 rounded-xl border text-center font-mono font-bold text-xs cursor-pointer transition-all ${
                        aspectRatio === ar ? 'bg-[#183566] border-[#39E75F] text-[#39E75F]' : 'bg-[#112653] border-[#203B70] text-[#A8BEDF]'
                      }`}
                    >
                      {ar} {ar === '9:16' ? '(Shorts/Reels)' : ar === '16:9' ? '(YouTube)' : '(Instagram)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Preview & Launch */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-white">5. Ready to create your first masterpiece!</h2>
              <p className="text-xs text-[#A8BEDF] mt-0.5">Review your configured setup and jump right into the CutCraft editor.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="relative rounded-xl overflow-hidden aspect-[9/12] max-h-72 mx-auto bg-black border border-[#203B70] shadow-xl flex items-center justify-center">
                <img src={getSourcePreview()} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3">
                  <div className="p-2 rounded-lg bg-[#00002A]/90 border border-[#39E75F]/40 text-center">
                    <span 
                      className="font-black text-xs uppercase"
                      style={{ color: selectedPreset.highlightColor }}
                    >
                      STOP SCROLLING!
                    </span>
                    <p className="text-[10px] text-white">Watch this trick...</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-[#00002A] border border-[#203B70] flex justify-between">
                  <span className="text-[#A8BEDF]">Format:</span>
                  <span className="font-semibold text-white">{targetPlatform}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#00002A] border border-[#203B70] flex justify-between">
                  <span className="text-[#A8BEDF]">Caption Preset:</span>
                  <span className="font-semibold text-[#39E75F]">{selectedPreset.name}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#00002A] border border-[#203B70] flex justify-between">
                  <span className="text-[#A8BEDF]">Aspect Ratio:</span>
                  <span className="font-mono text-white">{aspectRatio}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#00002A] border border-[#203B70] flex justify-between">
                  <span className="text-[#A8BEDF]">Hardware Acceleration:</span>
                  <span className="font-mono text-[#39E75F]">NVIDIA NVENC Active</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-[#203B70]">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs text-[#A8BEDF] hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : <div />}

          {currentStep < 5 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#39E75F] hover:bg-[#32d854] text-[#00002A] font-bold text-xs transition-all shadow-[0_0_15px_rgba(57,231,95,0.3)] active:scale-95 cursor-pointer"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#39E75F] hover:bg-[#32d854] text-[#00002A] font-extrabold text-xs transition-all shadow-[0_0_20px_rgba(57,231,95,0.4)] active:scale-95 cursor-pointer"
            >
              <span>Open in CutCraft Editor</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
