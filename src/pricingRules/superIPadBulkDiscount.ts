import { catalog } from "../catalog";
import { PricingRule } from "../model/PricingRule";

export class SuperIPadBulkDiscount implements PricingRule {
  item = "ipd";

  apply(count: number): number {
    if (count > 4) {
      return count * (catalog[this.item].price - 50);
    }
    return count * catalog[this.item].price;
  }
}
