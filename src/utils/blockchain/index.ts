import { Block } from './Block';
import { Transaction } from './Transaction';
import { Ledger } from './Ledger';

export class Blockchain {
  private chain: Block[];
  private ledger: Ledger;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.ledger = new Ledger();
  }

  private createGenesisBlock(): Block {
    return new Block(0, "0", "Genesis Block", new Date().toISOString());
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
    const transaction = new Transaction(
      seller,
      buyer,
      price,
      sharePercentage,
      new Date().toISOString()
    );

    if (!transaction.validate()) {
      throw new Error('Invalid transaction parameters');
    }

    this.ledger.updateOwnership(propertyId, seller, buyer, sharePercentage);
    
    const latestBlock = this.getLatestBlock();
    const newBlock = new Block(
      this.chain.length,
      latestBlock.hash,
      { propertyId, transaction },
      new Date().toISOString()
    );
    
    this.chain.push(newBlock);
  }

  getPropertyHistory(propertyId: string): Record<string, number> {
    return this.ledger.getPropertyOwners(propertyId);
  }

  getLedger(): Record<string, Record<string, number>> {
    return this.ledger.getAllProperties();
  }

  getChain(): Block[] {
    return this.chain;
  }
}