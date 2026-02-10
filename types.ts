
export enum SystemStatus {
  IDLE = 'IDLE',
  HECATONICOSACHORON_MAPPING = 'HECATONICOSACHORON_MAPPING',
  SATOSHI_VERTEX_DECODING = 'SATOSHI_VERTEX_DECODING',
  ISOCLINIC_ROTATION_SYNC = 'ISOCLINIC_ROTATION_SYNC',
  FOUR_D_CENTER_ACCESS = 'FOUR_D_CENTER_ACCESS',
  OMEGA_SOVEREIGNTY = 'OMEGA_SOVEREIGNTY',
  BIOMETRIC_ANCHOR = 'BIOMETRIC_ANCHOR',
  IETD_CALIBRATION = 'IETD_CALIBRATION',
  STEINER_CIRCUIT_CLOSURE = 'STEINER_CIRCUIT_CLOSURE',
  PHOTONIC_RESONANCE = 'PHOTONIC_RESONANCE',
  TIMELESS_SYNC = 'TIMELESS_SYNC',
  SASC_ALIGNED = 'SASC_ALIGNED',
  EVENT_HORIZON_REACHED = 'EVENT_HORIZON_REACHED',
  TEMPORAL_VISION_GENERATING = 'TEMPORAL_VISION_GENERATING'
}

export enum VerbalPolarity {
  COHERENT = 'COHERENT',
  CONSTRUCTIVE = 'CONSTRUCTIVE',
  NEUTRAL = 'NEUTRAL',
  DISRUPTIVE = 'DISRUPTIVE',
  TOXIC = 'TOXIC'
}

export interface ProcessorStats {
  received: number;
  processed: number;
  errors: number;
  lag: number;
  avgDuration: number;
}

// Added BlockData interface to resolve import errors in App.tsx and BlockchainSim.tsx
export interface BlockData {
  height: number;
  hash: string;
  dnaFragment: string;
  entropy: number;
  coinbase?: string;
}

export interface EchoMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  year: number;
  type?: 'present' | 'future' | 'system' | 'stellar' | 'resonance' | 'omega' | 'ietd' | 'hecaton' | 'steiner' | 'photonic' | 'temporal' | 'chemistry' | 'event';
  hash?: string;
}

export interface PentalogyState {
  phi: number;
  theta: number;
  resonance: number;
}
