export interface Block {
  index: number;
  previousHash: string;
  data: any;
  timestamp: string;
  hash: string;
}

export interface Transaction {
  seller: string;
  buyer: string;
  price: number;
  sharePercentage: number;
  timestamp: string;
}

export interface PropertyLedger {
  [propertyId: string]: {
    [owner: string]: number;
  };
}