import React from 'react';
import { WORK_EXPERIENCE, EDUCATION_DATA, CERTIFICATIONS_DATA, TECHNICAL_SKILLS } from '../data/projectsData';
import { Briefcase, GraduationCap, Award, MapPin, CheckCircle2, Code2, Globe } from 'lucide-react';
import { CADCrosshair, VentilationGrille } from './OperatorPrimitives';

export const TrajectorySection: React.FC = () => {
  return (
    <section id="trayectoria" className="py-24 bg-[#0D0F14] relative border-t border-[#1C222D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1C222D]">
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#00E5FF] uppercase tracking-wider block">
              [04 // EXPERIENCIA PROFESIONAL & EDUCACIÓN]
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC]">
              Trayectoria de Ingeniería
            </h2>
            <p className="text-sm text-[#94A3B8] max-w-xl">
              Experiencia laboral en sistemas Local-First y móviles, formación académica y especialización técnica.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <VentilationGrille slots={4} className="hidden sm:flex w-16" />
            <CADCrosshair size={18} />
          </div>
        </div>

        {/* Work Experience */}
        <div className="mt-12 space-y-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00E5FF] uppercase tracking-wider">
            <Briefcase className="w-4 h-4" />
            <span>Experiencia Laboral</span>
          </div>

          {WORK_EXPERIENCE.map((exp, idx) => (
            <div
              key={idx}
              className="relative bg-[#11151E] border border-[#202836] rounded-xl p-7 hover:border-[#00E5FF]/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-[#1A212D]">
                <div>
                  <span className="text-xs font-mono text-[#00E5FF] font-bold block mb-1">
                    {exp.period}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#F8FAFC]">
                    {exp.role}
                  </h3>
                  <span className="text-base font-semibold text-[#38BDF8]">
                    {exp.company}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
                  <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>{exp.location}</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {exp.responsibilities.map((resp, rIdx) => (
                  <div key={rIdx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-1" />
                    <div>
                      <strong className="text-sm font-semibold text-[#E2E8F0] block">
                        {resp.title}
                      </strong>
                      <p className="text-xs text-[#94A3B8] leading-relaxed mt-0.5">
                        {resp.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technical Skills Matrix from CV */}
        <div className="mt-16 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00E5FF] uppercase tracking-wider">
            <Code2 className="w-4 h-4" />
            <span>Habilidades Técnicas & Stack</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TECHNICAL_SKILLS.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#11141C] border border-[#1E2534] rounded-lg p-5 flex flex-col justify-between"
              >
                <span className="font-mono text-xs font-bold text-[#00E5FF] uppercase block mb-2">
                  {item.category}
                </span>
                <p className="text-xs text-[#CBD5E1] leading-relaxed font-mono">
                  {item.skills}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00E5FF] uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>Educación</span>
            </div>

            <div className="space-y-4">
              {EDUCATION_DATA.map((edu, idx) => (
                <div
                  key={idx}
                  className="bg-[#11141C] border border-[#1E2534] rounded-lg p-5 space-y-1.5"
                >
                  <span className="font-mono text-xs text-[#00E5FF] font-semibold block">
                    {edu.period}
                  </span>
                  <h4 className="text-base font-bold text-[#F8FAFC]">
                    {edu.degree}
                  </h4>
                  <p className="text-xs text-[#94A3B8]">
                    {edu.institution}
                  </p>
                  <span className="text-[11px] font-mono text-[#64748B] block pt-1">
                    {edu.location}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Languages */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00E5FF] uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Certificaciones & Idiomas</span>
            </div>

            <div className="space-y-4">
              {CERTIFICATIONS_DATA.map((cert, idx) => (
                <div
                  key={idx}
                  className="bg-[#11141C] border border-[#1E2534] rounded-lg p-5 space-y-1"
                >
                  <span className="text-xs font-mono text-[#10B981] font-semibold block">
                    {cert.issuer}
                  </span>
                  <h4 className="text-base font-bold text-[#F8FAFC]">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {cert.desc}
                  </p>
                </div>
              ))}

              <div className="bg-[#11141C] border border-[#1E2534] rounded-lg p-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8]">
                  <Globe className="w-4 h-4" />
                  <span>Idiomas</span>
                </div>
                <p className="text-xs text-[#CBD5E1] font-mono leading-relaxed">
                  • <strong>Inglés:</strong> B2 Proficient <br />
                  • <strong>Español:</strong> Nativo <br />
                  • Nociones básicas de Francés, Chino Mandarín y Portugués.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
