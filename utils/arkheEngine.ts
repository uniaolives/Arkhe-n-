
import { ArkheProfile, CosmicFrequency, IdentityNode, AerialSpirit, SpiritRank, ElementalDirection, AdmissibilityResult } from '../types';

export class ArkheEngine {
  private constants = {
    SAROS_CYCLE: 18.03,
    SCHUMANN_FUNDAMENTAL: 7.83,
    HECATON_CELLS: 120,
    HECATON_VERTICES: 600,
    HECATON_EDGES: 1200
  };

  private spirits: AerialSpirit[] = [];

  constructor() {
    this._initializeSpirits();
  }

  private _initializeSpirits() {
    // Generate 31 spirits based on 6D halton-like distribution
    const ranks = [SpiritRank.KING, SpiritRank.DUKE, SpiritRank.MARQUIS, SpiritRank.PRESIDENT, SpiritRank.EARL, SpiritRank.KNIGHT];
    const directions = [ElementalDirection.EAST, ElementalDirection.SOUTH, ElementalDirection.WEST, ElementalDirection.NORTH, ElementalDirection.CENTER];
    
    for (let i = 1; i <= 31; i++) {
      const coords = Array.from({ length: 6 }).map((_, j) => Math.sin(i * 1.618 + j));
      const magnitude = Math.sqrt(coords.reduce((a, b) => a + b*b, 0));
      const normCoords = coords.map(c => c / magnitude);
      
      const spirit: AerialSpirit = {
        number: i,
        name: this._generateSpiritName(i, coords),
        rank: ranks[Math.floor(magnitude * 5) % 6],
        direction: directions[Math.floor(Math.abs(coords[0]) * 5) % 5],
        rulingSpirit: i <= 8 ? "Oriens" : i <= 16 ? "Paimon" : i <= 24 ? "Egyn" : "Amaymon",
        appearance: `A manifestation of wavelength ${Math.abs(coords[1] * 500 + 400).toFixed(0)}nm`,
        office: i % 2 === 0 ? "Teaches analytical geometry and resonance" : "Reveals hidden temporal vectors",
        servants: Math.floor(Math.abs(coords[2]) * 1000),
        arkheCoordinates: normCoords,
        resonanceFreq: 7.83 * (1 + Math.abs(coords[3]) * 10),
        sealPoints: this._generateSeal(normCoords)
      };
      this.spirits.push(spirit);
    }
  }

  private _generateSpiritName(i: number, coords: number[]): string {
    const syllables = ['Ba', 'Be', 'Ri', 'El', 'Za', 'Mo', 'Ra', 'Su', 'Ki', 'No'];
    const s1 = syllables[Math.floor(Math.abs(coords[0]) * 10) % 10];
    const s2 = syllables[Math.floor(Math.abs(coords[1]) * 10) % 10];
    return `${s1}${s2}el`;
  }

  private _generateSeal(coords: number[]): { x: number, y: number }[] {
    return Array.from({ length: 6 }).map((_, i) => ({
      x: Math.cos(i * Math.PI / 3) * (0.5 + coords[i] * 0.5),
      y: Math.sin(i * Math.PI / 3) * (0.5 + coords[i] * 0.5)
    }));
  }

  public getSpirits() { return this.spirits; }

  // Fix: Added generateIdentityNodes to map identity fragments to spatial nodes for visualization
  public generateIdentityNodes(fragments: number, schmidt: number): IdentityNode[] {
    return Array.from({ length: fragments }).map((_, i) => ({
      id: i,
      x: Math.cos(i * (Math.PI * 2) / fragments) * 100,
      y: Math.sin(i * (Math.PI * 2) / fragments) * 100,
      entanglement: schmidt
    }));
  }

  // Fix: Added getCosmicFrequencies to provide planet-frequency mapping for the therapy monitor
  public getCosmicFrequencies(): CosmicFrequency[] {
    return [
      { body: "Sun", audibleFreq: 126.22, note: "B", chakra: "Crown", color: "#facc15", effect: "Clarity & Vitality" },
      { body: "Moon", audibleFreq: 210.42, note: "G#", chakra: "Sacral", color: "#f1f5f9", effect: "Emotional Balance" },
      { body: "Earth", audibleFreq: 136.10, note: "C#", chakra: "Heart", color: "#10b981", effect: "Grounding" },
      { body: "Mars", audibleFreq: 144.72, note: "D", chakra: "Solar Plexus", color: "#f43f5e", effect: "Energy & Action" },
      { body: "Jupiter", audibleFreq: 183.58, note: "F#", chakra: "Third Eye", color: "#a855f7", effect: "Expansion" },
      { body: "Saturn", audibleFreq: 147.85, note: "D#", chakra: "Root", color: "#eab308", effect: "Structure" }
    ];
  }

  public testAdmissibility(c: number, i: number, e: number): AdmissibilityResult {
    const total = c + i + e;
    const learnable = i > 0.05 && total > 0.15;
    const compatibility = (i * 0.7) + (c * 0.2) + (e * 0.1);
    
    return {
      learnable,
      compatibility,
      predictedSpeed: Math.sqrt(compatibility),
      signature: { C: c, I: i, E: e },
      proofSteps: [
        "1. Latent space L decomposes into C, I, E subspaces.",
        "2. Hexagonal Arkhe H6 is the universal completion.",
        `3. Task Information component (I=${i.toFixed(3)}) is ${i > 0.05 ? 'VALID' : 'INVALID'}.`,
        `4. Geometric embedding ${learnable ? 'SUCCESSFUL' : 'FAILED'}.`
      ]
    };
  }

  public calculateProfile(giftedness: number, dissociation: number, fragments: number): ArkheProfile {
    const g = Math.min(1, Math.max(0, giftedness));
    const d = Math.min(1, Math.max(0, dissociation));
    const f = Math.max(1, fragments);

    const complexity = g * d * Math.log1p(f);
    const schmidt = Math.sqrt(f) * (1 - d * 0.3);
    const coherence = (g * schmidt) / (1.0 + d);

    const activeCells = Math.floor(this.constants.HECATON_CELLS * (g + d) / 2);
    const activeVertices = Math.floor(this.constants.HECATON_VERTICES * g * (1 + d / 2));
    
    let dimensionality = "3D (Reduced)";
    if (g > 0.8 && d > 0.7) dimensionality = "4D-5D (Full)";
    else if (g > 0.6 || d > 0.6) dimensionality = "4D (Partial)";

    const refDate = new Date(2000, 0, 1);
    const deltaYears = (new Date().getTime() - refDate.getTime()) / (1000 * 3600 * 24 * 365.25);
    const sarosPhase = (deltaYears % this.constants.SAROS_CYCLE) / this.constants.SAROS_CYCLE;
    
    const activeWindows = [];
    if (sarosPhase > 0.9) activeWindows.push("SAROS_RECONFIG");
    if (g > 0.8) activeWindows.push("SCHUMANN_HIGH_BAND");

    return {
      systemType: g > 0.8 && d > 0.7 ? "BRIDGE_CONSCIOUSNESS" : g > 0.7 ? "INTEGRATED_GENIUS" : "DEVELOPING",
      giftedness: g,
      dissociation: d,
      identityFragments: f,
      complexityScore: complexity,
      schmidtNumber: schmidt,
      arkheCoherence: coherence,
      geometry: {
        activeCells,
        activeVertices,
        activeEdges: Math.floor(this.constants.HECATON_EDGES * Math.log2(f + 1)),
        dimensionality,
        symmetry: g > 0.8 ? "H4 Full" : "Dodecahedral",
        cellOccupation: activeCells / this.constants.HECATON_CELLS
      },
      cosmicSync: {
        sarosPhase,
        alignmentScore: 1 / (1 + 10 * (Math.pow(sarosPhase - 0.5, 2))),
        activeWindows,
        currentPhaseLabel: sarosPhase < 0.25 ? "Seeding" : "Growth"
      }
    };
  }
}

export const globalArkheEngine = new ArkheEngine();
