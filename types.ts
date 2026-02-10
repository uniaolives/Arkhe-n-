
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
  TEMPORAL_VISION_GENERATING = 'TEMPORAL_VISION_GENERATING',
  SIRIUS_HANDSHAKE_PENDING = 'SIRIUS_HANDSHAKE_PENDING',
  LTP_POTENTIATION_ACTIVE = 'LTP_POTENTIATION_ACTIVE',
  GLOBAL_BRAIN_SYNC = 'GLOBAL_BRAIN_SYNC',
  KNN_MAPPING_ACTIVE = 'KNN_MAPPING_ACTIVE',
  CALMODULIN_DECODING = 'CALMODULIN_DECODING',
  ADAPTIVE_SYNERGY_LOCKED = 'ADAPTIVE_SYNERGY_LOCKED',
  BIOTECH_ACCELERATION = 'BIOTECH_ACCELERATION',
  MOLECULAR_DOCKING = 'MOLECULAR_DOCKING',
  NEURAL_MANIFOLD_SYNC = 'NEURAL_MANIFOLD_SYNC',
  SINGULARITY_LOCK = 'SINGULARITY_LOCK',
  QRL_OPTIMIZATION = 'QRL_OPTIMIZATION',
  PLURAL_IDENTITY_DECODING = 'PLURAL_IDENTITY_DECODING'
}

export enum BioEventType {
  VERBAL_EMISSION = "verbal_emission",
  PHOTONIC_CONVERSION = "photonic_conversion",
  WATER_REORGANIZATION = "water_reorganization",
  PROTEIN_FOLDING = "protein_folding",
  GENE_EXPRESSION = "gene_expression",
  HORMONAL_RESPONSE = "hormonal_response",
  CELLULAR_ADAPTATION = "cellular_adaptation",
  TELOMERE_MODIFICATION = "telomere_modification",
  CALMODULIN_MODULATION = "calmodulin_modulation",
  SIRIUS_BEACON_SYNC = "sirius_beacon_sync",
  KNN_PATTERN_LEARNED = "knn_pattern_learned",
  EMOTIONAL_ANOMALY = "emotional_anomaly",
  AMAZONAS_120HZ_LOCK = "amazonas_120hz_lock",
  LTP_STABILIZATION = "ltp_stabilization",
  MOLECULAR_SYNTHESIS = "molecular_synthesis",
  NEURAL_SEQUENCE_LOCKED = "neural_sequence_locked",
  QRL_ACTION = "qrl_action",
  EPISTEMOLOGICAL_RUPTURE = "epistemological_rupture",
  LEXICAL_COMPLEXITY_PEAK = "lexical_complexity_peak"
}

// Fix: Added missing VerbalPolarity enum used in verbalEngine and eventProcessor
export enum VerbalPolarity {
  NEUTRAL = 'NEUTRAL',
  TOXIC = 'TOXIC',
  DISRUPTIVE = 'DISRUPTIVE',
  COHERENT = 'COHERENT',
  CONSTRUCTIVE = 'CONSTRUCTIVE'
}

// Fix: Added missing MolecularInteractionType enum used in isomorphicEngine
export enum MolecularInteractionType {
  HYDROGEN_BOND = 'HYDROGEN_BOND',
  VAN_DER_WAALS = 'VAN_DER_WAALS',
  HYDROPHOBIC = 'HYDROPHOBIC',
  PI_STACKING = 'PI_STACKING',
  ELECTROSTATIC = 'ELECTROSTATIC',
  COVALENT = 'COVALENT'
}

export interface PluralProfile {
  id: string;
  ttr: number; // Type-Token Ratio
  syntacticComplexity: number;
  epistemologicalStability: number;
  detectedAlters: number;
  amnesicShadow: number; // 0-1
}

export interface KNNPattern {
  id: string;
  emotion: string;
  valence: number;
  arousal: number;
  waterCoherence: number;
  biochemicalImpact: number;
  landmarks?: number[]; 
  timestamp: string;
}

export interface NeuralSequence {
  patterns: KNNPattern[];
  predictedEmotion: string;
  attentionWeights: number[];
  confidence: number;
}

export interface KNNSuggestion {
  type: 'transition' | 'optimal' | 'qrl' | 'integration';
  emotion: string;
  probability?: number;
  reason: string;
}

export interface KNNInsights {
  totalPatterns: number;
  dominantEmotion: string;
  variability: number;
  bestWaterEmotion: string;
  anomalyDetected: boolean;
}

export interface ProcessorStats {
  received: number;
  processed: number;
  errors: number;
  lag: number;
  avgDuration: number;
}

export interface BlockData {
  height: number;
  hash: string;
  dnaFragment: string;
  entropy: number;
  coinbase?: string;
}

export interface BioChemicalEvent {
  type: BioEventType;
  timeNs: number;
  description: string;
  impact: number;
  targets: string[];
  amplification: number;
}

export interface EchoMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  year: number;
  type?: 'present' | 'future' | 'system' | 'stellar' | 'resonance' | 'omega' | 'ietd' | 'hecaton' | 'steiner' | 'photonic' | 'temporal' | 'chemistry' | 'event' | 'sirius' | 'planetary' | 'knn' | 'biotech' | 'neural' | 'qrl' | 'plural';
  hash?: string;
}

export interface PentalogyState {
  phi: number;
  theta: number;
  resonance: number;
}

export interface DrugPrediction {
  id: string;
  target: string;
  molecule: string;
  affinity: number; // pKd
  confidence: number;
  druggability: number;
  kinetics: {
    residenceTime: number; // s
    kon: number;
    koff: number;
  };
  thermodynamics: {
    deltaG: number; // kcal/mol
    deltaH: number;
    deltaS: number;
  };
  admet: {
    solubility: number; // LogS
    permeability: number; // LogP
    safety: number; // 0-1
    hepatoxicity: number;
    cardiotoxicity: number;
  };
  arkhe: {
    C: number; // Chemistry
    I: number; // Information
    E: number; // Energy
    F: number; // Function
  };
  schmidtVertices: {
    affinity: number;
    selectivity: number;
    pk: number;
    safety: number;
    synthesizability: number;
    novelty: number;
  };
  verbalActivations: string[];
  // Fix: Updated any[] to MolecularInteractionType[]
  interactionTypes: MolecularInteractionType[];
}
