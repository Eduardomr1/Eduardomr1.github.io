import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, CheckCircle2, Copy, Check, Code2 } from 'lucide-react';
import type { PortfolioProject } from '../types/portfolio';
import { VentilationGrille, CADCrosshair } from './OperatorPrimitives';
import { GithubIcon } from './Icons';

interface ProjectDrawerProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

export const ProjectDrawer: React.FC<ProjectDrawerProps> = ({ project, onClose }) => {
  const [copiedCode, setCopiedCode] = React.useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Accessible Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.codeSnippet?.code) {
      navigator.clipboard.writeText(project.codeSnippet.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Detalles técnicos de ${project.title}`}
      className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200"
    >
      {/* Dimmed backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Sheet */}
      <div
        ref={drawerRef}
        className="relative w-full max-w-2xl bg-[#0D1016] border-l border-[#242C3A] h-full overflow-y-auto shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="sticky top-0 bg-[#0D1016]/95 backdrop-blur-md border-b border-[#1E2532] px-6 py-5 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <CADCrosshair size={18} className="text-[#00E5FF]" />
            <div>
              <span className="font-mono text-xs text-[#00E5FF] font-bold tracking-widest block">
                {project.serialNumber}
              </span>
              <h2 className="font-bold text-lg text-[#F8FAFC]">
                {project.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <VentilationGrille slots={3} className="hidden sm:flex w-12" />
            <button
              onClick={onClose}
              className="p-2 rounded-md bg-[#161B24] border border-[#273142] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#00E5FF]/40 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00E5FF]"
              aria-label="Cerrar panel de especificaciones"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Body Content */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">
          {/* Subtitle & Role */}
          <div className="space-y-2">
            <p className="text-sm font-mono text-[#38BDF8]">
              {project.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#64748B]">
              <span>ROL: <strong className="text-[#94A3B8]">{project.role}</strong></span>
              <span>•</span>
              <span>AÑO: <strong className="text-[#94A3B8]">{project.year}</strong></span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded bg-[#18202E] text-[#00E5FF] border border-[#00E5FF]/20">
                {project.categoryLabel}
              </span>
            </div>
          </div>

          {/* Por qué se construyó (Architectural Motivation) */}
          <div className="bg-[#121620] border-l-4 border-[#00E5FF] p-4 rounded-r-md space-y-2">
            <span className="font-mono text-xs font-bold text-[#00E5FF] uppercase tracking-wider block">
              // MOTIVACIÓN & CAUSA RAÍZ
            </span>
            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              {project.whyBuilt}
            </p>
          </div>

          {/* Telemetry Metrics Grid */}
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#64748B] block mb-3">
              Métricas de Rendimiento & Cobertura
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#131722] border border-[#222B3B] rounded-md flex flex-col justify-between"
                >
                  <span className="text-[10px] font-mono text-[#94A3B8] uppercase block">
                    {metric.label}
                  </span>
                  <div className="mt-1">
                    <span className="font-mono text-base font-bold text-[#F1F5F9]">
                      {metric.value}
                    </span>
                    {metric.unit && (
                      <span className="block text-[10px] font-mono text-[#38BDF8]">
                        {metric.unit}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications Matrix */}
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#64748B] block">
              Especificaciones de Arquitectura
            </span>
            <div className="bg-[#121620] border border-[#222B3B] rounded-lg divide-y divide-[#1D2533] font-mono text-xs">
              <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-[#64748B]">STACK / RUNTIME</span>
                <span className="text-[#E2E8F0] font-medium">{project.specs.framework}</span>
              </div>
              <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-[#64748B]">PATRÓN ARQUITECTÓNICO</span>
                <span className="text-[#E2E8F0] font-medium">{project.specs.architecture}</span>
              </div>
              <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-[#64748B]">ESTRATEGIA DE PRUEBAS</span>
                <span className="text-[#10B981] font-medium">{project.specs.testingSuite}</span>
              </div>
              <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-[#64748B]">CUMPLIMIENTO & AUDITORÍA</span>
                <span className="text-[#00E5FF] font-medium">{project.specs.complianceOrPerf}</span>
              </div>
            </div>
          </div>

          {/* Highlights & Technical Accomplishments */}
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#64748B] block">
              Puntos Destacados de Ingeniería
            </span>
            <ul className="space-y-2.5">
              {project.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[#CBD5E1]">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code Snippet (if available) */}
          {project.codeSnippet && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
                  <Code2 className="w-4 h-4 text-[#00E5FF]" />
                  <span>{project.codeSnippet.filename}</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1A212E] hover:bg-[#252E40] text-[11px] font-mono text-[#E2E8F0] transition-colors"
                  aria-label="Copiar fragmento de código"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#10B981]" />
                      <span className="text-[#10B981]">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-[#08090C] border border-[#202735] rounded-lg p-4 overflow-x-auto font-mono text-xs text-[#E2E8F0] leading-relaxed">
                <pre>{project.codeSnippet.code}</pre>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded bg-[#141822] border border-[#202836] font-mono text-[11px] text-[#94A3B8]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Drawer Sticky Footer with CTA */}
        <div className="sticky bottom-0 bg-[#0D1016]/95 backdrop-blur-md border-t border-[#1E2532] p-5 flex items-center justify-between gap-4 z-20">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-md font-mono text-xs font-bold bg-[#00E5FF] text-[#090D14] hover:bg-[#38BDF8] transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)]"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Ver Repositorio en GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-md font-mono text-xs text-[#94A3B8] hover:text-[#F1F5F9] bg-[#141822] border border-[#232B3A] transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
