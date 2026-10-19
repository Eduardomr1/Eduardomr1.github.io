export type ProjectCategory = 
  | 'all'
  | 'systems'
  | 'qa-observability'
  | 'security-ai'
  | 'mobile';

export interface ProjectMetric {
  label: string;
  value: string;
  unit?: string;
  badge?: string;
}

export interface ProjectSpec {
  framework: string;
  architecture: string;
  testingSuite: string;
  complianceOrPerf: string;
}

export interface PortfolioProject {
  id: string;
  serialNumber: string; // e.g. "SYS-01"
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  role: string;
  year: string;
  summary: string;
  whyBuilt: string;
  description: string[];
  tags: string[];
  metrics: ProjectMetric[];
  specs: ProjectSpec;
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
  accentColor: string; // e.g. "#00E5FF"
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
  };
  highlights: string[];
}
