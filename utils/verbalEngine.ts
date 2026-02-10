
import { VerbalPolarity } from '../types';

export const TOXIC_PATTERNS = [
  'can\'t', 'won\'t', 'never', 'always', 'hate', 'terrible', 'awful', 'disaster', 
  'failure', 'stupid', 'idiot', 'mess', 'sick', 'pain', 'suffer', 'die', 'kill', 'worthless'
];

export const HEALING_PATTERNS = [
  'can', 'will', 'choose', 'love', 'grateful', 'heal', 'healthy', 'strong', 'wise', 
  'capable', 'growing', 'learning', 'peace', 'joy', 'abundance', 'flow'
];

export const REFRAME_MAP: Record<string, string[]> = {
  'mess': ['learning', 'evolving', 'organizing with grace'],
  'failure': ['growth opportunity', 'valuable lesson', 'feedback for mastery'],
  'hate': ['release', 'choose differently', 'transform'],
  'can\'t': ['am learning to', 'choose a new path for', 'will find a way to'],
  'never': ['not yet', 'opening to', 'moving toward'],
  'sick': ['healing', 'resting for renewal', 'returning to balance']
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

  return {
    polarity,
    charge,
    impact: {
      cortisol: polarity === VerbalPolarity.TOXIC ? 0.8 : polarity === VerbalPolarity.DISRUPTIVE ? 0.4 : -0.2,
      dhea: polarity === VerbalPolarity.COHERENT ? 0.9 : polarity === VerbalPolarity.CONSTRUCTIVE ? 0.5 : -0.3,
      iga: polarity === VerbalPolarity.COHERENT ? 0.8 : -0.2,
      bdnf: polarity === VerbalPolarity.COHERENT ? 0.7 : -0.1,
      entropy: polarity === VerbalPolarity.TOXIC ? 0.9 : polarity === VerbalPolarity.COHERENT ? -0.7 : 0.1
    }
  };
};

export const reframeStatement = (text: string): string => {
  let reframed = text.toLowerCase();
  let changed = false;

  Object.entries(REFRAME_MAP).forEach(([toxic, options]) => {
    if (reframed.includes(toxic)) {
      const replacement = options[Math.floor(Math.random() * options.length)];
      reframed = reframed.replace(toxic, replacement);
      changed = true;
    }
  });

  if (!changed) return "I choose to speak words that heal my cells.";
  return reframed.charAt(0).toUpperCase() + reframed.slice(1);
};
