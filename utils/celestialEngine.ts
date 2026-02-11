
import { CelestialBody, HelicalPosition, CelestialDNAStats } from '../types';

export interface OrbitParams {
  body: CelestialBody;
  orbitalRadius: number; // AU
  orbitalPeriod: number; // Earth years
  orbitalInclination: number; // Degrees
  mass: number; // Earth masses
  radius: number; // meters
}

const AU_TO_LY = 1.58e-5;
const GALACTIC_RADIUS = 26000; // LY
const GALACTIC_PERIOD = 225000000; // Years
const VERTICAL_AMPLITUDE = 100; // LY
const VERTICAL_PERIOD = 70000000; // Years
const ECLIPTIC_INCLINATION = 60.2; // Degrees to galactic plane

export class CelestialEngine {
  private orbits: Record<string, OrbitParams> = {
    [CelestialBody.SUN]: { body: CelestialBody.SUN, orbitalRadius: 0, orbitalPeriod: 1, orbitalInclination: 0, mass: 333000, radius: 6.957e8 },
    [CelestialBody.MERCURY]: { body: CelestialBody.MERCURY, orbitalRadius: 0.387, orbitalPeriod: 0.2408, orbitalInclination: 7.0, mass: 0.055, radius: 2.439e6 },
    [CelestialBody.VENUS]: { body: CelestialBody.VENUS, orbitalRadius: 0.723, orbitalPeriod: 0.6152, orbitalInclination: 3.39, mass: 0.815, radius: 6.051e6 },
    [CelestialBody.EARTH]: { body: CelestialBody.EARTH, orbitalRadius: 1.0, orbitalPeriod: 1.0000, orbitalInclination: 0, mass: 1.0, radius: 6.371e6 },
    [CelestialBody.MARS]: { body: CelestialBody.MARS, orbitalRadius: 1.524, orbitalPeriod: 1.8808, orbitalInclination: 1.85, mass: 0.107, radius: 3.389e6 },
    [CelestialBody.JUPITER]: { body: CelestialBody.JUPITER, orbitalRadius: 5.203, orbitalPeriod: 11.86, orbitalInclination: 1.31, mass: 317.8, radius: 6.991e7 },
    [CelestialBody.SATURN]: { body: CelestialBody.SATURN, orbitalRadius: 9.537, orbitalPeriod: 29.45, orbitalInclination: 2.49, mass: 95.2, radius: 5.823e7 },
    [CelestialBody.URANUS]: { body: CelestialBody.URANUS, orbitalRadius: 19.19, orbitalPeriod: 84.02, orbitalInclination: 0.77, mass: 14.5, radius: 2.536e7 },
    [CelestialBody.NEPTUNE]: { body: CelestialBody.NEPTUNE, orbitalRadius: 30.07, orbitalPeriod: 164.8, orbitalInclination: 1.77, mass: 17.1, radius: 2.462e7 },
  };

  public getPositionAtTime(body: CelestialBody, tYears: number): HelicalPosition {
    const p = this.orbits[body];
    
    // 1. Heliocentric orbit (simplified as circular)
    const omegaOrb = (2 * Math.PI) / (p.orbitalPeriod || 1);
    const thetaOrb = omegaOrb * tYears;
    let xOrb = p.orbitalRadius * Math.cos(thetaOrb);
    let yOrb = p.orbitalRadius * Math.sin(thetaOrb);
    let zOrb = 0;

    // 2. Rotate ecliptic to galactic alignment
    const beta = ECLIPTIC_INCLINATION * (Math.PI / 180);
    const yRot = yOrb * Math.cos(beta) - zOrb * Math.sin(beta);
    const zRot = yOrb * Math.sin(beta) + zOrb * Math.cos(beta);
    
    // 3. Galactic translation
    const omegaGal = (2 * Math.PI) / GALACTIC_PERIOD;
    const thetaGal = omegaGal * tYears;
    const xGal = GALACTIC_RADIUS * Math.cos(thetaGal);
    const yGal = GALACTIC_RADIUS * Math.sin(thetaGal);

    // 4. Vertical oscillation
    const omegaZ = (2 * Math.PI) / VERTICAL_PERIOD;
    const zGal = VERTICAL_AMPLITUDE * Math.sin(omegaZ * tYears);

    return {
      body,
      x: xGal + xOrb * AU_TO_LY,
      y: yGal + yRot * AU_TO_LY,
      z: zGal + zRot * AU_TO_LY
    };
  }

  public getPlanetaryTones() {
    return {
      [CelestialBody.MERCURY]: 141.27,
      [CelestialBody.VENUS]: 221.23,
      [CelestialBody.EARTH]: 136.10,
      [CelestialBody.MARS]: 144.72,
      [CelestialBody.JUPITER]: 183.58,
      [CelestialBody.SATURN]: 147.85,
      [CelestialBody.URANUS]: 207.36,
      [CelestialBody.NEPTUNE]: 211.44,
    };
  }

  public getSchumannResonances() {
    const c = 299792458;
    return Object.fromEntries(
      Object.entries(this.orbits).map(([name, p]) => {
        // Fix: Explicitly cast p as OrbitParams to safely access radius property
        const orbit = p as OrbitParams;
        const fTheoretical = c / (2 * Math.PI * orbit.radius);
        let fActual = fTheoretical;
        if (name === 'EARTH') fActual = 7.83;
        else if (name === 'MARS') fActual *= 0.5;
        else if (name === 'JUPITER' || name === 'SATURN') fActual *= 0.1;
        return [name, fActual];
      })
    );
  }

  public getDNAStats(): CelestialDNAStats {
    const avgPeriod = Object.values(this.orbits).slice(1).reduce((acc, o) => acc + o.orbitalPeriod, 0) / 8;
    const turnsPerGalacticOrbit = GALACTIC_PERIOD / avgPeriod;
    const infoDensity = 9 * Math.log2(3); // 9 strands, 3 states
    
    return {
      turnsPerGalacticOrbit,
      basePairsPerTurn: 4,
      humanCelestialRatio: (3.2e9 / 10.5) / turnsPerGalacticOrbit,
      quantumCoherence: 0.92,
      entanglementEntropy: 14.26 // Bits per snapshot
    };
  }

  public getEntanglementMatrix(): number[][] {
    // Fix: Explicitly cast the result of Object.values to CelestialBody[] to resolve indexing issues
    const bodies = Object.values(CelestialBody) as CelestialBody[];
    const matrix: number[][] = Array(9).fill(0).map(() => Array(9).fill(0));
    
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (i === j) { matrix[i][j] = 1.0; continue; }
        // Fix: Index this.orbits with correctly cast string keys
        const p1 = this.orbits[bodies[i] as string];
        const p2 = this.orbits[bodies[j] as string];
        
        const ratio = p1.orbitalPeriod / p2.orbitalPeriod;
        let resonance = 0;
        for (let p = 1; p <= 5; p++) {
          for (let q = 1; q <= 5; q++) {
            const score = 1 / (1 + Math.abs(ratio - p / q) * 5);
            if (score > resonance) resonance = score;
          }
        }
        const proximity = 1 / (1 + Math.abs(p1.orbitalRadius - p2.orbitalRadius));
        matrix[i][j] = resonance * 0.6 + proximity * 0.4;
      }
    }
    return matrix;
  }
}

export const globalCelestialEngine = new CelestialEngine();
