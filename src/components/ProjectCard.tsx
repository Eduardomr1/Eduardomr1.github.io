import React from 'react';
import { Code2, ArrowUpRight } from 'lucide-react';
import type { PortfolioProject } from '../types/portfolio';
import { CADCrosshair } from './OperatorPrimitives';
import { GithubIcon } from './Icons';

interface ProjectCardProps {
  project: PortfolioProject;
  onSelectProject: (project: PortfolioProject) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelectProject }) => {
  return (
    <article className="group relative bg-[#0D1016] border border-[#1E2533] hover:border-[#00E5FF]/40 rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_4px_30px_-4px_rgba(0,229,255,0.12)]">
      {/* Top Header Bar */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-[#1A202C]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold text-[#00E5FF] tracking-widest">
              {project.serialNumber}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#131822] text-[#94A3B8] border border-[#222B3B]">
              {project.categoryLabel}
            </span>
            <CADCrosshair size={14} />
          </div>
        </div>

        {/* Project Title & Subtitle */}
        <div className="mt-5 space-y-1.5">
          <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] group-hover:text-[#00E5FF] transition-colors flex items-center justify-between">
            <span>{project.title}</span>
            <ArrowUpRight className="w-5 h-5 text-[#475569] group-hover:text-[#00E5FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </h3>
          <p className="text-xs font-mono text-[#38BDF8]">
            {project.subtitle}
          </p>
        </div>

        {/* Summary */}
        <p className="mt-4 text-sm text-[#94A3B8] leading-relaxed line-clamp-3">
          {project.summary}
        </p>

        {/* 2 Key Metrics Callout Chips */}
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          {project.metrics.slice(0, 2).map((m, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded bg-[#11151D] border border-[#1E2534] flex flex-col justify-center"
            >
              <span className="text-[9px] font-mono text-[#64748B] uppercase block">
                {m.label}
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-mono text-sm font-bold text-[#F1F5F9]">
                  {m.value}
                </span>
                {m.unit && (
                  <span className="text-[10px] font-mono text-[#00E5FF]">
                    {m.unit}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer: Tags & Buttons */}
      <div className="mt-6 pt-5 border-t border-[#1A202C] space-y-4">
        {/* Top 4 Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141822] text-[#94A3B8] border border-[#1F2736]"
            >
              #{tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-[#64748B]">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5 pt-1">
          <button
            onClick={() => onSelectProject(project)}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-md font-mono text-xs font-semibold bg-[#161B24] hover:bg-[#00E5FF]/10 text-[#F1F5F9] hover:text-[#00E5FF] border border-[#273243] hover:border-[#00E5FF]/40 transition-all focus:outline-none focus:ring-2 focus:ring-[#00E5FF]"
          >
            <Code2 className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>Inspeccionar Specs</span>
          </button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md bg-[#161B24] hover:bg-[#202734] text-[#94A3B8] hover:text-[#F1F5F9] border border-[#273243] transition-colors"
            title="Ver código en GitHub"
            aria-label={`Ver código de ${project.title} en GitHub`}
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );
};
