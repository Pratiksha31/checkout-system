import { catalog } from "../catalog";
import { PricingRule } from "../model/PricingRule";

export class AppleTVDeal implements PricingRule {
  item = "atv";

  apply(count: number): number {
    return (
      Math.floor(count / 3) * 2 * catalog[this.item].price +
      (count % 3) * catalog[this.item].price
    );
  }
}
