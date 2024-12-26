export interface GameSeed {
  serverSeed: string;
  clientSeed: string;
  nonce: number;
}

export interface GameHash {
  hash: string;
  revealed: boolean;
}

export interface FairnessProof {
  serverSeed: string;
  clientSeed: string;
  nonce: number;
  hash: string;
  hamletPositions: number[];
}