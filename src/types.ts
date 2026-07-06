/**
 * Shared types and interfaces for the Aiyan Embroidery And Hand Works application.
 */

export interface DesignConsultation {
  occasion: string;
  fabric: string;
  color: string;
  blouseStyle: string;
  coverage: string;
  customDetails: string;
}

export interface DesignProposal {
  title: string;
  embroideryStyle: string;
  designConcept: string;
  recommendedMotifs: string[];
  embellishments: string;
  suggestedColorPairings: string[];
  careInstructions: string;
  estimateTimeline: string;
  estimatedBudget: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'blouses' | 'saris' | 'jackets' | 'lehengas';
  image: string;
  description: string;
  details: string[];
}

export interface EstimatorOptions {
  garmentType: string;
  workType: string;
  coverage: string;
  fabricProvided: boolean;
}
