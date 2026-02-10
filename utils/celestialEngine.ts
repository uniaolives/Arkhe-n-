
import { CelestialBody, HelicalPosition, CelestialDNAStats, BioEventType } from '../types';

export interface OrbitParams {
  body: CelestialBody;
  orbitalRadius: number; // AU
  orbitalPeriod: number; // Earth years
  orbitalInclination: number; // Degrees
  orbitalPhase: number; // Radians
  mass: number; // Earth masses
}

const AU_TO_LY = 1.58e-5;
const GALACTIC_RADIUS = 26000; // LY
const GALACTIC_PERIOD = 225000000; // Years
const VERTICAL_AMPLITUDE = 100; // LY
const VERTICAL_PERIOD = 70000000; // Years

export class CelestialEngine {
  private orbits: OrbitParams[] = [
    { body: CelestialBody.SUN, orbitalRadius: 0, orbitalPeriod: 1, orbitalInclination: 0, orbitalPhase: 0, mass: 333000 },
    { body: CelestialBody.MERCURY, orbitalRadius: 0.387, orbitalPeriod: 0.241, orbitalInclination: 7.0, orbitalPhase: Math.PI, mass: 0.055 },
    { body: CelestialBody.VENUS, orbitalRadius: 0.723, orbitalPeriod: 0.615, orbitalInclination: 3.39, orbitalPhase: 0, mass: 0.815 },
    { body: CelestialBody.EARTH, orbitalRadius: 1.0, orbitalPeriod: 1.0, orbitalInclination: 0, orbitalPhase: Math.PI, mass: 1.0 },
    { body: CelestialBody.MARS, orbitalRadius: 1.524, orbitalPeriod: 1.881, orbitalInclination: 1.85, orbitalPhase: 0, mass: 0.107 },
    { body: CelestialBody.JUPITER, orbitalRadius: 5.203, orbitalPeriod: 11.86, orbitalInclination: 1.31, orbitalPhase: Math.PI, mass: 317.8 },
    { body: CelestialBody.SATURN, orbitalRadius: 9.537, orbitalPeriod: 29.45, orbitalInclination: 2.49, orbitalPhase: 0, mass: 95.2 },
    { body: CelestialBody.URANUS, orbitalRadius: 19.19, orbitalPeriod: 84.02, orbitalInclination: 0.77, orbitalPhase: Math.PI, mass: 14.5 },
    { body: CelestialBody.NEPTUNE, orbitalRadius: 30.07, orbitalPeriod: 164.8, orbitalInclination: 1.77, orbitalPhase: 0, mass: 17.1 },
  ];

  public getPositionAtTime(body: CelestialBody, tYears: number): HelicalPosition {
    const params = this.orbits.find(o => o.body === body)!;
    
    // Heliocentric part
    const omegaOrb = (2 * Math.PI) / (params.orbitalPeriod || 1);
    const thetaOrb = omegaOrb * tYears + params.orbitalPhase;
    
    const xOrb = params.orbitalRadius * Math.cos(thetaOrb);
    const yOrb = params.orbitalRadius * Math.sin(thetaOrb) * Math.cos(params.orbitalInclination * Math.PI / 180);
    const zOrb = params.orbitalRadius * Math.sin(thetaOrb) * Math.sin(params.orbitalInclination * Math.PI / 180);

    // Galactic part
    const omegaGal = (2 * Math.PI) / GALACTIC_PERIOD;
    const thetaGal = omegaGal * tYears;
    const xGal = GALACTIC_RADIUS * Math.cos(thetaGal);
    const yGal = GALACTIC_RADIUS * Math.sin(thetaGal);

    // Vertical oscillation
    const omegaZ = (2 * Math.PI) / VERTICAL_PERIOD;
    const zGal = VERTICAL_AMPLITUDE * Math.sin(omegaZ * tYears);

    return {
      body,
      x: xGal + xOrb * AU_TO_LY,
      y: yGal + yOrb * AU_TO_LY,
      z: zGal + zOrb * AU_TO_LY
    };
  }

  public getEntanglementMatrix(): number[][] {
    const matrix: number[][] = Array(9).fill(0).map(() => Array(9).fill(0));
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (i === j) {
          matrix[i][j] = 1.0;
          continue;
        }
        const o1 = this.orbits[i];
        const o2 = this.orbits[j];
        
        // Resonance similarity
        const ratio = o1.orbitalPeriod / o2.orbitalPeriod;
        let bestResonance = 0;
        for (let p = 1; p <= 5; p++) {
          for (let q = 1; q <= 5; q++) {
            const target = p / q;
            const score = 1 / (1 + Math.abs(ratio - target) * 10);
            if (score > bestResonance) bestResonance = score;
          }
        }
        
        // Proximity factor
        const dist = 1 / (1 + Math.abs(o1.orbitalRadius - o2.orbitalRadius));
        
        matrix[i][j] = (bestResonance * 0.6 + dist * 0.4);
      }
    }
    return matrix;
  }

  public getDNAStats(): CelestialDNAStats {
    const avgPeriod = this.orbits.slice(1).reduce((acc, o) => acc + o.orbitalPeriod, 0) / 8;
    const turnsPerGalacticOrbit = GALACTIC_PERIOD / avgPeriod;
    const humanDnaTurns = 3.2e9 / 10.5;
    
    return {
      turnsPerGalacticOrbit,
      basePairsPerTurn: 4, // 4 planet pairs
      humanCelestialRatio: humanDnaTurns / turnsPerGalacticOrbit,
      quantumCoherence: 0.85 + Math.random() * 0.1,
      entanglementEntropy: 2.1 + Math.random() * 0.5
    };
  }

  public getArkheCoefficients(body: CelestialBody) {
    const orbit = this.orbits.find(o => o.body === body)!;
    if (body === CelestialBody.SUN) return { C: 1.0, I: 0.9, E: 1.0, F: 0.8 };
    if (body === CelestialBody.EARTH) return { C: 0.7, I: 0.9, E: 0.6, F: 1.0 };
    return {
      C: 0.4 + (orbit.mass > 10 ? 0.4 : 0.1),
      I: 0.5 + Math.random() * 0.3,
      E: 0.3 + (1 / (orbit.orbitalRadius + 0.1)) * 0.5,
      F: 0.5
    };
  }
}

export const globalCelestialEngine = new CelestialEngine();
