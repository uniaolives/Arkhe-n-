
import { VerbalPolarity, ProcessorStats } from '../types';

export class EventProcessor {
  private stats: ProcessorStats = {
    received: 0,
    processed: 0,
    errors: 0,
    lag: 0,
    avgDuration: 0
  };

  private history: any[] = [];

  public getStats(): ProcessorStats {
    return { ...this.stats };
  }

  public processVerbalEvent(text: string, analysis: any) {
    this.stats.received++;
    const start = performance.now();
    
    // Simulate content_hash (xxhash mock)
    const hash = btoa(text).slice(0, 16);
    
    // Logic for deduplication simulation
    const isDuplicate = this.history.some(h => h.hash === hash);
    
    if (isDuplicate) {
      this.stats.lag += 0.1;
      return { status: 'DUPLICATE', hash };
    }

    // Process logic
    const duration = performance.now() - start;
    this.stats.processed++;
    this.stats.avgDuration = (this.stats.avgDuration + duration) / 2;
    
    const event = {
      id: `evt-${Date.now()}`,
      text,
      analysis,
      hash,
      processedAt: new Date().toISOString()
    };
    
    this.history.push(event);
    return { status: 'SUCCESS', hash, event };
  }

  public getBiochemicalReport() {
    const total = this.history.length || 1;
    const distribution = {
      [VerbalPolarity.TOXIC]: this.history.filter(h => h.analysis.polarity === VerbalPolarity.TOXIC).length / total,
      [VerbalPolarity.COHERENT]: this.history.filter(h => h.analysis.polarity === VerbalPolarity.COHERENT).length / total,
      [VerbalPolarity.NEUTRAL]: this.history.filter(h => h.analysis.polarity === VerbalPolarity.NEUTRAL).length / total,
    };
    return distribution;
  }
}

export const globalProcessor = new EventProcessor();
