import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Bell, 
  Sparkles, 
  SlidersHorizontal, 
  Video, 
  Scissors, 
  Image as ImageIcon,
  Check,
  ChevronDown,
  Wand2,
  GraduationCap
} from 'lucide-react';
import { NavigationPage } from '../../types';

interface HeaderProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  onOpenCommandPalette: () => void;
  onOpenOnboarding: () => void;
  rightInspectorOpen: boolean;
  onToggleRightInspector: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenCommandPalette,
  onOpenOnboarding,
  rightInspectorOpen,
  onToggleRightInspector,
}) => {
  const [createDropdownOpen, setCreateDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="h-14 border-b border-[#203B70] bg-[#0D1B46] px-4 flex items-center justify-between gap-4 z-30 select-none">
      {/* Brand Zone */}
      <div className="flex items-center gap-3 shrink-0">
        <button 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
        >
          {/* Custom CutCraft Logo: Cutting blade + Play triangle + AI node */}
          <div className="relative w-8 h-8 rounded-lg bg-[#112653] border border-[#203B70] flex items-center justify-center shadow-[0_0_15px_rgba(57,231,95,0.2)] group-hover:border-[#39E75F]/60 transition-all">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#39E75F]" fill="currentColor">
              <path d="M4 4 L14 4 L9 12 L14 20 L4 20 Z" fill="#39E75F" opacity="0.9" />
              <polygon points="12,7 20,12 12,17" fill="#00D9FF" />
              <circle cx="17" cy="6" r="2" fill="#8B5CFF" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-[#F5F8FF] group-hover:text-white transition-colors">
                CutCraft
              </span>
              <span className="text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-[#183566] border border-[#203B70] text-[#39E75F]">
                MADE BY PRESETLY
              </span>
            </div>
            <p className="text-[10px] text-[#A8BEDF] leading-none hidden sm:block">
              Create Beyond Limits
            </p>
          </div>
        </button>
      </div>

      {/* Global Search / Command Bar */}
      <div className="flex-1 max-w-md hidden md:block">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#112653] hover:bg-[#183566] border border-[#203B70] text-xs text-[#A8BEDF] transition-colors group cursor-pointer shadow-inner"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[#A8BEDF] group-hover:text-[#39E75F] transition-colors" />
            <span>Search tools, templates, academy...</span>
          </div>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#183566] border border-[#203B70] text-[#A8BEDF]">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Action Zone */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Onboarding / Tutorial guide */}
        <button
          onClick={onOpenOnboarding}
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#A8BEDF] hover:text-[#F5F8FF] rounded-md transition-colors cursor-pointer"
          title="Creator Onboarding Wizard"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#39E75F]" />
          <span>New Creator Guide</span>
        </button>

        {/* Create New Dropdown */}
        <div className="relative">
          <button
            onClick={() => setCreateDropdownOpen(!createDropdownOpen)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#39E75F] hover:bg-[#32d854] text-[#00002A] font-bold text-xs transition-all shadow-[0_0_15px_rgba(57,231,95,0.35)] active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Create New</span>
            <ChevronDown className="w-3 h-3 stroke-[2.5]" />
          </button>

          {createDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setCreateDropdownOpen(false)} 
              />
              <div className="absolute right-0 mt-2 w-60 rounded-xl bg-[#0D1B46] border border-[#203B70] shadow-2xl p-1.5 z-50 text-xs">
                <div className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#A8BEDF]">
                  Start A Project
                </div>

                <button
                  onClick={() => {
                    onNavigate('wizard');
                    setCreateDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-[#F5F8FF] hover:bg-[#112653] hover:text-[#39E75F] transition-colors"
                >
                  <Wand2 className="w-4 h-4 text-[#39E75F]" />
                  <div>
                    <div className="font-semibold text-[#39E75F]">First Video Wizard</div>
                    <div className="text-[10px] text-[#A8BEDF]">Step-by-step beginner guide</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onNavigate('smart-clips');
                    setCreateDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-[#F5F8FF] hover:bg-[#112653] hover:text-[#39E75F] transition-colors"
                >
                  <Scissors className="w-4 h-4 text-[#39E75F]" />
                  <div>
                    <div className="font-medium">Smart Clips (Long to Short)</div>
                    <div className="text-[10px] text-[#A8BEDF]">AI highlights & 9:16 auto-captions</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onNavigate('ai-video');
                    setCreateDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-[#F5F8FF] hover:bg-[#112653] hover:text-[#00D9FF] transition-colors"
                >
                  <Video className="w-4 h-4 text-[#00D9FF]" />
                  <div>
                    <div className="font-medium">Generate AI Video</div>
                    <div className="text-[10px] text-[#A8BEDF]">Text or image prompt to video</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onNavigate('image-studio');
                    setCreateDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-[#F5F8FF] hover:bg-[#112653] hover:text-[#8B5CFF] transition-colors"
                >
                  <ImageIcon className="w-4 h-4 text-[#8B5CFF]" />
                  <div>
                    <div className="font-medium">YouTube Thumbnail Studio</div>
                    <div className="text-[10px] text-[#A8BEDF]">High-CTR layout & badges</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onNavigate('editor');
                    setCreateDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-[#F5F8FF] hover:bg-[#112653] hover:text-[#39E75F] transition-colors"
                >
                  <Plus className="w-4 h-4 text-[#39E75F]" />
                  <div>
                    <div className="font-medium">Blank Video Timeline</div>
                    <div className="text-[10px] text-[#A8BEDF]">Multi-track timeline editor</div>
                  </div>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="w-8 h-8 rounded-lg bg-[#112653] border border-[#203B70] flex items-center justify-center text-[#A8BEDF] hover:text-[#F5F8FF] hover:border-[#39E75F] transition-colors relative cursor-pointer"
            title="System Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#39E75F] ring-2 ring-[#0D1B46]" />
          </button>

          {notificationsOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setNotificationsOpen(false)} 
              />
              <div className="absolute right-0 mt-2 w-72 rounded-xl bg-[#0D1B46] border border-[#203B70] shadow-2xl p-3 z-50 text-xs">
                <div className="flex items-center justify-between border-b border-[#203B70] pb-2 mb-2">
                  <span className="font-semibold text-[#F5F8FF]">Notifications</span>
                  <span className="text-[10px] text-[#39E75F] font-mono">Presetly Engine</span>
                </div>
                <div className="space-y-2">
                  <div className="p-2 rounded bg-[#112653] border border-[#203B70]">
                    <div className="flex items-center gap-1.5 text-[#39E75F] font-medium text-[11px]">
                      <Check className="w-3 h-3" />
                      <span>NVIDIA Studio Driver Ready</span>
                    </div>
                    <p className="text-[10px] text-[#A8BEDF] mt-0.5">
                      NVENC AV1 acceleration active for instant export.
                    </p>
                  </div>
                  <div className="p-2 rounded bg-[#112653] border border-[#203B70]">
                    <div className="flex items-center gap-1.5 text-[#00D9FF] font-medium text-[11px]">
                      <Sparkles className="w-3 h-3" />
                      <span>Creator Academy & Mentor Active</span>
                    </div>
                    <p className="text-[10px] text-[#A8BEDF] mt-0.5">
                      New interactive learning paths and AI mentor are ready.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Toggle Right Inspector */}
        <button
          onClick={onToggleRightInspector}
          className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
            rightInspectorOpen 
              ? 'bg-[#112653] border-[#39E75F] text-[#39E75F]' 
              : 'bg-[#112653]/60 border-[#203B70] text-[#A8BEDF] hover:text-[#F5F8FF]'
          }`}
          title="Toggle System & Clip Inspector Panel"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>

        {/* User profile avatar */}
        <div className="flex items-center gap-2 pl-1 border-l border-[#203B70]">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#39E75F] to-[#00D9FF] p-[1.5px] cursor-pointer">
            <div className="w-full h-full rounded-full bg-[#0D1B46] flex items-center justify-center text-[11px] font-bold text-[#39E75F]">
              P
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
