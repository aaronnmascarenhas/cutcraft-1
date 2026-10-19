import React, { useState } from 'react';
import { 
  Sparkles, 
  Scissors, 
  Video, 
  Image as ImageIcon, 
  Mic, 
  Type, 
  Zap, 
  Hash, 
  Layers, 
  ArrowRight, 
  Check, 
  Copy, 
  TrendingUp,
  Cpu
} from 'lucide-react';
import { NavigationPage } from '../types';
import { STUDIO_TOOLS } from '../data/mockData';
import { requestCreatorAssist } from '../services/aiService';

interface AiStudioPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const AiStudioPage: React.FC<AiStudioPageProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<'all' | 'video' | 'audio' | 'image' | 'creator'>('all');
  
  // Interactive Creator Assistant workbench state
  const [activeCreatorTool, setActiveCreatorTool] = useState<'title_ideas' | 'hook_generator' | 'captions_hashtags'>('title_ideas');
  const [topic, setTopic] = useState('How I Built a Profitable AI Channel in 30 Days');
  const [tone, setTone] = useState('High Energy');
  const [isLoading, setIsLoading] = useState(false);
  const [assistResults, setAssistResults] = useState<any[] | null>(null);
  const [captionResult, setCaptionResult] = useState<any | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const filteredTools = STUDIO_TOOLS.filter(tool => {
    if (filter === 'all') return true;
    return tool.category === filter;
  });

  const handleRunAiAssist = async () => {
    setIsLoading(true);
    setAssistResults(null);
    setCaptionResult(null);

    const res = await requestCreatorAssist(activeCreatorTool, topic, tone);
    setIsLoading(false);

    if (res.success && res.data) {
      if (Array.isArray(res.data)) {
        setAssistResults(res.data);
      } else {
        setCaptionResult(res.data);
      }
    }
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  return (
    <div className="p-6 md:p-8 space-y-10 max-w-7xl mx-auto text-[#F4F7FF]">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#162B53] border border-[#8B5CFF]/40 text-[#8B5CFF] text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CutCraft AI Creative Suite</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          AI Studio & Creator Workbench
        </h1>
        <p className="text-xs md:text-sm text-[#9BAFD0] mt-1 max-w-2xl leading-relaxed">
          Discover specialized neural models for video clipping, visual enhancement, audio cleanup, and creator copy.
        </p>
      </div>

      {/* Interactive Live AI Assist Workbench (Powered by Gemini) */}
      <section className="p-6 rounded-2xl bg-gradient-to-br from-[#0A1230] via-[#101D40] to-[#050817] border border-[#1d356c] space-y-5 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#39F56A]" />
              <h2 className="text-base font-bold text-white">
                Live Creator Assistant (Gemini 3.8 Flash)
              </h2>
            </div>
            <p className="text-xs text-[#9BAFD0] mt-0.5">
              Generate scroll-stopping video titles, 3-second retention hooks, or viral captions in real time.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 p-0.5 rounded-xl bg-[#050817] border border-[#162B53]">
            <button
              onClick={() => setActiveCreatorTool('title_ideas')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeCreatorTool === 'title_ideas' ? 'bg-[#162B53] text-[#39F56A]' : 'text-[#9BAFD0]'
              }`}
            >
              Viral Titles
            </button>
            <button
              onClick={() => setActiveCreatorTool('hook_generator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeCreatorTool === 'hook_generator' ? 'bg-[#162B53] text-[#00D9FF]' : 'text-[#9BAFD0]'
              }`}
            >
              3s Hooks
            </button>
            <button
              onClick={() => setActiveCreatorTool('captions_hashtags')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeCreatorTool === 'captions_hashtags' ? 'bg-[#162B53] text-[#8B5CFF]' : 'text-[#9BAFD0]'
              }`}
            >
              Captions & Tags
            </button>
          </div>
        </div>

        {/* Input Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your video subject or story angle..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#050817] border border-[#1d356c] text-xs text-white placeholder-[#9BAFD0] focus:border-[#39F56A] focus:outline-none"
            />
          </div>
          <div className="sm:col-span-4 flex gap-2">
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-[#050817] border border-[#1d356c] text-xs text-white focus:outline-none"
            >
              <option value="High Energy">High Energy</option>
              <option value="Curiosity Gap">Curiosity Gap</option>
              <option value="Educational / Pro">Educational / Pro</option>
              <option value="Bold & Controversial">Bold & Provocative</option>
            </select>
            <button
              onClick={handleRunAiAssist}
              disabled={isLoading || !topic.trim()}
              className="px-5 py-2.5 rounded-xl bg-[#39F56A] hover:bg-[#31e05e] text-[#050817] font-bold text-xs transition-all shadow-[0_0_15px_rgba(57,245,106,0.3)] active:scale-95 disabled:opacity-50 whitespace-nowrap cursor-pointer"
            >
              {isLoading ? 'Generating...' : 'Run AI'}
            </button>
          </div>
        </div>

        {/* Live Results Display */}
        {assistResults && (
          <div className="space-y-2 pt-2 border-t border-[#14234b]">
            <span className="text-[10px] font-semibold uppercase text-[#39F56A] tracking-wider block">
              Generated Suggestions:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {assistResults.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#050817] border border-[#1d356c] hover:border-[#39F56A] transition-colors flex items-start justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white">
                        {item.title || item.hook}
                      </span>
                    </div>
                    {item.ctrEstimate && (
                      <div className="flex items-center gap-2 text-[10px] font-mono text-[#9BAFD0]">
                        <span className="text-[#39F56A]">Est. CTR: {item.ctrEstimate}</span>
                        <span>·</span>
                        <span>{item.hookType}</span>
                      </div>
                    )}
                    {item.visualAction && (
                      <p className="text-[10px] text-[#00D9FF]">
                        Visual cue: {item.visualAction}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleCopy(item.title || item.hook, idx)}
                    className="p-1.5 rounded-lg bg-[#101D40] text-[#9BAFD0] hover:text-white hover:bg-[#162B53] transition-colors shrink-0 cursor-pointer"
                    title="Copy to clipboard"
                  >
                    {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-[#39F56A]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {captionResult && (
          <div className="p-4 rounded-xl bg-[#050817] border border-[#1d356c] space-y-3 pt-2">
            <div>
              <span className="text-[10px] font-semibold uppercase text-[#8B5CFF] tracking-wider block">
                Viral Caption & Transcript Hook
              </span>
              <p className="text-xs text-white mt-1 leading-relaxed">{captionResult.caption}</p>
            </div>
            {captionResult.hashtags && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {captionResult.hashtags.map((tag: string, tIdx: number) => (
                  <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded-full bg-[#101D40] text-[#00D9FF] font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Tool Category Filters */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">All AI Tools & Workflows</h2>
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0A1230] border border-[#162B53]">
            {(['all', 'video', 'audio', 'image', 'creator'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                  filter === tab
                    ? 'bg-[#162B53] text-[#39F56A] shadow-sm'
                    : 'text-[#9BAFD0] hover:text-white'
                }`}
              >
                {tab === 'creator' ? 'Creator Copy' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="p-5 rounded-2xl bg-[#0A1230] border border-[#162B53] hover:border-[#39F56A] transition-all group flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#101D40] border border-[#1d356c] flex items-center justify-center text-[#39F56A] group-hover:scale-105 transition-transform">
                    {tool.category === 'video' && <Scissors className="w-5 h-5 text-[#39F56A]" />}
                    {tool.category === 'audio' && <Mic className="w-5 h-5 text-[#00D9FF]" />}
                    {tool.category === 'image' && <ImageIcon className="w-5 h-5 text-[#8B5CFF]" />}
                    {tool.category === 'creator' && <Zap className="w-5 h-5 text-[#39F56A]" />}
                  </div>
                  <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                    tool.badge === 'Local RTX' 
                      ? 'bg-[#101D40] border-[#76B900]/40 text-[#76B900]' 
                      : tool.badge === 'Cloud AI' 
                      ? 'bg-[#101D40] border-[#00D9FF]/40 text-[#00D9FF]' 
                      : 'bg-[#101D40] border-[#39F56A]/40 text-[#39F56A]'
                  }`}>
                    {tool.badge}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-white group-hover:text-[#39F56A] transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-[#9BAFD0] mt-1.5 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#14234b]">
                <button
                  onClick={() => onNavigate(tool.route as NavigationPage)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#101D40] hover:bg-[#162B53] text-xs font-semibold text-[#F4F7FF] group-hover:text-[#39F56A] transition-colors cursor-pointer"
                >
                  <span>Launch Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
