import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, RotateCcw } from 'lucide-react';
import { VentilationGrille, LEDIndicator } from './OperatorPrimitives';

interface LogLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  text: string;
}

export const InteractiveTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<LogLine[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'OPERATOR CLI v2.4.0 — Eduardo Maytorena Systems & Verification Lab',
    },
    {
      id: 'init-2',
      type: 'system',
      text: 'Escribe "help" o toca cualquiera de los comandos rápidos para probar en vivo.',
    },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newHistory: LogLine[] = [
      ...history,
      { id: Date.now().toString(), type: 'input', text: `$ ${trimmed}` },
    ];

    setIsRunning(true);

    setTimeout(() => {
      const lower = trimmed.toLowerCase();

      if (lower === 'clear') {
        setHistory([]);
        setIsRunning(false);
        return;
      }

      if (lower === 'help') {
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: `Comandos disponibles:
  • vigia --check       : Ejecuta análisis sintáctico AST detectando pruebas vacías y aserciones huérfanas
  • bm25 --benchmark    : Corre comparativa de rendimiento entre búsqueda lineal e índice invertido
  • resp --ping         : Simula conexión a resp-kv-store ejecutando comandos RESP2 y HyperLogLog
  • pulsetrack --health : Monitorea latencia en vivo (p50, p95, p99) y presupuesto de error SRE
  • bio                 : Muestra el resumen profesional y vías de contacto directo
  • clear               : Limpia la pantalla de la terminal`,
        });
      } else if (lower.includes('vigia')) {
        newHistory.push(
          {
            id: (Date.now() + 1).toString(),
            type: 'system',
            text: '→ Analizando AST de suite de pruebas: tests/cart.e2e.test.ts...',
          },
          {
            id: (Date.now() + 2).toString(),
            type: 'error',
            text: `[P1] tests/cart.e2e.test.ts:14:5 orphan-negative-assertion
     queryByTestId('checkout-spinner-hidden') nunca existe en el DOM de la aplicación.
     Efecto: La prueba pasa en verde sin comprobar nada.`,
          },
          {
            id: (Date.now() + 3).toString(),
            type: 'error',
            text: `[P1] tests/cart.e2e.test.ts:28:3 missing-await
     expect(asyncPay()).rejects sin await: el proceso termina antes de evaluar la promesa.`,
          },
          {
            id: (Date.now() + 4).toString(),
            type: 'success',
            text: '✓ OASIS SARIF v2.1.0 generado con éxito. 2 hallazgos reportados a GitHub Code Scanning.',
          }
        );
      } else if (lower.includes('bm25') || lower.includes('benchmark')) {
        newHistory.push(
          {
            id: (Date.now() + 1).toString(),
            type: 'system',
            text: '→ Ejecutando benchmark sobre corpus sintético de 20,000 documentos...',
          },
          {
            id: (Date.now() + 2).toString(),
            type: 'output',
            text: `| Estrategia      | Consulta             | Tiempo      | Aceleración |
|-----------------|----------------------|-------------|-------------|
| Búsqueda Lineal | "termino selectivo"  | 296.00 ms   | 1.0x (base) |
| Índice Invertido| "termino selectivo"  |   1.26 ms   | 234.9x      |`,
          },
          {
            id: (Date.now() + 3).toString(),
            type: 'success',
            text: '✓ Demostración exitosa: el costo depende de las coincidencias, no del volumen total.',
          }
        );
      } else if (lower.includes('resp') || lower.includes('redis') || lower.includes('ping')) {
        newHistory.push(
          {
            id: (Date.now() + 1).toString(),
            type: 'output',
            text: `> PING
< +PONG
> PFADD telemetry:ips 192.168.1.1 192.168.1.2 10.0.0.1
< :1
> PFCOUNT telemetry:ips
< :3 (Cardinalidad estimada en 12 KB de memoria fija con Flajolet media armónica)
> PSYNC2 40a02cf 1048576
< +FULLRESYNC 40a02cf 1048576 [Transfiriendo snapshot RDB]`,
          },
          {
            id: (Date.now() + 2).toString(),
            type: 'success',
            text: '✓ Socket TCP 127.0.0.1:6379 nominal. 127 pruebas de integración en verde.',
          }
        );
      } else if (lower.includes('pulse') || lower.includes('health')) {
        newHistory.push(
          {
            id: (Date.now() + 1).toString(),
            type: 'output',
            text: `Endpoint: https://api.prod.gateway/v1/checkout
  • Estado HTTP        : 200 OK (Keep-Alive TCP)
  • Latencia p50       : 18.4 ms
  • Latencia p95       : 42.1 ms
  • Latencia p99       : 78.6 ms
  • SRE Error Budget   : 99.98% restante (Objetivo 99.9%)
  • Alertas Activadas  : Backoff Exponencial con Full Jitter [Discord, Webhooks]`,
          },
          {
            id: (Date.now() + 2).toString(),
            type: 'success',
            text: '✓ Conexión en tiempo real activa vía Server-Sent Events (SSE).',
          }
        );
      } else if (lower === 'bio') {
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: `Eduardo Maytorena — Ingeniero de Software & Líder de QA Automation
Ubicación : Culiacán, Sinaloa, México (GMT-7)
Enfoque   : Clean Architecture, Observabilidad de APIs, Linters AST, Motores de Almacenamiento
Contacto  : eduardo_maytorenar@outlook.com
GitHub    : https://github.com/Eduardomr1`,
        });
      } else {
        newHistory.push({
          id: (Date.now() + 1).toString(),
          type: 'error',
          text: `Comando no reconocido: "${trimmed}". Escribe "help" para ver los comandos válidos.`,
        });
      }

      setHistory(newHistory);
      setIsRunning(false);
    }, 300);

    setInputVal('');
  };

  const handleQuickCommand = (cmd: string) => {
    executeCommand(cmd);
  };

  return (
    <section id="terminal" className="py-24 bg-[#0A0B0E] relative border-t border-[#1C222C]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#1C222C]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00E5FF]">
              <TerminalIcon className="w-4 h-4" />
              <span>[03 // INTERACTIVE CLI PLAYGROUND]</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
              Laboratorio de Telemetría & Verificación
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <LEDIndicator status="active" label="REPL_READY" />
            <VentilationGrille slots={3} className="w-12" />
          </div>
        </div>

        {/* Quick Command Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-6 pb-4">
          <span className="text-xs font-mono text-[#64748B]">Comandos rápidos:</span>
          {[
            { label: 'vigia --check', cmd: 'vigia --check' },
            { label: 'bm25 --benchmark', cmd: 'bm25 --benchmark' },
            { label: 'resp --ping', cmd: 'resp --ping' },
            { label: 'pulsetrack --health', cmd: 'pulsetrack --health' },
            { label: 'bio', cmd: 'bio' },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleQuickCommand(item.cmd)}
              className="px-2.5 py-1 rounded bg-[#121620] hover:bg-[#1E2636] border border-[#232C3D] hover:border-[#00E5FF]/40 text-xs font-mono text-[#94A3B8] hover:text-[#00E5FF] transition-colors focus:outline-none focus:ring-1 focus:ring-[#00E5FF]"
            >
              $ {item.label}
            </button>
          ))}
        </div>

        {/* Terminal Window Box */}
        <div className="bg-[#08090C] border border-[#1F2633] rounded-xl overflow-hidden shadow-2xl font-mono text-xs">
          {/* Top Titlebar */}
          <div className="bg-[#0F1218] border-b border-[#1C2330] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#EF4444]/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#10B981]/80 inline-block" />
              <span className="ml-3 text-[11px] text-[#64748B]">
                eduardo@systems-operator:~ (zsh)
              </span>
            </div>

            <button
              type="button"
              onClick={() => setHistory([])}
              className="p-1 rounded hover:bg-[#1A202C] text-[#64748B] hover:text-[#E2E8F0] transition-colors"
              title="Limpiar terminal"
              aria-label="Limpiar terminal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Terminal Screen Body */}
          <div
            ref={scrollContainerRef}
            className="p-5 min-h-[300px] max-h-[460px] overflow-y-auto space-y-2.5 scanline"
          >
            {history.map((log) => {
              if (log.type === 'input') {
                return (
                  <div key={log.id} className="text-[#00E5FF] font-bold">
                    {log.text}
                  </div>
                );
              }
              if (log.type === 'system') {
                return (
                  <div key={log.id} className="text-[#38BDF8] italic">
                    {log.text}
                  </div>
                );
              }
              if (log.type === 'error') {
                return (
                  <div key={log.id} className="text-[#EF4444] whitespace-pre-wrap">
                    {log.text}
                  </div>
                );
              }
              if (log.type === 'success') {
                return (
                  <div key={log.id} className="text-[#10B981] whitespace-pre-wrap font-medium">
                    {log.text}
                  </div>
                );
              }
              return (
                <div key={log.id} className="text-[#CBD5E1] whitespace-pre-wrap leading-relaxed">
                  {log.text}
                </div>
              );
            })}
            {isRunning && (
              <div className="text-[#64748B] animate-pulse">
                Procesando flujo de ejecución...
              </div>
            )}
          </div>

          {/* Terminal Input Line */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeCommand(inputVal);
            }}
            className="bg-[#0C0E13] border-t border-[#1C2330] px-4 py-3 flex items-center gap-3"
          >
            <span className="text-[#10B981] font-bold select-none">$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Escribe un comando (ej: vigia --check o help)..."
              disabled={isRunning}
              className="flex-1 bg-transparent text-[#F1F5F9] focus:outline-none font-mono text-xs placeholder:text-[#475569]"
            />
            <button
              type="submit"
              disabled={isRunning || !inputVal.trim()}
              className="px-3 py-1 rounded bg-[#00E5FF]/10 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#0A0B0D] disabled:opacity-40 transition-colors flex items-center gap-1"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Run</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
