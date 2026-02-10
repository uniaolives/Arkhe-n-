
import { VerbalPolarity, BioEventType, BioChemicalEvent } from '../types';

export const TOXIC_PATTERNS = [
  'can\'t', 'won\'t', 'never', 'always', 'hate', 'terrible', 'awful', 'disaster', 
  'failure', 'stupid', 'idiot', 'mess', 'sick', 'pain', 'suffer', 'die', 'kill', 'worthless'
];

export const HEALING_PATTERNS = [
  'can', 'will', 'choose', 'love', 'grateful', 'heal', 'healthy', 'strong', 'wise', 
  'capable', 'growing', 'learning', 'peace', 'joy', 'abundance', 'flow'
];

export interface PhotonicState {
  frequency: number; 
  wavelength: number;
  energy: number;
  waterCoherence: number;
}

export interface CellularImpact {
  geneExpression: number;
  dnaRepair: number;
  atpProduction: number;
  inflammation: number;
  telomereAttrition: number;
  proteinFolding: number;
  entropy: number;
  targets: string[];
}

const generateBioCascade = (text: string, analysis: any): BioChemicalEvent[] => {
  const { photonic, charge, polarity } = analysis;
  const cascade: BioChemicalEvent[] = [];

  // T+0ns: Verbal Emission
  cascade.push({
    type: BioEventType.VERBAL_EMISSION,
    timeNs: 0,
    description: `Emission: "${text.substring(0, 30)}..."`,
    impact: 100,
    targets: ["Auditory Nerve", "Temporal Cortex"],
    amplification: 1.0
  });

  // T+1ns: Photonic Conversion
  cascade.push({
    type: BioEventType.PHOTONIC_CONVERSION,
    timeNs: 1,
    description: `Photons: ${photonic.wavelength.toFixed(1)}nm, ${photonic.energy.toExponential(2)}J`,
    impact: 95,
    targets: ["Microtubules", "Liquid Crystals", "DNA"],
    amplification: photonic.waterCoherence > 0.7 ? 1.2 : 0.8
  });

  // T+10ns: Water Reorganization
  cascade.push({
    type: BioEventType.WATER_REORGANIZATION,
    timeNs: 10,
    description: `Structure: ${photonic.waterCoherence > 0.7 ? 'HEXAGONAL' : 'DISORDERED'}`,
    impact: photonic.waterCoherence * 100,
    targets: ["H2O Clusters", "Hydrogen Bonds"],
    amplification: photonic.waterCoherence * 1.5
  });

  // T+1µs: Gene Expression
  const genes = charge > 0 ? ["NRF2", "FOXO3", "SIRT1"] : ["NF-κB", "COX-2", "IL-6"];
  cascade.push({
    type: BioEventType.GENE_EXPRESSION,
    timeNs: 1000,
    description: `Transcription: ${charge > 0 ? 'FACILITATED' : 'INHIBITED'}`,
    impact: Math.max(40, 70 + charge * 30),
    targets: genes,
    amplification: charge > 0 ? 1.3 : 0.7
  });

  // T+1ms: Hormonal Response
  const hormones = charge > 0 ? ["Oxytocin", "Serotonina"] : ["Cortisol", "Adrenalina"];
  cascade.push({
    type: BioEventType.HORMONAL_RESPONSE,
    timeNs: 1000000,
    description: `Signal: ${charge > 0 ? 'HEALING' : 'STRESS'}`,
    impact: Math.abs(charge * 100),
    targets: hormones,
    amplification: 1.0
  });

  return cascade;
};

export const analyzeVerbalChemistry = (text: string) => {
  const lower = text.toLowerCase();
  let toxicCount = 0;
  let healingCount = 0;

  TOXIC_PATTERNS.forEach(p => { if (lower.includes(p)) toxicCount++; });
  HEALING_PATTERNS.forEach(p => { if (lower.includes(p)) healingCount++; });

  let polarity = VerbalPolarity.NEUTRAL;
  let charge = 0;

  if (toxicCount > healingCount + 2) polarity = VerbalPolarity.TOXIC;
  else if (toxicCount > healingCount) polarity = VerbalPolarity.DISRUPTIVE;
  else if (healingCount > toxicCount + 2) polarity = VerbalPolarity.COHERENT;
  else if (healingCount > toxicCount) polarity = VerbalPolarity.CONSTRUCTIVE;

  switch (polarity) {
    case VerbalPolarity.TOXIC: charge = -0.8; break;
    case VerbalPolarity.DISRUPTIVE: charge = -0.4; break;
    case VerbalPolarity.COHERENT: charge = 0.9; break;
    case VerbalPolarity.CONSTRUCTIVE: charge = 0.5; break;
    default: charge = 0;
  }

  const frequency = charge < 0 ? (1 + Math.abs(charge) * 9) : (400 + charge * 350);
  const wavelength = charge < 0 ? (1000 + (1 - Math.abs(charge)) * 500) : (750 - charge * 350);
  const waterCoherence = polarity === VerbalPolarity.TOXIC ? 0.2 : polarity === VerbalPolarity.COHERENT ? 0.95 : 0.5;

  const analysis = {
    polarity,
    charge,
    photonic: {
      frequency,
      wavelength,
      energy: 6.626e-34 * (frequency * 1e12),
      waterCoherence
    }
  };

  const cascade = generateBioCascade(text, analysis);
  const activeTargets = Array.from(new Set(cascade.flatMap(e => e.targets)));

  return {
    ...analysis,
    cascade,
    impact: {
      geneExpression: waterCoherence * 100,
      dnaRepair: charge > 0 ? 70 + waterCoherence * 30 : 40,
      atpProduction: 100 + (waterCoherence - 0.5) * 40,
      inflammation: 100 + charge * -50,
      telomereAttrition: charge < -0.5 ? 120 + Math.abs(charge) * 30 : 100,
      proteinFolding: waterCoherence * 100,
      entropy: polarity === VerbalPolarity.TOXIC ? 0.9 : polarity === VerbalPolarity.COHERENT ? -0.7 : 0.1,
      targets: activeTargets
    } as CellularImpact
  };
};

export const reframeStatement = (text: string): string => {
  const options = [
    "I am capable, strong, and constantly growing.",
    "My biology reflects the clarity of my intentions.",
    "Every cell in my body is vibrating with healing light.",
    "I choose words that structure my existence into a hexagonal diamond.",
    "The quantum flow of my words heals my genetic lineage."
  ];
  return options[Math.floor(Math.random() * options.length)];
};
