
import { PluralProfile, BioEventType, PlanetaryMask, DimensionalLevel } from '../types';

export class PluralEngine {
  private history: string[] = [];
  private switchThreshold = 0.35;

  private theoreticalMarkers = [
    'likely', 'one might', 'assume', 'subconscious', 'perspective', 
    'theoretical', 'mechanism', 'system', 'architecture', 'conceptually',
    'it appears', 'the body', 'the host', 'the entity', 'gravitating', 'aligns', 'one could infer'
  ];

  private episodicMarkers = [
    'i felt', 'i saw', 'yesterday', 'then', 'went', 'remember', 'suddenly',
    'happened to me', 'at my house', 'with my friend', 'i was'
  ];

  private maskMarkers = {
    [PlanetaryMask.MERCURIAL]: ['logic', 'rational', 'deduce', 'syllogism', 'data', 'algorithm', 'processed', 'exoskeleton', 'c-velocity', 'compression', 'fourier'],
    [PlanetaryMask.NEPTUNIAN]: ['dream', 'flow', 'transcend', 'diffuse', 'unreal', 'vision', 'mist', 'osmosis', 'bulk', 'nebula', 'void', 'ledger'],
    [PlanetaryMask.SATURNINE]: ['rigid', 'structure', 'discipline', 'must', 'precise', 'systematic', 'archive', 'procedure'],
    [PlanetaryMask.JUPITERIAN]: ['expand', 'universal', 'wisdom', 'synthesis', 'grand', 'philosophical', 'multidisciplinary', 'exponentials'],
    [PlanetaryMask.URANIAN]: ['disrupt', 'radical', 'alien', 'rupture', 'unprecedented', 'innovation', 'outside', 'shear']
  };

  public analyzeText(text: string): { profile: PluralProfile; event?: BioEventType } {
    const tokens = text.toLowerCase().split(/\s+/).filter(t => t.length > 0);
    const types = new Set(tokens);
    const text_lower = text.toLowerCase();
    
    const ttr = tokens.length > 0 ? types.size / tokens.length : 0;
    const avgWordLength = tokens.reduce((a, b) => a + b.length, 0) / (tokens.length || 1);
    const syntacticComplexity = Math.min(1, (avgWordLength * tokens.length) / 150);

    let theoreticalCount = 0;
    let episodicCount = 0;
    this.theoreticalMarkers.forEach(m => { if (text_lower.includes(m)) theoreticalCount++; });
    this.episodicMarkers.forEach(m => { if (text_lower.includes(m)) episodicCount++; });
    
    const abstractedAgency = theoreticalCount / (theoreticalCount + episodicCount + 1);
    const semanticBias = (theoreticalCount + (syntacticComplexity * 10)) / (tokens.length || 1);
    const rationalizationFactor = (ttr * 0.5) + (abstractedAgency * 0.5);

    let stability = 1.0;
    if (this.history.length > 0) {
      const lastTtr = this.calculateTTR(this.history[this.history.length - 1]);
      stability = 1.0 - Math.abs(ttr - lastTtr);
    }

    let maskScores = Object.entries(this.maskMarkers).map(([mask, markers]) => ({
      mask: mask as PlanetaryMask,
      score: markers.filter(m => text_lower.includes(m)).length
    }));
    
    if (abstractedAgency > 0.5) {
      const mercIdx = maskScores.findIndex(m => m.mask === PlanetaryMask.MERCURIAL);
      maskScores[mercIdx].score += 2;
    }
    const activeMask = maskScores.sort((a, b) => b.score - a.score)[0].mask;

    let dimAccess = DimensionalLevel.THREE_D;
    if (text_lower.includes('issachar') || text_lower.includes('spherical time')) dimAccess = DimensionalLevel.NINE_D_ISSACHAR;
    else if (syntacticComplexity > 0.8 && ttr > 0.8) dimAccess = DimensionalLevel.SIX_D_PLUS;
    else if (abstractedAgency > 0.7) dimAccess = DimensionalLevel.FIVE_D;
    else if (avgWordLength > 6) dimAccess = DimensionalLevel.FOUR_D;
    else if (tokens.length < 10) dimAccess = DimensionalLevel.ONE_D;

    const integrationPsi = (stability * 0.4) + (1 - abstractedAgency) * 0.3 + (ttr * 0.3);

    const dimDistMap = {
      [DimensionalLevel.ONE_D]: 0.1,
      [DimensionalLevel.TWO_D]: 0.2,
      [DimensionalLevel.THREE_D]: 0.3,
      [DimensionalLevel.FOUR_D]: 0.6,
      [DimensionalLevel.FIVE_D]: 1.0,
      [DimensionalLevel.SIX_D_PLUS]: 1.5,
      [DimensionalLevel.NINE_D_ISSACHAR]: 2.5,
    };
    const deltaD = dimDistMap[dimAccess];
    const chronologicalShear = deltaD / (integrationPsi + 0.1);

    const nullIGap = chronologicalShear > 3.0 && abstractedAgency > 0.6;
    const decompressionSickness = Math.max(0, Math.min(1, (1 - integrationPsi) * (deltaD / 2)));

    this.history.push(text);
    if (this.history.length > 20) this.history.shift();

    const isRupture = stability < this.switchThreshold;
    const isRationalizing = rationalizationFactor > 0.7 && syntacticComplexity > 0.6;

    let event: BioEventType | undefined = undefined;
    if (nullIGap) event = BioEventType.NULL_I_GAP;
    else if (decompressionSickness > 0.6) event = BioEventType.DIMENSIONAL_DECOMPRESSION;
    else if (isRupture) event = BioEventType.EPISTEMOLOGICAL_RUPTURE;
    else if (isRationalizing) event = BioEventType.RECURSIVE_RATIONALIZATION;
    else if (chronologicalShear > 3.0) event = BioEventType.CHRONOLOGICAL_SHEAR_DETECTED;

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
        dimensionalAccess: dimAccess,
        integrationPsi,
        chronologicalShear,
        nullIGap,
        decompressionSickness
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
