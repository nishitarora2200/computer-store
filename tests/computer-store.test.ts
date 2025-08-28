import { BulkDiscountDeal, ThreeForTwoDeal, DefaultPrice } from "../src/services/pricing-deal.service";
import { Checkout } from "../src/services/checkout.service";

const pricingRules = {
    atv: new ThreeForTwoDeal("atv"),
    ipd: new BulkDiscountDeal("ipd", 499.99, 4),
    mbp: new DefaultPrice(),
    vga: new DefaultPrice(),
};

describe("Checkout system", () => {
    test("Scenario 1: 3 atv and 1 vga → 249.00", () => {
        const co = new Checkout(pricingRules);
        co.scan("atv");
        co.scan("atv");
        co.scan("atv");
        co.scan("vga");
        expect(co.total()).toBe(249.00);
    });
    test("Scenario 2: 6 atv,1 vga → 468.00", () => {
        const co = new Checkout(pricingRules);
        co.scan("atv");
        co.scan("atv");
        co.scan("atv");
        co.scan("atv");
        co.scan("atv");
        co.scan("atv");
        co.scan("vga");
        expect(co.total()).toBe(468.00);
    });

    test("Scenario 3: atv, ipd, ipd, atv, ipd, ipd, ipd → 2718.95", () => {
        const co = new Checkout(pricingRules);
        ["atv", "ipd", "ipd", "atv", "ipd", "ipd", "ipd"].forEach((sku) => co.scan(sku));
        expect(co.total()).toBe(2718.95);
    });
    test("Scenario 4: atv, ipd, ipd, atv, ipd, ipd → 2418.96", () => {
        const co = new Checkout(pricingRules);
        ["atv", "ipd", "ipd", "atv", "ipd", "ipd"].forEach((sku) => co.scan(sku));
        expect(co.total()).toBe(2418.96);
    });
});
