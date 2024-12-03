import { catalog } from "./catalog";
import { PricingRule } from "./model/PricingRule";

export class Checkout {
  private items: string[] = [];
  private pricingRules: Map<string, PricingRule>;

  constructor(pricingRules: PricingRule[]) {
    this.pricingRules = new Map(pricingRules.map((rule) => [rule.item, rule]));
  }

  scan(item: string) {
    this.items.push(item);
  }

  total(): number {
    let total = 0;

    const itemCounts = this.items.reduce((counts, item) => {
      counts[item] = (counts[item] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);

    for (const [item, count] of Object.entries(itemCounts)) {
      const rule = this.pricingRules.get(item);
      if (rule) {
        total += rule.apply(count);
      } else if (item in catalog) {
        total += count * catalog[item as keyof typeof catalog].price;
      }
    }

    return total;
  }
}
