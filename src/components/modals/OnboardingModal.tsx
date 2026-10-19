import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  Youtube, 
  Video, 
  Gamepad2, 
  Mic, 
  GraduationCap, 
  TrendingUp, 
  Wand2, 
  ArrowRight, 
  X,
  Cpu,
  Layers
} from 'lucide-react';
import { NavigationPage } from '../../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFinish: (targetPage: NavigationPage) => void;
}

const CREATOR_TYPES = [
  { id: 'youtuber', title: 'YouTuber', desc: 'Long-form videos & high-CTR thumbnails', icon: Youtube },
  { id: 'short-form', title: 'Short-Form Creator', desc: 'TikTok, Instagram Reels & YouTube Shorts', icon: Video },
  { id: 'gamer', title: 'Gamer / Streamer', desc: 'Highlight montages & reaction clips', icon: Gamepad2 },
  { id: 'podcaster', title: 'Podcaster', desc: 'Speaker switching & karaoke captions', icon: Mic },
  { id: 'student', title: 'Student / Educator', desc: 'Lecture summaries & tutorials', icon: GraduationCap },
  { id: 'marketer', title: 'Business & Marketer', desc: 'Product ads & brand social reels', icon: TrendingUp },
];

const CREATION_GOALS = [
  { id: 'smart-clips', title: 'Turn Long Video into Short Clips', target: 'smart-clips' as NavigationPage, desc: 'Upload podcast or lecture -> Get 5 viral clips' },
  { id: 'ai-video', title: 'Generate AI Video from Text', target: 'ai-video' as NavigationPage, desc: 'Prompt to cinema-grade video sequences' },
  { id: 'captions', title: 'Add Trending Video Captions', target: 'editor' as NavigationPage, desc: '12 viral creator styles with glowing keywords' },
  { id: 'thumbnails', title: 'Create YouTube Thumbnails', target: 'image-studio' as NavigationPage, desc: 'High-CTR badge overlays & background generation' },
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onFinish,
}) => {
  const [step, setStep] = useState(1);
  const [selectedCreator, setSelectedCreator] = useState('short-form');
  const [selectedGoal, setSelectedGoal] = useState<NavigationPage>('smart-clips');
  const [mode, setMode] = useState<'beginner' | 'advanced'>('beginner');
  const [gpuBoost, setGpuBoost] = useState(true);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onFinish(selectedGoal);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0A1230] border border-[#1d356c] shadow-[0_0_60px_rgba(57,245,106,0.15)] overflow-hidden text-xs text-[#F4F7FF]">
        {/* Header Bar */}
        <div className="p-4 bg-[#050817] border-b border-[#14234b] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#101D40] border border-[#39F56A]/40 flex items-center justify-center text-[#39F56A]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-[#F4F7FF]">Welcome to CutCraft</h2>
              <p className="text-[10px] text-[#9BAFD0]">MADE BY PRESETLY · 1-Minute Creator Setup</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#9BAFD0] hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Track */}
        <div className="h-1 bg-[#101D40]">
          <div 
            className="h-full bg-gradient-to-r from-[#39F56A] to-[#00D9FF] transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Body Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-semibold uppercase text-[#39F56A] tracking-wider">Step 1 of 4</span>
                <h3 className="text-base font-bold text-white mt-1">What kind of creator are you?</h3>
                <p className="text-xs text-[#9BAFD0] mt-0.5">CutCraft tailors its timeline, presets, and AI tools to your workflow.</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-2">
                {CREATOR_TYPES.map((creator) => {
                  const Icon = creator.icon;
                  const isSelected = selectedCreator === creator.id;
                  return (
                    <button
                      key={creator.id}
                      onClick={() => setSelectedCreator(creator.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#162B53] border-[#39F56A] shadow-[0_0_15px_rgba(57,245,106,0.2)]'
                          : 'bg-[#101D40] border-[#1d356c] hover:border-[#2b4c8c]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-[#39F56A]' : 'text-[#9BAFD0]'}`} />
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#39F56A]" />}
                      </div>
                      <div className="font-semibold text-xs text-white">{creator.title}</div>
                      <div className="text-[10px] text-[#9BAFD0] mt-0.5">{creator.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-semibold uppercase text-[#39F56A] tracking-wider">Step 2 of 4</span>
                <h3 className="text-base font-bold text-white mt-1">What do you want to create first?</h3>
                <p className="text-xs text-[#9BAFD0] mt-0.5">Pick your priority to jump directly into the workspace.</p>
              </div>

              <div className="space-y-2 pt-2">
                {CREATION_GOALS.map((goal) => {
                  const isSelected = selectedGoal === goal.target;
                  return (
                    <button
                      key={goal.id}
                      onClick={() => setSelectedGoal(goal.target)}
                      className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#162B53] border-[#39F56A] shadow-[0_0_15px_rgba(57,245,106,0.2)]'
                          : 'bg-[#101D40] border-[#1d356c] hover:border-[#2b4c8c]'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-xs text-white">{goal.title}</div>
                        <div className="text-[10px] text-[#9BAFD0] mt-0.5">{goal.desc}</div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#39F56A] bg-[#39F56A]' : 'border-[#1d356c]'}`}>
                        {isSelected && <Check className="w-3 h-3 text-[#050817] stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-semibold uppercase text-[#39F56A] tracking-wider">Step 3 of 4</span>
                <h3 className="text-base font-bold text-white mt-1">Choose your workspace style</h3>
                <p className="text-xs text-[#9BAFD0] mt-0.5">You can switch modes anytime in the top bar.</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setMode('beginner')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    mode === 'beginner'
                      ? 'bg-[#162B53] border-[#39F56A] shadow-[0_0_15px_rgba(57,245,106,0.2)]'
                      : 'bg-[#101D40] border-[#1d356c]'
                  }`}
                >
                  <div className="font-semibold text-xs text-white flex items-center gap-1.5">
                    <Wand2 className="w-4 h-4 text-[#39F56A]" />
                    <span>Beginner Friendly</span>
                  </div>
                  <p className="text-[10px] text-[#9BAFD0] mt-1.5 leading-relaxed">
                    Automated clipping, 1-click caption presets, and guided AI suggestions. Ideal for fast content creation.
                  </p>
                </button>

                <button
                  onClick={() => setMode('advanced')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    mode === 'advanced'
                      ? 'bg-[#162B53] border-[#00D9FF] shadow-[0_0_15px_rgba(0,217,255,0.2)]'
                      : 'bg-[#101D40] border-[#1d356c]'
                  }`}
                >
                  <div className="font-semibold text-xs text-white flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#00D9FF]" />
                    <span>Pro Studio</span>
                  </div>
                  <p className="text-[10px] text-[#9BAFD0] mt-1.5 leading-relaxed">
                    Full multi-track timeline, keyframing, raw spectrograms, and manual split/slip editing controls.
                  </p>
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-semibold uppercase text-[#39F56A] tracking-wider">Step 4 of 4</span>
                <h3 className="text-base font-bold text-white mt-1">Hardware & AI Acceleration</h3>
                <p className="text-xs text-[#9BAFD0] mt-0.5">Presetly detects your graphics card and sets optimal rendering.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#101D40] border border-[#1d356c] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#050817] border border-[#39F56A]/40 flex items-center justify-center text-[#39F56A]">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-white">NVIDIA Hardware Acceleration</div>
                      <div className="text-[10px] text-[#9BAFD0]">NVENC AV1 60fps & RTX Super Resolution</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setGpuBoost(!gpuBoost)}
                    className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                      gpuBoost ? 'bg-[#39F56A]' : 'bg-[#162B53]'
                    }`}
                  >
                    <span 
                      className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                        gpuBoost ? 'translate-x-5' : 'translate-x-0'
                      }`} 
                    />
                  </button>
                </div>

                <div className="p-2 rounded bg-[#0A1230] text-[10px] text-[#39F56A] flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>NVIDIA RTX 4090 detected. Local processing is activated for 100% private transcription.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#050817] border-t border-[#14234b] flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-lg text-xs text-[#9BAFD0] hover:text-white hover:bg-[#101D40] transition-colors"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#39F56A] hover:bg-[#31e05e] text-[#050817] font-bold text-xs transition-all shadow-[0_0_15px_rgba(57,245,106,0.3)] active:scale-95 cursor-pointer"
          >
            <span>{step === 4 ? 'Launch CutCraft Studio' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
