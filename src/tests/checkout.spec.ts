import { Checkout } from "../checkout";
import { PricingRule } from "../model/PricingRule";
import { catalog } from "../catalog";

class AppleTVDeal implements PricingRule {
  appliesTo(item: string): boolean {
    return item === "atv";
  }

  apply(items: string[]): number {
    const count = items.filter((item) => item === "atv").length;
    return (
      Math.floor(count / 3) * 2 * catalog["atv"].price +
      (count % 3) * catalog["atv"].price
    );
  }
}

class SuperIPadBulkDiscount implements PricingRule {
  appliesTo(item: string): boolean {
    return item === "ipd";
  }

  apply(items: string[]): number {
    const count = items.filter((item) => item === "ipd").length;
    if (count > 4) {
      return count * (catalog["ipd"].price - 50);
    }
    return count * catalog["ipd"].price;
  }
}

describe("Checkout", () => {
  let checkout: Checkout;

  beforeEach(() => {
    checkout = new Checkout([new AppleTVDeal(), new SuperIPadBulkDiscount()]);
  });

  it("should add items correctly using scan method", () => {
    checkout.scan("atv");
    checkout.scan("ipd");
    expect(checkout["items"]).toEqual(["atv", "ipd"]);
  });

  it("should calculate total with no pricing rules", () => {
    checkout = new Checkout([]);
    checkout.scan("atv");
    checkout.scan("ipd");
    checkout.scan("i");
    const total = checkout.total();
    expect(total).toBe(catalog["atv"].price + catalog["ipd"].price);
  });

  it("should apply AppleTVDeal pricing rule correctly", () => {
    checkout.scan("atv");
    checkout.scan("atv");
    checkout.scan("atv");
    const total = checkout.total();
    expect(total).toBe(catalog["atv"].price * 2); // 3 for the price of 2
  });

  it("should apply SuperIPadBulkDiscount pricing rule correctly", () => {
    for (let i = 0; i < 5; i++) {
      checkout.scan("ipd");
    }
    const total = checkout.total();
    expect(total).toBe(5 * (catalog["ipd"].price - 50)); // $50 discount on each
  });

  it("should calculate total for mixed items with pricing rules", () => {
    checkout.scan("atv");
    checkout.scan("atv");
    checkout.scan("atv");
    checkout.scan("ipd");
    checkout.scan("ipd");
    checkout.scan("ipd");
    checkout.scan("ipd");
    checkout.scan("ipd");
    const total = checkout.total();
    expect(total).toBe(
      catalog["atv"].price * 2 + 5 * (catalog["ipd"].price - 50)
    );
  });
});
