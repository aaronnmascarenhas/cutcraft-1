import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  Circle, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  Play, 
  Sparkles, 
  Film, 
  Scissors, 
  Video, 
  Image as ImageIcon, 
  Cpu, 
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { AcademyLesson, AcademyPath, NavigationPage } from '../types';
import { ACADEMY_PATHS } from '../data/mockData';

interface CreatorAcademyPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const CreatorAcademyPage: React.FC<CreatorAcademyPageProps> = ({ onNavigate }) => {
  const [paths, setPaths] = useState<AcademyPath[]>(ACADEMY_PATHS);
  const [activePathId, setActivePathId] = useState<string>('path-beginner');
  const [selectedLesson, setSelectedLesson] = useState<AcademyLesson>(ACADEMY_PATHS[0].lessons[0]);

  const currentPath = paths.find(p => p.id === activePathId) || paths[0];

  const handleToggleComplete = (lessonId: string) => {
    setPaths(prev => prev.map(p => ({
      ...p,
      lessons: p.lessons.map(l => l.id === lessonId ? { ...l, completed: !l.completed } : l)
    })));

    if (selectedLesson.id === lessonId) {
      setSelectedLesson(prev => ({ ...prev, completed: !prev.completed }));
    }
  };

  const currentLessonIndex = currentPath.lessons.findIndex(l => l.id === selectedLesson.id);
  const prevLesson = currentLessonIndex > 0 ? currentPath.lessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < currentPath.lessons.length - 1 ? currentPath.lessons[currentLessonIndex + 1] : null;

  // Calculate completion percentage
  const totalLessons = paths.flatMap(p => p.lessons).length;
  const completedLessons = paths.flatMap(p => p.lessons).filter(l => l.completed).length;
  const progressPct = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto text-[#F5F8FF]">
      {/* Academy Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#112653] border border-[#203B70] text-[#39E75F] text-xs font-semibold mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-[#39E75F]" />
            <span>Presetly Creator Academy</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            Creator Academy & Masterclasses
          </h1>
          <p className="text-xs md:text-sm text-[#A8BEDF] mt-1 max-w-2xl">
            Zero-to-hero lessons crafted for beginner creators. Learn a concept in 5 minutes and practice immediately in CutCraft.
          </p>
        </div>

        {/* Global Progress Bar */}
        <div className="p-3.5 rounded-2xl bg-[#0D1B46] border border-[#203B70] shrink-0 min-w-56 space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-[#A8BEDF] font-medium">Academy Progress</span>
            <span className="font-mono text-[#39E75F] font-bold">{progressPct}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#00002A] overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#39E75F] to-[#00D9FF] transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="text-[10px] text-[#A8BEDF] text-right">
            {completedLessons} of {totalLessons} lessons completed
          </div>
        </div>
      </div>

      {/* Path Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {paths.map((path) => {
          const isCurrent = path.id === activePathId;
          const completedCount = path.lessons.filter(l => l.completed).length;

          return (
            <button
              key={path.id}
              onClick={() => {
                setActivePathId(path.id);
                setSelectedLesson(path.lessons[0]);
              }}
              className={`p-3 rounded-xl border text-left shrink-0 transition-all cursor-pointer min-w-48 ${
                isCurrent
                  ? 'bg-[#183566] border-[#39E75F] shadow-[0_0_15px_rgba(57,231,95,0.2)]'
                  : 'bg-[#0D1B46] border-[#203B70] hover:border-[#39E75F]/50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#112653] text-[#39E75F] border border-[#203B70]">
                  {path.badge}
                </span>
                <span className="text-[10px] font-mono text-[#A8BEDF]">
                  {completedCount}/{path.lessons.length}
                </span>
              </div>
              <div className="font-bold text-xs text-white">{path.name}</div>
            </button>
          );
        })}
      </div>

      {/* Main Lesson Viewport Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Lessons list for active path */}
        <div className="lg:col-span-4 p-4 rounded-2xl bg-[#0D1B46] border border-[#203B70] space-y-3">
          <div className="border-b border-[#203B70] pb-2">
            <h3 className="font-bold text-sm text-white">{currentPath.name}</h3>
            <p className="text-[11px] text-[#A8BEDF] mt-0.5">{currentPath.description}</p>
          </div>

          <div className="space-y-1.5">
            {currentPath.lessons.map((lesson, idx) => {
              const isSelected = lesson.id === selectedLesson.id;
              return (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-[#183566] border-[#39E75F] shadow-sm'
                      : 'bg-[#112653]/60 border-[#203B70] hover:border-[#39E75F]/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <span 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleComplete(lesson.id);
                      }}
                      className="cursor-pointer"
                    >
                      {lesson.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-[#39E75F] shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-[#7895BE] shrink-0" />
                      )}
                    </span>
                    <div className="truncate">
                      <div className="font-semibold text-xs text-white truncate">
                        {idx + 1}. {lesson.title}
                      </div>
                      <div className="text-[10px] text-[#A8BEDF] font-mono mt-0.5">
                        {lesson.duration} · {lesson.difficulty}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#7895BE] shrink-0" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Lesson Stage & Practical Exercise */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-[#0D1B46] border border-[#203B70] space-y-6">
          {/* Lesson Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#203B70] pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#112653] text-[#39E75F] border border-[#203B70]">
                  {selectedLesson.difficulty}
                </span>
                <span className="text-xs text-[#A8BEDF] font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#00D9FF]" />
                  {selectedLesson.duration}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                {selectedLesson.title}
              </h2>
            </div>

            <button
              onClick={() => handleToggleComplete(selectedLesson.id)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto ${
                selectedLesson.completed
                  ? 'bg-[#39E75F]/20 border-[#39E75F] text-[#39E75F]'
                  : 'bg-[#112653] border-[#203B70] text-[#A8BEDF] hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{selectedLesson.completed ? 'Completed' : 'Mark as Done'}</span>
            </button>
          </div>

          {/* Description & Objectives */}
          <div className="space-y-3">
            <p className="text-xs md:text-sm text-[#F5F8FF] leading-relaxed">
              {selectedLesson.description}
            </p>

            <div className="p-4 rounded-xl bg-[#00002A] border border-[#203B70] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#00D9FF]">
                Learning Objectives:
              </span>
              <ul className="space-y-1.5 text-xs text-[#A8BEDF]">
                {selectedLesson.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#39E75F] mt-1.5 shrink-0" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Practical Summary */}
          <div className="p-4 rounded-xl bg-[#112653] border border-[#203B70] space-y-1.5">
            <div className="text-xs font-bold text-[#F5F8FF] flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#39E75F]" />
              <span>Creator Rule of Thumb</span>
            </div>
            <p className="text-xs text-[#A8BEDF] leading-relaxed">
              {selectedLesson.practicalSummary}
            </p>
          </div>

          {/* Hands-On Exercise & Practice Button */}
          <div className="p-4 rounded-xl bg-[#00002A] border border-[#203B70] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#39E75F]">
                Hands-On Practice Exercise:
              </span>
              <span className="text-[10px] text-[#7895BE]">Practice on your machine</span>
            </div>

            <p className="text-xs text-[#A8BEDF]">
              {selectedLesson.exercise}
            </p>

            <button
              onClick={() => onNavigate(selectedLesson.targetTool)}
              className="w-full py-2.5 rounded-xl bg-[#39E75F] hover:bg-[#32d854] text-[#00002A] font-bold text-xs transition-all shadow-[0_0_15px_rgba(57,231,95,0.3)] flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>{selectedLesson.actionLabel}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Previous / Next Lesson Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[#203B70]">
            {prevLesson ? (
              <button
                onClick={() => setSelectedLesson(prevLesson)}
                className="flex items-center gap-1.5 text-xs text-[#A8BEDF] hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Prev: {prevLesson.title}</span>
              </button>
            ) : <div />}

            {nextLesson ? (
              <button
                onClick={() => setSelectedLesson(nextLesson)}
                className="flex items-center gap-1.5 text-xs text-[#39E75F] hover:underline font-semibold transition-colors cursor-pointer"
              >
                <span>Next: {nextLesson.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : <div />}
          </div>
        </div>
      </div>
    </div>
  );
};
