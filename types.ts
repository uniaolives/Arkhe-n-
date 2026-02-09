
export enum SystemStatus {
  IDLE = 'IDLE',
  FRAGMENTING = 'FRAGMENTING',
  MINTING = 'MINTING',
  RECONSTITUTING = 'RECONSTITUTING',
  STABLE = 'STABLE'
}

export interface BlockData {
  height: number;
  hash: string;
  dnaFragment: string;
  entropy: number;
  timestamp: string;
}

export interface EchoMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  year: number;
}
