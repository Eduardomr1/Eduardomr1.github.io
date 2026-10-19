import React from 'react';
import { PHILOSOPHY_PILLARS } from '../data/projectsData';
import { ShieldAlert, Cpu, GitCommit, LineChart } from 'lucide-react';
import { CADCrosshair, VentilationGrille } from './OperatorPrimitives';

export const PhilosophySection: React.FC = () => {
  const icons = [ShieldAlert, Cpu, GitCommit, LineChart];

  return (
    <section id="filosofia" className="py-24 bg-[#0D0F14] relative border-t border-[#1C222D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1C222D]">
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#00E5FF] uppercase tracking-wider block">
              [02 // MANIFIESTO DE INGENIERÍA & QA]
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC]">
              Principios de Construcción de Software
            </h2>
            <p className="text-sm text-[#94A3B8] max-w-xl">
              Criterios no negociables aplicados a cada línea de código, arquitectura de pruebas y decisión de dependencias.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <VentilationGrille slots={4} className="hidden sm:flex w-16" />
            <CADCrosshair size={18} />
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {PHILOSOPHY_PILLARS.map((pillar, idx) => {
            const Icon = icons[idx];
            return (
              <div
                key={pillar.number}
                className="relative bg-[#11141C] border border-[#202735] rounded-xl p-7 flex flex-col justify-between hover:border-[#00E5FF]/40 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#1C2330]">
                    <span className="font-mono text-2xl font-bold text-[#00E5FF]/80 group-hover:text-[#00E5FF] transition-colors">
                      {pillar.number}
                    </span>
                    <div className="p-2.5 rounded-lg bg-[#171C26] border border-[#242E3D] text-[#38BDF8]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-[#F1F5F9] leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 text-xs font-mono text-[#38BDF8]">
                    {pillar.subtitle}
                  </p>

                  <p className="mt-4 text-sm text-[#94A3B8] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1C2330] flex items-center justify-between font-mono text-[11px] text-[#64748B]">
                  <span>CRITERIO // APLICADO EN PRODUCCIÓN</span>
                  <span className="text-[#10B981]">VERIFICADO</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
