import React from 'react';
import { 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Film, 
  Scissors, 
  Video, 
  Image as ImageIcon, 
  Cpu, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { NavigationPage } from '../types';

interface CreatorProgressPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const CreatorProgressPage: React.FC<CreatorProgressPageProps> = ({ onNavigate }) => {
  const SKILL_NODES = [
    {
      id: 'node-1',
      title: '9:16 Vertical Reframing',
      level: 'Beginner Creator',
      desc: 'Master portrait formatting and upper-third safe margins for social platforms.',
      unlocked: true,
      category: 'Smart Clips',
      icon: Scissors
    },
    {
      id: 'node-2',
      title: 'Viral Word-by-Word Subtitles',
      level: 'Beginner Creator',
      desc: 'Synchronized animated keyword pop and high-contrast stroke styling.',
      unlocked: true,
      category: 'Captions',
      icon: Film
    },
    {
      id: 'node-3',
      title: 'Ripple Splitting & Pacing',
      level: 'Video Editor',
      desc: 'Eliminating micro-pauses and filler breaths to maximize viewer retention.',
      unlocked: true,
      category: 'Timeline',
      icon: Film
    },
    {
      id: 'node-4',
      title: 'High-CTR YouTube Thumbnails',
      level: 'Video Editor',
      desc: '3-word bold headlines, attention badges, and high-contrast face cutouts.',
      unlocked: true,
      category: 'Graphics',
      icon: ImageIcon
    },
    {
      id: 'node-5',
      title: 'Cinema-Grade AI Prompting',
      level: 'Short-Form Specialist',
      desc: 'Camera movement modifiers, volumetric lighting, and Veo model steering.',
      unlocked: false,
      category: 'Generative AI',
      icon: Video
    },
    {
      id: 'node-6',
      title: 'NVIDIA Hardware Encoding (AV1)',
      level: 'Advanced Creator',
      desc: 'Real-time 180 FPS timeline rendering on GPU tensor cores without cloud delay.',
      unlocked: false,
      category: 'Hardware',
      icon: Cpu
    }
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto text-[#F5F8FF]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#112653] border border-[#203B70] text-[#39E75F] text-xs font-semibold mb-2">
            <Award className="w-3.5 h-3.5 text-[#39E75F]" />
            <span>CutCraft Mastery System</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Creator Progress & Skill Tree
          </h1>
          <p className="text-xs md:text-sm text-[#A8BEDF] mt-1 max-w-2xl">
            Track your journey from first edit to full-time content creator. Unlock practical workflow skills through hands-on creation.
          </p>
        </div>

        {/* Current Rank Badge */}
        <div className="p-3.5 rounded-2xl bg-[#0D1B46] border border-[#203B70] text-left shrink-0 shadow-md">
          <div className="text-[10px] text-[#A8BEDF] uppercase font-mono">Current Creator Tier</div>
          <div className="text-sm font-bold text-[#39E75F] flex items-center gap-1.5 mt-0.5">
            <ShieldCheck className="w-4 h-4 text-[#39E75F]" />
            <span>Short-Form Specialist (Tier 3)</span>
          </div>
        </div>
      </div>

      {/* Level Milestone Stepper */}
      <div className="p-5 rounded-2xl bg-[#0D1B46] border border-[#203B70] space-y-3">
        <div className="flex justify-between text-xs font-semibold text-white">
          <span>Tier Progression</span>
          <span className="font-mono text-[#39E75F] font-bold">65% to AI Creator Tier</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs pt-1">
          {[
            { name: 'Beginner', active: true, done: true },
            { name: 'Video Editor', active: true, done: true },
            { name: 'Short-Form Specialist', active: true, current: true },
            { name: 'AI Creator', active: false },
            { name: 'Studio Master', active: false },
          ].map((tier, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-xl border transition-all ${
                tier.done
                  ? 'bg-[#112653] border-[#39E75F] text-[#39E75F]'
                  : tier.current
                  ? 'bg-[#183566] border-[#39E75F] text-[#39E75F] font-bold shadow-[0_0_15px_rgba(57,231,95,0.2)]'
                  : 'bg-[#00002A] border-[#203B70] text-[#7895BE]'
              }`}
            >
              <div className="text-[10px] font-mono">Tier 0{idx + 1}</div>
              <div className="text-xs truncate">{tier.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Skill Tree Nodes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Creator Skill Tree Nodes</h2>
          <span className="text-xs text-[#A8BEDF] font-mono">4 of 6 Unlocked</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILL_NODES.map((node) => {
            const Icon = node.icon;
            return (
              <div
                key={node.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  node.unlocked
                    ? 'bg-[#0D1B46] border-[#203B70] hover:border-[#39E75F]/60'
                    : 'bg-[#00002A]/80 border-[#203B70]/50 opacity-70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      node.unlocked ? 'bg-[#183566] text-[#39E75F]' : 'bg-[#112653] text-[#7895BE]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    {node.unlocked ? (
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#112653] text-[#39E75F] border border-[#39E75F]/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Mastered</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00002A] text-[#7895BE] border border-[#203B70] flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>Locked</span>
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-[#A8BEDF] block uppercase">{node.level}</span>
                  <h3 className="font-bold text-sm text-white mt-0.5">{node.title}</h3>
                  <p className="text-xs text-[#A8BEDF] mt-1.5 leading-relaxed">{node.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#203B70]">
                  <button
                    onClick={() => onNavigate('academy')}
                    className="w-full py-2 rounded-lg bg-[#112653] hover:bg-[#183566] text-xs font-semibold text-[#F5F8FF] hover:text-[#39E75F] transition-colors flex items-center justify-center gap-1 cursor-pointer border border-[#203B70]"
                  >
                    <span>{node.unlocked ? 'Review Lesson' : 'Unlock in Academy'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
