export interface Adulterant {
  name: string;
  type: string;
  isToxic: boolean;
  matchPercentage: number;
  description: string;
}

export interface AnalysisResult {
  id: string;
  date: string;
  sampleName: string;
  category: string;
  imageUrl?: string; // Optional now, as text analysis might not have one
  status: 'Safe' | 'Adulterated' | 'Inconclusive';
  confidenceScore: number;
  adulterants: Adulterant[];
  shortTermEffects: string;
  longTermRisks: string;
  summary?: string;
  sourceLinks?: string[]; // For Google Search Grounding
}

export interface UserSettings {
  sensitivity: number;
  detectArtificialColors: boolean;
  analyzeTexture: boolean;
  freshnessIndex: boolean;
}