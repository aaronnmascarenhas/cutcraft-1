import React, { useState } from 'react';
import { 
  CheckCircle, 
  Sparkles, 
  TrendingUp, 
  Volume2, 
  Type, 
  Film, 
  Layers, 
  ArrowRight, 
  Check, 
  RefreshCw, 
  AlertCircle
} from 'lucide-react';
import { NavigationPage } from '../types';
import { requestCreatorAssist } from '../services/aiService';
import { PODCAST_IMAGE } from '../data/mockData';

interface AiVideoCoachPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const AiVideoCoachPage: React.FC<AiVideoCoachPageProps> = ({ onNavigate }) => {
  const [videoConcept, setVideoConcept] = useState(
    'A 45-second podcast clip explaining how AI replaces manual video clipping, starting with a bold question and moving into a 3-step demonstration.'
  );
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditReport, setAuditReport] = useState<any>({
    overallScore: 89,
    hookScore: 94,
    pacingScore: 86,
    captionScore: 95,
    audioScore: 90,
    strengths: [
      'Immediate curiosity gap hook in the first 3 seconds with high retention likelihood',
      'High-contrast Viral Green word pop captions ensure complete legibility on mute'
    ],
    improvementAreas: [
      'Trim 0.4s micro-pauses between sentence clauses to raise viewer engagement',
      'Add subtle punch-in camera zooms (1.15x) on key statistical claims'
    ],
    actionableFix: 'Use the Split tool on the CutCraft Video Editor timeline to ripple-delete empty breaths between words.',
    recommendedPreset: 'Viral Green (Impact font with 4px black stroke)'
  });

  const handleRunAudit = async () => {
    setIsAuditing(true);
    const res = await requestCreatorAssist('video_review', videoConcept);
    setIsAuditing(false);

    if (res.success && res.data) {
      setAuditReport(res.data);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto text-[#F5F8FF]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#112653] border border-[#203B70] text-[#39E75F] text-xs font-semibold mb-2">
            <CheckCircle className="w-3.5 h-3.5 text-[#39E75F]" />
            <span>AI Video Content Coach</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            AI Video Audit & Retention Coach
          </h1>
          <p className="text-xs md:text-sm text-[#A8BEDF] mt-1 max-w-2xl">
            Evaluate your video concept, pacing, hook strength, and subtitle readability before posting to maximize watch time.
          </p>
        </div>

        {/* Audit Status Badge */}
        <div className="px-3 py-1.5 rounded-xl bg-[#0D1B46] border border-[#203B70] text-[11px] text-[#A8BEDF] font-mono">
          Diagnostic Engine: <span className="text-[#39E75F] font-bold">ACTIVE</span>
        </div>
      </div>

      {/* Input Stage */}
      <div className="p-5 rounded-2xl bg-[#0D1B46] border border-[#203B70] space-y-3">
        <label className="text-xs font-bold text-white block">
          Describe Your Video Concept, Hook, or Edit Plan:
        </label>
        <textarea
          rows={3}
          value={videoConcept}
          onChange={(e) => setVideoConcept(e.target.value)}
          placeholder="Paste your opening hook script, editing pacing, or video transcript..."
          className="w-full p-3 rounded-xl bg-[#00002A] border border-[#203B70] text-xs text-white focus:outline-none focus:border-[#39E75F]"
        />

        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] text-[#A8BEDF]">
            CutCraft analyzes pattern interrupts, safe margin compliance, and pacing density.
          </span>
          <button
            onClick={handleRunAudit}
            disabled={isAuditing || !videoConcept.trim()}
            className="px-5 py-2.5 rounded-xl bg-[#39E75F] hover:bg-[#32d854] text-[#00002A] font-bold text-xs transition-all shadow-[0_0_15px_rgba(57,231,95,0.3)] active:scale-95 disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
          >
            {isAuditing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Auditing Video Concept...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Run AI Video Audit</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Audit Scorecard Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Overall Score', val: auditReport.overallScore, color: 'text-[#39E75F]' },
          { label: 'Opening Hook', val: auditReport.hookScore, color: 'text-[#00D9FF]' },
          { label: 'Pacing & Density', val: auditReport.pacingScore, color: 'text-[#F5C76A]' },
          { label: 'Caption Readability', val: auditReport.captionScore, color: 'text-[#39E75F]' },
        ].map((score, sIdx) => (
          <div key={sIdx} className="p-4 rounded-xl bg-[#0D1B46] border border-[#203B70] text-center space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#A8BEDF] block">
              {score.label}
            </span>
            <div className={`text-2xl font-black font-mono ${score.color}`}>
              {score.val}/100
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Diagnostics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Strengths & Weaknesses */}
        <div className="p-5 rounded-2xl bg-[#0D1B46] border border-[#203B70] space-y-4">
          <div>
            <h3 className="font-bold text-xs uppercase text-[#39E75F] tracking-wider mb-2 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#39E75F]" />
              <span>What's Working Well:</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-[#F5F8FF]">
              {auditReport.strengths?.map((str: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#39E75F] mt-1.5 shrink-0" />
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-[#203B70]">
            <h3 className="font-bold text-xs uppercase text-[#F5C76A] tracking-wider mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-[#F5C76A]" />
              <span>Recommended Improvements:</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-[#A8BEDF]">
              {auditReport.improvementAreas?.map((imp: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5C76A] mt-1.5 shrink-0" />
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actionable Fix & Tool Launcher */}
        <div className="p-5 rounded-2xl bg-[#0D1B46] border border-[#203B70] space-y-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#00D9FF] font-bold block mb-1">
              Direct Actionable Advice:
            </span>
            <p className="text-xs text-[#F5F8FF] leading-relaxed bg-[#00002A] p-3 rounded-xl border border-[#203B70]">
              {auditReport.actionableFix}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#00002A] border border-[#203B70] text-xs space-y-1">
            <span className="text-[10px] text-[#A8BEDF] block">Recommended Caption Style:</span>
            <div className="font-bold text-[#39E75F]">{auditReport.recommendedPreset}</div>
          </div>

          <button
            onClick={() => onNavigate('editor')}
            className="w-full py-2.5 rounded-xl bg-[#39E75F] hover:bg-[#32d854] text-[#00002A] font-bold text-xs transition-all shadow-[0_0_15px_rgba(57,231,95,0.3)] active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Apply Fix in Video Editor</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
