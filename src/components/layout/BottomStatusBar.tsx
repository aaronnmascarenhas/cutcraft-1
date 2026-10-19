import React from 'react';
import { ShieldCheck, Cpu } from 'lucide-react';

interface BottomStatusBarProps {
  statusText?: string;
  hardwareModel?: string;
  activeModel?: string;
  encoder?: string;
  cloudBoost?: boolean;
  onToggleCloudBoost?: () => void;
}

export const BottomStatusBar: React.FC<BottomStatusBarProps> = ({
  statusText = 'Ready',
  hardwareModel = 'NVIDIA RTX 4090 · 16 Cores',
  activeModel = 'base',
  encoder = 'NVENC AV1',
  cloudBoost = false,
  onToggleCloudBoost,
}) => {
  return (
    <footer className="h-7 bg-[#0D1B46] border-t border-[#203B70] px-4 flex items-center justify-between text-[11px] text-[#A8BEDF] font-mono select-none z-20">
      {/* Left Telemetry Cluster */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#39E75F] shadow-[0_0_6px_#39E75F]" />
          <span className="text-[#F5F8FF] font-semibold">{statusText}</span>
        </div>

        <span className="text-[#203B70]">|</span>

        <div className="flex items-center gap-1.5 shrink-0 text-[#A8BEDF]">
          <Cpu className="w-3 h-3 text-[#39E75F]" />
          <span>{hardwareModel}</span>
        </div>

        <span className="text-[#203B70]">|</span>

        <div className="shrink-0">
          <span className="text-[#A8BEDF]">Model — </span>
          <span className="text-[#F5F8FF] font-medium">{activeModel}</span>
        </div>

        <span className="text-[#203B70]">|</span>

        <div className="shrink-0">
          <span className="text-[#A8BEDF]">Encoder — </span>
          <span className="text-[#39E75F] font-medium">{encoder}</span>
        </div>

        <span className="text-[#203B70]">|</span>

        <button
          onClick={onToggleCloudBoost}
          className="flex items-center gap-1 shrink-0 text-left hover:text-white transition-colors cursor-pointer"
          title="Toggle Cloud Boost rendering"
        >
          <span className="text-[#A8BEDF]">Cloud Boost — </span>
          <span className={cloudBoost ? 'text-[#39E75F] font-semibold' : 'text-[#A8BEDF]'}>
            {cloudBoost ? 'On' : 'Off'}
          </span>
        </button>
      </div>

      {/* Right Verified Signature Badge */}
      <div className="hidden sm:flex items-center gap-1.5 shrink-0 text-[10px] text-[#A8BEDF]">
        <ShieldCheck className="w-3.5 h-3.5 text-[#39E75F]" />
        <span>Signed Build · Electron 43.2.0 · Presetly Verified</span>
      </div>
    </footer>
  );
};
