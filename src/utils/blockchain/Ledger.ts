import { PropertyLedger } from '../../types';

export class Ledger {
  private data: PropertyLedger = {};

  updateOwnership(propertyId: string, seller: string, buyer: string, sharePercentage: number): void {
    if (!this.data[propertyId]) {
      this.data[propertyId] = {};
    }

    // Update seller's share
    if (seller in this.data[propertyId]) {
      this.data[propertyId][seller] -= sharePercentage;
      if (this.data[propertyId][seller] <= 0) {
        delete this.data[propertyId][seller];
      }
    }

    // Update buyer's share
    this.data[propertyId][buyer] = (this.data[propertyId][buyer] || 0) + sharePercentage;

    // Validate total share
    const totalShare = Object.values(this.data[propertyId]).reduce((sum, share) => sum + share, 0);
    if (totalShare > 100) {
      throw new Error(`Total ownership share exceeds 100% for property ${propertyId}`);
    }
  }

  getPropertyOwners(propertyId: string): Record<string, number> {
    return this.data[propertyId] || {};
  }

  getAllProperties(): PropertyLedger {
    return this.data;
  }
}