import React, { useState } from 'react';
import { 
  LayoutTemplate, 
  Search, 
  Play, 
  Heart, 
  Clock, 
  ArrowRight, 
  Sparkles,
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import { TemplateItem, AspectRatio } from '../types';
import { CREATOR_TEMPLATES } from '../data/mockData';

interface TemplatesPageProps {
  onSelectTemplate: (template: TemplateItem) => void;
  onPreviewTemplate: (template: TemplateItem) => void;
}

export const TemplatesPage: React.FC<TemplatesPageProps> = ({
  onSelectTemplate,
  onPreviewTemplate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<string[]>(['tpl-1', 'tpl-3']);

  const CATEGORIES = [
    'All',
    'YouTube Shorts',
    'Gaming',
    'Cinematic',
    'Podcasts',
    'Tech Reviews',
    'Instagram Reels',
    'Tutorials',
    'TikTok',
    'Fitness',
    'Motivational',
    'Product Ads',
    'AI-Generated'
  ];

  const filtered = CREATOR_TEMPLATES.filter((tpl) => {
    const matchesCat = selectedCategory === 'All' || tpl.category === selectedCategory;
    const matchesSearch = 
      tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto text-[#F4F7FF]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#162B53] border border-[#00D9FF]/40 text-[#00D9FF] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Presetly Creator Marketplace</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Creator Templates & Caption Styles
          </h1>
          <p className="text-xs md:text-sm text-[#9BAFD0] mt-1">
            Reusable caption styles and high-retention video layouts to apply directly to your next clip.
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-[#9BAFD0] absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates or tags..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0A1230] border border-[#162B53] text-xs text-white placeholder-[#9BAFD0] focus:border-[#39F56A] focus:outline-none"
          />
        </div>
      </div>

      {/* Category Filter Pills (Horizontal scrollable) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#39F56A] text-[#050817] shadow-[0_0_12px_rgba(57,245,106,0.3)]'
                : 'bg-[#0A1230] text-[#9BAFD0] hover:text-white border border-[#162B53]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Template Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((template) => {
          const isFav = favorites.includes(template.id);
          return (
            <div
              key={template.id}
              onClick={() => onPreviewTemplate(template)}
              className="rounded-2xl bg-[#0A1230] border border-[#162B53] hover:border-[#39F56A] overflow-hidden transition-all duration-200 group flex flex-col justify-between shadow-lg hover:shadow-[0_0_20px_rgba(57,245,106,0.15)] cursor-pointer"
            >
              <div>
                {/* Visual Thumbnail Frame */}
                <div className="relative aspect-video bg-[#050817] overflow-hidden">
                  <img
                    src={template.thumbnailUrl}
                    alt={template.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1230] via-transparent to-black/40" />

                  {/* Favorite button */}
                  <button
                    onClick={(e) => toggleFavorite(template.id, e)}
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  {/* Aspect Ratio & Platform Badge */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[9px] font-mono text-[#39F56A] border border-[#39F56A]/30">
                    {template.aspectRatio} · {template.category}
                  </div>

                  {/* Duration */}
                  <div className="absolute bottom-2 right-2.5 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[9px] font-mono text-white flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5 text-[#39F56A]" />
                    <span>{template.duration}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-sm text-white group-hover:text-[#39F56A] transition-colors truncate">
                    {template.title}
                  </h3>
                  <p className="text-xs text-[#9BAFD0] line-clamp-2 leading-relaxed">
                    {template.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {template.tags.map((tag) => (
                      <span key={tag} className="text-[9px] px-2 py-0.5 rounded bg-[#101D40] text-[#9BAFD0]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-4 pt-0 border-t border-[#14234b]/60 flex items-center justify-between gap-2 mt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreviewTemplate(template);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#101D40] hover:bg-[#162B53] text-[11px] font-medium text-[#9BAFD0] hover:text-white transition-colors cursor-pointer"
                >
                  Preview
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTemplate(template);
                  }}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 px-3 rounded-lg bg-[#39F56A] hover:bg-[#31e05e] text-[#050817] font-bold text-xs transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <span>Use Template</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
