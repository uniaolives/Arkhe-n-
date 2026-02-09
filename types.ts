
export enum SystemStatus {
  IDLE = 'IDLE',
  FRAGMENTING = 'FRAGMENTING',
  MINTING = 'MINTING',
  RECONSTITUTING = 'RECONSTITUTING',
  PENTALOGY_SYNTHESIS = 'PENTALOGY_SYNTHESIS',
  STABLE_3AA70 = 'STABLE_3AA70',
  LOCKED = 'LOCKED'
}

export interface BlockData {
  height: number;
  hash: string;
  dnaFragment: string;
  entropy: number;
  timestamp: string;
  pobf_score?: number; // Proof of Biological Fidelity
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
