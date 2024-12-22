import { Transaction as TransactionType } from '../../types';

export class Transaction implements TransactionType {
  constructor(
    public seller: string,
    public buyer: string,
    public price: number,
    public sharePercentage: number,
    public timestamp: string
  ) {}

  validate(): boolean {
    return (
      this.sharePercentage > 0 &&
      this.sharePercentage <= 100 &&
      this.price >= 0 &&
      this.seller !== '' &&
      this.buyer !== ''
    );
  }
}