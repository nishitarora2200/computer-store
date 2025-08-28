import { Checkout } from "./services/checkout.service";
import { BulkDiscountDeal,DefaultPrice,ThreeForTwoDeal } from "./services/pricing-deal.service";

const pricingRules = {
  atv: new ThreeForTwoDeal("atv"),
  ipd: new BulkDiscountDeal("ipd", 499.99, 4),
  mbp: new DefaultPrice(),
  vga: new DefaultPrice(),
};

const co = new Checkout(pricingRules);
co.scan("atv");
co.scan("atv");
co.scan("atv");
co.scan("vga");

console.log(co.total());    // Output: 249.00
