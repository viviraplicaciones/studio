export type Language = 'en' | 'es' | 'fr' | 'pt' | 'ja';

export type MultilingualString = {
  [key in Language]: string;
};

export type ElementPhase = 'Gas' | 'Liquid' | 'Solid' | 'Unknown';

export interface ElementData {
  atomicNumber: number;
  symbol: string;
  name: MultilingualString;
  atomic_mass: number;
  category: string;
  density: number | null;
  summary: MultilingualString;
  electron_configuration: string;
  xpos: number;
  ypos: number;
  phase: ElementPhase;
  discovered_by: string | null;
  named_by: string | null;
  appearance: string | null;
  history: MultilingualString;
}
