
import { BioGenome } from '../types';

export interface SynapticTrace {
  partnerSignature: string;
  energyDelta: number;
  timestamp: number;
  predictionError: number;
}

export class ConstraintLearner {
  public agentId: number;
  public weights: number[]; 
  public bias: number;
  public learningRate: number = 0.2;
  public memoryTrace: SynapticTrace[] = [];
  public readonly maxMemory = 50; // Increased memory trace (deque)
  
  public successfulInteractions: number = 0;
  public failedInteractions: number = 0;
  public explorationRate: number = 0.45; // Increased for nascent state
  public predictionErrors: number[] = [];

  constructor(agentId: number, genomeVector?: number[]) {
    this.agentId = agentId;
    this.bias = (Math.random() - 0.5) * 0.1;
    
    // Seed initial weights randomly to encourage exploration
    // Blend genome inheritance (60%) with pure noise (40%)
    if (genomeVector) {
      this.weights = genomeVector.map(v => 
        (v * 0.6) + ((Math.random() - 0.5) * 0.8)
      );
    } else {
      this.weights = new Array(4).fill(0).map(() => (Math.random() - 0.5) * 1.5);
    }
  }

  public getMemoryEntropy(): number {
    if (this.memoryTrace.length < 5) return 0;
    
    // Discretize energy delta into bins for entropy calculation
    const bins: Record<string, number> = {};
    this.memoryTrace.forEach(t => {
      const bin = Math.round(t.energyDelta * 5) / 5;
      bins[bin] = (bins[bin] || 0) + 1;
    });

    let entropy = 0;
    const total = this.memoryTrace.length;
    Object.values(bins).forEach(count => {
      const p = count / total;
      entropy -= p * Math.log2(p);
    });

    return entropy;
  }

  /**
   * Evaluate a partner using Bayesian integration of semantic weights and memory traces.
   * Temporal pattern recognition: recent similar interactions bias the decision.
   */
  public evaluatePartner(partnerGenome: BioGenome, currentTime: number): [number, string] {
    const features = [partnerGenome.C, partnerGenome.I, partnerGenome.E, partnerGenome.F];
    
    // 1. Base Prediction (Intuition)
    let semantic = this.bias;
    for (let i = 0; i < 4; i++) semantic += this.weights[i] * features[i];
    const semanticScore = Math.tanh(semantic);

    // 2. Memory Trace Retrieval (Temporal Pattern Recognition)
    const memoryBias = this.recallTemporalPattern(features, currentTime);

    // 3. Integration
    const integratedScore = (memoryBias !== null) 
      ? (0.6 * memoryBias + 0.4 * semanticScore) 
      : semanticScore;

    let reasoning = memoryBias !== null ? "Memória_Temporal" : "Intuição_Genômica";

    // 4. Exploration (Nascent Chaos)
    if (Math.random() < this.explorationRate) {
      const explorationShift = (Math.random() - 0.5) * 0.4;
      reasoning += ` [Explorando_${explorationShift > 0 ? '+' : '-'}]`;
      return [Math.max(-1, Math.min(1, integratedScore + explorationShift)), reasoning];
    }

    return [Math.max(-1, Math.min(1, integratedScore)), reasoning];
  }

  private recallTemporalPattern(features: number[], currentTime: number): number | null {
    if (this.memoryTrace.length === 0) return null;
    
    let weightedOutcome = 0;
    let totalWeight = 0;

    // Iterate through memory trace (deque)
    for (const trace of this.memoryTrace) {
      const traceFeatures = trace.partnerSignature.split('_').map(Number);
      const distance = Math.sqrt(features.reduce((acc, f, i) => acc + Math.pow(f - traceFeatures[i], 2), 0));
      
      // Feature Similarity
      const similarity = Math.max(0, 1.0 - distance / 1.5);
      if (similarity < 0.6) continue;

      // Temporal Decay (Recency bias)
      const age = currentTime - trace.timestamp;
      const temporalWeight = Math.exp(-age / 200.0);
      
      const weight = similarity * temporalWeight;
      weightedOutcome += trace.energyDelta * weight;
      totalWeight += weight;
    }

    return totalWeight > 0 ? Math.tanh(weightedOutcome / totalWeight) : null;
  }

  /**
   * Adaptive Learning from Interaction Experience
   */
  public learnFromExperience(partnerGenome: BioGenome, energyDelta: number, currentTime: number) {
    const features = [partnerGenome.C, partnerGenome.I, partnerGenome.E, partnerGenome.F];
    const signature = features.map(f => f.toFixed(3)).join('_');
    
    // Calculate surprise (Prediction Error)
    let prediction = this.bias;
    for (let i = 0; i < 4; i++) prediction += this.weights[i] * features[i];
    const error = energyDelta - Math.tanh(prediction);

    // Store in memory trace (deque behavior)
    this.memoryTrace.push({ partnerSignature: signature, energyDelta, timestamp: currentTime, predictionError: error });
    if (this.memoryTrace.length > this.maxMemory) this.memoryTrace.shift();

    // Hebbian Update
    const lr = this.learningRate * (1.0 + Math.abs(error)); // Boost learning on high surprise
    for (let i = 0; i < 4; i++) {
      this.weights[i] += lr * error * features[i];
    }
    this.bias += lr * error * 0.1;

    if (energyDelta > 0) this.successfulInteractions++;
    else this.failedInteractions++;

    this.predictionErrors.push(Math.abs(error));
    if (this.predictionErrors.length > 20) this.predictionErrors.shift();
    
    // Homeostatic Regulation of exploration
    this.explorationRate = Math.max(0.1, this.explorationRate * 0.995);
  }

  public getCognitiveState() {
    const successRate = (this.successfulInteractions / (this.successfulInteractions + this.failedInteractions + 1));
    return {
      profile: successRate > 0.7 ? "Especialista_Coerente" : "Explorador_Nascente",
      preferences: this.weights[1] > 0.5 ? "Busca_Informação" : "Busca_Estabilidade",
      avgError: this.predictionErrors.reduce((a, b) => a + b, 0) / (this.predictionErrors.length || 1),
      memoryDepth: this.memoryTrace.length,
      memoryEntropy: this.getMemoryEntropy()
    };
  }
}
