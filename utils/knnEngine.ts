
import { KNNPattern, KNNSuggestion, KNNInsights } from '../types';

const euclideanDistance = (a: number[], b: number[]): number => {
  if (a.length !== b.length) return Infinity;
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += Math.pow(a[i] - b[i], 2);
  }
  return Math.sqrt(sum);
};

export class AdaptiveKNNEngine {
  private memory: KNNPattern[] = [];
  private transitionMatrix: Record<string, Record<string, number>> = {};
  private k: number = 5;

  public addPattern(pattern: KNNPattern) {
    // Transition matrix update
    if (this.memory.length > 0) {
      const lastPattern = this.memory[this.memory.length - 1];
      if (!this.transitionMatrix[lastPattern.emotion]) {
        this.transitionMatrix[lastPattern.emotion] = {};
      }
      this.transitionMatrix[lastPattern.emotion][pattern.emotion] = 
        (this.transitionMatrix[lastPattern.emotion][pattern.emotion] || 0) + 1;
    }
    this.memory.push(pattern);
    if (this.memory.length > 500) this.memory.shift();
  }

  public predict(current: { valence: number; arousal: number }): { 
    prediction: string; 
    confidence: number; 
    predictedImpact: number;
    predictedWater: number;
    isAnomaly: boolean;
  } {
    if (this.memory.length < 1) {
      return { prediction: 'NEUTRAL', confidence: 0, predictedImpact: 50, predictedWater: 0.5, isAnomaly: false };
    }

    const currentVector = [current.valence, current.arousal];
    const distances = this.memory.map(p => ({
      pattern: p,
      dist: euclideanDistance(currentVector, [p.valence, p.arousal])
    }));

    const nearest = distances.sort((a, b) => a.dist - b.dist).slice(0, this.k);
    
    // Emotion Classification (Voting)
    const counts: Record<string, number> = {};
    nearest.forEach(n => {
      counts[n.pattern.emotion] = (counts[n.pattern.emotion] || 0) + 1;
    });
    const prediction = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
    
    // Impact Regression (Weighted Average)
    const totalInvDist = nearest.reduce((sum, n) => sum + 1 / (1 + n.dist), 0);
    const predictedImpact = nearest.reduce((sum, n) => sum + (n.pattern.biochemicalImpact * (1 / (1 + n.dist))), 0) / totalInvDist;
    const predictedWater = nearest.reduce((sum, n) => sum + (n.pattern.waterCoherence * (1 / (1 + n.dist))), 0) / totalInvDist;

    // Confidence Calculation
    const avgDist = nearest.reduce((sum, n) => sum + n.dist, 0) / this.k;
    const confidence = Math.max(0, Math.min(1, 1 - avgDist));

    // Anomaly Detection
    const sameEmotionDistances = distances.filter(d => d.pattern.emotion === prediction).map(d => d.dist);
    const isAnomaly = sameEmotionDistances.length > 3 && 
                      (avgDist > (sameEmotionDistances.reduce((a, b) => a + b, 0) / sameEmotionDistances.length) * 2.5);

    return { prediction, confidence, predictedImpact, predictedWater, isAnomaly };
  }

  public getSuggestions(currentEmotion: string): KNNSuggestion[] {
    const suggestions: KNNSuggestion[] = [];
    
    // 1. Probabilistic transitions
    const transitions = this.transitionMatrix[currentEmotion];
    if (transitions) {
      const total = Object.values(transitions).reduce((a, b) => a + b, 0);
      const sorted = Object.entries(transitions).sort((a, b) => b[1] - a[1]);
      sorted.slice(0, 2).forEach(([emotion, count]) => {
        suggestions.push({
          type: 'transition',
          emotion,
          probability: count / total,
          reason: `Natural pathway in your emotional topology.`
        });
      });
    }

    // 2. Optimal coherence suggestions
    const emotionPerformance: Record<string, number[]> = {};
    this.memory.forEach(p => {
      if (!emotionPerformance[p.emotion]) emotionPerformance[p.emotion] = [];
      emotionPerformance[p.emotion].push(p.waterCoherence);
    });

    const bestEmotions = Object.entries(emotionPerformance)
      .map(([emotion, values]) => ({
        emotion,
        avg: values.reduce((a, b) => a + b, 0) / values.length
      }))
      .sort((a, b) => b.avg - a.avg);

    if (bestEmotions[0] && bestEmotions[0].emotion !== currentEmotion) {
      suggestions.push({
        type: 'optimal',
        emotion: bestEmotions[0].emotion,
        reason: `Highest observed water coherence (${(bestEmotions[0].avg * 100).toFixed(1)}%).`
      });
    }

    return suggestions;
  }

  public getInsights(): KNNInsights {
    const emotionCounts: Record<string, number> = {};
    const waterScores: Record<string, number[]> = {};
    
    this.memory.forEach(p => {
      emotionCounts[p.emotion] = (emotionCounts[p.emotion] || 0) + 1;
      if (!waterScores[p.emotion]) waterScores[p.emotion] = [];
      waterScores[p.emotion].push(p.waterCoherence);
    });

    const dominant = Object.keys(emotionCounts).reduce((a, b) => 
      emotionCounts[a] > emotionCounts[b] ? a : b, 'NEUTRAL');

    const bestWater = Object.entries(waterScores)
      .map(([e, v]) => ({ e, avg: v.reduce((a, b) => a + b, 0) / v.length }))
      .sort((a, b) => b.avg - a.avg)[0]?.e || 'NEUTRAL';

    // Entropy calculation for variability
    const total = this.memory.length || 1;
    const entropy = -Object.values(emotionCounts).reduce((sum, count) => {
      const p = count / total;
      return sum + p * Math.log2(p);
    }, 0);

    return {
      totalPatterns: this.memory.length,
      dominantEmotion: dominant,
      variability: Math.min(100, (entropy / 3) * 100), // Normalized 0-100
      bestWaterEmotion: bestWater,
      anomalyDetected: false
    };
  }
}

export const globalKnnEngine = new AdaptiveKNNEngine();
