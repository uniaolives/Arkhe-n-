
import { BioGenome } from '../types';

export interface SynapticTrace {
  partnerSignature: string;
  energyDelta: number;
  timestamp: number;
}

export class ConstraintLearner {
  public agentId: number;
  public weights: number[]; 
  public bias: number;
  public learningRate: number = 0.15;
  public workingMemory: SynapticTrace[] = [];
  public readonly maxMemory = 15;
  
  public successfulInteractions: number = 0;
  public failedInteractions: number = 0;
  public explorationRate: number = 0.3;
  public predictionErrors: number[] = [];

  constructor(agentId: number, genomeVector?: number[]) {
    this.agentId = agentId;
    this.weights = new Array(4).fill(0);
    this.bias = 0;
    if (genomeVector) {
      // Autoconhecimento: preference for similarity initially
      this.weights = genomeVector.map(v => v * 0.3);
    }
  }

  /**
   * Evaluate a partner using Bayesian integration of semantic (weights) and episodic (traces) memory.
   */
  public evaluatePartner(partnerGenome: BioGenome, currentTime: number): [number, string] {
    const features = [partnerGenome.C, partnerGenome.I, partnerGenome.E, partnerGenome.F];
    
    // 1. Semantic Memory (Weights)
    let semantic = this.bias;
    for (let i = 0; i < 4; i++) semantic += this.weights[i] * features[i];
    const semanticScore = Math.tanh(semantic);

    // 2. Episodic Memory Retrieval
    const memoryScore = this.queryMemory(features, currentTime);

    // 3. Predictive Integration (0.7 Episodic / 0.3 Semantic)
    let finalScore: number;
    let reasoning: string;

    if (memoryScore !== null) {
      finalScore = 0.7 * memoryScore + 0.3 * semanticScore;
      reasoning = `Memory(${memoryScore.toFixed(2)}) + Intuition(${semanticScore.toFixed(2)})`;
    } else {
      finalScore = semanticScore;
      reasoning = `Intuition(${semanticScore.toFixed(2)})`;
    }

    // 4. Novelty Search Modulation (Curiosity)
    const uncertainty = 1.0 - Math.min(1.0, this.weights.reduce((a, b) => a + Math.abs(b), 0) / 2);
    if (Math.random() < this.explorationRate * uncertainty) {
      const noise = (Math.random() - 0.5) * 0.5;
      finalScore += noise;
      reasoning += ` [Exploratory_Shift: ${noise.toFixed(2)}]`;
    }

    return [Math.max(-1, Math.min(1, finalScore)), reasoning];
  }

  private queryMemory(features: number[], currentTime: number): number | null {
    if (this.workingMemory.length === 0) return null;
    let bestMatch: SynapticTrace | null = null;
    let bestScore = -Infinity;

    for (const trace of this.workingMemory) {
      const traceFeatures = trace.partnerSignature.split('_').map(Number);
      if (traceFeatures.length !== 4) continue;

      const distance = Math.sqrt(features.reduce((acc, f, i) => acc + Math.pow(f - traceFeatures[i], 2), 0));
      const similarity = Math.max(0, 1.0 - distance / 2.0);

      if (similarity > 0.75) {
        const tau = 100.0;
        const decay = Math.exp(-Math.abs(currentTime - trace.timestamp) / tau);
        const weighted = trace.energyDelta * 5 * decay * similarity;
        if (weighted > bestScore) {
          bestScore = weighted;
          bestMatch = trace;
        }
      }
    }
    return bestMatch ? Math.max(-1, Math.min(1, bestScore)) : null;
  }

  /**
   * Modified Hebbian learning (STDP-like) based on metabolic delta.
   */
  public learnFromExperience(partnerGenome: BioGenome, energyDelta: number, currentTime: number) {
    const features = [partnerGenome.C, partnerGenome.I, partnerGenome.E, partnerGenome.F];
    
    // Prediction error calculation (Surprise factor)
    let prediction = this.bias;
    for (let i = 0; i < 4; i++) prediction += this.weights[i] * features[i];
    const prevPrediction = Math.tanh(prediction);
    const observed = Math.max(-1, Math.min(1, energyDelta * 5));
    const error = observed - prevPrediction;

    this.predictionErrors.push(Math.abs(error));
    if (this.predictionErrors.length > 20) this.predictionErrors.shift();

    const surpriseFactor = Math.min(Math.abs(error) * 2, 1.0);
    const effectiveLR = this.learningRate * surpriseFactor;

    if (energyDelta > 0) {
      // Long-term Potentiation (LTP)
      for (let i = 0; i < 4; i++) this.weights[i] += effectiveLR * features[i];
      this.bias += effectiveLR * 0.3;
      this.successfulInteractions++;
      this.explorationRate *= 0.98; // Exploit known success
    } else {
      // Long-term Depression (LTD)
      for (let i = 0; i < 4; i++) this.weights[i] -= effectiveLR * features[i] * 0.5;
      this.bias -= effectiveLR * 0.15;
      this.failedInteractions++;
      this.explorationRate = Math.min(0.6, this.explorationRate * 1.03); // Increase exploration on failure
    }

    // Synaptic Homeostasis
    const norm = Math.sqrt(this.weights.reduce((a, b) => a + b*b, 0));
    if (norm > 2.5) {
      for (let i = 0; i < 4; i++) this.weights[i] = (this.weights[i] / norm) * 2.5;
    }

    // Episodic Trace update
    const signature = features.map(f => f.toFixed(3)).join('_');
    this.workingMemory.push({ partnerSignature: signature, energyDelta, timestamp: currentTime });
    if (this.workingMemory.length > this.maxMemory) this.workingMemory.shift();
  }

  public getCognitiveState() {
    const total = this.successfulInteractions + this.failedInteractions;
    const successRate = total > 0 ? this.successfulInteractions / total : 0;
    
    let profile = "Neófito";
    if (total < 5) profile = "Inexperiente";
    else if (successRate > 0.75) profile = "Sábio_Especialista";
    else if (successRate > 0.45) profile = "Aprendiz";
    else if (successRate > 0.25) profile = "Explorador";
    else profile = "Cauteloso";

    const labels = ["Química", "Informação", "Energia", "Função"];
    const maxIdx = this.weights.indexOf(Math.max(...this.weights.map(Math.abs)));
    const pref = Math.abs(this.weights[maxIdx]) < 0.15 ? "Explorando padrões" : 
                 `${this.weights[maxIdx] > 0 ? 'Busca' : 'Evita'} ${labels[maxIdx]}`;

    return {
      profile,
      preferences: pref,
      explorationRate: this.explorationRate,
      successRate,
      memorySize: this.workingMemory.length,
      avgError: this.predictionErrors.reduce((a,b) => a+b, 0) / (this.predictionErrors.length || 1)
    };
  }

  public getWeightsDescription(): string {
    const state = this.getCognitiveState();
    return `${state.profile} // ${state.preferences}`;
  }
}
