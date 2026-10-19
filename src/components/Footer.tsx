import React, { useState } from 'react';
import { Mail, Copy, Check, ArrowUp } from 'lucide-react';
import { LEDIndicator, CADCrosshair } from './OperatorPrimitives';
import { GithubIcon } from './Icons';

export const Footer: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const email = 'eduardo_maytorenar@outlook.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contacto" className="bg-[#08090C] border-t border-[#1C222C] text-[#94A3B8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Contact Banner Card */}
        <div className="relative bg-[#0D1016] border border-[#222A38] rounded-2xl p-8 sm:p-12 mb-16 overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
            <CADCrosshair size={120} />
          </div>

          <div className="relative z-10 max-w-2xl space-y-4">
            <LEDIndicator status="nominal" label="DISPONIBLE PARA NUEVOS RETOS" />
            
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC]">
              ¿Construyendo software crítico donde la calidad no es opcional?
            </h2>

            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              Abierto a oportunidades como Software Engineer, QA Automation Lead o Systems Engineer.
              Si buscas a alguien que entienda el código que prueba, automatice sin mocks innecesarios y lidere con métricas claras, conversemos.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-mono text-xs font-bold bg-[#00E5FF] text-[#080A0F] hover:bg-[#38BDF8] transition-all shadow-[0_0_20px_rgba(0,229,255,0.25)]"
              >
                <Mail className="w-4 h-4" />
                <span>Enviar Correo</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-md font-mono text-xs bg-[#141822] text-[#E2E8F0] border border-[#232C3D] hover:border-[#00E5FF]/40 transition-colors"
                aria-label="Copiar dirección de correo"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-[#10B981]" />
                    <span className="text-[#10B981]">Correo Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar: {email}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Metadata & Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-[#1C222C] font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded bg-[#12151B] border border-[#202735] flex items-center justify-center font-bold text-[10px] text-[#00E5FF]">
              EM
            </span>
            <span className="text-[#CBD5E1]">Eduardo Maytorena</span>
            <span className="text-[#475569]">·</span>
            <span className="text-[#64748B]">Culiacán, Sinaloa, México</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/Eduardomr1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00E5FF] transition-colors flex items-center gap-1.5"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="hover:text-[#00E5FF] transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-[#121620] border border-[#202836] text-[#94A3B8] hover:text-[#00E5FF] transition-colors"
              title="Volver arriba"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-[10px] font-mono text-[#475569]">
          OPERATOR THEME // ZERO MOCKS PHILOSOPHY // 2026 EDUARDO MAYTORENA
        </div>
      </div>
    </footer>
  );
};
