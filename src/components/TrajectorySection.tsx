import React from 'react';
import { TIMELINE_EXPERIENCE } from '../data/projectsData';
import { Briefcase, Users, Award, MapPin, CheckCircle2 } from 'lucide-react';
import { CADCrosshair, VentilationGrille } from './OperatorPrimitives';

export const TrajectorySection: React.FC = () => {
  return (
    <section id="trayectoria" className="py-24 bg-[#0D0F14] relative border-t border-[#1C222D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1C222D]">
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#00E5FF] uppercase tracking-wider block">
              [04 // TRAYECTORIA & LIDERAZGO TÉCNICO]
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC]">
              Experiencia Verificable
            </h2>
            <p className="text-sm text-[#94A3B8] max-w-xl">
              Coordinación técnica de equipos, arquitectura de pruebas desatendidas y entrega de software robusto.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <VentilationGrille slots={4} className="hidden sm:flex w-16" />
            <CADCrosshair size={18} />
          </div>
        </div>

        {/* Highlight Stats Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-10">
          <div className="p-5 rounded-lg bg-[#11141C] border border-[#1E2534] flex items-center gap-4">
            <div className="p-3 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-2xl font-bold text-[#F1F5F9]">4 a 7</span>
              <span className="block text-xs font-mono text-[#94A3B8]">Ingenieros coordinados</span>
            </div>
          </div>

          <div className="p-5 rounded-lg bg-[#11141C] border border-[#1E2534] flex items-center gap-4">
            <div className="p-3 rounded-lg bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-2xl font-bold text-[#F1F5F9]">6</span>
              <span className="block text-xs font-mono text-[#94A3B8]">Desarrolladores capacitados</span>
            </div>
          </div>

          <div className="p-5 rounded-lg bg-[#11141C] border border-[#1E2534] flex items-center gap-4">
            <div className="p-3 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-2xl font-bold text-[#F1F5F9]">3</span>
              <span className="block text-xs font-mono text-[#94A3B8]">Productos simultáneos</span>
            </div>
          </div>
        </div>

        {/* Timeline Items */}
        <div className="space-y-8 mt-6">
          {TIMELINE_EXPERIENCE.map((exp, idx) => (
            <div
              key={idx}
              className="relative bg-[#11151E] border border-[#202836] rounded-xl p-7 hover:border-[#00E5FF]/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#1A212D]">
                <div>
                  <span className="text-xs font-mono text-[#00E5FF] font-bold block mb-1">
                    {exp.period}
                  </span>
                  <h3 className="text-xl font-bold text-[#F8FAFC]">
                    {exp.role}
                  </h3>
                  <span className="text-sm font-medium text-[#94A3B8]">
                    {exp.organization}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
                  <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>{exp.location}</span>
                </div>
              </div>

              <div className="mt-4">
                <span className="text-xs font-mono uppercase text-[#64748B] block mb-2">
                  Alcance Operativo:
                </span>
                <p className="text-sm text-[#CBD5E1] mb-5">
                  {exp.scope}
                </p>

                <span className="text-xs font-mono uppercase text-[#64748B] block mb-3">
                  Logros & Responsabilidades Técnicas:
                </span>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {exp.achievements.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2.5 text-xs text-[#94A3B8] leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
