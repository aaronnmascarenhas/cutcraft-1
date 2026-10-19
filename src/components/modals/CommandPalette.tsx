import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Scissors, 
  Video, 
  Image as ImageIcon, 
  Type, 
  Film, 
  Cpu, 
  Settings, 
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { NavigationPage } from '../../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: NavigationPage) => void;
}

interface CommandAction {
  id: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  page: NavigationPage;
  subtitle: string;
}

const COMMAND_ACTIONS: CommandAction[] = [
  { id: 'smart-clips', title: 'Convert Long Video to Viral Shorts', category: 'Smart Clips', icon: Scissors, page: 'smart-clips', subtitle: 'Import a podcast or lecture to get 9:16 highlights' },
  { id: 'ai-video', title: 'Generate AI Video with Veo Engine', category: 'AI Studio', icon: Video, page: 'ai-video', subtitle: 'Turn text or starting image into cinematic video' },
  { id: 'video-editor', title: 'Open Video Editor & Timeline', category: 'Editor', icon: Film, page: 'editor', subtitle: 'Multi-track timeline with cut, audio, and captions' },
  { id: 'image-studio', title: 'Create YouTube Thumbnail with Badges', category: 'Image', icon: ImageIcon, page: 'image-studio', subtitle: 'Design high-CTR 16:9 thumbnails with editable text' },
  { id: 'caption-presets', title: 'Explore 12 Viral Caption Presets', category: 'Captions', icon: Type, page: 'editor', subtitle: 'Viral Green, Bold Creator, Neon Cyber, Karaoke' },
  { id: 'academy', title: 'Creator Academy & Masterclasses', category: 'Learning', icon: Sparkles, page: 'academy', subtitle: 'Step-by-step masterclasses for beginner creators' },
  { id: 'mentor', title: 'AI Creator Mentor (Copilot)', category: 'Copilot', icon: Sparkles, page: 'mentor', subtitle: 'Ask questions, get advice, and overcome creative blocks' },
  { id: 'wizard', title: 'First Video Wizard (Guided 5-Step)', category: 'Guide', icon: Sparkles, page: 'wizard', subtitle: 'Create your very first video in 3 minutes' },
  { id: 'idea-lab', title: 'Creator Idea Lab & Viral Hooks', category: 'Ideation', icon: Sparkles, page: 'idea-lab', subtitle: 'Generate viral video ideas, hooks, and script outlines' },
  { id: 'coach', title: 'AI Video Coach & Retention Audit', category: 'Audit', icon: Sparkles, page: 'coach', subtitle: 'Audit hooks, pacing, and caption readability with fixes' },
  { id: 'progress', title: 'Creator Progress & Skill Roadmap', category: 'Skills', icon: Sparkles, page: 'progress', subtitle: 'Track achievements, unlock badges, and grow skills' },
  { id: 'starter-kits', title: 'Free Starter Kits & Asset Packs', category: 'Free Kits', icon: Sparkles, page: 'starter-kits', subtitle: 'Download caption presets, sound FX, LUTs, and templates' },
  { id: 'tool-finder', title: 'AI Tool Finder & Decision Matrix', category: 'Catalog', icon: Search, page: 'tool-finder', subtitle: 'Find the right AI tool by goal, privacy, and GPU support' },
  { id: 'portfolio', title: 'Creator Portfolio & Showreel', category: 'Showcase', icon: Sparkles, page: 'portfolio', subtitle: 'Share your best viral shorts and client reels' },
  { id: 'nvidia-lab', title: 'Open NVIDIA Hardware Acceleration Lab', category: 'Hardware', icon: Cpu, page: 'nvidia-lab', subtitle: 'Monitor RTX 4090 VRAM, CUDA, and TensorRT' },
  { id: 'templates', title: 'Browse 14+ Creator Templates', category: 'Templates', icon: Sparkles, page: 'templates', subtitle: 'Shorts, Reels, Podcasts, Gaming, Tech Reviews' },
  { id: 'settings', title: 'Configure AI Models & Export Defaults', category: 'Settings', icon: Settings, page: 'settings', subtitle: 'Set 4K 60fps NVENC and API preferences' }
];

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = COMMAND_ACTIONS.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#00002A]/85 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0D1B46] border border-[#203B70] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden z-10">
        {/* Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#203B70] bg-[#0D1B46]">
          <Search className="w-5 h-5 text-[#39E75F] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools, Academy, templates, AI prompts, or commands..."
            className="flex-1 bg-transparent text-sm text-[#F5F8FF] placeholder-[#A8BEDF] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="w-6 h-6 rounded flex items-center justify-center text-[#A8BEDF] hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1 no-scrollbar">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#A8BEDF]">
              No actions matching "{query}"
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.page);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#112653] text-left transition-colors group cursor-pointer border border-transparent hover:border-[#39E75F]/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#112653] border border-[#203B70] flex items-center justify-center text-[#39E75F] group-hover:border-[#39E75F] group-hover:text-white transition-colors shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#F5F8FF] group-hover:text-white">
                          {item.title}
                        </span>
                        <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-[#183566] text-[#A8BEDF] font-mono">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#A8BEDF] mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#A8BEDF] group-hover:text-[#39E75F] group-hover:translate-x-1 transition-all shrink-0" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-[#203B70] bg-[#0D1B46] flex items-center justify-between text-[10px] text-[#A8BEDF]">
          <span>Navigation: Select or click to jump</span>
          <span>Press ESC to exit · Presetly Engine</span>
        </div>
      </div>
    </div>
  );
};
