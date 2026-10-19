import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Check, 
  Download, 
  ArrowRight, 
  Sparkles, 
  Type, 
  LayoutTemplate, 
  Image as ImageIcon, 
  Video, 
  Volume2, 
  Sliders
} from 'lucide-react';
import { NavigationPage, StarterKitItem } from '../types';
import { STARTER_KITS } from '../data/mockData';

interface FreeStarterKitsPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const FreeStarterKitsPage: React.FC<FreeStarterKitsPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const CATEGORIES = [
    { id: 'all', label: 'All Kits' },
    { id: 'captions', label: 'Caption Packs' },
    { id: 'templates', label: 'Video Templates' },
    { id: 'thumbnails', label: 'Thumbnail Layouts' },
    { id: 'prompts', label: 'AI Video Prompts' },
    { id: 'audio', label: 'Sound FX & Audio' },
    { id: 'grading', label: 'Color Presets' },
  ];

  const filtered = STARTER_KITS.filter((kit) => {
    const matchesCat = selectedCategory === 'all' || kit.category === selectedCategory;
    const matchesSearch = 
      kit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kit.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleDownloadKit = (kit: StarterKitItem) => {
    // Generate JSON download asset
    const data = JSON.stringify({
      cutCraftStarterKit: {
        title: kit.title,
        category: kit.category,
        format: kit.format,
        license: '100% Free for Commercial & Personal Creator Use',
        engine: 'Presetly CutCraft Studio v1.5.0'
      }
    }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${kit.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setCopiedId(kit.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto text-[#F5F8FF]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#112653] border border-[#203B70] text-[#39E75F] text-xs font-semibold mb-2">
            <Package className="w-3.5 h-3.5 text-[#39E75F]" />
            <span>Presetly Free Creator Vault</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Free Starter Kits & Creative Assets
          </h1>
          <p className="text-xs md:text-sm text-[#A8BEDF] mt-1 max-w-2xl">
            100% free creator resources tested for high retention. Connect presets and templates directly to your CutCraft timeline.
          </p>
        </div>

        {/* Search */}
        <div className="w-full sm:w-64 relative">
          <Search className="w-4 h-4 text-[#A8BEDF] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search starter kits..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0D1B46] border border-[#203B70] text-xs text-white placeholder-[#7895BE] focus:border-[#39E75F] focus:outline-none"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#39E75F] text-[#00002A] shadow-[0_0_12px_rgba(57,231,95,0.3)] font-bold'
                : 'bg-[#0D1B46] text-[#A8BEDF] hover:text-white border border-[#203B70]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Kits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((kit) => (
          <div
            key={kit.id}
            className="p-5 rounded-2xl bg-[#0D1B46] border border-[#203B70] hover:border-[#39E75F]/60 transition-all flex flex-col justify-between shadow-lg group"
          >
            <div>
              {/* Top Row */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#112653] text-[#39E75F] border border-[#203B70]">
                  {kit.format}
                </span>
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-[#39E75F]/20 text-[#39E75F] border border-[#39E75F]/40">
                  {kit.free ? 'FREE FOREVER' : 'PRO'}
                </span>
              </div>

              {/* Thumbnail frame if exists */}
              {kit.previewUrl && (
                <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-black border border-[#203B70]">
                  <img src={kit.previewUrl} alt={kit.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#00002A]/85 backdrop-blur-md text-[9px] font-mono text-[#39E75F]">
                    {kit.badge}
                  </div>
                </div>
              )}

              <h3 className="font-bold text-sm text-white group-hover:text-[#39E75F] transition-colors">
                {kit.title}
              </h3>
              <p className="text-xs text-[#A8BEDF] mt-1.5 leading-relaxed">
                {kit.description}
              </p>
              <div className="text-[11px] text-[#7895BE] mt-2 font-mono">
                {kit.details}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-4 border-t border-[#203B70] mt-4">
              <button
                onClick={() => onNavigate(kit.actionTarget)}
                className="flex-1 py-2 rounded-xl bg-[#39E75F] hover:bg-[#32d854] text-[#00002A] font-bold text-xs transition-all shadow-[0_0_12px_rgba(57,231,95,0.25)] active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{kit.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>

              <button
                onClick={() => handleDownloadKit(kit)}
                className="p-2 rounded-xl bg-[#00002A] hover:bg-[#112653] text-[#A8BEDF] hover:text-white border border-[#203B70] transition-colors cursor-pointer"
                title="Download asset descriptor"
              >
                {copiedId === kit.id ? <Check className="w-4 h-4 text-[#39E75F]" /> : <Download className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
