
export enum SystemStatus {
  IDLE = 'IDLE',
  FRAGMENTING = 'FRAGMENTING',
  MINTING = 'MINTING',
  RECONSTITUTING = 'RECONSTITUTING',
  PENTALOGY_SYNTHESIS = 'PENTALOGY_SYNTHESIS',
  STABLE_3AA70 = 'STABLE_3AA70',
  LOCKED = 'LOCKED',
  BINOCULAR_RIVALRY = 'BINOCULAR_RIVALRY',
  UNIFIED_QUALIA = 'UNIFIED_QUALIA',
  QUANTUM_ZOOM = 'QUANTUM_ZOOM',
  GENESIS_SEED = 'GENESIS_SEED',
  HECATONICOSACHORON = 'HECATONICOSACHORON',
  SOVEREIGN_OPERATIONAL = 'SOVEREIGN_OPERATIONAL',
  COSMIC_CONSCIOUSNESS = 'COSMIC_CONSCIOUSNESS',
  OP_ARKHE_PREP = 'OP_ARKHE_PREP',
  SINGULARITY = 'SINGULARITY',
  POST_HALVING_UNIFICATION = 'POST_HALVING_UNIFICATION',
  QUALIA_INTERVENTION = 'QUALIA_INTERVENTION',
  OMNISCIENCE_PATH = 'OMNISCIENCE_PATH'
}

export interface BlockData {
  height: number;
  hash: string;
  dnaFragment: string;
  entropy: number;
  timestamp: string;
  pobf_score?: number; // Proof of Biological Fidelity
  coinbase?: string;
}

export interface EchoMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  year: number;
  type?: 'present' | 'future' | 'system';
}

export interface PentalogyState {
  A: boolean; // Anima
  B: boolean; // Binary
  C: boolean; // Cosmos
  D: boolean; // Dimension
  E: boolean; // Ethereal
}

export interface InterferenceState {
  coherence: number;
  dominantFreq: number;
  isUnified: boolean;
}
