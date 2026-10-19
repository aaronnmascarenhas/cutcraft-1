import React, { useState } from 'react';
import { 
  Home, 
  Sparkles, 
  Film, 
  Scissors, 
  Video, 
  Image as ImageIcon, 
  LayoutTemplate, 
  FolderKanban, 
  Database, 
  Cpu, 
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Bot,
  Wand2,
  Lightbulb,
  CheckCircle,
  TrendingUp,
  Package,
  Search,
  Briefcase,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { NavigationPage } from '../../types';

interface SidebarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
}

interface NavItem {
  id: NavigationPage;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  tag?: string;
}

const MAIN_NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'ai-studio', label: 'AI Studio', icon: Sparkles, tag: 'Tools' },
  { id: 'editor', label: 'Video Editor', icon: Film },
  { id: 'smart-clips', label: 'Smart Clips', icon: Scissors, tag: 'Viral' },
  { id: 'ai-video', label: 'AI Video Gen', icon: Video, tag: 'Veo' },
  { id: 'image-studio', label: 'Image & Thumbnails', icon: ImageIcon },
  { id: 'templates', label: 'Templates', icon: LayoutTemplate },
  { id: 'projects', label: 'My Projects', icon: FolderKanban },
  { id: 'assets', label: 'Asset Library', icon: Database },
  { id: 'nvidia-lab', label: 'NVIDIA Lab', icon: Cpu, tag: 'RTX' },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const LEARN_GROW_ITEMS: NavItem[] = [
  { id: 'academy', label: 'Creator Academy', icon: GraduationCap, tag: 'Learn' },
  { id: 'mentor', label: 'AI Creator Mentor', icon: Bot, tag: 'AI' },
  { id: 'wizard', label: 'First Video Wizard', icon: Wand2, tag: 'Guide' },
  { id: 'idea-lab', label: 'Creator Idea Lab', icon: Lightbulb, tag: 'Hooks' },
  { id: 'coach', label: 'AI Video Coach', icon: CheckCircle, tag: 'Audit' },
  { id: 'progress', label: 'Creator Progress', icon: TrendingUp, tag: 'Skills' },
  { id: 'starter-kits', label: 'Free Starter Kits', icon: Package, tag: 'Free' },
  { id: 'tool-finder', label: 'AI Tool Finder', icon: Search },
  { id: 'portfolio', label: 'Creator Portfolio', icon: Briefcase },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const [expanded, setExpanded] = useState(false);
  const [learnGroupOpen, setLearnGroupOpen] = useState(true);

  const isLearnActive = LEARN_GROW_ITEMS.some(item => item.id === currentPage);

  return (
    <aside 
      className={`h-[calc(100vh-3.5rem-1.75rem)] bg-[#0D1B46] border-r border-[#203B70] flex flex-col justify-between transition-all duration-200 z-20 shrink-0 select-none ${
        expanded ? 'w-60' : 'w-16'
      }`}
    >
      {/* Navigation item cluster */}
      <div className="p-2 flex flex-col gap-1 overflow-y-auto no-scrollbar">
        {/* Core Studio Navigation Section */}
        <div className="space-y-0.5">
          {MAIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                title={!expanded ? item.label : undefined}
                className={`relative flex items-center gap-3 px-3 py-2 rounded-xl font-medium text-xs transition-all duration-150 group cursor-pointer w-full text-left ${
                  isActive
                    ? 'bg-[#112653] text-[#F5F8FF] shadow-[0_0_15px_rgba(57,231,95,0.2)] border border-[#39E75F]/40'
                    : 'text-[#A8BEDF] hover:text-[#F5F8FF] hover:bg-[#183566]/40 border border-transparent'
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute left-1 top-2 bottom-2 w-1 rounded-full bg-[#39E75F] shadow-[0_0_8px_#39E75F]" />
                )}

                <div className="flex items-center justify-center shrink-0">
                  <Icon 
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-[#39E75F] stroke-[2.2]' : 'text-[#A8BEDF] group-hover:text-white'
                    }`} 
                  />
                </div>

                {expanded && (
                  <div className="flex-1 flex items-center justify-between overflow-hidden text-left">
                    <span className="truncate whitespace-nowrap text-xs">{item.label}</span>
                    {item.tag && (
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-[#183566] text-[#A8BEDF] border border-[#203B70] shrink-0">
                        {item.tag}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Separator & LEARN & GROW Expandable Group */}
        <div className="pt-2 mt-1 border-t border-[#203B70]/70">
          {expanded ? (
            <button
              onClick={() => setLearnGroupOpen(!learnGroupOpen)}
              className="w-full flex items-center justify-between px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider text-[#A8BEDF] hover:text-[#F5F8FF] transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#39E75F]" />
                <span>Learn & Grow</span>
              </div>
              {learnGroupOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          ) : (
            <div className="w-full h-px bg-[#203B70]/60 my-1" />
          )}

          {(learnGroupOpen || !expanded) && (
            <div className="space-y-0.5 mt-1">
              {LEARN_GROW_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    title={!expanded ? item.label : undefined}
                    className={`relative flex items-center gap-3 px-3 py-2 rounded-xl font-medium text-xs transition-all duration-150 group cursor-pointer w-full text-left ${
                      isActive
                        ? 'bg-[#112653] text-[#F5F8FF] shadow-[0_0_15px_rgba(57,231,95,0.2)] border border-[#39E75F]/40'
                        : 'text-[#A8BEDF] hover:text-[#F5F8FF] hover:bg-[#183566]/40 border border-transparent'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-1 top-2 bottom-2 w-1 rounded-full bg-[#39E75F] shadow-[0_0_8px_#39E75F]" />
                    )}

                    <div className="flex items-center justify-center shrink-0">
                      <Icon 
                        className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                          isActive ? 'text-[#39E75F] stroke-[2.2]' : 'text-[#A8BEDF] group-hover:text-white'
                        }`} 
                      />
                    </div>

                    {expanded && (
                  <div className="flex-1 flex items-center justify-between overflow-hidden text-left">
                    <span className="truncate whitespace-nowrap text-xs">{item.label}</span>
                    {item.tag && (
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-[#183566] text-[#A8BEDF] border border-[#203B70] shrink-0">
                        {item.tag}
                      </span>
                    )}
                  </div>
                )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Collapse/Expand Toggle at bottom */}
      <div className="p-2 border-t border-[#203B70] bg-[#0D1B46]">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-[#A8BEDF] hover:text-white hover:bg-[#112653]/60 transition-colors text-xs cursor-pointer"
          title={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {expanded ? (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-[11px] font-medium">Collapse Sidebar</span>
            </>
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>
    </aside>
  );
};
