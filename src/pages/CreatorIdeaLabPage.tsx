import React, { useState } from 'react';
import { 
  Lightbulb, 
  Sparkles, 
  Copy, 
  Check, 
  Calendar, 
  Flame, 
  ArrowRight, 
  Film, 
  Layers, 
  Clock, 
  Bookmark,
  RefreshCw
} from 'lucide-react';
import { NavigationPage } from '../types';
import { requestCreatorAssist } from '../services/aiService';

interface CreatorIdeaLabPageProps {
  onNavigate: (page: NavigationPage) => void;
  onSaveIdeaAsProject: (title: string, hook: string) => void;
}

interface IdeaCard {
  title: string;
  hook: string;
  scriptOutline: string[];
  shotList: string[];
  thumbnailConcept: string;
  viralityScore: number;
}

export const CreatorIdeaLabPage: React.FC<CreatorIdeaLabPageProps> = ({
  onNavigate,
  onSaveIdeaAsProject,
}) => {
  const [selectedNiche, setSelectedNiche] = useState('Technology & AI');
  const [selectedAudience, setSelectedAudience] = useState('Beginners & General Public');
  const [selectedPlatform, setSelectedPlatform] = useState('YouTube Shorts / Reels');
  const [selectedTone, setSelectedTone] = useState('Curiosity Gap');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'generator' | 'calendar'>('generator');

  const [ideas, setIdeas] = useState<IdeaCard[]>([
    {
      title: 'I Tested 10 Free AI Video Editors (Only 2 Actually Work)',
      hook: '"Stop paying $30/month for video editing software before watching this."',
      scriptOutline: [
        '0:00 - 0:03: Fast pattern interrupt hook showing subscription invoice crossed out',
        '0:03 - 0:25: Side-by-side export test with CutCraft NVENC hardware rendering',
        '0:25 - 0:35: The ultimate winner and free preset recommendation'
      ],
      shotList: [
        'Face-to-camera with split-screen screen capture on left',
        'Over-the-shoulder typing prompt in CutCraft'
      ],
      thumbnailConcept: 'Split screen: Red X on expensive software vs Bright Green check on CutCraft Studio with text "FREE WON"',
      viralityScore: 96
    },
    {
      title: 'The 1 Secret Setting That Doubled My Short-Form Retention',
      hook: '"If your TikTok or Shorts retention drops off at second 3, you forgot this one toggle."',
      scriptOutline: [
        '0:00 - 0:04: Zoom-in on retention drop graph with red warning line',
        '0:04 - 0:22: Showing how Viral Green word-by-word subtitles re-engage viewers',
        '0:22 - 0:30: Live comparison of uncaptioned vs captioned completion rates'
      ],
      shotList: [
        'Extreme close up on phone screen displaying audio waveform',
        'Handheld reaction showing viewer growth analytics'
      ],
      thumbnailConcept: 'Chart shooting up with text "RETENTION HACK" in bold electric blue',
      viralityScore: 93
    }
  ]);

  const NICHES = [
    'Technology & AI',
    'Gaming & Twitch',
    'Education & Study Hacks',
    'Fitness & Gym Motivation',
    'Travel & Adventure',
    'Business & Money',
    'Lifestyle & Daily Vlogs',
    'Comedy & Entertainment'
  ];

  const handleGenerateIdeas = async () => {
    setIsLoading(true);
    const res = await requestCreatorAssist('idea_generator', selectedNiche, selectedTone);
    setIsLoading(false);

    if (res.success && res.data && Array.isArray(res.data)) {
      setIdeas(res.data);
    }
  };

  const handleCopyScript = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto text-[#F5F8FF]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#112653] border border-[#203B70] text-[#39E75F] text-xs font-semibold mb-2">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Creative Ideation Engine</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Creator Idea Lab
          </h1>
          <p className="text-xs md:text-sm text-[#A8BEDF] mt-1 max-w-2xl">
            Never run out of video concepts. Generate viral hooks, full scene-by-scene script outlines, and thumbnail angles tailored to your niche.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0D1B46] border border-[#203B70]">
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'generator' ? 'bg-[#183566] text-[#39E75F]' : 'text-[#A8BEDF] hover:text-white'
            }`}
          >
            Concept Generator
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'calendar' ? 'bg-[#183566] text-[#39E75F]' : 'text-[#A8BEDF] hover:text-white'
            }`}
          >
            Weekly Planner
          </button>
        </div>
      </div>

      {activeTab === 'generator' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Niche & Parameters Configuration */}
          <div className="lg:col-span-4 p-5 rounded-2xl bg-[#0D1B46] border border-[#203B70] space-y-4">
            <h3 className="font-bold text-xs text-white uppercase tracking-wider">
              Target Parameters
            </h3>

            {/* Niche Selector */}
            <div>
              <label className="text-[11px] text-[#A8BEDF] block mb-1.5">Content Niche</label>
              <select
                value={selectedNiche}
                onChange={(e) => setSelectedNiche(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#00002A] border border-[#203B70] text-xs text-white focus:outline-none focus:border-[#39E75F]"
              >
                {NICHES.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            {/* Audience Selector */}
            <div>
              <label className="text-[11px] text-[#A8BEDF] block mb-1.5">Target Audience</label>
              <select
                value={selectedAudience}
                onChange={(e) => setSelectedAudience(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#00002A] border border-[#203B70] text-xs text-white focus:outline-none focus:border-[#39E75F]"
              >
                <option value="Beginners & General Public">Beginners & General Public</option>
                <option value="Advanced Practitioners">Advanced Creators & Practitioners</option>
                <option value="Students & Young Learners">Students & Learners</option>
                <option value="Entrepreneurs & Freelancers">Entrepreneurs & Freelancers</option>
              </select>
            </div>

            {/* Platform Selector */}
            <div>
              <label className="text-[11px] text-[#A8BEDF] block mb-1.5">Platform</label>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#00002A] border border-[#203B70] text-xs text-white focus:outline-none focus:border-[#39E75F]"
              >
                <option value="YouTube Shorts / Reels">YouTube Shorts / Reels (9:16)</option>
                <option value="TikTok Viral">TikTok High-Energy (9:16)</option>
                <option value="YouTube Long-Form">YouTube Long-Form (16:9)</option>
                <option value="Instagram Carousel Reel">Instagram Reel (9:16)</option>
              </select>
            </div>

            {/* Tone Selector */}
            <div>
              <label className="text-[11px] text-[#A8BEDF] block mb-1.5">Hook & Content Tone</label>
              <div className="grid grid-cols-2 gap-1.5">
                {['Curiosity Gap', 'High Energy', 'Bold & Provocative', 'Educational'].map((tone) => (
                  <button
                    key={tone}
                    onClick={() => setSelectedTone(tone)}
                    className={`p-2 rounded-lg text-[11px] font-medium border text-center transition-colors cursor-pointer ${
                      selectedTone === tone
                        ? 'bg-[#183566] border-[#39E75F] text-[#39E75F]'
                        : 'border-[#203B70] bg-[#112653] text-[#A8BEDF] hover:text-white'
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerateIdeas}
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#39E75F] hover:bg-[#32d854] text-[#00002A] font-bold text-xs transition-all shadow-[0_0_15px_rgba(57,231,95,0.3)] active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing Viral Angles...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 stroke-[2.5]" />
                  <span>Generate Video Ideas</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Generated Ideas Cards */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Generated Video Concepts ({ideas.length})
              </span>
              <span className="text-[10px] text-[#A8BEDF] font-mono">
                Platform: {selectedPlatform}
              </span>
            </div>

            <div className="space-y-4">
              {ideas.map((idea, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#0D1B46] border border-[#203B70] space-y-3 hover:border-[#39E75F]/60 transition-all group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#203B70] pb-3">
                    <h3 className="font-bold text-sm text-white group-hover:text-[#39E75F] transition-colors">
                      {idea.title}
                    </h3>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#112653] text-[#39E75F] border border-[#39E75F]/30 flex items-center gap-1">
                        <Flame className="w-3 h-3 text-[#39E75F]" />
                        <span>{idea.viralityScore}% Viral CTR</span>
                      </span>
                    </div>
                  </div>

                  {/* 3-second hook */}
                  <div className="p-3 rounded-xl bg-[#00002A] border border-[#203B70] space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#39E75F]">
                      3-Second Opening Hook:
                    </span>
                    <p className="text-xs text-[#F5F8FF] italic font-medium">
                      {idea.hook}
                    </p>
                  </div>

                  {/* Script Outline */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#00D9FF]">
                      Scene-by-Scene Script Outline:
                    </span>
                    <div className="space-y-1 text-xs text-[#A8BEDF]">
                      {idea.scriptOutline.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#39E75F] mt-1.5 shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Thumbnail direction */}
                  {idea.thumbnailConcept && (
                    <div className="text-[11px] text-[#A8BEDF] pt-1">
                      <strong className="text-white">Thumbnail Concept:</strong> {idea.thumbnailConcept}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#203B70]">
                    <button
                      onClick={() => handleCopyScript(`${idea.title}\n\nHook: ${idea.hook}\n\nOutline:\n${idea.scriptOutline.join('\n')}`, `idea-${idx}`)}
                      className="text-xs text-[#A8BEDF] hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedId === `idea-${idx}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#39E75F]" />
                          <span className="text-[#39E75F]">Copied Script!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Script Outline</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onSaveIdeaAsProject(idea.title, idea.hook)}
                      className="px-4 py-1.5 rounded-lg bg-[#183566] hover:bg-[#39E75F] hover:text-[#00002A] text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer border border-[#203B70]"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Start in Video Editor</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Content Calendar View */
        <div className="p-6 rounded-2xl bg-[#0D1B46] border border-[#203B70] space-y-4">
          <div className="flex items-center justify-between border-b border-[#203B70] pb-3">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#39E75F]" />
              <span>Weekly High-Retention Content Planner</span>
            </h3>
            <span className="text-xs text-[#A8BEDF] font-mono">Suggested Cadence: 3 Shorts/Week</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {[
              { day: 'Tuesday 5:00 PM', topic: 'Industry Myth Busting Hook', format: 'Smart Clips 9:16', status: 'Ready to Film' },
              { day: 'Thursday 12:00 PM', topic: '1 Simple AI Workflow Tutorial', format: 'Screen Recording + Captions', status: 'Scripted' },
              { day: 'Saturday 10:00 AM', topic: '30-Day Before & After Results', format: 'Split Screen Reel', status: 'Idea Draft' },
            ].map((slot, sIdx) => (
              <div key={sIdx} className="p-4 rounded-xl bg-[#00002A] border border-[#203B70] space-y-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#112653] text-[#39E75F] border border-[#203B70]">
                  {slot.day}
                </span>
                <div className="font-bold text-xs text-white">{slot.topic}</div>
                <div className="text-[10px] text-[#A8BEDF]">{slot.format}</div>
                <div className="text-[10px] text-[#39E75F] font-mono pt-1">Status: {slot.status}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
