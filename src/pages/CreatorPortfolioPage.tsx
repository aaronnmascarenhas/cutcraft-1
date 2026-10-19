import React, { useState } from 'react';
import { 
  Briefcase, 
  ExternalLink, 
  Share2, 
  Play, 
  Eye, 
  Sparkles, 
  Plus, 
  Check, 
  Copy, 
  ArrowRight, 
  Globe, 
  Lock, 
  Clock, 
  Film, 
  Layers,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { NavigationPage, PortfolioItem, AspectRatio } from '../types';
import { INITIAL_PORTFOLIO, HERO_IMAGE } from '../data/mockData';

interface CreatorPortfolioPageProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenInEditor?: (item: PortfolioItem) => void;
}

export const CreatorPortfolioPage: React.FC<CreatorPortfolioPageProps> = ({
  onNavigate,
  onOpenInEditor,
}) => {
  const [items, setItems] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New item form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('YouTube Shorts');
  const [newAspectRatio, setNewAspectRatio] = useState<AspectRatio>('9:16');
  const [newDescription, setNewDescription] = useState('');
  const [newViewsEstimate, setNewViewsEstimate] = useState('50K views');

  const categories = [
    { id: 'all', label: 'All Showcases' },
    { id: 'YouTube Shorts', label: 'YouTube Shorts' },
    { id: 'Gaming', label: 'Gaming & Twitch' },
    { id: 'Cinematic', label: 'Cinematic & AI' },
  ];

  const filteredItems = items.filter(
    item => filterCategory === 'all' || item.category === filterCategory
  );

  const handleCopyPortfolioLink = () => {
    navigator.clipboard?.writeText?.('https://cutcraft.presetly.com/@creator/portfolio');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleTogglePublic = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, isPublic: !item.isPublic } : item
    ));
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: PortfolioItem = {
      id: `port-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      aspectRatio: newAspectRatio,
      viewsEstimate: newViewsEstimate,
      toolsUsed: ['Smart Clips', 'Presetly Engine', 'CutCraft Editor'],
      thumbnailUrl: HERO_IMAGE,
      description: newDescription || 'Showcase piece crafted with CutCraft AI Creative Studio.',
      isPublic: true,
      completedDate: 'Today',
    };

    setItems(prev => [newItem, ...prev]);
    setNewTitle('');
    setNewDescription('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto text-[#F5F8FF]">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#0D1B46] via-[#112653] to-[#00002A] border border-[#203B70] shadow-xl relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#183566] border border-[#203B70] text-[#39E75F] text-xs font-semibold">
            <Briefcase className="w-3.5 h-3.5 text-[#39E75F]" />
            <span>Presetly Creator Showcase</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Creator Portfolio & Showreel
          </h1>
          <p className="text-xs md:text-sm text-[#A8BEDF] max-w-xl">
            Package your best AI-generated videos, viral short clips, and high-CTR thumbnail designs into a shareable creator showcase for clients, sponsors, and audiences.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10">
          <button
            onClick={handleCopyPortfolioLink}
            className="px-4 py-2.5 rounded-xl bg-[#0D1B46] hover:bg-[#112653] border border-[#203B70] text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm active:scale-98"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4 text-[#39E75F]" />
                <span className="text-[#39E75F]">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-[#39E75F]" />
                <span>Share Public Portfolio</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#39E75F] hover:bg-[#32d854] text-[#00002A] text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(57,231,95,0.3)] active:scale-98"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Showcase Item</span>
          </button>
        </div>
      </div>

      {/* Portfolio Stats & Filter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer whitespace-nowrap ${
                filterCategory === cat.id
                  ? 'bg-[#183566] text-[#39E75F] border-[#39E75F] shadow-sm font-semibold'
                  : 'bg-[#0D1B46] text-[#A8BEDF] border-[#203B70] hover:border-[#39E75F]/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live URL Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0D1B46] border border-[#203B70] text-[11px] text-[#A8BEDF] font-mono">
          <Globe className="w-3.5 h-3.5 text-[#39E75F]" />
          <span>cutcraft.presetly.com/@creator</span>
        </div>
      </div>

      {/* Grid of Portfolio Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group rounded-2xl bg-[#0D1B46] hover:bg-[#112653] border border-[#203B70] hover:border-[#39E75F]/60 transition-all duration-200 overflow-hidden cursor-pointer flex flex-col shadow-lg"
          >
            {/* Visual Thumbnail */}
            <div className="relative aspect-video bg-[#00002A] overflow-hidden">
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00002A] via-transparent to-transparent opacity-80" />

              {/* Aspect Ratio Badge */}
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-[#00002A]/80 backdrop-blur-md border border-[#203B70] text-[10px] font-mono text-[#39E75F]">
                {item.aspectRatio}
              </div>

              {/* Public/Private toggle */}
              <button
                onClick={(e) => handleTogglePublic(item.id, e)}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-[#00002A]/80 backdrop-blur-md border border-[#203B70] text-[#A8BEDF] hover:text-white transition-colors"
                title={item.isPublic ? 'Public Showcase' : 'Private Draft'}
              >
                {item.isPublic ? (
                  <Globe className="w-3.5 h-3.5 text-[#39E75F]" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-[#7895BE]" />
                )}
              </button>

              {/* Metric Overlay */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs font-semibold text-white">
                <span className="flex items-center gap-1 bg-[#112653]/90 backdrop-blur-md px-2 py-0.5 rounded-md border border-[#203B70] text-[11px] text-[#39E75F]">
                  <Eye className="w-3 h-3 text-[#39E75F]" />
                  {item.viewsEstimate}
                </span>
                <span className="text-[10px] text-[#A8BEDF] font-mono">
                  {item.completedDate}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="text-[10px] uppercase font-mono tracking-wider text-[#39E75F] font-bold">
                  {item.category}
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-[#39E75F] transition-colors mt-0.5">
                  {item.title}
                </h3>
                <p className="text-xs text-[#A8BEDF] mt-1.5 line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Tools Used Pills */}
              <div className="space-y-2 pt-2 border-t border-[#203B70]">
                <div className="flex flex-wrap gap-1.5">
                  {item.toolsUsed.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-[#112653] border border-[#203B70] text-[10px] font-mono text-[#A8BEDF]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-[#39E75F] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Inspect Showcase</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[10px] text-[#7895BE]">Presetly Verified</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Preview Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-[#00002A]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0D1B46] border border-[#203B70] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl space-y-5 p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#203B70] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#112653] text-[#39E75F] font-bold border border-[#203B70]">
                    {selectedItem.category}
                  </span>
                  <span className="text-xs text-[#A8BEDF] font-mono">{selectedItem.aspectRatio}</span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1">{selectedItem.title}</h2>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1.5 rounded-xl hover:bg-[#112653] text-[#A8BEDF] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#203B70]">
              <img
                src={selectedItem.thumbnailUrl}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="w-14 h-14 rounded-full bg-[#39E75F] text-[#00002A] flex items-center justify-center shadow-[0_0_20px_rgba(57,231,95,0.4)]">
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#A8BEDF]">Showcase Brief</h4>
              <p className="text-xs md:text-sm text-[#F5F8FF] leading-relaxed">
                {selectedItem.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-[#203B70]">
              {selectedItem.toolsUsed.map((tool, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#112653] text-xs text-[#A8BEDF] font-mono border border-[#203B70]">
                  {tool}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => {
                  setSelectedItem(null);
                  onNavigate('editor');
                }}
                className="px-4 py-2 rounded-xl bg-[#112653] hover:bg-[#183566] text-white text-xs font-semibold cursor-pointer transition-colors border border-[#203B70]"
              >
                Open Project in Editor
              </button>
              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2 rounded-xl bg-[#39E75F] text-[#00002A] text-xs font-bold cursor-pointer hover:bg-[#32d854] transition-colors shadow-[0_0_12px_rgba(57,231,95,0.3)]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#00002A]/85 backdrop-blur-md flex items-center justify-center p-4">
          <form 
            onSubmit={handleAddItem}
            className="bg-[#0D1B46] border border-[#203B70] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between border-b border-[#203B70] pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#39E75F]" />
                <span>Add Showcase to Portfolio</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg hover:bg-[#112653] text-[#A8BEDF] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#A8BEDF] font-medium mb-1">Project Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. 60-Second AI Masterclass Reel"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-[#00002A] border border-[#203B70] text-white focus:outline-none focus:border-[#39E75F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A8BEDF] font-medium mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#00002A] border border-[#203B70] text-white focus:outline-none focus:border-[#39E75F]"
                  >
                    <option value="YouTube Shorts">YouTube Shorts</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Cinematic">Cinematic</option>
                    <option value="Educational">Educational</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A8BEDF] font-medium mb-1">Aspect Ratio</label>
                  <select
                    value={newAspectRatio}
                    onChange={e => setNewAspectRatio(e.target.value as AspectRatio)}
                    className="w-full px-3 py-2 rounded-xl bg-[#00002A] border border-[#203B70] text-white focus:outline-none focus:border-[#39E75F]"
                  >
                    <option value="9:16">9:16 (Vertical)</option>
                    <option value="16:9">16:9 (Landscape)</option>
                    <option value="1:1">1:1 (Square)</option>
                    <option value="4:5">4:5 (Portrait)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#A8BEDF] font-medium mb-1">Views or Retention Metric</label>
                <input
                  type="text"
                  value={newViewsEstimate}
                  onChange={e => setNewViewsEstimate(e.target.value)}
                  placeholder="e.g. 150K views · 88% retention"
                  className="w-full px-3 py-2 rounded-xl bg-[#00002A] border border-[#203B70] text-white focus:outline-none focus:border-[#39E75F]"
                />
              </div>

              <div>
                <label className="block text-[#A8BEDF] font-medium mb-1">Description / Client Goal</label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  placeholder="Highlight key techniques, tools used, or client outcome..."
                  className="w-full px-3 py-2 rounded-xl bg-[#00002A] border border-[#203B70] text-white focus:outline-none focus:border-[#39E75F]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#203B70]">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#112653] hover:bg-[#183566] text-[#A8BEDF] text-xs font-semibold cursor-pointer border border-[#203B70]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#39E75F] hover:bg-[#32d854] text-[#00002A] text-xs font-bold cursor-pointer shadow-[0_0_12px_rgba(57,231,95,0.3)]"
              >
                Publish Showcase
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
