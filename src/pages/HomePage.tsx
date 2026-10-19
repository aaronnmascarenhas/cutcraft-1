import React from 'react';
import { 
  Play, 
  Scissors, 
  Video, 
  Sparkles, 
  ImageIcon, 
  Type, 
  LayoutTemplate, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Flame,
  Plus
} from 'lucide-react';
import { NavigationPage, Project, TemplateItem } from '../types';
import { HERO_IMAGE, INITIAL_PROJECTS, CREATOR_TEMPLATES } from '../data/mockData';

interface HomePageProps {
  onNavigate: (page: NavigationPage) => void;
  onSelectProject: (project: Project) => void;
  onSelectTemplate: (template: TemplateItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProject,
  onSelectTemplate,
}) => {
  return (
    <div className="p-6 md:p-8 space-y-10 max-w-7xl mx-auto text-[#F5F8FF]">
      {/* Hero Workspace Section */}
      <section className="relative rounded-3xl bg-gradient-to-br from-[#0D1B46] via-[#112653] to-[#00002A] border border-[#203B70] overflow-hidden p-6 md:p-8 shadow-2xl">
        {/* Subtle mesh background effect */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#39E75F]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#00D9FF]/10 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Text & Call to Action */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#183566] border border-[#203B70] text-[#39E75F] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#39E75F]" />
              <span>Next-Gen Creator Engine · Powered by Presetly & NVIDIA</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Your Creative Studio, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39E75F] via-[#00D9FF] to-[#8B5CFF]">
                Supercharged by AI.
              </span>
            </h1>

            <p className="text-sm md:text-base text-[#A8BEDF] max-w-xl leading-relaxed">
              Turn raw footage into scroll-stopping videos, generate new visuals, and create content that looks professionally crafted without expensive editing software.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('smart-clips')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#39E75F] hover:bg-[#32d854] text-[#00002A] font-bold text-sm transition-all shadow-[0_0_20px_rgba(57,231,95,0.4)] active:scale-95 cursor-pointer"
              >
                <span>Start Creating</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={() => onNavigate('wizard')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#112653] hover:bg-[#183566] border border-[#203B70] text-white font-semibold text-sm transition-all cursor-pointer shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-[#39E75F]" />
                <span>First Video Wizard</span>
              </button>

              <button
                onClick={() => onNavigate('templates')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0D1B46]/80 hover:bg-[#112653] border border-[#203B70] text-[#A8BEDF] font-medium text-sm transition-all cursor-pointer"
              >
                <LayoutTemplate className="w-4 h-4 text-[#00D9FF]" />
                <span>Explore Templates</span>
              </button>
            </div>
          </div>

          {/* Right Visual Workstation Display */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#203B70] shadow-2xl bg-[#00002A] group">
              <img 
                src={HERO_IMAGE} 
                alt="CutCraft Workstation Studio" 
                className="w-full h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00002A] via-transparent to-transparent flex flex-col justify-end p-4">
                <div className="p-3 rounded-xl bg-[#0D1B46]/90 backdrop-blur-md border border-[#39E75F]/40 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#39E75F] flex items-center justify-center text-[#00002A]">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-white">Smart Clips Pipeline</div>
                      <div className="text-[10px] text-[#39E75F] font-mono">Highlights · 9:16 Reframe · Viral Captions</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#183566] text-[#39E75F] border border-[#203B70]">
                    60 FPS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "What do you want to create today?" 6 Interactive Cards */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            What do you want to create today?
          </h2>
          <p className="text-xs text-[#A8BEDF] mt-0.5">
            Choose a starting point or jump right into your favourite creative tool.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Turn Long Videos Into Shorts */}
          <button
            onClick={() => onNavigate('smart-clips')}
            className="p-5 rounded-2xl bg-[#0D1B46] hover:bg-[#112653] border border-[#203B70] hover:border-[#39E75F] text-left transition-all duration-200 group cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(57,231,95,0.15)] flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#112653] group-hover:bg-[#183566] border border-[#203B70] group-hover:border-[#39E75F] flex items-center justify-center text-[#39E75F] transition-all mb-4">
                <Scissors className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#39E75F] transition-colors">
                Turn Long Videos Into Shorts
              </h3>
              <p className="text-xs text-[#A8BEDF] mt-1.5 leading-relaxed">
                Automatically identify highlights, create vertical clips, add captions, and prepare social-ready content.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#203B70] flex items-center justify-between text-xs font-semibold text-[#39E75F]">
              <span>Upload Video</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 2: Generate an AI Video */}
          <button
            onClick={() => onNavigate('ai-video')}
            className="p-5 rounded-2xl bg-[#0D1B46] hover:bg-[#112653] border border-[#203B70] hover:border-[#00D9FF] text-left transition-all duration-200 group cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(0,217,255,0.15)] flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#112653] group-hover:bg-[#183566] border border-[#203B70] group-hover:border-[#00D9FF] flex items-center justify-center text-[#00D9FF] transition-all mb-4">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#00D9FF] transition-colors">
                Generate an AI Video
              </h3>
              <p className="text-xs text-[#A8BEDF] mt-1.5 leading-relaxed">
                Transform text prompts or reference images into AI-assisted video content with cinematic camera motion.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#203B70] flex items-center justify-between text-xs font-semibold text-[#00D9FF]">
              <span>Open Prompt Studio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 3: Enhance My Video */}
          <button
            onClick={() => onNavigate('nvidia-lab')}
            className="p-5 rounded-2xl bg-[#0D1B46] hover:bg-[#112653] border border-[#203B70] hover:border-[#39E75F] text-left transition-all duration-200 group cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(57,231,95,0.15)] flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#112653] group-hover:bg-[#183566] border border-[#203B70] group-hover:border-[#39E75F] flex items-center justify-center text-[#39E75F] transition-all mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#39E75F] transition-colors">
                Enhance My Video
              </h3>
              <p className="text-xs text-[#A8BEDF] mt-1.5 leading-relaxed">
                Improve visual presentation using supported RTX enhancement tools, 4K upscaling, denoising, and sharpening.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#203B70] flex items-center justify-between text-xs font-semibold text-[#39E75F]">
              <span>NVIDIA RTX Lab</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 4: Create AI Images & Thumbnails */}
          <button
            onClick={() => onNavigate('image-studio')}
            className="p-5 rounded-2xl bg-[#0D1B46] hover:bg-[#112653] border border-[#203B70] hover:border-[#8B5CFF] text-left transition-all duration-200 group cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(139,92,255,0.15)] flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#112653] group-hover:bg-[#183566] border border-[#203B70] group-hover:border-[#8B5CFF] flex items-center justify-center text-[#8B5CFF] transition-all mb-4">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#8B5CFF] transition-colors">
                Create AI Images & Thumbnails
              </h3>
              <p className="text-xs text-[#A8BEDF] mt-1.5 leading-relaxed">
                Generate high-CTR YouTube thumbnails, backgrounds, concept art, and high-impact social media graphics.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#203B70] flex items-center justify-between text-xs font-semibold text-[#8B5CFF]">
              <span>Thumbnail Studio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 5: Add Captions & Effects */}
          <button
            onClick={() => onNavigate('editor')}
            className="p-5 rounded-2xl bg-[#0D1B46] hover:bg-[#112653] border border-[#203B70] hover:border-[#39E75F] text-left transition-all duration-200 group cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(57,231,95,0.15)] flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#112653] group-hover:bg-[#183566] border border-[#203B70] group-hover:border-[#39E75F] flex items-center justify-center text-[#39E75F] transition-all mb-4">
                <Type className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#39E75F] transition-colors">
                Add Captions & Effects
              </h3>
              <p className="text-xs text-[#A8BEDF] mt-1.5 leading-relaxed">
                Generate subtitles, animate keywords with Viral Green presets, and customize fonts, stroke, and karaoke glow.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#203B70] flex items-center justify-between text-xs font-semibold text-[#39E75F]">
              <span>Caption Playground</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 6: Explore Creator Templates */}
          <button
            onClick={() => onNavigate('templates')}
            className="p-5 rounded-2xl bg-[#0D1B46] hover:bg-[#112653] border border-[#203B70] hover:border-[#00D9FF] text-left transition-all duration-200 group cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(0,217,255,0.15)] flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#112653] group-hover:bg-[#183566] border border-[#203B70] group-hover:border-[#00D9FF] flex items-center justify-center text-[#00D9FF] transition-all mb-4">
                <LayoutTemplate className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#00D9FF] transition-colors">
                Explore Creator Templates
              </h3>
              <p className="text-xs text-[#A8BEDF] mt-1.5 leading-relaxed">
                Start with professionally designed layouts for Reels, Shorts, TikTok, YouTube, tutorials, podcasts, and gaming.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#203B70] flex items-center justify-between text-xs font-semibold text-[#00D9FF]">
              <span>14+ Templates</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </section>

      {/* Presetly Creator Suite & Academy Discovery Hub */}
      <section className="p-6 rounded-3xl bg-gradient-to-r from-[#0D1B46] via-[#112653] to-[#00002A] border border-[#203B70] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#183566] text-[#39E75F] border border-[#203B70] text-[11px] font-semibold mb-1">
              <Sparkles className="w-3 h-3 text-[#39E75F]" />
              <span>New Creator Suite · Learn & Grow</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">Presetly Creator Academy & Copilot</h2>
            <p className="text-xs text-[#A8BEDF] mt-0.5">Master modern video editing, viral hooks, and prompt crafting with guided modules</p>
          </div>
          <button
            onClick={() => onNavigate('academy')}
            className="px-4 py-2 rounded-xl bg-[#39E75F] hover:bg-[#32d854] text-[#00002A] font-bold text-xs flex items-center gap-1.5 transition-all self-start sm:self-auto cursor-pointer shadow-[0_0_12px_rgba(57,231,95,0.3)]"
          >
            <span>Open Creator Academy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
          <button
            onClick={() => onNavigate('wizard')}
            className="p-3 rounded-xl bg-[#0D1B46] hover:bg-[#112653] border border-[#203B70] hover:border-[#39E75F] text-left transition-all cursor-pointer group"
          >
            <div className="text-[10px] font-mono text-[#39E75F] mb-1">Step-by-Step</div>
            <div className="font-bold text-xs text-white group-hover:text-[#39E75F]">First Video Wizard</div>
            <div className="text-[10px] text-[#A8BEDF] mt-1">Make video in 3 mins</div>
          </button>

          <button
            onClick={() => onNavigate('mentor')}
            className="p-3 rounded-xl bg-[#0D1B46] hover:bg-[#112653] border border-[#203B70] hover:border-[#39E75F] text-left transition-all cursor-pointer group"
          >
            <div className="text-[10px] font-mono text-[#39E75F] mb-1">AI Copilot</div>
            <div className="font-bold text-xs text-white group-hover:text-[#39E75F]">Creator Mentor</div>
            <div className="text-[10px] text-[#A8BEDF] mt-1">Get real-time answers</div>
          </button>

          <button
            onClick={() => onNavigate('idea-lab')}
            className="p-3 rounded-xl bg-[#0D1B46] hover:bg-[#112653] border border-[#203B70] hover:border-[#8B5CFF] text-left transition-all cursor-pointer group"
          >
            <div className="text-[10px] font-mono text-[#8B5CFF] mb-1">Viral Hooks</div>
            <div className="font-bold text-xs text-white group-hover:text-[#8B5CFF]">Creator Idea Lab</div>
            <div className="text-[10px] text-[#A8BEDF] mt-1">Script outlines & hooks</div>
          </button>

          <button
            onClick={() => onNavigate('coach')}
            className="p-3 rounded-xl bg-[#0D1B46] hover:bg-[#112653] border border-[#203B70] hover:border-[#F5C76A] text-left transition-all cursor-pointer group"
          >
            <div className="text-[10px] font-mono text-[#F5C76A] mb-1">Video Audit</div>
            <div className="font-bold text-xs text-white group-hover:text-[#F5C76A]">AI Video Coach</div>
            <div className="text-[10px] text-[#A8BEDF] mt-1">Retention scorecard</div>
          </button>

          <button
            onClick={() => onNavigate('starter-kits')}
            className="p-3 rounded-xl bg-[#0D1B46] hover:bg-[#112653] border border-[#203B70] hover:border-[#39E75F] text-left transition-all cursor-pointer group"
          >
            <div className="text-[10px] font-mono text-[#39E75F] mb-1">Free Packs</div>
            <div className="font-bold text-xs text-white group-hover:text-[#39E75F]">Free Starter Kits</div>
            <div className="text-[10px] text-[#A8BEDF] mt-1">SFX, LUTs, Presets</div>
          </button>

          <button
            onClick={() => onNavigate('portfolio')}
            className="p-3 rounded-xl bg-[#0D1B46] hover:bg-[#112653] border border-[#203B70] hover:border-[#00D9FF] text-left transition-all cursor-pointer group"
          >
            <div className="text-[10px] font-mono text-[#00D9FF] mb-1">Showreel</div>
            <div className="font-bold text-xs text-white group-hover:text-[#00D9FF]">Creator Portfolio</div>
            <div className="text-[10px] text-[#A8BEDF] mt-1">Public showcase link</div>
          </button>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">Recent Projects</h2>
            <p className="text-xs text-[#A8BEDF] mt-0.5">Pick up right where you left off</p>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="text-xs font-semibold text-[#39E75F] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INITIAL_PROJECTS.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="rounded-2xl bg-[#0D1B46] border border-[#203B70] hover:border-[#39E75F] overflow-hidden transition-all group cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(57,231,95,0.15)]"
            >
              <div className="relative aspect-video bg-[#00002A] overflow-hidden">
                <img 
                  src={project.thumbnailUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#00002A]/80 backdrop-blur-md text-[9px] font-mono text-[#39E75F] border border-[#203B70]">
                  {project.aspectRatio}
                </div>
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-[#00002A]/80 backdrop-blur-md text-[9px] font-mono text-white flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5 text-[#39E75F]" />
                  <span>{project.duration}</span>
                </div>
              </div>

              <div className="p-3">
                <h4 className="font-semibold text-xs text-white truncate group-hover:text-[#39E75F] transition-colors">
                  {project.title}
                </h4>
                <div className="flex items-center justify-between text-[10px] text-[#A8BEDF] mt-2">
                  <span>{project.lastEdited}</span>
                  <span className="font-mono text-[#39E75F]">{project.fileSize}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Templates Carousel */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-[#39E75F]" />
            <h2 className="text-xl font-bold tracking-tight text-white">Trending Creator Presets</h2>
          </div>
          <button
            onClick={() => onNavigate('templates')}
            className="text-xs font-semibold text-[#00D9FF] hover:underline cursor-pointer"
          >
            Explore All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CREATOR_TEMPLATES.slice(0, 3).map((template) => (
            <div
              key={template.id}
              onClick={() => onSelectTemplate(template)}
              className="rounded-2xl bg-[#0D1B46] border border-[#203B70] hover:border-[#00D9FF] overflow-hidden transition-all group cursor-pointer shadow-md"
            >
              <div className="relative aspect-video bg-[#00002A] overflow-hidden">
                <img 
                  src={template.thumbnailUrl} 
                  alt={template.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#00002A]/80 backdrop-blur-md text-[9px] font-mono text-[#00D9FF] border border-[#203B70]">
                  {template.category}
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-semibold text-xs text-white truncate group-hover:text-[#00D9FF] transition-colors">
                  {template.title}
                </h4>
                <p className="text-[10px] text-[#A8BEDF] mt-1 line-clamp-1">
                  {template.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Beginner Checklist & Hardware Capabilities */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Beginner Checklist */}
        <div className="p-5 rounded-2xl bg-[#0D1B46] border border-[#203B70] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white">Getting Started Checklist</h3>
            <span className="text-[10px] font-mono text-[#39E75F]">3 of 4 Completed</span>
          </div>
          <div className="space-y-2">
            {[
              { text: 'Set up NVIDIA hardware acceleration', done: true },
              { text: 'Select your preferred creator caption style', done: true },
              { text: 'Synchronize Presetly AI studio engine', done: true },
              { text: 'Export your first 9:16 viral short clip', done: false },
            ].map((task, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2.5 p-2 rounded-xl bg-[#00002A] text-xs border border-[#203B70]/50"
              >
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${task.done ? 'bg-[#39E75F] text-[#00002A]' : 'border border-[#A8BEDF] text-transparent'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className={task.done ? 'text-white' : 'text-[#A8BEDF]'}>{task.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Capabilities Summary */}
        <div className="p-5 rounded-2xl bg-[#0D1B46] border border-[#203B70] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white">System & Hardware Acceleration</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#183566] text-[#39E75F] border border-[#203B70]">
              RTX 4090 ACTIVE
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-2 rounded-xl bg-[#00002A] flex items-center justify-between border border-[#203B70]/50">
              <span className="text-[#A8BEDF]">Encoder Engine</span>
              <span className="font-mono text-white">NVENC Dual AV1 / H.264 (60 FPS)</span>
            </div>
            <div className="p-2 rounded-xl bg-[#00002A] flex items-center justify-between border border-[#203B70]/50">
              <span className="text-[#A8BEDF]">AI Transcription</span>
              <span className="font-mono text-[#39E75F]">Local Whisper & Gemini 3.8</span>
            </div>
            <div className="p-2 rounded-xl bg-[#00002A] flex items-center justify-between border border-[#203B70]/50">
              <span className="text-[#A8BEDF]">Privacy Guarantee</span>
              <span className="font-mono text-[#00D9FF]">100% On-Device by default</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
