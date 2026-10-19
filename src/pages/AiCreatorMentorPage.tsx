import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ArrowRight, 
  User, 
  Scissors, 
  Film, 
  Video, 
  Image as ImageIcon, 
  Zap, 
  RefreshCw,
  Lightbulb
} from 'lucide-react';
import { NavigationPage } from '../types';
import { requestCreatorAssist } from '../services/aiService';

interface AiCreatorMentorPageProps {
  onNavigate: (page: NavigationPage) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  recommendedTool?: string;
  recommendedAction?: string;
  suggestedFollowUp?: string[];
  timestamp: string;
}

export const AiCreatorMentorPage: React.FC<AiCreatorMentorPageProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'mentor',
      text: "Hello! I'm your CutCraft Creator Mentor. Whether you're making your first TikTok short, designing your first 16:9 thumbnail, or learning how to pace multi-track edits, I'm here to help. What are you working on today?",
      recommendedTool: 'Smart Clips',
      recommendedAction: 'Try importing a raw clip',
      suggestedFollowUp: [
        'How do I create my first YouTube Short?',
        'Which AI tools should I learn first?',
        'How do I make high-CTR thumbnails?'
      ],
      timestamp: 'Just now'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const SUGGESTED_STARTERS = [
    'How do I create my first YouTube Short from a long podcast?',
    'Which CutCraft tools work completely offline on my RTX GPU?',
    'How do I formulate a cinematic AI video prompt with camera motion?',
    'What is the 3-second hook formula for high retention?',
    'How do I pick the right caption preset for gaming vs interview videos?'
  ];

  const handleSendMessage = async (queryToSend?: string) => {
    const q = queryToSend || inputQuery;
    if (!q.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    const res = await requestCreatorAssist('mentor_chat', q);
    setIsTyping(false);

    if (res.success && res.data) {
      const mentorMsg: ChatMessage = {
        id: `mentor-${Date.now()}`,
        sender: 'mentor',
        text: res.data.reply || 'Here are some tips to get you started!',
        recommendedTool: res.data.recommendedTool || 'Video Editor',
        recommendedAction: res.data.recommendedAction || 'Practice in CutCraft',
        suggestedFollowUp: res.data.suggestedFollowUp || [],
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, mentorMsg]);
    } else {
      const fallbackMsg: ChatMessage = {
        id: `mentor-${Date.now()}`,
        sender: 'mentor',
        text: `Here is my recommendation for: "${q}":\n\n1. **Hook Strategy**: Ensure the first 2.5 seconds introduce curiosity or visual disruption.\n2. **Pacing**: Cut every 2–3 seconds on mobile shorts to retain high watch-time.\n3. **Presetly AI Captions**: Use bold punchy presets with keyword highlights (e.g., 'Viral Pop' or 'Neon Glow') so viewers reading without sound stay engaged.`,
        recommendedTool: 'Smart Clips',
        recommendedAction: 'Open Smart Clips',
        suggestedFollowUp: [
          'Show me sound design tips',
          'What aspect ratio is best?',
          'How do I export 60FPS in CutCraft?'
        ],
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, fallbackMsg]);
    }
  };

  const mapToolToRoute = (toolName?: string): NavigationPage => {
    if (!toolName) return 'editor';
    const lower = toolName.toLowerCase();
    if (lower.includes('clip') || lower.includes('short')) return 'smart-clips';
    if (lower.includes('editor') || lower.includes('timeline')) return 'editor';
    if (lower.includes('gen') || lower.includes('prompt')) return 'ai-video';
    if (lower.includes('thumb') || lower.includes('image')) return 'image-studio';
    if (lower.includes('template')) return 'templates';
    if (lower.includes('nvidia') || lower.includes('rtx')) return 'nvidia-lab';
    return 'editor';
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-5xl mx-auto text-[#F5F8FF]">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0D1B46] border border-[#203B70] shadow-lg">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#112653] border border-[#203B70] flex items-center justify-center text-[#39E75F]">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">AI Creator Mentor</h1>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#183566] text-[#39E75F] border border-[#203B70]">
                Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-xs text-[#A8BEDF]">
              Your 24/7 creative strategist, editing coach, and CutCraft guide.
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Starter Chips */}
      <div className="space-y-1.5">
        <span className="text-[10px] uppercase font-bold tracking-wider text-[#A8BEDF] flex items-center gap-1.5">
          <Lightbulb className="w-3 h-3 text-[#39E75F]" />
          <span>Quick Creator Questions:</span>
        </span>
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTED_STARTERS.map((starter, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(starter)}
              className="text-xs px-3 py-1 rounded-full bg-[#0D1B46] hover:bg-[#112653] text-[#A8BEDF] hover:text-white border border-[#203B70] transition-colors cursor-pointer text-left"
            >
              {starter}
            </button>
          ))}
        </div>
      </div>

      {/* Chat History Window */}
      <div className="p-4 md:p-6 rounded-2xl bg-[#0D1B46] border border-[#203B70] min-h-[420px] max-h-[560px] overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'mentor' && (
              <div className="w-8 h-8 rounded-xl bg-[#112653] border border-[#203B70] flex items-center justify-center text-[#39E75F] shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div className={`max-w-xl space-y-2 ${
              msg.sender === 'user'
                ? 'bg-[#183566] text-white p-3.5 rounded-2xl rounded-tr-none border border-[#203B70]'
                : 'bg-[#00002A] border border-[#203B70] p-4 rounded-2xl rounded-tl-none text-[#F5F8FF]'
            }`}>
              <p className="text-xs md:text-sm leading-relaxed whitespace-pre-line">
                {msg.text}
              </p>

              {/* Action Recommendation Card if provided */}
              {msg.recommendedTool && (
                <div className="mt-3 p-3 rounded-xl bg-[#112653] border border-[#203B70] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-[#A8BEDF] uppercase block">Recommended Tool</span>
                    <span className="font-bold text-xs text-white">{msg.recommendedTool}</span>
                  </div>
                  <button
                    onClick={() => onNavigate(mapToolToRoute(msg.recommendedTool))}
                    className="px-3 py-1.5 rounded-lg bg-[#39E75F] hover:bg-[#32d854] text-[#00002A] font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-[0_0_10px_rgba(57,231,95,0.25)]"
                  >
                    <span>{msg.recommendedAction || 'Open Tool'}</span>
                    <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                  </button>
                </div>
              )}

              {/* Follow-up Chips */}
              {msg.suggestedFollowUp && msg.suggestedFollowUp.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {msg.suggestedFollowUp.map((fu, fIdx) => (
                    <button
                      key={fIdx}
                      onClick={() => handleSendMessage(fu)}
                      className="text-[11px] px-2.5 py-1 rounded-md bg-[#112653] text-[#39E75F] hover:text-white border border-[#203B70] cursor-pointer transition-colors"
                    >
                      {fu}
                    </button>
                  ))}
                </div>
              )}

              <span className="text-[9px] text-[#7895BE] block text-right font-mono">
                {msg.timestamp}
              </span>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-[#39E75F] flex items-center justify-center text-[#00002A] font-bold text-xs shrink-0 mt-1 shadow-[0_0_10px_rgba(57,231,95,0.3)]">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-[#A8BEDF] p-3 rounded-xl bg-[#00002A] border border-[#203B70] w-fit">
            <RefreshCw className="w-3.5 h-3.5 text-[#39E75F] animate-spin" />
            <span>Mentor is formulating advice with Gemini AI...</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask anything about video editing, prompts, thumbnails, or CutCraft tools..."
          className="flex-1 px-4 py-3 rounded-xl bg-[#0D1B46] border border-[#203B70] text-xs text-white placeholder-[#7895BE] focus:border-[#39E75F] focus:outline-none"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputQuery.trim() || isTyping}
          className="px-5 py-3 rounded-xl bg-[#39E75F] hover:bg-[#32d854] text-[#00002A] font-bold text-xs transition-all shadow-[0_0_15px_rgba(57,231,95,0.3)] active:scale-95 disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
