
import { PluralProfile, BioEventType, PlanetaryMask, DimensionalLevel } from '../types';

export class PluralEngine {
  private history: string[] = [];
  private switchThreshold = 0.35;

  private theoreticalMarkers = [
    'likely', 'one might', 'assume', 'subconscious', 'perspective', 
    'theoretical', 'mechanism', 'system', 'architecture', 'conceptually',
    'it appears', 'the body', 'the host', 'the entity', 'gravitating', 'aligns'
  ];

  private episodicMarkers = [
    'i felt', 'i saw', 'yesterday', 'then', 'went', 'remember', 'suddenly',
    'happened to me', 'at my house', 'with my friend'
  ];

  private maskMarkers = {
    [PlanetaryMask.MERCURIAL]: ['logic', 'rational', 'deduce', 'syllogism', 'data', 'algorithm', 'processed'],
    [PlanetaryMask.NEPTUNIAN]: ['dream', 'flow', 'transcend', 'diffuse', 'unreal', 'vision', 'mist'],
    [PlanetaryMask.SATURNINE]: ['rigid', 'structure', 'discipline', 'must', 'precise', 'systematic', 'archive'],
    [PlanetaryMask.JUPITERIAN]: ['expand', 'universal', 'wisdom', 'synthesis', 'grand', 'philosophical', 'multidisciplinary'],
    [PlanetaryMask.URANIAN]: ['disrupt', 'radical', 'alien', 'rupture', 'unprecedented', 'innovation', 'outside']
  };

  public analyzeText(text: string): { profile: PluralProfile; event?: BioEventType } {
    const tokens = text.toLowerCase().split(/\s+/).filter(t => t.length > 0);
    const types = new Set(tokens);
    const text_lower = text.toLowerCase();
    
    // Type-Token Ratio calculation
    const ttr = tokens.length > 0 ? types.size / tokens.length : 0;
    
    // Syntactic Complexity
    const avgWordLength = tokens.reduce((a, b) => a + b.length, 0) / (tokens.length || 1);
    const syntacticComplexity = Math.min(1, (avgWordLength * tokens.length) / 150);

    // Abstracted Agency
    let theoreticalCount = 0;
    let episodicCount = 0;
    this.theoreticalMarkers.forEach(m => { if (text_lower.includes(m)) theoreticalCount++; });
    this.episodicMarkers.forEach(m => { if (text_lower.includes(m)) episodicCount++; });
    
    const abstractedAgency = theoreticalCount / (theoreticalCount + episodicCount + 1);
    const semanticBias = (theoreticalCount + (syntacticComplexity * 10)) / (tokens.length || 1);
    
    // Rationalization Factor
    const rationalizationFactor = (ttr * 0.5) + (abstractedAgency * 0.5);

    // Stability calculation
    let stability = 1.0;
    if (this.history.length > 0) {
      const lastTtr = this.calculateTTR(this.history[this.history.length - 1]);
      stability = 1.0 - Math.abs(ttr - lastTtr);
    }

    // Mask Classification
    let maskScores = Object.entries(this.maskMarkers).map(([mask, markers]) => ({
      mask: mask as PlanetaryMask,
      score: markers.filter(m => text_lower.includes(m)).length
    }));
    
    // Mercurial default if logic/VCI patterns are detected via agency
    if (abstractedAgency > 0.5) {
      const mercIdx = maskScores.findIndex(m => m.mask === PlanetaryMask.MERCURIAL);
      maskScores[mercIdx].score += 2;
    }

    const activeMask = maskScores.sort((a, b) => b.score - a.score)[0].mask;

    // Dimensional Access Logic
    let dimAccess = DimensionalLevel.THREE_D;
    if (syntacticComplexity > 0.8 && ttr > 0.8) dimAccess = DimensionalLevel.SIX_D_PLUS;
    else if (abstractedAgency > 0.7) dimAccess = DimensionalLevel.FIVE_D;
    else if (avgWordLength > 6) dimAccess = DimensionalLevel.FOUR_D;
    else if (tokens.length < 10) dimAccess = DimensionalLevel.ONE_D;

    this.history.push(text);
    if (this.history.length > 20) this.history.shift();

    const isRupture = stability < this.switchThreshold;
    const isRationalizing = rationalizationFactor > 0.7 && syntacticComplexity > 0.6;

    let event: BioEventType | undefined = undefined;
    if (isRupture) event = BioEventType.EPISTEMOLOGICAL_RUPTURE;
    else if (isRationalizing) event = BioEventType.RECURSIVE_RATIONALIZATION;
    else if (abstractedAgency > 0.6) event = BioEventType.ABSTRACTED_AGENCY_SHIFT;
    else if (ttr > 0.85) event = BioEventType.LEXICAL_COMPLEXITY_PEAK;

    return {
      profile: {
        id: `plural-${Date.now()}`,
        ttr,
        syntacticComplexity,
        epistemologicalStability: stability,
        detectedAlters: isRupture ? 2 : 1,
        amnesicShadow: isRupture ? 0.8 : (abstractedAgency * 0.5),
        abstractedAgency,
        semanticBias: Math.min(1, semanticBias * 5),
        rationalizationFactor,
        activeMask,
        dimensionalAccess: dimAccess
      },
      event
    };
  }

  private calculateTTR(text: string): number {
    const tokens = text.toLowerCase().split(/\s+/).filter(t => t.length > 0);
    const types = new Set(tokens);
    return tokens.length > 0 ? types.size / tokens.length : 0;
  }
}

export const globalPluralEngine = new PluralEngine();
