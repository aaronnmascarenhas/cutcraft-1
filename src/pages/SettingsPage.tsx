import React, { useState } from 'react';
import { 
  Settings, 
  Monitor, 
  Zap, 
  HardDrive, 
  Key, 
  Command, 
  Info, 
  Check, 
  Cpu, 
  ShieldCheck, 
  Sliders
} from 'lucide-react';
import { AspectRatio } from '../types';

export const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'general' | 'export' | 'ai' | 'shortcuts' | 'about'>('general');
  const [defaultAspect, setDefaultAspect] = useState<AspectRatio>('9:16');
  const [defaultResolution, setDefaultResolution] = useState<'1080p' | '4k'>('1080p');
  const [hardwareAcceleration, setHardwareAcceleration] = useState(true);
  const [autoCaptions, setAutoCaptions] = useState(true);
  const [cloudBoost, setCloudBoost] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  const handleSave = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto text-[#F4F7FF]">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
          <Settings className="w-7 h-7 text-[#39F56A]" />
          <span>CutCraft Settings & Engine Preferences</span>
        </h1>
        <p className="text-xs text-[#9BAFD0] mt-1">
          Configure hardware rendering, export resolutions, AI coprocessor, and interface defaults.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Navigation Tabs on Left */}
        <div className="md:col-span-4 p-2 rounded-2xl bg-[#0A1230] border border-[#162B53] space-y-1">
          {[
            { id: 'general', label: 'Appearance & Defaults', icon: Monitor },
            { id: 'export', label: 'Export & Video Quality', icon: Sliders },
            { id: 'ai', label: 'AI Services & Hardware', icon: Cpu },
            { id: 'shortcuts', label: 'Keyboard Shortcuts', icon: Command },
            { id: 'about', label: 'About Presetly Engine', icon: Info },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#162B53] text-[#39F56A] shadow-[0_0_12px_rgba(57,245,106,0.2)] border border-[#39F56A]/30'
                    : 'text-[#9BAFD0] hover:text-white hover:bg-[#101D40]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#39F56A]' : 'text-[#9BAFD0]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Setting Panel Content on Right */}
        <div className="md:col-span-8 p-6 rounded-2xl bg-[#0A1230] border border-[#162B53] space-y-6">
          {activeSection === 'general' && (
            <div className="space-y-5">
              <h3 className="font-bold text-sm text-white border-b border-[#14234b] pb-2">
                General Preferences
              </h3>

              <div>
                <label className="text-xs font-semibold text-white block mb-1">
                  Default Aspect Ratio for New Projects
                </label>
                <div className="grid grid-cols-4 gap-2 pt-1">
                  {(['9:16', '16:9', '1:1', '4:5'] as AspectRatio[]).map((ar) => (
                    <button
                      key={ar}
                      onClick={() => setDefaultAspect(ar)}
                      className={`py-2 rounded-xl text-xs font-mono font-bold border transition-colors cursor-pointer ${
                        defaultAspect === ar
                          ? 'bg-[#162B53] border-[#39F56A] text-[#39F56A]'
                          : 'bg-[#101D40] border-[#1d356c] text-[#9BAFD0]'
                      }`}
                    >
                      {ar}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <div className="font-semibold text-xs text-white">Auto-Generate Captions on Video Import</div>
                  <div className="text-[10px] text-[#9BAFD0]">Automatically transcribe and prepare Viral Green subtitles</div>
                </div>
                <button
                  onClick={() => setAutoCaptions(!autoCaptions)}
                  className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                    autoCaptions ? 'bg-[#39F56A]' : 'bg-[#162B53]'
                  }`}
                >
                  <span 
                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                      autoCaptions ? 'translate-x-4' : 'translate-x-0'
                    }`} 
                  />
                </button>
              </div>
            </div>
          )}

          {activeSection === 'export' && (
            <div className="space-y-5">
              <h3 className="font-bold text-sm text-white border-b border-[#14234b] pb-2">
                Export & Encoding Defaults
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-white block mb-1">Default Output Resolution</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setDefaultResolution('1080p')}
                      className={`p-3 rounded-xl border text-left cursor-pointer ${
                        defaultResolution === '1080p' ? 'bg-[#162B53] border-[#39F56A] text-[#39F56A]' : 'bg-[#101D40] border-[#1d356c] text-[#9BAFD0]'
                      }`}
                    >
                      <div className="font-bold text-xs">1080p (Full HD)</div>
                      <div className="text-[10px] mt-0.5">Optimal for TikTok, Reels & Shorts</div>
                    </button>
                    <button
                      onClick={() => setDefaultResolution('4k')}
                      className={`p-3 rounded-xl border text-left cursor-pointer ${
                        defaultResolution === '4k' ? 'bg-[#162B53] border-[#00D9FF] text-[#00D9FF]' : 'bg-[#101D40] border-[#1d356c] text-[#9BAFD0]'
                      }`}
                    >
                      <div className="font-bold text-xs">4K (Ultra HD)</div>
                      <div className="text-[10px] mt-0.5">Studio Master Quality via NVENC</div>
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#050817] border border-[#162B53] text-[11px] text-[#9BAFD0]">
                  Encoding codec set to <strong className="text-white">NVENC AV1 10-Bit</strong> at 60 FPS.
                </div>
              </div>
            </div>
          )}

          {activeSection === 'ai' && (
            <div className="space-y-5">
              <h3 className="font-bold text-sm text-white border-b border-[#14234b] pb-2">
                AI Service & Acceleration Engine
              </h3>

              <div className="p-4 rounded-xl bg-[#050817] border border-[#1d356c] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-white">NVIDIA Hardware Acceleration</div>
                    <div className="text-[10px] text-[#9BAFD0]">RTX 4090 DirectML and CUDA pipelines enabled</div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#162B53] text-[#76B900]">
                    Active
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#14234b]">
                  <div>
                    <div className="font-bold text-xs text-white">Cloud Boost Cloud Rendering</div>
                    <div className="text-[10px] text-[#9BAFD0]">Offload heavy 4K exports to Presetly cloud clusters</div>
                  </div>
                  <button
                    onClick={() => setCloudBoost(!cloudBoost)}
                    className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                      cloudBoost ? 'bg-[#39F56A]' : 'bg-[#162B53]'
                    }`}
                  >
                    <span 
                      className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                        cloudBoost ? 'translate-x-4' : 'translate-x-0'
                      }`} 
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'shortcuts' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-white border-b border-[#14234b] pb-2">
                Keyboard Shortcuts
              </h3>
              <div className="space-y-2 text-xs">
                {[
                  { key: 'Space', desc: 'Play / Pause Video Timeline' },
                  { key: 'S', desc: 'Split Active Clip at Playhead' },
                  { key: 'Delete / Backspace', desc: 'Remove Selected Clip' },
                  { key: 'Ctrl + K / ⌘K', desc: 'Open Command Palette' },
                  { key: 'Ctrl + E', desc: 'Open Export Video Window' },
                ].map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-[#050817]">
                    <span className="text-[#9BAFD0]">{s.desc}</span>
                    <kbd className="px-2 py-0.5 rounded bg-[#162B53] font-mono text-[10px] text-[#39F56A]">
                      {s.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'about' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-white border-b border-[#14234b] pb-2">
                About CutCraft
              </h3>
              <div className="space-y-2 text-xs text-[#9BAFD0] leading-relaxed">
                <p>
                  <strong>CutCraft by PRESETLY</strong> is an AI-powered creative workstation engineered for high-velocity short-form creators, YouTubers, podcasters, and streamers.
                </p>
                <div className="p-3 rounded-xl bg-[#050817] font-mono text-[11px] space-y-1">
                  <div>Version: <span className="text-white">v1.4.2 (Production Build)</span></div>
                  <div>Engine: <span className="text-[#39F56A]">PRESETLY NEURAL STUDIO</span></div>
                  <div>Signed Binary: <span className="text-white">Electron 43.2.0</span></div>
                  <div>Hardware Layer: <span className="text-[#00D9FF]">NVENC AV1 / CUDA 12.6</span></div>
                </div>
              </div>
            </div>
          )}

          {/* Save Action */}
          <div className="pt-4 border-t border-[#14234b] flex items-center justify-between">
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-[#39F56A] hover:bg-[#31e05e] text-[#050817] font-bold text-xs transition-all shadow-[0_0_12px_rgba(57,245,106,0.3)] active:scale-95 cursor-pointer"
            >
              Save Preferences
            </button>

            {saveToast && (
              <span className="text-xs text-[#39F56A] font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>Settings Saved!</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
