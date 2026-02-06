
export enum ViewMode {
  ARCHITECTURE = 'architecture',
  ROADMAP = 'roadmap',
  WORKSPACE = 'workspace',
  VISUALIZER = 'visualizer',
  BOILERPLATE = 'boilerplate',
  VIDEO_LAB = 'video_lab'
}

export interface RoadmapStep {
  day: number;
  title: string;
  tasks: string[];
  status: 'completed' | 'current' | 'upcoming';
}

export interface GenomicDiscovery {
  id: string;
  type: 'Variant' | 'Gene' | 'Pathway';
  identifier: string;
  description: string;
  confidence: number;
  sources: string[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  type: 'component' | 'data' | 'process';
  description: string;
}
