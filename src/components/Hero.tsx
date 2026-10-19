import React, { useState } from 'react';
import { ArrowDown, Terminal, ShieldCheck, Activity, Copy, Check, Cpu } from 'lucide-react';
import { VentilationGrille, CADCrosshair, LEDIndicator } from './OperatorPrimitives';

interface HeroProps {
  onOpenTerminal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  const [copied, setCopied] = useState(false);
  const commandText = 'gh repo list Eduardomr1 --public';

  const handleCopy = () => {
    navigator.clipboard.writeText(commandText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-cad-grid">
      {/* Background radial gradient glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-[#00E5FF]/5 blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Chassis Spec Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#1E242E]">
          <div className="flex items-center gap-3">
            <CADCrosshair size={18} className="text-[#00E5FF]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#94A3B8]">
              OPERATOR // ARCHIVE ID: <span className="text-[#F1F5F9] font-bold">EM-SYS-2026</span>
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono uppercase bg-[#141820] text-[#10B981] border border-[#10B981]/30 rounded">
              VERIFIED REPOS
            </span>
          </div>

          <div className="flex items-center gap-4">
            <VentilationGrille slots={4} className="hidden sm:flex w-16" />
            <LEDIndicator status="nominal" label="CI/CD PIPELINES ACTIVE" />
          </div>
        </div>

        {/* Hero Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10141B] border border-[#202836] font-mono text-xs text-[#00E5FF]">
              <Cpu className="w-3.5 h-3.5" />
              <span>Software Engineer / Mobile & QA Engineer</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.12]">
              Sistemas distribuidos, móviles y{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#38BDF8] to-[#10B981]">
                arquitecturas Local-First
              </span>{' '}
              con pruebas que no mienten.
            </h1>

            <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl leading-relaxed">
              Hola, soy <strong className="text-[#F1F5F9]">Eduardo Maytorena</strong>. Software Engineer con experiencia full-stack 
              especializado en sistemas distribuidos y móviles con arquitecturas Local-First. Aplico estándares rigurosos de ingeniería—incluyendo 
              análisis estático de AST del compilador, tipado estricto y suites completas de pruebas unitarias y de integración—para construir software escalable, tolerante a fallos y de alto rendimiento.
            </p>

            {/* Quick Interactive Command Copier */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-2 bg-[#0E1116] border border-[#222936] rounded-md px-3.5 py-2 font-mono text-xs text-[#E2E8F0] shadow-inner">
                <span className="text-[#10B981] select-none">$</span>
                <span className="text-[#94A3B8]">{commandText}</span>
                <button
                  onClick={handleCopy}
                  className="ml-3 p-1 rounded hover:bg-[#1A202C] text-[#64748B] hover:text-[#00E5FF] transition-colors focus:outline-none"
                  title="Copiar comando al portapapeles"
                  aria-label="Copiar comando"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <span className="text-xs font-mono text-[#475569]">
                {copied ? '¡Copiado!' : 'Explora mis repositorios en GitHub CLI'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#proyectos"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-mono text-xs font-bold uppercase tracking-wider bg-[#00E5FF] text-[#090D14] hover:bg-[#38BDF8] transition-all shadow-[0_0_20px_rgba(0,229,255,0.25)]"
              >
                <span>Inspeccionar Proyectos</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-mono text-xs font-bold uppercase tracking-wider bg-[#12161E] text-[#E2E8F0] border border-[#27303F] hover:border-[#00E5FF]/50 hover:text-[#00E5FF] transition-all"
              >
                <Terminal className="w-4 h-4 text-[#00E5FF]" />
                <span>Ejecutar CLI Playground</span>
              </button>
            </div>
          </div>

          {/* Right Column: Industrial Telemetry Widget Card */}
          <div className="lg:col-span-4">
            <div className="relative bg-[#0E1116] border border-[#222938] rounded-xl p-6 shadow-2xl space-y-5">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#1E2532]">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#00E5FF]" />
                  <span className="font-mono text-xs font-bold text-[#F1F5F9] uppercase tracking-wider">
                    Core Engineering Metrics
                  </span>
                </div>
                <CADCrosshair size={16} />
              </div>

              {/* 4 Telemetry Metrics Grid */}
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-[#141822] border border-[#202836] flex items-center justify-between">
                  <div>
                    <span className="block text-[11px] font-mono text-[#94A3B8] uppercase">ACCESIBILIDAD AUDITADA</span>
                    <span className="font-mono text-lg font-bold text-[#10B981]">100% WCAG 2.1 AA</span>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-[#10B981]" />
                </div>

                <div className="p-3 rounded-lg bg-[#141822] border border-[#202836] flex items-center justify-between">
                  <div>
                    <span className="block text-[11px] font-mono text-[#94A3B8] uppercase">BENCHMARK BM25 VS LINEAL</span>
                    <span className="font-mono text-lg font-bold text-[#00E5FF]">234x Speedup</span>
                  </div>
                  <span className="font-mono text-xs text-[#38BDF8]">1.3 ms / 20k docs</span>
                </div>

                <div className="p-3 rounded-lg bg-[#141822] border border-[#202836] flex items-center justify-between">
                  <div>
                    <span className="block text-[11px] font-mono text-[#94A3B8] uppercase">SUITES SIN MOCKS</span>
                    <span className="font-mono text-lg font-bold text-[#F59E0B]">127 Tests Verdes</span>
                  </div>
                  <span className="font-mono text-xs text-[#FBBF24]">17 Suites CI</span>
                </div>

                <div className="p-3 rounded-lg bg-[#141822] border border-[#202836] flex items-center justify-between">
                  <div>
                    <span className="block text-[11px] font-mono text-[#94A3B8] uppercase">HYPERLOGLOG ESPACIO FIJO</span>
                    <span className="font-mono text-lg font-bold text-[#E2E8F0]">12 KB Constante</span>
                  </div>
                  <span className="font-mono text-xs text-[#94A3B8]">16,384 Regs</span>
                </div>
              </div>

              {/* Telemetry Footer */}
              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-[#64748B] border-t border-[#1E2532]">
                <span>ENFOQUE // ZERO MOCKS</span>
                <span className="text-[#00E5FF]">ALL CHECKS PASSING</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
