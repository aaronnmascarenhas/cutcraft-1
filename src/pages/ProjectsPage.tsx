import React, { useState } from 'react';
import { 
  FolderKanban, 
  Search, 
  Grid, 
  List, 
  Plus, 
  Clock, 
  Heart, 
  MoreVertical, 
  Trash2, 
  Copy, 
  Download, 
  Film, 
  Scissors, 
  Video, 
  Image as ImageIcon,
  HardDrive
} from 'lucide-react';
import { NavigationPage, Project, MediaAsset } from '../types';
import { INITIAL_PROJECTS, INITIAL_ASSETS } from '../data/mockData';

interface ProjectsPageProps {
  onOpenProject: (project: Project) => void;
  onNavigate: (page: NavigationPage) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onOpenProject,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'assets'>('projects');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [assets, setAssets] = useState<MediaAsset[]>(INITIAL_ASSETS);

  const filteredProjects = projects.filter(p => {
    const matchesFilter = filterType === 'all' || p.type === filterType;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleDuplicateProject = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    const newProj: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      title: `${project.title} (Copy)`,
      lastEdited: 'Just now'
    };
    setProjects(prev => [newProj, ...prev]);
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProjects(prev => prev.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto text-[#F4F7FF]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <FolderKanban className="w-7 h-7 text-[#39F56A]" />
            <span>My Projects & Asset Library</span>
          </h1>
          <p className="text-xs text-[#9BAFD0] mt-1">
            Organize, duplicate, and manage all your video edits, clips, and generated media assets.
          </p>
        </div>

        {/* Tab & New Project */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0A1230] border border-[#162B53]">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'projects' ? 'bg-[#162B53] text-[#39F56A]' : 'text-[#9BAFD0]'
              }`}
            >
              Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('assets')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'assets' ? 'bg-[#162B53] text-[#00D9FF]' : 'text-[#9BAFD0]'
              }`}
            >
              Assets ({assets.length})
            </button>
          </div>

          <button
            onClick={() => onNavigate('smart-clips')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#39F56A] hover:bg-[#31e05e] text-[#050817] font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {activeTab === 'projects' ? (
        <>
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-[#0A1230] border border-[#162B53]">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {['all', 'smart-clip', 'video', 'ai-video', 'thumbnail'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-colors cursor-pointer ${
                    filterType === t
                      ? 'bg-[#162B53] text-white border border-[#39F56A]/50'
                      : 'text-[#9BAFD0] hover:text-white'
                  }`}
                >
                  {t === 'all' ? 'All Formats' : t.replace('-', ' ')}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#9BAFD0] absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter projects..."
                  className="pl-8 pr-3 py-1.5 rounded-lg bg-[#050817] border border-[#1d356c] text-xs text-white placeholder-[#9BAFD0] focus:outline-none"
                />
              </div>

              <div className="flex items-center p-0.5 rounded-lg bg-[#050817] border border-[#162B53]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-[#162B53] text-[#39F56A]' : 'text-[#9BAFD0]'}`}
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-[#162B53] text-[#39F56A]' : 'text-[#9BAFD0]'}`}
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Projects View */}
          {filteredProjects.length === 0 ? (
            <div className="p-16 rounded-2xl bg-[#0A1230] border border-[#162B53] text-center space-y-3">
              <FolderKanban className="w-12 h-12 text-[#9BAFD0] mx-auto opacity-50" />
              <h3 className="font-bold text-base text-white">No projects found</h3>
              <p className="text-xs text-[#9BAFD0] max-w-sm mx-auto">
                Start by converting a long video to viral shorts or generating a new AI video clip.
              </p>
              <button
                onClick={() => onNavigate('smart-clips')}
                className="px-4 py-2 rounded-xl bg-[#39F56A] text-[#050817] font-bold text-xs"
              >
                Create First Clip
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => onOpenProject(project)}
                  className="rounded-2xl bg-[#0A1230] border border-[#162B53] hover:border-[#39F56A] overflow-hidden transition-all duration-200 group flex flex-col justify-between shadow-lg cursor-pointer"
                >
                  <div>
                    <div className="relative aspect-video bg-black overflow-hidden">
                      <img
                        src={project.thumbnailUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[9px] font-mono text-[#39F56A]">
                        {project.aspectRatio}
                      </div>

                      <button
                        onClick={(e) => toggleFavorite(project.id, e)}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white hover:text-rose-400"
                      >
                        <Heart className={`w-3.5 h-3.5 ${project.isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>

                      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono text-white flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 text-[#39F56A]" />
                        <span>{project.duration}</span>
                      </div>
                    </div>

                    <div className="p-3.5 space-y-1">
                      <h3 className="font-bold text-xs text-white group-hover:text-[#39F56A] transition-colors truncate">
                        {project.title}
                      </h3>
                      <div className="flex items-center justify-between text-[10px] text-[#9BAFD0]">
                        <span>{project.lastEdited}</span>
                        <span className="font-mono">{project.fileSize}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-3 pt-0 border-t border-[#14234b] flex items-center justify-between text-xs text-[#9BAFD0] mt-2">
                    <span className="text-[10px] uppercase font-mono text-[#00D9FF]">
                      {project.type}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => handleDuplicateProject(project, e)}
                        className="p-1.5 hover:text-white rounded hover:bg-[#101D40]"
                        title="Duplicate"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDeleteProject(project.id, e)}
                        className="p-1.5 hover:text-rose-400 rounded hover:bg-[#101D40]"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="p-2 rounded-2xl bg-[#0A1230] border border-[#162B53] divide-y divide-[#14234b]">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => onOpenProject(project)}
                  className="p-3 flex items-center justify-between gap-4 hover:bg-[#101D40] rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-10 rounded-lg overflow-hidden bg-black shrink-0">
                      <img src={project.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-white">{project.title}</div>
                      <div className="text-[10px] text-[#9BAFD0] font-mono mt-0.5">
                        {project.aspectRatio} · {project.duration} · Edited {project.lastEdited}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleDuplicateProject(project, e)}
                      className="p-2 text-[#9BAFD0] hover:text-white"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteProject(project.id, e)}
                      className="p-2 text-[#9BAFD0] hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        /* Asset Library View */
        <div className="p-6 rounded-2xl bg-[#0A1230] border border-[#162B53] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white">Media Assets & Raw Files</h3>
            <span className="text-xs text-[#9BAFD0] font-mono">Total on Disk: 263.5 MB</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {assets.map((asset) => (
              <div key={asset.id} className="p-3 rounded-xl bg-[#050817] border border-[#1d356c] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#101D40] text-[#39F56A]">
                    {asset.type}
                  </span>
                  <span className="text-[10px] text-[#9BAFD0] font-mono">{asset.size}</span>
                </div>
                <div className="font-semibold text-xs text-white truncate">{asset.name}</div>
                <div className="text-[10px] text-[#9BAFD0]">
                  Uploaded {asset.uploadedAt} {asset.duration ? `· ${asset.duration}` : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
