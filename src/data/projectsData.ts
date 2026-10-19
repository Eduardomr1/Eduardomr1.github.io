import type { PortfolioProject } from '../types/portfolio';

export const PROJECTS_DATA: PortfolioProject[] = [
  {
    id: 'pulsetrack',
    serialNumber: 'SYS-01 // TELEMETRY',
    title: 'PulseTrack',
    subtitle: 'Motor de Observabilidad de APIs y Telemetría en Tiempo Real',
    category: 'qa-observability',
    categoryLabel: 'Observabilidad & Sistemas',
    role: 'Lead Architect & Full-Stack Developer',
    year: '2026',
    summary: 'Plataforma de alta precisión para monitoreo continuo de endpoints HTTP/gRPC bajo Clean Architecture estricta con despacho multicanal y SRE Error Budgets.',
    whyBuilt: 'Las herramientas existentes de monitoreo o eran cajas negras pesadas o no ofrecían diagnósticos de socket a bajo nivel. PulseTrack se diseñó para medir latencia percentil real (p50, p95, p99) con Server-Sent Events y alertas con jitter exponencial.',
    description: [
      'Separación ortogonal en 4 capas desacopladas: Dominio, Casos de Uso, Infraestructura y Presentación.',
      'Sondeo de latencia telemétrico a nivel de sockets TCP sin sobrecarga de dependencias externas.',
      'Sistema de despacho multicanal (Discord, Slack, Webhooks) con reintentos exponenciales y Full Jitter para evitar tormentas de eventos.',
      '100% cumplimiento de accesibilidad WCAG 2.1 AA auditado en CI mediante Playwright y @axe-core.'
    ],
    tags: ['Next.js 15', 'TypeScript 5.7', 'Clean Architecture', 'Drizzle ORM', 'SQLite', 'SSE', 'Vitest', 'Playwright', 'WCAG 2.1 AA'],
    metrics: [
      { label: 'Test Suite Pass', value: '100%', unit: '68+ tests' },
      { label: 'Accesibilidad', value: 'WCAG 2.1', unit: 'AA Certified' },
      { label: 'Socket Latency', value: '< 1.5ms', unit: 'overhead' },
      { label: 'SRE Error Budget', value: '99.9%', unit: 'SLA target' }
    ],
    specs: {
      framework: 'Next.js 15 (App Router) + TypeScript 5.7',
      architecture: 'Clean Architecture (Domain / Use Cases / Infra / UI)',
      testingSuite: 'Vitest (Domain/Engine/ViewModels) + Playwright E2E',
      complianceOrPerf: '100% WCAG 2.1 AA vía @axe-core/playwright'
    },
    githubUrl: 'https://github.com/Eduardomr1/pulsetrack',
    featured: true,
    accentColor: '#00E5FF',
    highlights: [
      'Gráficos Sparkline SVG ultraligeros con gradientes de SLA y tooltips matemáticos.',
      'Manejo de estado reactivo mediante Server-Sent Events (SSE) sin sobrecarga de WebSockets.',
      'Pruebas unitarias de regresión sin mocks en motores telemétricos.'
    ],
    codeSnippet: {
      filename: 'src/domain/prober/backoff-jitter.ts',
      language: 'typescript',
      code: `// Cálculo de backoff exponencial con Full Jitter para despacho resiliente
export function computeBackoffWithJitter(
  attempt: number,
  baseMs = 100,
  maxMs = 5000
): number {
  const exponential = Math.min(maxMs, baseMs * Math.pow(2, attempt));
  // Full Jitter distribuye uniformemente la carga en ráfagas de red
  return Math.floor(Math.random() * exponential);
}`
    }
  },
  {
    id: 'vigia',
    serialNumber: 'AST-02 // STATIC-ANALYSIS',
    title: 'Vigía',
    subtitle: 'Linter de Puntos Ciegos en Pruebas con TypeScript Compiler AST',
    category: 'qa-observability',
    categoryLabel: 'QA Automation & Compiladores',
    role: 'Creator & Lead Developer',
    year: '2026',
    summary: 'Linter estático y GitHub Action que inspecciona el árbol sintáctico (AST) para erradicar pruebas que pasan en verde sin validar nada (falso positivo).',
    whyBuilt: 'En un producto móvil que lideraba, una prueba E2E pasó en verde durante semanas verificando que un elemento no estuviera visible... usando un ID que la app nunca generaba. Ese falso positivo motivó la creación de un analizador que detecta la causa raíz directamente en el AST.',
    description: [
      'Recorrido profundo del AST mediante la API oficial del compilador de TypeScript (TypeScript Compiler API).',
      'Detección de 9 anti-patrones críticos: expect sin matcher chained, tautologías literales (true === true), aserciones asíncronas sin await, tests con .only abandonados, y aserciones negativas huérfanas.',
      'Generación de reportes bajo el estándar OASIS SARIF v2.1.0 para integrarse con GitHub Code Scanning Security Alerts.',
      'Sticky bot para Pull Requests en GitHub que comenta de forma no intrusiva el bloque exacto del defecto.'
    ],
    tags: ['TypeScript Compiler API', 'AST Traversal', 'GitHub Actions', 'SARIF v2.1.0', 'CLI', 'Code Quality'],
    metrics: [
      { label: 'Reglas AST', value: '9', unit: 'patrones P1-P3' },
      { label: 'Formato de Reporte', value: 'SARIF 2.1', unit: 'GitHub standard' },
      { label: 'Tiempo de Análisis', value: '< 180ms', unit: 'por suite' },
      { label: 'Falsos Negativos', value: '0', unit: 'en fixtures' }
    ],
    specs: {
      framework: 'TypeScript Native CLI + GitHub Action Core',
      architecture: 'Pipeline Pipeline: Source -> AST -> Matcher Rules -> SARIF/ANSI',
      testingSuite: 'Pruebas de regresión sobre suites de tests sintéticos defectuosos',
      complianceOrPerf: 'Estándar OASIS SARIF v2.1.0 + GitHub Security CodeQL'
    },
    githubUrl: 'https://github.com/Eduardomr1/vigia',
    featured: true,
    accentColor: '#10B981',
    highlights: [
      'Identifica queryByTestId(...) sobre IDs que no existen en ningún archivo de la app.',
      'Previene que aserciones asíncronas pasen sin await (la prueba termina antes de evaluar).',
      'Integrable con una sola línea en flujos de GitHub Actions CI.'
    ],
    codeSnippet: {
      filename: 'src/rules/missing-await.ts',
      language: 'typescript',
      code: `// Inspección AST para detectar expect(...).rejects sin await
export function checkMissingAwait(node: ts.CallExpression): Finding | null {
  if (isExpectRejectsOrResolves(node)) {
    const parent = node.parent;
    if (parent && parent.kind !== ts.SyntaxKind.AwaitExpression) {
      return {
        ruleId: 'missing-await',
        severity: 'P1',
        message: 'Aserción asíncrona sin await: el test finaliza sin validar el resultado.'
      };
    }
  }
  return null;
}`
    }
  },
  {
    id: 'resp-kv-store',
    serialNumber: 'KV-03 // STORAGE-ENGINE',
    title: 'RESP Key-Value Engine',
    subtitle: 'Motor In-Memory Compatible con Protocolo Redis RESP2 sin Dependencias',
    category: 'systems',
    categoryLabel: 'Sistemas & Bases de Datos',
    role: 'Systems Developer',
    year: '2026',
    summary: 'Motor de almacenamiento en memoria implementado desde cero sobre sockets TCP en TypeScript con SkipList, HyperLogLog, persistencia dual AOF/RDB y replicación PSYNC2.',
    whyBuilt: 'Construido para comprender a nivel de bytes cómo funcionan las estructuras de datos concurrentes, la serialización de protocolos de red binarios, la sincronización en disco con fsync y la replicación distribuida.',
    description: [
      'Parser streaming determinista del protocolo RESP2 con deserialización en tiempo de lectura sobre TCP nativo.',
      'SkipList probabilística con alturas aleatorias geométricas para ZSET en O(log N).',
      'HyperLogLog con 16,384 registros de 8 bits y media armónica de Flajolet para conteo de cardinalidad masiva en 12 KB fijos.',
      'Persistencia dual: AOF con políticas everysec/always de fsync, y RDB mediante serialización binaria compacta.',
      'Replicación Maestro-Réplica con circular ring backlog de 1MB y handshake PSYNC2.'
    ],
    tags: ['TypeScript', 'TCP Sockets', 'RESP2 Protocol', 'SkipList', 'HyperLogLog', 'AOF/RDB', 'PSYNC2', 'ACID Transactions'],
    metrics: [
      { label: 'Dependencias Externas', value: '0', unit: 'Zero-dep' },
      { label: 'HLL Memoria Fija', value: '12 KB', unit: '16k registros' },
      { label: 'HLL Margen Error', value: '0.81%', unit: 'teórico Flajolet' },
      { label: 'Suites de Pruebas', value: '17', unit: '127 tests verdes' }
    ],
    specs: {
      framework: 'Node.js 22+ (Native TypeScript Execution)',
      architecture: 'Single-Threaded Event Loop + Non-blocking I/O Engine',
      testingSuite: '127 pruebas unitarias y de integración end-to-end con redis-cli',
      complianceOrPerf: 'Soporte de comandos Strings, Hashes, Lists, ZSets, Bitmaps, HLL, Pub/Sub'
    },
    githubUrl: 'https://github.com/Eduardomr1/resp-kv-store',
    featured: true,
    accentColor: '#F59E0B',
    highlights: [
      'Transacciones ACID completas mediante MULTI, EXEC y bloqueo optimista con WATCH.',
      'Gobernador de memoria con políticas activas de desalojo LRU y LFU por aproximación de muestra.',
      'Pub/Sub hub con soporte para canales literales y patrones glob (PSUBSCRIBE).'
    ],
    codeSnippet: {
      filename: 'src/storage/hll.ts',
      language: 'typescript',
      code: `// Estimación de cardinalidad de Flajolet con corrección de sesgo Linear Counting
export function estimateCardinality(registers: Uint8Array): number {
  const m = 16384;
  let sum = 0;
  let zeroRegisters = 0;

  for (let i = 0; i < m; i++) {
    const val = registers[i];
    sum += Math.pow(2, -val);
    if (val === 0) zeroRegisters++;
  }

  const alpha = 0.7213 / (1 + 1.079 / m);
  let estimate = alpha * m * m * (1 / sum);

  // Linear counting para cardinalidades bajas
  if (estimate <= 2.5 * m && zeroRegisters > 0) {
    estimate = m * Math.log(m / zeroRegisters);
  }
  return Math.round(estimate);
}`
    }
  },
  {
    id: 'agentguard',
    serialNumber: 'SEC-04 // AI-SECURITY',
    title: 'AgentGuard',
    subtitle: 'Auditor de Seguridad y Filtrado para Prompts y Salidas de LLMs',
    category: 'security-ai',
    categoryLabel: 'Seguridad & IA',
    role: 'Creator & Developer',
    year: '2026',
    summary: 'CLI y biblioteca TypeScript ultraligera para auditar inyección de prompts, filtración de secretos/PII y validación de esquemas JSON en tiempo real.',
    whyBuilt: 'Los sistemas de agentes autónomos son vulnerables a prompt injection indirecto y fuga de datos confidenciales. AgentGuard provee una capa de sanitización y auditoría que opera tanto en modo batch como en streams de tokens.',
    description: [
      'Auditoría en tiempo real con enmascaramiento automático de credenciales sensibles (API keys, tarjetas, emails, tokens de nube).',
      'Inspección de tokens en streaming con detección de secretos que cruzan límites entre chunks contiguos.',
      'Validación de salida contra JSON Schemas con códigos de salida deterministas para pipelines de CI/CD.',
      'Exportación nativa de hallazgos a SARIF para visualización en GitHub CodeQL.'
    ],
    tags: ['AI Security', 'Prompt Injection', 'PII Redaction', 'Streaming Tokens', 'TypeScript', 'SARIF', 'CI/CD'],
    metrics: [
      { label: 'Latencia Stream', value: '< 0.3ms', unit: 'por chunk' },
      { label: 'Redacción PII', value: '100%', unit: 'RFC compliant' },
      { label: 'Integración CI', value: 'SARIF', unit: 'GitHub alerts' },
      { label: 'Salida de Código', value: '0 / 1 / 2', unit: 'estándar POSIX' }
    ],
    specs: {
      framework: 'TypeScript 5 + Node.js CLI',
      architecture: 'Heuristic & Lexical Boundary Rule Engine',
      testingSuite: 'Test suite sobre ataques de inyección y diccionarios de secretos',
      complianceOrPerf: 'OASIS SARIF v2.1.0 compatible'
    },
    githubUrl: 'https://github.com/Eduardomr1/agentguard',
    featured: true,
    accentColor: '#EC4899',
    highlights: [
      'Modo streaming seguro guardStream() con buffer circular para detectar secretos partidos entre chunks.',
      'Soporte de configuración granular mediante archivo .agentguardrc.json.',
      'Previene fugas accidentales antes de enviar peticiones a modelos externos.'
    ],
    codeSnippet: {
      filename: 'src/guard.ts',
      language: 'typescript',
      code: `// Streaming guard con detección de límites de secreto entre chunks
export async function* guardStream(
  tokenStream: AsyncIterable<string>,
  options: { onViolation: 'redact' | 'throw' }
): AsyncIterable<string> {
  let carryBuffer = '';
  for await (const chunk of tokenStream) {
    const combined = carryBuffer + chunk;
    const sanitized = redactSensitivePatterns(combined);
    // Conserva los últimos bytes para evaluar patrones partidos
    carryBuffer = combined.slice(-32);
    yield sanitized.slice(0, -32);
  }
}`
    }
  },
  {
    id: 'motor-busqueda-bm25',
    serialNumber: 'SRCH-05 // DATA-RETRIEVAL',
    title: 'Motor de Búsqueda BM25',
    subtitle: 'Buscador de Texto Completo con Índice Invertido sin Dependencias',
    category: 'systems',
    categoryLabel: 'Algoritmos & Recuperación de Información',
    role: 'Systems Developer',
    year: '2026',
    summary: 'Motor de búsqueda con índice invertido y algoritmo de ranking Okapi BM25 desarrollado exclusivamente con la biblioteca estándar de Node.js, validado con benchmarks.',
    whyBuilt: 'Para demostrar que las estructuras de datos correctas superan radicalmente al hardware bruto: un índice invertido hace que el costo dependa de las coincidencias, no del tamaño de la base de datos.',
    description: [
      'Tokenización, cálculo de frecuencia de término (TF) y frecuencia inversa de documento (IDF) puro.',
      'Benchmark estricto documentado: 234x más rápido que búsqueda lineal en términos selectivos (1.3 ms vs 296 ms en 20,000 documentos).',
      '33 pruebas automatizadas integradas en GitHub Actions CI.',
      'Documentación honesta de bordes: índice en memoria, ausencia intencional de stemming para mantener costo cero de dependencias.'
    ],
    tags: ['Inverted Index', 'Okapi BM25', 'Node.js Standard Lib', 'Benchmark', 'Zero-Dependencies', 'Algorithms'],
    metrics: [
      { label: 'Mejora de Consulta', value: '234x', unit: 'aceleración' },
      { label: 'Tiempo Selectivo', value: '1.3 ms', unit: 'en 20k docs' },
      { label: 'Dependencias npm', value: '0', unit: 'pure standard lib' },
      { label: 'Pruebas Unitarias', value: '33', unit: '100% CI pass' }
    ],
    specs: {
      framework: 'Node.js 22 Native Standard Library',
      architecture: 'Inverted Index Posting Lists + BM25 Scoring Matrix',
      testingSuite: '33 pruebas unitarias sin mocks + suite de benchmarking',
      complianceOrPerf: 'O(k) tiempo de consulta donde k = documentos con el término'
    },
    githubUrl: 'https://github.com/Eduardomr1/proyectos-de-programacion',
    featured: false,
    accentColor: '#8B5CF6',
    highlights: [
      'Comparativa reproducible en consola entre búsqueda lineal y estructurada.',
      'Análisis de causa raíz sobre sesgos en corpus sintéticos documentado en el README.',
      'Cero overhead de memoria en arranque.'
    ]
  },
  {
    id: 'control-de-gastos',
    serialNumber: 'MOB-06 // OFFLINE-FIRST',
    title: 'Control de Gastos Móvil',
    subtitle: 'App Móvil Offline-First con Motor de Sincronización y Suite E2E Maestro',
    category: 'mobile',
    categoryLabel: 'Móvil & Arquitectura Offline',
    role: 'Mobile QA Lead & Developer',
    year: '2026',
    summary: 'Aplicación para iOS y Android con sincronización bidireccional local/remota (SQLite + MMKV + Supabase) y un registro exhaustivo de defectos con pruebas de regresión.',
    whyBuilt: 'Creada como caso de estudio de arquitectura móvil robusta y aseguramiento de calidad: incluye un Bug Log con 14 defectos reales analizados en profundidad, desde divergencias de timestamp hasta el defecto que dio origen a Vigía.',
    description: [
      'Arquitectura modular por features en Expo Router con aislamiento estricto de dependencias.',
      'Cola de mutaciones persistente en MMKV y base de datos local SQLite con sincronización automática a Supabase.',
      'Flujos de prueba E2E automatizados en dispositivos reales con Maestro.',
      'Auditoría completa de accesibilidad móvil (contraste, etiquetas de accesibilidad y objetivos táctiles de 48x48dp).'
    ],
    tags: ['React Native', 'Expo Router', 'SQLite', 'MMKV', 'Supabase', 'Maestro E2E', 'Offline-First', 'Bug Log'],
    metrics: [
      { label: 'Bugs Documentados', value: '14', unit: 'con análisis causa raíz' },
      { label: 'Pruebas E2E', value: 'Maestro', unit: 'flujos en dispositivo' },
      { label: 'Almacén Local', value: 'MMKV+SQLite', unit: 'cola transaccional' },
      { label: 'Resolución Conflictos', value: 'LWW', unit: 'con desempate determinista' }
    ],
    specs: {
      framework: 'React Native / Expo Router (TypeScript)',
      architecture: 'Feature-first Modular Architecture + Offline Sync Queue',
      testingSuite: 'Maestro YAML E2E flows + Jest Unit/Integration',
      complianceOrPerf: 'WCAG Mobile touch target (min 48x48) & dynamic font scaling'
    },
    githubUrl: 'https://github.com/Eduardomr1/control-de-gastos',
    featured: false,
    accentColor: '#38BDF8',
    highlights: [
      'Resolución de defectos sutiles como condiciones de carrera en fin de mes y toques dobles simultáneos.',
      'Diseño visual con componentes accesibles propios (GTexto, GBoton, GCampo, GAsyncGate).',
      'Manejo de fallos tipados con traducción amigable de errores de Postgres.'
    ]
  }
];

export const PHILOSOPHY_PILLARS = [
  {
    number: '01',
    title: 'Un test que pasa sin verificar nada es peor que no tener test',
    subtitle: 'La falsa confianza es el enemigo número uno del software confiable',
    description: 'Cuando una aserción pasa por accidente (por ejemplo, verificando la ausencia de un identificador inexistente), no solo no previene el bug: activamente oculta que la funcionalidad jamás fue probada. Por eso diseñé Vigía para inspeccionar el AST y erradicar falsos positivos.'
  },
  {
    number: '02',
    title: 'Dependencias solo cuando pagan su costo',
    subtitle: 'El exceso de paquetes externos degrada rendimiento y seguridad',
    description: 'Tanto en el motor de búsqueda BM25 como en el motor de almacenamiento RESP, el código se apoya en estructuras de datos sólidas (SkipLists, HyperLogLog, buffers binarios) y la biblioteca estándar en lugar de acumular dependencias npm innecesarias.'
  },
  {
    number: '03',
    title: 'Cada defecto no trivial deja una prueba de regresión',
    subtitle: 'El conocimiento del sistema se codifica en la suite de pruebas',
    description: 'Un bug resuelto que no queda cubierto por un test automatizado es un bug que volverá en el próximo refactor. En cada proyecto mantengo un historial de causa raíz donde cada fallo se convierte en un caso de prueba verificable.'
  },
  {
    number: '04',
    title: 'Liderazgo técnico basado en datos, no en suposiciones',
    subtitle: 'Métricas reproducibles antes de cualquier afirmación de calidad',
    description: 'No digo que algo es "rápido": muestro que BM25 aceleró 234x la consulta en 20,000 registros. No digo que la UI es "accesible": presento auditorías con 0 violaciones en @axe-core con WCAG 2.1 AA.'
  }
];

export const TIMELINE_EXPERIENCE = [
  {
    period: '2025 — Presente',
    role: 'Líder de Verificación & QA Automation (Móvil / Web)',
    organization: 'Fintech & Sistemas de Punto de Venta (POS)',
    location: 'Culiacán, Sinaloa, México',
    scope: 'Coordinación técnica de 4 a 7 ingenieros en 3 productos simultáneos (Móvil POS, Comensales Móvil y Web Support)',
    achievements: [
      'Capacitación técnica y mentoría a 6 desarrolladores y testers en flujos de automatización, arquitecturas limpias y análisis de causa raíz.',
      'Diseño e implementación de pipelines de CI/CD con GitHub Actions para ejecución desatendida de suites E2E y pruebas de integración.',
      'Definición de políticas de calidad de lanzamiento (gates) reduciendo incidentes de producción en flujos críticos de cobro y sincronización offline.',
      'Transición de testing manual disperso a suites automatizadas con Playwright, Maestro y TypeScript.'
    ]
  },
  {
    period: '2024 — 2025',
    role: 'Software Development & QA Engineering Practicante',
    organization: 'Desarrollo de Soluciones Empresariales',
    location: 'Culiacán, Sinaloa, México',
    scope: 'Construcción de módulos backend, desarrollo de APIs RESTful y testing exploratorio sistemático',
    achievements: [
      'Desarrollo de endpoints transaccionales con Node.js, Express y bases de datos relacionales SQLite / MySQL.',
      'Automatización de pruebas de integración HTTP reales (23 casos sin mocks con validación de esquemas Zod).',
      'Elaboración de reportes de defectos exhaustivos con pasos de reproducción deterministas y capturas de paquetes de red.'
    ]
  }
];
