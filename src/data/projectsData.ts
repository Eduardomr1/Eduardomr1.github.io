import type { PortfolioProject } from '../types/portfolio';

export const PROJECTS_DATA: PortfolioProject[] = [
  {
    id: 'pulsetrack',
    serialNumber: 'SYS-01 // TELEMETRY',
    title: 'PulseTrack',
    subtitle: 'Plataforma de Observabilidad y Telemetría Full-Stack',
    category: 'qa-observability',
    categoryLabel: 'Observabilidad & Sistemas',
    role: 'Software Engineer',
    year: '2026',
    summary: 'Plataforma de monitoreo de alta precisión para endpoints HTTP construida bajo Clean Architecture con Next.js 15, TypeScript, Drizzle ORM y SQLite.',
    whyBuilt: 'Las herramientas existentes de monitoreo o eran cajas negras pesadas o no ofrecían diagnósticos de socket a bajo nivel. PulseTrack se diseñó para medir telemetría de socket detallada (DNS, TCP, TLS, TTFB) con Server-Sent Events y alertas con jitter exponencial.',
    description: [
      'Separación ortogonal en 4 capas desacopladas: Dominio, Casos de Uso, Infraestructura y Presentación.',
      'Sondeo de latencia telemétrico a nivel de sockets TCP sin sobrecarga de dependencias externas.',
      'Sistema de despacho multicanal (Discord, Slack, Webhooks) con reintentos exponenciales y Full Jitter para evitar tormentas de eventos.',
      '100% cumplimiento de accesibilidad WCAG 2.1 AA auditado en CI mediante Playwright y @axe-core.'
    ],
    tags: ['Next.js 15', 'TypeScript', 'Clean Architecture', 'Drizzle ORM', 'SQLite', 'SSE', 'Vitest', 'Playwright', 'WCAG 2.1 AA'],
    metrics: [
      { label: 'Test Suite Pass', value: '100%', unit: '68+ tests en Vitest' },
      { label: 'Accesibilidad', value: 'WCAG 2.1', unit: 'AA Certified' },
      { label: 'Socket Telemetry', value: 'DNS/TCP/TLS', unit: 'TTFB breakdown' },
      { label: 'Despacho Webhooks', value: 'Full Jitter', unit: 'Exp Backoff' }
    ],
    specs: {
      framework: 'Next.js 15 (App Router) + TypeScript 5.7',
      architecture: 'Clean Architecture (Domain / Use Cases / Infra / UI)',
      testingSuite: 'Vitest (Domain/Engine/ViewModels) + Playwright E2E & @axe-core',
      complianceOrPerf: '100% WCAG 2.1 AA verificado en CI'
    },
    githubUrl: 'https://github.com/Eduardomr1/pulsetrack',
    featured: true,
    accentColor: '#00E5FF',
    highlights: [
      'Gráficos Sparkline SVG ultraligeros con gradientes de SLA y tooltips matemáticos.',
      'Manejo de estado reactivo mediante Server-Sent Events (SSE) sin sobrecarga de WebSockets.',
      'Pruebas unitarias y de integración respaldadas por 68+ tests en verde.'
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
    id: 'resp-kv-store',
    serialNumber: 'KV-02 // STORAGE-ENGINE',
    title: 'RESP Key-Value Storage Engine',
    subtitle: 'Motor In-Memory Compatible con Protocolo Redis RESP en Raw TCP',
    category: 'systems',
    categoryLabel: 'Sistemas & Bases de Datos',
    role: 'Systems Developer',
    year: '2026',
    summary: 'Motor de base de datos clave-valor en memoria compatible con el protocolo Redis RESP sobre sockets TCP puros en TypeScript (Node.js 22), desarrollado desde cero sin dependencias externas.',
    whyBuilt: 'Construido para comprender a nivel de bytes el funcionamiento interno de estructuras de datos concurrentes, serialización binaria de protocolos, sincronización a disco con fsync y replicación distribuida.',
    description: [
      'Parser streaming determinista del protocolo RESP2 con deserialización en tiempo de lectura sobre TCP nativo.',
      'SkipList probabilística con alturas aleatorias geométricas para Sorted Sets en O(log N).',
      'HyperLogLog con 16,384 registros de 8 bits y media armónica de Flajolet para conteo de cardinalidad masiva en 12 KB fijos.',
      'Persistencia dual: AOF con fsync y serialización binaria compacta RDB con CRC64.',
      'Transacciones ACID (MULTI/EXEC/WATCH) y políticas de desalojo LFU/LRU.'
    ],
    tags: ['TypeScript', 'Node.js 22', 'TCP Sockets', 'RESP Protocol', 'SkipList', 'HyperLogLog', 'AOF/RDB CRC64', 'ACID'],
    metrics: [
      { label: 'Throughput', value: '> 35,000', unit: 'ops/sec' },
      { label: 'Dependencias Externas', value: '0', unit: 'Zero-dep' },
      { label: 'HyperLogLog', value: '12 KB', unit: '16k registros' },
      { label: 'Pruebas Automatizadas', value: '127', unit: 'tests en verde' }
    ],
    specs: {
      framework: 'Node.js 22 (Native TypeScript Execution)',
      architecture: 'Single-Threaded Event Loop + Non-blocking I/O Engine',
      testingSuite: '127 pruebas unitarias y de integración end-to-end con redis-cli',
      complianceOrPerf: 'Transacciones ACID completas y persistencia AOF/RDB con CRC64'
    },
    githubUrl: 'https://github.com/Eduardomr1/resp-kv-store',
    featured: true,
    accentColor: '#F59E0B',
    highlights: [
      'Rendimiento verificado superior a 35,000 operaciones por segundo.',
      'Gobernador de memoria con políticas activas de desalojo LRU y LFU.',
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

  if (estimate <= 2.5 * m && zeroRegisters > 0) {
    estimate = m * Math.log(m / zeroRegisters);
  }
  return Math.round(estimate);
}`
    }
  },
  {
    id: 'vigia',
    serialNumber: 'AST-03 // COMPILERS-LINTER',
    title: 'Vigía',
    subtitle: 'Linter de Puntos Ciegos en Pruebas con TypeScript Compiler AST',
    category: 'qa-observability',
    categoryLabel: 'QA & Compiladores AST',
    role: 'Software Engineer',
    year: '2026',
    summary: 'Herramienta CLI y GitHub Action en TypeScript que inspecciona el árbol de sintaxis abstracta (AST) del compilador para erradicar pruebas tautológicas y falsos positivos.',
    whyBuilt: 'En un flujo de pruebas móviles, una aserción negativa pasaba en verde porque buscaba un identificador que la app jamás generaba. Vigía nació para correlacionar aserciones contra identificadores del código fuente y reportar anomalías.',
    description: [
      'Inspección del Abstract Syntax Tree (AST) mediante la TypeScript Compiler API.',
      'Detección de anti-patrones críticos: pruebas sin aserciones, tautologías (true === true), aserciones asíncronas sin await y aserciones negativas huérfanas.',
      'Generación de reportes bajo el estándar OASIS SARIF v2.1.0 para integración nativa con GitHub Code Scanning.',
      'Validado con 129 pruebas automatizadas y auto-inspección en flujos de CI.'
    ],
    tags: ['TypeScript Compiler API', 'AST Analysis', 'GitHub Actions', 'SARIF v2.1.0', 'CLI', 'DevTools'],
    metrics: [
      { label: 'Pruebas Validadas', value: '129', unit: 'tests en CI' },
      { label: 'Estándar de Reporte', value: 'SARIF 2.1', unit: 'GitHub CodeQL' },
      { label: 'Tiempo de Análisis', value: '< 180ms', unit: 'por suite' },
      { label: 'Auto-Inspección', value: '100%', unit: 'CI enforce' }
    ],
    specs: {
      framework: 'TypeScript Native CLI + GitHub Action Core',
      architecture: 'Pipeline de Compilación: Source -> AST -> Matcher Rules -> SARIF/ANSI',
      testingSuite: '129 pruebas de regresión y auto-inspección en CI',
      complianceOrPerf: 'Estándar OASIS SARIF v2.1.0 + GitHub Security Alerts'
    },
    githubUrl: 'https://github.com/Eduardomr1/vigia',
    featured: true,
    accentColor: '#10B981',
    highlights: [
      'Correlaciona aserciones contra identificadores del código fuente para detectar tests huérfanos.',
      'Previene aserciones asíncronas sin await que finalizan prematuramente.',
      'Integración con una sola línea en GitHub Actions CI.'
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
    id: 'mic-soundboard',
    serialNumber: 'AUD-04 // REAL-TIME-AUDIO',
    title: 'Mic Soundboard & Web Audio Engine',
    subtitle: 'Enrutamiento Multicanal de Audio y Transcodificación Asíncrona',
    category: 'systems',
    categoryLabel: 'Sistemas en Tiempo Real',
    role: 'Software Engineer',
    year: '2026',
    summary: 'Suite en Python que combina una aplicación de escritorio (sounddevice, NumPy) con backend en FastAPI y FFmpeg para enrutamiento de audio multicanal en tiempo real con passthrough de cable virtual.',
    whyBuilt: 'Diseñado para solucionar la latencia y la sincronización en transmisiones de audio multicanal, implementando pipelines asíncronos para extracción dinámica, transcodificación (MP3/WAV) y disparo de audio mediante hotkeys globales.',
    description: [
      'Matriz de enrutamiento de audio en tiempo real utilizando sounddevice y buffers vectorizados en NumPy.',
      'Backend asíncrono en FastAPI conectado con pipelines de FFmpeg para transcodificación al vuelo.',
      'Captura global de atajos de teclado de baja latencia con passthrough a cables de audio virtual.',
      'Gestión de buffers circulares para evitar artefactos acústicos y desbordamientos de memoria.'
    ],
    tags: ['Python', 'FastAPI', 'FFmpeg', 'sounddevice', 'NumPy', 'Real-Time Audio', 'Async Pipelines'],
    metrics: [
      { label: 'Latencia Buffer', value: '< 10 ms', unit: 'audio passthrough' },
      { label: 'Formatos Soportados', value: 'MP3/WAV', unit: 'transcodificación' },
      { label: 'Hotkeys', value: 'Global', unit: 'low-latency hook' },
      { label: 'Motor de Procesamiento', value: 'NumPy', unit: 'vectorizado' }
    ],
    specs: {
      framework: 'Python 3.11+ / FastAPI / sounddevice / NumPy',
      architecture: 'Multithreaded Real-Time Audio Engine + Async Event Pipeline',
      testingSuite: 'Pruebas de integridad de buffers y benchmarks de latencia I/O',
      complianceOrPerf: 'Procesamiento en tiempo real sin pausas de garbage collection'
    },
    githubUrl: 'https://github.com/Eduardomr1/audio_downloader_web',
    featured: true,
    accentColor: '#A855F7',
    highlights: [
      'Matriz de enrutamiento con puenteo a micrófono virtual sin distorsión.',
      'Extracción y transcodificación asíncrona de streams con FFmpeg.',
      'Arquitectura modular desacoplada entre captura de atajos y motor de mezcla.'
    ]
  },
  {
    id: 'control-de-gastos',
    serialNumber: 'MOB-05 // LOCAL-FIRST',
    title: 'Control de Gastos Móvil',
    subtitle: 'App Móvil Local-First con Sincronización y Suite E2E en Maestro',
    category: 'mobile',
    categoryLabel: 'Móvil & Local-First',
    role: 'Mobile & QA Engineer',
    year: '2026',
    summary: 'Aplicación móvil multiplataforma para iOS y Android construida con React Native, Expo, Supabase y SQLite bajo arquitectura Feature-First con resolución determinista de conflictos.',
    whyBuilt: 'Diseñada como caso de estudio de ingeniería móvil y calidad extrema: asegura confiabilidad sin conexión mediante sincronización eventual, escalado de texto Dynamic Type y suite de pruebas E2E en Maestro que cubre 14 escenarios límite documentados.',
    description: [
      'Arquitectura Feature-First con rutas modulares en Expo Router y aislamiento de estado.',
      'Motor de sincronización Local-First con cola persistente en MMKV y almacenamiento SQLite local con Supabase.',
      'Escalado tipográfico accesible en todo el sistema mediante Dynamic Type y contraste optimizado.',
      'Suites E2E automatizadas en dispositivos reales con Maestro cubriendo 14 defectos de borde.'
    ],
    tags: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'SQLite', 'Feature-First', 'Maestro E2E', 'Local-First'],
    metrics: [
      { label: 'Casos Límite E2E', value: '14', unit: 'escenarios cubiertos' },
      { label: 'Pruebas Dispositivo', value: 'Maestro', unit: 'E2E en emulador/físico' },
      { label: 'Arquitectura', value: 'Local-First', unit: 'SQLite + MMKV' },
      { label: 'Tipografía', value: 'Dynamic Type', unit: 'WCAG accesible' }
    ],
    specs: {
      framework: 'React Native / Expo Router (TypeScript)',
      architecture: 'Feature-First Architecture + Local-First Synchronization Engine',
      testingSuite: 'Maestro YAML E2E flows + Jest Unit/Integration',
      complianceOrPerf: 'Dynamic Type font scaling y objetivos táctiles accesibles'
    },
    githubUrl: 'https://github.com/Eduardomr1/control-de-gastos',
    featured: false,
    accentColor: '#38BDF8',
    highlights: [
      'Resolución de defectos sutiles como condiciones de carrera en fin de mes y toques dobles simultáneos.',
      'Diseño visual con componentes accesibles propios y estados de carga transparentes.',
      'Manejo de fallos tipados con traducción amigable de errores de Postgres.'
    ]
  },
  {
    id: 'agentguard',
    serialNumber: 'SEC-06 // AI-SECURITY',
    title: 'AgentGuard',
    subtitle: 'Auditor de Seguridad para Prompts y Salidas de Modelos LLM',
    category: 'security-ai',
    categoryLabel: 'Seguridad & AI Engineering',
    role: 'Software Engineer',
    year: '2026',
    summary: 'CLI y biblioteca TypeScript para auditar inyecciones de prompts, fugas de secretos y datos confidenciales (PII), y validación de esquemas JSON en tiempo real.',
    whyBuilt: 'Los agentes y flujos de IA son susceptibles a fugas de credenciales y ataques de inyección. AgentGuard audita prompts y salidas con redacción en streaming sin alterar el flujo conversacional.',
    description: [
      'Auditoría en tiempo real con enmascaramiento automático de API keys y datos personales sensibles.',
      'Inspección de tokens en streaming con detección de secretos que cruzan límites entre chunks contiguos.',
      'Validación de salidas contra JSON Schemas con códigos de salida deterministas para pipelines de CI/CD.',
      'Exportación nativa de hallazgos a SARIF para visualización en GitHub CodeQL.'
    ],
    tags: ['TypeScript', 'AI Security', 'Prompt Injection', 'PII Redaction', 'Streaming Tokens', 'SARIF', 'CI/CD'],
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
    featured: false,
    accentColor: '#EC4899',
    highlights: [
      'Modo streaming seguro guardStream() con buffer circular para detectar secretos partidos entre chunks.',
      'Soporte de configuración granular mediante archivo .agentguardrc.json.',
      'Previene fugas accidentales antes de enviar peticiones a modelos externos.'
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
    description: 'Tanto en el motor de almacenamiento RESP como en motores de audio y linters, el código se apoya en estructuras de datos sólidas (SkipLists, HyperLogLog, buffers vectorizados) y la biblioteca estándar en lugar de acumular dependencias npm innecesarias.'
  },
  {
    number: '03',
    title: 'Cada defecto no trivial deja una prueba de regresión',
    subtitle: 'El conocimiento del sistema se codifica en la suite de pruebas',
    description: 'Un bug resuelto que no queda cubierto por un test automatizado es un bug que volverá en el próximo refactor. En cada proyecto mantengo un historial donde cada fallo se convierte en un caso de prueba verificable.'
  },
  {
    number: '04',
    title: 'Decisiones de ingeniería basadas en datos, no en suposiciones',
    subtitle: 'Métricas reproducibles antes de cualquier afirmación de calidad',
    description: 'No asumo que algo es rápido: mido >35,000 ops/sec en pruebas de carga reales. No asumo que la UI es accesible: presento auditorías con 0 violaciones en @axe-core con WCAG 2.1 AA y Dynamic Type en móvil.'
  }
];

export const WORK_EXPERIENCE = [
  {
    period: 'Noviembre 2025 — Presente',
    role: 'Software Engineer / Mobile & QA Engineer',
    company: 'Nexgen Systems',
    location: 'Culiacán, Sinaloa, México',
    responsibilities: [
      {
        title: 'Local-First Architecture Development',
        desc: 'Diseño e implementación de algoritmos de sincronización y mecanismos de redes mesh de dispositivos tanto para clientes como para sistemas de punto de venta (POS), garantizando consistencia eventual, resolución determinista de conflictos y alta tolerancia a fallos ante caídas de red.'
      },
      {
        title: 'Cross-Stack Engineering',
        desc: 'Contribución activa en dos bases de código de producción independientes: un panel administrativo construido con Flutter/Dart y una aplicación móvil para comensales desarrollada con React Native y Next.js.'
      },
      {
        title: 'Software Quality & UI/UX Optimization',
        desc: 'Aplicación estricta de estándares de accesibilidad UI (Dynamic Type, adaptabilidad de layout, estados de carga auténticos) y construcción de pipelines automatizados de reporte de bugs para acelerar la resolución de incidentes en producción.'
      },
      {
        title: 'Agile Technical Collaboration',
        desc: 'Estimación técnica de historias de ingeniería, levantamiento de requerimientos y planeación de sprints dentro de un equipo ágil multifuncional de 4 personas.'
      }
    ]
  },
  {
    period: 'Junio 2025 — Noviembre 2025',
    role: 'IT Consultant / Infrastructure Support',
    company: 'Coppel',
    location: 'Culiacán, Sinaloa, México',
    responsibilities: [
      {
        title: 'Administración de Redes y Sistemas de Infraestructura',
        desc: 'Configuración de LANs empresariales, asignación y segmentación de direccionamiento IP, gestión de políticas de unión al dominio corporativo y despliegue automatizado de agentes de seguridad en endpoints bajo prácticas ágiles.'
      }
    ]
  }
];

export const EDUCATION_DATA = [
  {
    period: '2026 — 2028 (En Progreso)',
    degree: 'Master’s Degree in Applied Artificial Intelligence',
    institution: 'Universidad Autónoma de Occidente (UAdeO)',
    location: 'Culiacán, Sinaloa, México'
  },
  {
    period: '2022 — 2026 (Graduado)',
    degree: 'Bachelor’s Degree in Software Engineering',
    institution: 'Universidad Autónoma de Occidente (UAdeO) – Unidad Regional Culiacán',
    location: 'Culiacán, Sinaloa, México'
  }
];

export const CERTIFICATIONS_DATA = [
  {
    title: 'AI-Assisted Software Engineering',
    issuer: 'Anthropic Specialization (9 Certificaciones)',
    desc: 'Diseño de flujos de desarrollo agéntico con Claude Code y Model Context Protocol (MCP) para herramientas automatizadas, generación de código y síntesis de pruebas.'
  },
  {
    title: 'Scrum Fundamentals Certified',
    issuer: 'Agile Credentials',
    desc: 'Metodologías ágiles de entrega continua, estimación y ceremonias de sprint.'
  }
];

export const TECHNICAL_SKILLS = [
  {
    category: 'Languages & Runtimes',
    skills: 'TypeScript, JavaScript (Node.js 22), Python, PHP, C#, Java, SQL (PostgreSQL, SQLite, MySQL)'
  },
  {
    category: 'Backend & Architecture',
    skills: 'Clean Architecture, Feature-First, REST APIs, FastAPI, Express, TCP Sockets, RESP Protocol, Streaming Middleware, Authentication (JWT, Bcrypt, RLS), Server-Sent Events (SSE)'
  },
  {
    category: 'Frontend & Mobile',
    skills: 'React, Next.js 15 (App Router), React Native, Expo, Flutter, Dart, Tailwind CSS, Offline-First Sync, Accessibility (WCAG 2.1 AA, Dynamic Type)'
  },
  {
    category: 'Databases & Persistence',
    skills: 'SQLite, LibSQL, Supabase (PostgreSQL), MySQL, Redis / In-Memory KV Stores, Drizzle ORM'
  },
  {
    category: 'DevOps, CI/CD & AI',
    skills: 'Git, GitHub Actions, Linux/Bash, AST Analysis (TypeScript Compiler API), Agentic Workflows with Claude Code & Model Context Protocol (MCP)'
  },
  {
    category: 'Quality & Testing',
    skills: 'Playwright, Vitest, Jest, Maestro, axe-core, Postman, TDD, Load & Regression Testing'
  }
];
