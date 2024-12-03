import { catalog } from "./catalog";
import { PricingRule } from "./model/PricingRule";

export class Checkout {
  private items: string[] = [];
  private pricingRules: PricingRule[];

  constructor(pricingRules: PricingRule[]) {
    this.pricingRules = pricingRules;
  }

  scan(item: string) {
    this.items.push(item);
  }

  total(): number {
    let total = 0;

    for (const rule of this.pricingRules) {
      total += rule.apply(this.items);
    }

    const remainingItems = this.items.filter(
      (item) =>
        !this.pricingRules.some(
          (rule) => rule.constructor.name === this.getRuleClassName(item)
        )
    );
    for (const item of remainingItems) {
      if (item in catalog) {
        total += catalog[item as keyof typeof catalog].price;
      }
    }

    return total;
  }

  private getRuleClassName(item: string): string {
    if (item === "atv") return "AppleTVDeal";
    if (item === "ipd") return "SuperIPadBulkDiscount";
    return "";
  }
}
