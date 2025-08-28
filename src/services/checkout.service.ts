import { Product, catalogue } from "../config/catalogue.config";
import { PricingDeal } from "./pricing-deal.service";

export class Checkout {
  private items: Product[] = [];

  constructor(private pricingRules: Record<string, PricingDeal>) {}

  scan(sku: string) {
    const product = catalogue[sku];
    if (!product) throw new Error(`Unknown SKU: ${sku}`);
    this.items.push(product);
  }

  total(): number {
    let total = 0;

    // Group by SKU
    const grouped: Record<string, Product[]> = {};
    for (const item of this.items) {
      if (!grouped[item.sku]) {
        grouped[item.sku] = [];
      }
      grouped[item.sku]!.push(item);
    }

    for (const [sku, items] of Object.entries(grouped)) {
      const rule = this.pricingRules[sku];
      if (rule) {
        total += rule.applyDeal(items);
      } else {
        total += items.reduce((sum, p) => sum + p.price, 0);
      }
    }

    return parseFloat(total.toFixed(2));
  }
}
