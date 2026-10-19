import React, { useState, useEffect } from 'react';
import { Terminal, Mail, FileText, Menu, X } from 'lucide-react';
import { LEDIndicator } from './OperatorPrimitives';
import { GithubIcon } from './Icons';

interface NavbarProps {
  onOpenTerminal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0B0D]/90 backdrop-blur-md border-b border-[#1E232B] py-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5 border-b border-[#1E232B]/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand & Monogram */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#00E5FF] rounded text-left"
          aria-label="Ir al inicio"
        >
          <div className="w-8 h-8 rounded bg-[#12151B] border border-[#262D38] flex items-center justify-center font-mono font-bold text-xs text-[#00E5FF] group-hover:border-[#00E5FF] transition-colors shadow-[0_0_12px_rgba(0,229,255,0.15)]">
            EM
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold text-[#F1F5F9] tracking-wider uppercase group-hover:text-[#00E5FF] transition-colors">
              Eduardo Maytorena
            </span>
            <span className="text-[10px] font-mono text-[#64748B]">
              Systems & QA Lead
            </span>
          </div>
        </button>

        {/* Center: Live Telemetry Indicator (Desktop) */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#12151B] border border-[#1E242E]">
          <LEDIndicator status="nominal" label="SYSTEM_ONLINE" />
          <span className="text-[#334155] font-mono text-xs">|</span>
          <span className="font-mono text-[10px] text-[#94A3B8]">
            CULIACAN, MX · GMT-7
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 font-mono text-xs tracking-wider">
          <a
            href="#proyectos"
            className="text-[#94A3B8] hover:text-[#00E5FF] transition-colors py-1"
          >
            [01 // PROYECTOS]
          </a>
          <a
            href="#filosofia"
            className="text-[#94A3B8] hover:text-[#00E5FF] transition-colors py-1"
          >
            [02 // FILOSOFÍA]
          </a>
          <a
            href="#terminal"
            onClick={(e) => {
              if (onOpenTerminal) {
                e.preventDefault();
                onOpenTerminal();
              }
            }}
            className="text-[#94A3B8] hover:text-[#00E5FF] transition-colors py-1 flex items-center gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5 text-[#00E5FF]" />
            [03 // CLI LAB]
          </a>
          <a
            href="#trayectoria"
            className="text-[#94A3B8] hover:text-[#00E5FF] transition-colors py-1"
          >
            [04 // TRAYECTORIA]
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://github.com/Eduardomr1"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded bg-[#12151B] border border-[#222834] text-[#94A3B8] hover:text-[#00E5FF] hover:border-[#00E5FF]/40 transition-all"
            title="GitHub de Eduardo Maytorena"
            aria-label="GitHub de Eduardo Maytorena"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="mailto:eduardo_maytorenar@outlook.com"
            className="p-2 rounded bg-[#12151B] border border-[#222834] text-[#94A3B8] hover:text-[#00E5FF] hover:border-[#00E5FF]/40 transition-all"
            title="Enviar correo"
            aria-label="Enviar correo"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded font-mono text-xs font-semibold bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/40 hover:bg-[#00E5FF] hover:text-[#0A0B0D] transition-all shadow-[0_0_15px_rgba(0,229,255,0.15)]"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Contacto & CV</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded bg-[#12151B] border border-[#222834] text-[#94A3B8] hover:text-[#00E5FF]"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D0F13] border-b border-[#1E232B] px-6 py-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E232B]">
            <LEDIndicator status="nominal" label="SYSTEM_ONLINE" />
            <span className="font-mono text-xs text-[#64748B]">CULIACAN, MX</span>
          </div>
          <nav className="flex flex-col space-y-3 font-mono text-sm">
            <a
              href="#proyectos"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#94A3B8] hover:text-[#00E5FF]"
            >
              [01 // PROYECTOS]
            </a>
            <a
              href="#filosofia"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#94A3B8] hover:text-[#00E5FF]"
            >
              [02 // FILOSOFÍA]
            </a>
            <a
              href="#terminal"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenTerminal) onOpenTerminal();
              }}
              className="text-[#94A3B8] hover:text-[#00E5FF] flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-[#00E5FF]" />
              [03 // CLI LAB]
            </a>
            <a
              href="#trayectoria"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#94A3B8] hover:text-[#00E5FF]"
            >
              [04 // TRAYECTORIA]
            </a>
          </nav>
          <div className="pt-4 flex items-center gap-3">
            <a
              href="https://github.com/Eduardomr1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded bg-[#161B22] border border-[#2A313D] text-xs font-mono text-[#F1F5F9]"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="mailto:eduardo_maytorenar@outlook.com"
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded bg-[#00E5FF]/10 border border-[#00E5FF]/40 text-xs font-mono text-[#00E5FF]"
            >
              <Mail className="w-4 h-4" />
              <span>Escríbeme</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
