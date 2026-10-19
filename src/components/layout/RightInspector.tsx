import React, { useState } from 'react';
import { 
  DownloadCloud, 
  CheckCircle2, 
  Cpu, 
  ChevronDown, 
  ChevronUp, 
  Sliders, 
  Sparkles, 
  Zap, 
  Monitor, 
  Layers, 
  Type, 
  X,
  RefreshCw
} from 'lucide-react';
import { CaptionPreset, NavigationPage } from '../../types';
import { CAPTION_PRESETS } from '../../data/mockData';

interface RightInspectorProps {
  currentPage: NavigationPage;
  onClose: () => void;
  selectedCaptionPreset?: CaptionPreset;
  onSelectCaptionPreset?: (preset: CaptionPreset) => void;
}

export const RightInspector: React.FC<RightInspectorProps> = ({
  currentPage,
  onClose,
  selectedCaptionPreset,
  onSelectCaptionPreset,
}) => {
  const [activeTab, setActiveTab] = useState<'system' | 'inspector'>(
    currentPage === 'editor' || currentPage === 'smart-clips' ? 'inspector' : 'system'
  );
  const [notesExpanded, setNotesExpanded] = useState(false);
  const [checkingUpdate, setCheckingUpdate] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  const handleCheckUpdates = () => {
    setCheckingUpdate(true);
    setUpdateMessage(null);
    setTimeout(() => {
      setCheckingUpdate(false);
      setUpdateMessage('CutCraft v1.5.0 is the latest build. Presetly AI engine is synchronized.');
    }, 900);
  };

  return (
    <aside className="w-80 h-[calc(100vh-3.5rem-1.75rem)] bg-[#0D1B46] border-l border-[#203B70] flex flex-col z-20 shrink-0 select-none text-xs text-[#F5F8FF] overflow-y-auto no-scrollbar">
      {/* Panel Header & Tabs */}
      <div className="p-3 border-b border-[#203B70] flex items-center justify-between gap-2 bg-[#0D1B46]">
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#112653] border border-[#203B70]">
          <button
            onClick={() => setActiveTab('system')}
            className={`px-2.5 py-1 rounded-md font-medium text-[11px] transition-colors cursor-pointer ${
              activeTab === 'system'
                ? 'bg-[#183566] text-[#39E75F] shadow-sm'
                : 'text-[#A8BEDF] hover:text-white'
            }`}
          >
            Engine & Status
          </button>
          <button
            onClick={() => setActiveTab('inspector')}
            className={`px-2.5 py-1 rounded-md font-medium text-[11px] transition-colors cursor-pointer ${
              activeTab === 'inspector'
                ? 'bg-[#183566] text-[#39E75F] shadow-sm'
                : 'text-[#A8BEDF] hover:text-white'
            }`}
          >
            Clip Inspector
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-6 h-6 rounded flex items-center justify-center text-[#A8BEDF] hover:text-white hover:bg-[#112653] transition-colors cursor-pointer"
          title="Close Inspector"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="p-3.5 space-y-4">
        {activeTab === 'system' ? (
          <>
            {/* App Updates Header Card - Replicating reference screenshots style */}
            <div className="p-3 rounded-xl bg-[#112653] border border-[#203B70] space-y-3">
              <div className="flex items-center justify-between text-[#A8BEDF]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#183566] flex items-center justify-center text-[#39E75F]">
                    <DownloadCloud className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs text-[#F5F8FF]">App Updates</h3>
                    <p className="text-[10px] text-[#A8BEDF]">PRESETLY ENGINE</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#183566] text-[#39E75F] border border-[#203B70]">
                  Stable
                </span>
              </div>

              {/* Version & Architecture Details */}
              <div className="p-2.5 rounded-lg bg-[#0D1B46] border border-[#203B70]">
                <div className="text-[10px] text-[#A8BEDF] uppercase tracking-wider font-semibold">
                  Installed Version
                </div>
                <div className="text-xl font-bold font-mono tracking-tight text-[#F5F8FF] mt-0.5">
                  v1.5.0 <span className="text-xs text-[#A8BEDF] font-normal">(Presetly Architecture)</span>
                </div>
                <p className="text-[10px] text-[#A8BEDF] mt-1">
                  CutCraft Video Caption & AI Clipping Suite
                </p>
              </div>

              {/* Live Status indicator */}
              <div className="flex items-center justify-between text-[11px] py-1 border-t border-[#203B70]">
                <span className="text-[#A8BEDF]">LIVE STATUS</span>
                <span className="flex items-center gap-1.5 font-semibold text-[#39E75F]">
                  <span className="w-2 h-2 rounded-full bg-[#39E75F] shadow-[0_0_8px_#39E75F]" />
                  ACTIVE
                </span>
              </div>
              <p className="text-[10px] text-[#A8BEDF]">
                System Up-to-Date · Verified with CutCraft runtime
              </p>

              {/* Check for updates action */}
              <button
                onClick={handleCheckUpdates}
                disabled={checkingUpdate}
                className="w-full py-2 px-3 rounded-lg bg-[#39E75F] hover:bg-[#32d854] text-[#00002A] font-bold text-xs transition-all shadow-[0_0_12px_rgba(57,231,95,0.3)] flex items-center justify-center gap-1.5 active:scale-98 disabled:opacity-75 cursor-pointer"
              >
                {checkingUpdate ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Synchronizing Engine...</span>
                  </>
                ) : (
                  <span>Check for Updates</span>
                )}
              </button>

              {updateMessage && (
                <div className="p-2 rounded bg-[#0D1B46] border border-[#39E75F]/40 text-[10px] text-[#39E75F] text-center">
                  {updateMessage}
                </div>
              )}

              {/* Expandable release notes */}
              <div className="pt-1">
                <button
                  onClick={() => setNotesExpanded(!notesExpanded)}
                  className="w-full flex items-center justify-between text-[11px] text-[#A8BEDF] hover:text-white transition-colors py-1 cursor-pointer"
                >
                  <span>Release Notes & Details</span>
                  {notesExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {notesExpanded && (
                  <div className="mt-2 p-2.5 rounded-lg bg-[#0D1B46] border border-[#203B70] space-y-1.5 text-[10px] text-[#A8BEDF] font-sans">
                    <p className="text-[#F5F8FF] font-medium">Build 1.5.0 Highlights:</p>
                    <ul className="list-disc pl-3.5 space-y-1">
                      <li>Restored classic dark navy and electric-green theme</li>
                      <li>Added Creator Academy & AI Creator Mentor</li>
                      <li>First Video Wizard for 1-click project launches</li>
                      <li>Creator Idea Lab & AI Video Coach integration</li>
                      <li>Enhanced NVIDIA Lab setup guides & hardware diagnostics</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Hardware Telemetry Card */}
            <div className="p-3 rounded-xl bg-[#112653] border border-[#203B70] space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#F5F8FF]">
                <Cpu className="w-4 h-4 text-[#39E75F]" />
                <span>NVIDIA RTX Telemetry</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-2 rounded bg-[#0D1B46] border border-[#203B70]">
                  <span className="text-[#A8BEDF] block">CUDA Cores</span>
                  <span className="text-sm font-bold font-mono text-[#F5F8FF]">16,384</span>
                </div>
                <div className="p-2 rounded bg-[#0D1B46] border border-[#203B70]">
                  <span className="text-[#A8BEDF] block">Tensor Cores</span>
                  <span className="text-sm font-bold font-mono text-[#00D9FF]">512</span>
                </div>
                <div className="p-2 rounded bg-[#0D1B46] border border-[#203B70]">
                  <span className="text-[#A8BEDF] block">VRAM Usage</span>
                  <span className="text-sm font-bold font-mono text-[#39E75F]">3.4 / 24 GB</span>
                </div>
                <div className="p-2 rounded bg-[#0D1B46] border border-[#203B70]">
                  <span className="text-[#A8BEDF] block">Encoder</span>
                  <span className="text-xs font-bold font-mono text-[#F5F8FF]">NVENC AV1</span>
                </div>
              </div>
              <div className="text-[10px] text-[#A8BEDF] flex items-center justify-between pt-1">
                <span>DirectML Inference:</span>
                <span className="text-[#39E75F] font-semibold">Active & Primed</span>
              </div>
            </div>
          </>
        ) : (
          /* Inspector Tab: Clip & Caption Editing Properties */
          <>
            <div className="p-3 rounded-xl bg-[#112653] border border-[#203B70] space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#F5F8FF]">
                <Type className="w-4 h-4 text-[#39E75F]" />
                <span>Quick Caption Presets</span>
              </div>
              <p className="text-[10px] text-[#A8BEDF]">
                Choose a creator preset to style your video captions live:
              </p>

              <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                {CAPTION_PRESETS.slice(0, 6).map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => onSelectCaptionPreset && onSelectCaptionPreset(preset)}
                    className={`w-full p-2 rounded-lg text-left border transition-all cursor-pointer flex items-center justify-between ${
                      selectedCaptionPreset?.id === preset.id
                        ? 'bg-[#183566] border-[#39E75F] shadow-[0_0_10px_rgba(57,231,95,0.25)]'
                        : 'bg-[#0D1B46] border-[#203B70] hover:border-[#39E75F]/60'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-xs text-[#F5F8FF] flex items-center gap-1.5">
                        <span>{preset.name}</span>
                        <span className="text-[9px] px-1 py-0.2 rounded bg-[#112653] text-[#39E75F] border border-[#203B70]">
                          {preset.tag}
                        </span>
                      </div>
                      <div className="text-[10px] text-[#A8BEDF] mt-0.5 line-clamp-1 font-mono">
                        {preset.samplePhrase}
                      </div>
                    </div>
                    <div 
                      className="w-3.5 h-3.5 rounded-full border border-black/50 shrink-0" 
                      style={{ backgroundColor: preset.highlightColor }} 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Export Controls */}
            <div className="p-3 rounded-xl bg-[#112653] border border-[#203B70] space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#F5F8FF]">
                <Zap className="w-4 h-4 text-[#39E75F]" />
                <span>Render Parameters</span>
              </div>
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#A8BEDF]">Resolution</span>
                  <span className="font-mono font-medium">1080 x 1920 (9:16)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#A8BEDF]">Target FPS</span>
                  <span className="font-mono font-medium text-[#39E75F]">60 FPS Smooth</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#A8BEDF]">Bitrate</span>
                  <span className="font-mono font-medium">18 Mbps CBR</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#A8BEDF]">Safe Area Overlay</span>
                  <span className="font-mono text-[#39E75F]">Enabled</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};
