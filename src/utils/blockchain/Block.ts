import { sha256 } from '../crypto';
import { Block as BlockType } from '../../types';

export class Block implements BlockType {
  index: number;
  previousHash: string;
  data: any;
  timestamp: string;
  hash: string;

  constructor(index: number, previousHash: string, data: any, timestamp: string) {
    this.index = index;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
    this.hash = this.calculateHash();
  }

  private calculateHash(): string {
    const blockString = JSON.stringify({
      index: this.index,
      previousHash: this.previousHash,
      data: this.data,
      timestamp: this.timestamp,
    });
    return sha256(blockString);
  }
}