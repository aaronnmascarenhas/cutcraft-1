import React, { useState } from 'react';
import { AspectRatio, CaptionPreset, ClipSegment, NavigationPage, PortfolioItem, Project, TemplateItem } from './types';
import { CAPTION_PRESETS, PODCAST_IMAGE } from './data/mockData';

// Layout
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { RightInspector } from './components/layout/RightInspector';
import { BottomStatusBar } from './components/layout/BottomStatusBar';

// Modals
import { CommandPalette } from './components/modals/CommandPalette';
import { OnboardingModal } from './components/modals/OnboardingModal';
import { ExportModal } from './components/modals/ExportModal';
import { TemplatePreviewModal } from './components/modals/TemplatePreviewModal';

// Core Studio Pages
import { HomePage } from './pages/HomePage';
import { AiStudioPage } from './pages/AiStudioPage';
import { SmartClipsPage } from './pages/SmartClipsPage';
import { VideoEditorPage } from './pages/VideoEditorPage';
import { AiVideoGeneratorPage } from './pages/AiVideoGeneratorPage';
import { ImageStudioPage } from './pages/ImageStudioPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { NvidiaLabPage } from './pages/NvidiaLabPage';
import { SettingsPage } from './pages/SettingsPage';

// Creator Suite & Growth Pages
import { CreatorAcademyPage } from './pages/CreatorAcademyPage';
import { AiCreatorMentorPage } from './pages/AiCreatorMentorPage';
import { FirstVideoWizardPage } from './pages/FirstVideoWizardPage';
import { CreatorIdeaLabPage } from './pages/CreatorIdeaLabPage';
import { AiVideoCoachPage } from './pages/AiVideoCoachPage';
import { CreatorProgressPage } from './pages/CreatorProgressPage';
import { FreeStarterKitsPage } from './pages/FreeStarterKitsPage';
import { AiToolFinderPage } from './pages/AiToolFinderPage';
import { CreatorPortfolioPage } from './pages/CreatorPortfolioPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [selectedClip, setSelectedClip] = useState<ClipSegment | null>(null);
  const [selectedCaptionPreset, setSelectedCaptionPreset] = useState<CaptionPreset>(CAPTION_PRESETS[0]);
  const [rightInspectorOpen, setRightInspectorOpen] = useState(true);
  const [cloudBoost, setCloudBoost] = useState(false);

  // Modals state
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(null);
  const [exportModalState, setExportModalState] = useState<{
    isOpen: boolean;
    title: string;
    aspectRatio: AspectRatio;
  }>({
    isOpen: false,
    title: 'CutCraft Video Export',
    aspectRatio: '9:16',
  });

  // Handlers
  const handleOpenExportModal = (title: string, aspectRatio: AspectRatio) => {
    setExportModalState({
      isOpen: true,
      title,
      aspectRatio,
    });
  };

  const handleOpenClipInEditor = (clip: ClipSegment) => {
    setSelectedClip(clip);
    setCurrentPage('editor');
  };

  const handleSelectProject = (project: Project) => {
    setSelectedClip({
      id: project.id,
      title: project.title,
      startTime: 0,
      endTime: 30,
      duration: project.duration,
      score: 95,
      hookText: project.title,
      aspectRatio: project.aspectRatio,
      transcriptExcerpt: 'Project footage loaded into CutCraft multi-track timeline.',
      previewUrl: project.thumbnailUrl,
    });
    setCurrentPage('editor');
  };

  const handleSelectTemplate = (template: TemplateItem) => {
    // Find preset matching template style or default to first
    const preset = CAPTION_PRESETS.find(p => p.id === template.captionStyle) || CAPTION_PRESETS[0];
    setSelectedCaptionPreset(preset);

    setSelectedClip({
      id: `clip-${template.id}`,
      title: template.title,
      startTime: 0,
      endTime: 30,
      duration: template.duration,
      score: 96,
      hookText: 'Template style loaded',
      aspectRatio: template.aspectRatio,
      transcriptExcerpt: template.description,
      previewUrl: template.thumbnailUrl,
    });

    setCurrentPage('editor');
  };

  const handleSendAiVideoToEditor = (title: string, previewUrl: string, aspectRatio: AspectRatio) => {
    setSelectedClip({
      id: `ai-vid-${Date.now()}`,
      title,
      startTime: 0,
      endTime: 10,
      duration: '00:10',
      score: 92,
      hookText: 'AI Video Sequence',
      aspectRatio,
      transcriptExcerpt: 'AI Video generation output sequence.',
      previewUrl,
    });
    setCurrentPage('editor');
  };

  const handleFinishWizard = (clip: ClipSegment, captionPreset: CaptionPreset) => {
    setSelectedClip(clip);
    setSelectedCaptionPreset(captionPreset);
    setCurrentPage('editor');
  };

  const handleSaveIdeaAsProject = (title: string, hook: string) => {
    setSelectedClip({
      id: `idea-${Date.now()}`,
      title,
      startTime: 0,
      endTime: 30,
      duration: '00:30',
      score: 98,
      hookText: hook,
      aspectRatio: '9:16',
      transcriptExcerpt: `Viral Hook: ${hook}`,
      previewUrl: PODCAST_IMAGE,
    });
    setCurrentPage('editor');
  };

  const handleOpenPortfolioInEditor = (item: PortfolioItem) => {
    setSelectedClip({
      id: `port-${item.id}`,
      title: item.title,
      startTime: 0,
      endTime: 30,
      duration: '00:30',
      score: 98,
      hookText: item.title,
      aspectRatio: item.aspectRatio,
      transcriptExcerpt: item.description,
      previewUrl: item.thumbnailUrl,
    });
    setCurrentPage('editor');
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#00002A] font-sans antialiased text-[#F5F8FF] selection:bg-[#39E75F] selection:text-[#00002A]">
      {/* Top Application Header */}
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenOnboarding={() => setOnboardingOpen(true)}
        rightInspectorOpen={rightInspectorOpen}
        onToggleRightInspector={() => setRightInspectorOpen(!rightInspectorOpen)}
      />

      {/* Center Layout: Sidebar + Main Content + Right Inspector */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Navigation Sidebar */}
        <Sidebar
          currentPage={currentPage}
          onNavigate={setCurrentPage}
        />

        {/* Primary Content Viewport */}
        <main className="flex-1 overflow-y-auto no-scrollbar bg-[#00002A] relative">
          {/* Core Studio Views */}
          {currentPage === 'home' && (
            <HomePage
              onNavigate={setCurrentPage}
              onSelectProject={handleSelectProject}
              onSelectTemplate={handleSelectTemplate}
            />
          )}

          {currentPage === 'smart-clips' && (
            <SmartClipsPage
              onNavigate={setCurrentPage}
              onOpenClipInEditor={handleOpenClipInEditor}
              onOpenExportModal={handleOpenExportModal}
            />
          )}

          {currentPage === 'editor' && (
            <VideoEditorPage
              initialClip={selectedClip}
              onOpenExportModal={handleOpenExportModal}
              selectedCaptionPreset={selectedCaptionPreset}
              onSelectCaptionPreset={setSelectedCaptionPreset}
            />
          )}

          {currentPage === 'ai-video' && (
            <AiVideoGeneratorPage
              onOpenExportModal={handleOpenExportModal}
              onSendToEditor={handleSendAiVideoToEditor}
            />
          )}

          {currentPage === 'ai-studio' && (
            <AiStudioPage
              onNavigate={setCurrentPage}
            />
          )}

          {currentPage === 'image-studio' && (
            <ImageStudioPage />
          )}

          {currentPage === 'templates' && (
            <TemplatesPage
              onSelectTemplate={handleSelectTemplate}
              onPreviewTemplate={setPreviewTemplate}
            />
          )}

          {(currentPage === 'projects' || currentPage === 'assets') && (
            <ProjectsPage
              onOpenProject={handleSelectProject}
              onNavigate={setCurrentPage}
            />
          )}

          {currentPage === 'nvidia-lab' && (
            <NvidiaLabPage
              onNavigate={setCurrentPage}
            />
          )}

          {currentPage === 'settings' && (
            <SettingsPage />
          )}

          {/* New Creator Suite Views */}
          {currentPage === 'academy' && (
            <CreatorAcademyPage
              onNavigate={setCurrentPage}
            />
          )}

          {currentPage === 'mentor' && (
            <AiCreatorMentorPage
              onNavigate={setCurrentPage}
            />
          )}

          {currentPage === 'wizard' && (
            <FirstVideoWizardPage
              onNavigate={setCurrentPage}
              onFinishWizard={handleFinishWizard}
            />
          )}

          {currentPage === 'idea-lab' && (
            <CreatorIdeaLabPage
              onNavigate={setCurrentPage}
              onSaveIdeaAsProject={handleSaveIdeaAsProject}
            />
          )}

          {currentPage === 'coach' && (
            <AiVideoCoachPage
              onNavigate={setCurrentPage}
            />
          )}

          {currentPage === 'progress' && (
            <CreatorProgressPage
              onNavigate={setCurrentPage}
            />
          )}

          {currentPage === 'starter-kits' && (
            <FreeStarterKitsPage
              onNavigate={setCurrentPage}
            />
          )}

          {currentPage === 'tool-finder' && (
            <AiToolFinderPage
              onNavigate={setCurrentPage}
            />
          )}

          {currentPage === 'portfolio' && (
            <CreatorPortfolioPage
              onNavigate={setCurrentPage}
              onOpenInEditor={handleOpenPortfolioInEditor}
            />
          )}
        </main>

        {/* Right Collapsible Inspector Panel */}
        {rightInspectorOpen && (
          <RightInspector
            currentPage={currentPage}
            onClose={() => setRightInspectorOpen(false)}
            selectedCaptionPreset={selectedCaptionPreset}
            onSelectCaptionPreset={setSelectedCaptionPreset}
          />
        )}
      </div>

      {/* Persistent Bottom Status Bar (Electron & NVIDIA telemetry) */}
      <BottomStatusBar
        statusText="Ready"
        hardwareModel="NVIDIA RTX 4090 · 16 Cores"
        activeModel={currentPage === 'ai-studio' ? 'gemini-3.8-flash' : 'base'}
        encoder="NVENC AV1"
        cloudBoost={cloudBoost}
        onToggleCloudBoost={() => setCloudBoost(!cloudBoost)}
      />

      {/* Global Modals */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={setCurrentPage}
      />

      <OnboardingModal
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        onFinish={(targetPage) => {
          setOnboardingOpen(false);
          setCurrentPage(targetPage);
        }}
      />

      <ExportModal
        isOpen={exportModalState.isOpen}
        onClose={() => setExportModalState(prev => ({ ...prev, isOpen: false }))}
        title={exportModalState.title}
        aspectRatio={exportModalState.aspectRatio}
      />

      <TemplatePreviewModal
        template={previewTemplate}
        isOpen={Boolean(previewTemplate)}
        onClose={() => setPreviewTemplate(null)}
        onUseTemplate={handleSelectTemplate}
      />
    </div>
  );
}
