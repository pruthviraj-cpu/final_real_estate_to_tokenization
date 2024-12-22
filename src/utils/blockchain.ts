import { Block, Transaction, PropertyLedger } from '../types';
import { sha256 } from './crypto';

export class Blockchain {
  private chain: Block[];
  private ledger: PropertyLedger;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.ledger = {};
  }

  private createGenesisBlock(): Block {
    const block = {
      index: 0,
      previousHash: "0",
      data: "Genesis Block",
      timestamp: new Date().toISOString(),
      hash: ""
    };
    block.hash = this.calculateHash(block);
    return block;
  }

  private calculateHash(block: Omit<Block, 'hash'>): string {
    const blockString = JSON.stringify(block);
    return sha256(blockString);
  }

  private getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addTransaction(
    propertyId: string,
    seller: string,
    buyer: string,
    price: number,
    sharePercentage: number
  ): void {
    if (!this.ledger[propertyId]) {
      this.ledger[propertyId] = {};
    }

    // Update seller's share
    if (seller in this.ledger[propertyId]) {
      this.ledger[propertyId][seller] -= sharePercentage;
      if (this.ledger[propertyId][seller] <= 0) {
        delete this.ledger[propertyId][seller];
      }
    }

    // Update buyer's share
    this.ledger[propertyId][buyer] = 
      (this.ledger[propertyId][buyer] || 0) + sharePercentage;

    // Validate total share
    const totalShare = Object.values(this.ledger[propertyId])
      .reduce((sum, share) => sum + share, 0);
    
    if (totalShare > 100) {
      throw new Error(`Total ownership share exceeds 100% for property ${propertyId}`);
    }

    const transaction: Transaction = {
      seller,
      buyer,
      price,
      sharePercentage,
      timestamp: new Date().toISOString(),
    };

    const previousBlock = this.getLatestBlock();
    const newBlock: Block = {
      index: this.chain.length,
      previousHash: previousBlock.hash,
      data: { propertyId, transaction },
      timestamp: new Date().toISOString(),
      hash: ''
    };
    newBlock.hash = this.calculateHash(newBlock);
    this.chain.push(newBlock);
  }

  getPropertyHistory(propertyId: string): Record<string, number> {
    return this.ledger[propertyId] || {};
  }

  getLedger(): PropertyLedger {
    return this.ledger;
  }

  getChain(): Block[] {
    return this.chain;
  }
}