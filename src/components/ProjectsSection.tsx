import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/projectsData';
import type { PortfolioProject, ProjectCategory } from '../types/portfolio';
import { ProjectCard } from './ProjectCard';
import { ProjectDrawer } from './ProjectDrawer';
import { VentilationGrille } from './OperatorPrimitives';
import { FolderGit2 } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (selectedCategory === 'all') return true;
    return project.category === selectedCategory;
  });

  const categories: { id: ProjectCategory; label: string; count: number }[] = [
    { id: 'all', label: 'Todos los Proyectos', count: PROJECTS_DATA.length },
    {
      id: 'qa-observability',
      label: 'QA & Observabilidad',
      count: PROJECTS_DATA.filter((p) => p.category === 'qa-observability').length,
    },
    {
      id: 'systems',
      label: 'Sistemas & Storage',
      count: PROJECTS_DATA.filter((p) => p.category === 'systems').length,
    },
    {
      id: 'security-ai',
      label: 'Seguridad & IA',
      count: PROJECTS_DATA.filter((p) => p.category === 'security-ai').length,
    },
    {
      id: 'mobile',
      label: 'Móvil Offline',
      count: PROJECTS_DATA.filter((p) => p.category === 'mobile').length,
    },
  ];

  return (
    <section id="proyectos" className="py-24 bg-[#0A0B0E] relative border-t border-[#1C222C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1C222C]">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00E5FF] uppercase tracking-wider">
              <FolderGit2 className="w-4 h-4" />
              <span>[01 // ARCHIVO DE INGENIERÍA]</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC]">
              Proyectos Destacados & Arquitectura
            </h2>
            <p className="text-sm text-[#94A3B8] max-w-xl">
              Cada proyecto aborda un problema real de infraestructura, aseguramiento de calidad o estructuras de datos con suites de pruebas verificables en CI.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <VentilationGrille slots={5} className="hidden sm:flex w-20" />
            <div className="font-mono text-xs text-[#64748B] text-right">
              <span>REGISTROS ACTIVOS: </span>
              <strong className="text-[#00E5FF]">{filteredProjects.length}</strong> / {PROJECTS_DATA.length}
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-8 pb-10">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-md font-mono text-xs transition-all focus:outline-none focus:ring-2 focus:ring-[#00E5FF] ${
                  isActive
                    ? 'bg-[#00E5FF] text-[#0A0B0D] font-bold shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                    : 'bg-[#121620] text-[#94A3B8] hover:text-[#F1F5F9] border border-[#202735] hover:border-[#38BDF8]/40'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelectProject={(proj) => setActiveProject(proj)}
            />
          ))}
        </div>
      </div>

      {/* Slide-over Spec Drawer */}
      <ProjectDrawer
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
