
import { KNNPattern } from '../types';

/**
 * Calculates Euclidean distance between two 2D points (valence, arousal)
 */
const euclideanDistance = (p1: { v: number; a: number }, p2: { v: number; a: number }): number => {
  return Math.sqrt(Math.pow(p1.v - p2.v, 2) + Math.pow(p1.a - p2.a, 2));
};

export const predictEmotionKNN = (
  memory: KNNPattern[],
  current: { valence: number; arousal: number },
  k: number = 5
) => {
  if (memory.length === 0) return null;

  // Calculate distances to all points in memory
  const distances = memory.map(pattern => ({
    pattern,
    distance: euclideanDistance(
      { v: current.valence, a: current.arousal },
      { v: pattern.valence, a: pattern.arousal }
    )
  }));

  // Sort by distance and take top K
  const nearest = distances.sort((a, b) => a.distance - b.distance).slice(0, k);

  // Frequency vote
  const counts: Record<string, number> = {};
  nearest.forEach(n => {
    counts[n.pattern.emotion] = (counts[n.pattern.emotion] || 0) + 1;
  });

  const prediction = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
  
  // Calculate confidence based on inverse distance
  const avgDistance = nearest.reduce((sum, n) => sum + n.distance, 0) / nearest.length;
  const confidence = Math.max(0, Math.min(1, 1 - avgDistance));

  return {
    prediction,
    confidence,
    neighbors: nearest
  };
};

export const detectAnomaly = (
  memory: KNNPattern[],
  current: { valence: number; arousal: number },
  threshold: number = 0.5
) => {
  if (memory.length < 5) return false;

  const emotionPatterns = memory.filter(p => p.emotion === "HAPPY"); // Simplified check
  if (emotionPatterns.length === 0) return false;

  const distances = emotionPatterns.map(p => 
    euclideanDistance({ v: current.valence, a: current.arousal }, { v: p.valence, a: p.arousal })
  );

  const avgDist = distances.reduce((a, b) => a + b, 0) / distances.length;
  return avgDist > threshold;
};
