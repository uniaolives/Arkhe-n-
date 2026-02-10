
import { PluralProfile, BioEventType } from '../types';

export class PluralEngine {
  private history: string[] = [];
  private switchThreshold = 0.35;

  public analyzeText(text: string): { profile: PluralProfile; event?: BioEventType } {
    const tokens = text.toLowerCase().split(/\s+/).filter(t => t.length > 0);
    const types = new Set(tokens);
    
    // Type-Token Ratio calculation: TTR = V / N
    const ttr = tokens.length > 0 ? types.size / tokens.length : 0;
    
    // Syntactic Complexity (MOCK based on length and punctuation density)
    const avgWordLength = tokens.reduce((a, b) => a + b.length, 0) / (tokens.length || 1);
    const syntacticComplexity = Math.min(1, (avgWordLength * tokens.length) / 100);

    // Epistemological Stability calculation (Comparing with last entry)
    let stability = 1.0;
    if (this.history.length > 0) {
      const lastTtr = this.calculateTTR(this.history[this.history.length - 1]);
      const diff = Math.abs(ttr - lastTtr);
      stability = 1.0 - diff;
    }

    this.history.push(text);
    if (this.history.length > 10) this.history.shift();

    const isRupture = stability < this.switchThreshold;

    return {
      profile: {
        id: `plural-${Date.now()}`,
        ttr,
        syntacticComplexity,
        epistemologicalStability: stability,
        detectedAlters: isRupture ? 2 : 1,
        amnesicShadow: isRupture ? 0.8 : 0.1
      },
      event: isRupture ? BioEventType.EPISTEMOLOGICAL_RUPTURE : 
             (ttr > 0.8 ? BioEventType.LEXICAL_COMPLEXITY_PEAK : undefined)
    };
  }

  private calculateTTR(text: string): number {
    const tokens = text.toLowerCase().split(/\s+/).filter(t => t.length > 0);
    const types = new Set(tokens);
    return tokens.length > 0 ? types.size / tokens.length : 0;
  }
}

export const globalPluralEngine = new PluralEngine();
