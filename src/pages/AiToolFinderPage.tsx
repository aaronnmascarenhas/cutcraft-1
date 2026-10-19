import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  SlidersHorizontal,
  Zap
} from 'lucide-react';
import { AiToolCatalogItem, NavigationPage } from '../types';
import { AI_TOOL_CATALOG } from '../data/mockData';

interface AiToolFinderPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const AiToolFinderPage: React.FC<AiToolFinderPageProps> = ({ onNavigate }) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'local' | 'cloud'>('all');

  const filtered = AI_TOOL_CATALOG.filter((item) => {
    const matchesFilter = 
      activeFilter === 'all' || 
      (activeFilter === 'local' && item.processingType.includes('Local')) ||
      (activeFilter === 'cloud' && item.processingType.includes('Cloud'));

    const matchesQuery = 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.goal.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.popularSearch.some(s => s.toLowerCase().includes(query.toLowerCase()));

    return matchesFilter && matchesQuery;
  });

  const SUGGESTED_QUERIES = [
    'Remove background',
    'Generate subtitles',
    'Create an AI video',
    'Reframe landscape to portrait',
    '4K video upscale',
    'Make YouTube thumbnail',
    'Run AI models locally'
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto text-[#F5F8FF]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#112653] border border-[#203B70] text-[#39E75F] text-xs font-semibold mb-2">
            <Search className="w-3.5 h-3.5 text-[#39E75F]" />
            <span>AI Tool Directory</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            AI Tool Finder & Workflow Matcher
          </h1>
          <p className="text-xs md:text-sm text-[#A8BEDF] mt-1 max-w-2xl">
            Type what you want to achieve and discover the exact built-in CutCraft tool, hardware requirements, and processing method.
          </p>
        </div>

        {/* Local vs Cloud Filters */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0D1B46] border border-[#203B70]">
          {(['all', 'local', 'cloud'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveFilter(mode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                activeFilter === mode 
                  ? 'bg-[#183566] text-[#39E75F] shadow-sm' 
                  : 'text-[#A8BEDF] hover:text-white'
              }`}
            >
              {mode === 'all' ? 'All Tools' : mode === 'local' ? '100% Local GPU' : 'Cloud AI'}
            </button>
          ))}
        </div>
      </div>

      {/* Large Smart Search Input */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-5 h-5 text-[#39E75F] absolute left-4 top-3.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to accomplish? (e.g. 'reframe podcast to shorts', 'upscale video', 'generate subtitles')..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#0D1B46] border border-[#203B70] text-sm text-white placeholder-[#7895BE] focus:border-[#39E75F] focus:outline-none shadow-lg"
          />
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] text-[#A8BEDF] mr-1">Popular goals:</span>
          {SUGGESTED_QUERIES.map((sQuery, qIdx) => (
            <button
              key={qIdx}
              onClick={() => setQuery(sQuery)}
              className="text-[11px] px-2.5 py-1 rounded-md bg-[#0D1B46] hover:bg-[#112653] text-[#A8BEDF] hover:text-white border border-[#203B70] transition-colors cursor-pointer"
            >
              {sQuery}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((tool) => (
          <div
            key={tool.id}
            className="p-5 rounded-2xl bg-[#0D1B46] border border-[#203B70] hover:border-[#39E75F]/60 transition-all flex flex-col justify-between shadow-lg space-y-3 group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#112653] text-[#39E75F] border border-[#203B70]">
                  {tool.category}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  tool.processingType.includes('Local')
                    ? 'bg-[#183566] text-[#39E75F] border-[#39E75F]/40'
                    : 'bg-[#183566] text-[#00D9FF] border-[#00D9FF]/40'
                }`}>
                  {tool.processingType}
                </span>
              </div>

              <h3 className="font-bold text-sm text-white group-hover:text-[#39E75F] transition-colors">
                {tool.name}
              </h3>
              <p className="text-xs text-[#A8BEDF] mt-1 leading-relaxed">
                {tool.goal}
              </p>

              {/* Technical Specifications */}
              <div className="mt-3 p-3 rounded-xl bg-[#00002A] border border-[#203B70] space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-[#A8BEDF]">Inputs:</span>
                  <span className="text-white truncate max-w-xs">{tool.supportedInputs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A8BEDF]">Outputs:</span>
                  <span className="text-[#39E75F] truncate max-w-xs">{tool.supportedOutputs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A8BEDF]">Hardware:</span>
                  <span className="text-[#00D9FF] truncate max-w-xs">{tool.hardwareReq}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate(tool.targetPage)}
                className="w-full py-2.5 rounded-xl bg-[#39E75F] hover:bg-[#32d854] text-[#00002A] font-bold text-xs transition-all shadow-[0_0_12px_rgba(57,231,95,0.25)] active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Launch {tool.name}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
