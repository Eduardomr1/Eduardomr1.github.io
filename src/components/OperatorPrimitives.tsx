import React from 'react';

// Rejilla de ventilación industrial paramétrica
export const VentilationGrille: React.FC<{ slots?: number; className?: string }> = ({
  slots = 5,
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-[3px] py-1 ${className}`} aria-hidden="true">
      {Array.from({ length: slots }).map((_, i) => (
        <div
          key={i}
          className="h-[2px] w-full bg-[#1C1F26] rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)] border-b border-white/[0.04]"
        />
      ))}
    </div>
  );
};

// Retícula CAD de enfoque / Mira de precisión técnica
export const CADCrosshair: React.FC<{ size?: number; className?: string }> = ({
  size = 18,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="square"
      className={`text-[#64748B] opacity-60 ${className}`}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" strokeDasharray="2 2" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
};

// Indicador LED con pulso de telemetría en vivo
export const LEDIndicator: React.FC<{
  status?: 'nominal' | 'warning' | 'alert' | 'active';
  label?: string;
  size?: 'sm' | 'md';
}> = ({ status = 'nominal', label, size = 'sm' }) => {
  const colorMap = {
    nominal: {
      dot: 'bg-[#10B981]',
      glow: 'shadow-[0_0_10px_#10B981]',
      pulse: 'bg-[#10B981]/30',
      text: 'text-[#10B981]',
    },
    active: {
      dot: 'bg-[#00E5FF]',
      glow: 'shadow-[0_0_10px_#00E5FF]',
      pulse: 'bg-[#00E5FF]/30',
      text: 'text-[#00E5FF]',
    },
    warning: {
      dot: 'bg-[#F59E0B]',
      glow: 'shadow-[0_0_10px_#F59E0B]',
      pulse: 'bg-[#F59E0B]/30',
      text: 'text-[#F59E0B]',
    },
    alert: {
      dot: 'bg-[#EF4444]',
      glow: 'shadow-[0_0_10px_#EF4444]',
      pulse: 'bg-[#EF4444]/30',
      text: 'text-[#EF4444]',
    },
  };

  const current = colorMap[status];
  const dotSize = size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5';

  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
      <span className="relative flex h-2 w-2">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${current.pulse}`}
        />
        <span className={`relative inline-flex rounded-full ${dotSize} ${current.dot} ${current.glow}`} />
      </span>
      {label && <span className={`${current.text} font-medium`}>{label}</span>}
    </span>
  );
};

// Chasis Card con esquina biselada o reborde técnico
export const ChassisCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
}> = ({ children, className = '', glowOnHover = false }) => {
  return (
    <div
      className={`relative bg-[#0F1115] border border-[#1E232B] rounded-lg p-5 transition-all duration-300 ${
        glowOnHover
          ? 'hover:border-[#00E5FF]/40 hover:shadow-[0_4px_24px_-4px_rgba(0,229,255,0.12)]'
          : ''
      } ${className}`}
    >
      {/* Micro remache en las 4 esquinas */}
      <span className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-[#2A303C]" />
      <span className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-[#2A303C]" />
      <span className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-[#2A303C]" />
      <span className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-[#2A303C]" />
      {children}
    </div>
  );
};
