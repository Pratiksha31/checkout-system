import { Checkout } from "../checkout";
import { PricingRule } from "../model/PricingRule";
import { catalog } from "../catalog";

// Mock PricingRule classes
class AppleTVDeal implements PricingRule {
  item = "atv";
  apply(count: number): number {
    return (
      Math.floor(count / 3) * 2 * catalog["atv"].price +
      (count % 3) * catalog["atv"].price
    );
  }
}

class SuperIPadBulkDiscount implements PricingRule {
  item = "ipd";
  apply(count: number): number {
    if (count > 4) {
      return count * (catalog["ipd"].price - 50);
    }
    return count * catalog["ipd"].price;
  }
}

describe("Checkout", () => {
  let checkout: Checkout;

  beforeEach(() => {
    checkout = new Checkout([]);
  });

  it("should add items correctly using scan method", () => {
    checkout.scan("atv");
    checkout.scan("ipd");
    expect(checkout["items"]).toEqual(["atv", "ipd"]);
  });

  it("should calculate total with no pricing rules", () => {
    checkout.scan("atv");
    checkout.scan("ipd");
    const total = checkout.total();
    expect(total).toBe(catalog["atv"].price + catalog["ipd"].price);
  });

  it("should apply AppleTVDeal pricing rule correctly", () => {
    checkout = new Checkout([new AppleTVDeal()]);
    checkout.scan("atv");
    checkout.scan("atv");
    checkout.scan("atv");
    const total = checkout.total();
    expect(total).toBe(catalog["atv"].price * 2); // 3 for the price of 2
  });

  it("should apply SuperIPadBulkDiscount pricing rule correctly", () => {
    checkout = new Checkout([new SuperIPadBulkDiscount()]);
    for (let i = 0; i < 5; i++) {
      checkout.scan("ipd");
    }
    const total = checkout.total();
    expect(total).toBe(5 * (catalog["ipd"].price - 50)); // $50 discount on each
  });

  it("should calculate total with mixed items and pricing rules", () => {
    checkout = new Checkout([new AppleTVDeal(), new SuperIPadBulkDiscount()]);
    checkout.scan("atv");
    checkout.scan("atv");
    checkout.scan("atv");
    for (let i = 0; i < 5; i++) {
      checkout.scan("ipd");
    }
    const total = checkout.total();
    expect(total).toBe(
      catalog["atv"].price * 2 + 5 * (catalog["ipd"].price - 50)
    );
  });
});
