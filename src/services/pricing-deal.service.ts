import { Product } from "./../config/catalogue.config";

export interface PricingDeal {
  applyDeal(items: Product[]): number;
}

/**
 * Rule: 3-for-2 on Apple TVs
 */
export class ThreeForTwoDeal implements PricingDeal {
  constructor(private sku: string) {}

  applyDeal(items: Product[]): number {
    const totalEligibleItems = items.filter((p) => p.sku === this.sku);
    if (totalEligibleItems.length === 0) return 0;
    const freeCount = Math.floor(totalEligibleItems.length / 3);
    const price = totalEligibleItems[0]?.price ?? 0;
    return totalEligibleItems.length * price - freeCount * price;
  }
}

/**
 * Rule: Bulk discount on Super iPads (if more than 4 are bought, price drops to $499.99)
 */
export class BulkDiscountDeal implements PricingDeal {
  constructor(private sku: string, private discountPrice: number, private minQty: number) {}

  applyDeal(items: Product[]): number {
    const totalEligibleItems = items.filter((p) => p.sku === this.sku);
    if (totalEligibleItems.length > this.minQty) {
      return totalEligibleItems.length * this.discountPrice;
    }
    return totalEligibleItems.length * (totalEligibleItems[0]?.price ?? 0);
  }
}

/**
 * Default rule: regular pricing
 */
export class DefaultPrice implements PricingDeal {
  applyDeal(items: Product[]): number {
    return items.reduce((sum, p) => sum + p.price, 0);
  }
}
