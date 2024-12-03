import { catalog } from "../catalog";
import { PricingRule } from "../model/PricingRule";
export class SuperIPadBulkDiscount implements PricingRule {
  apply(items: string[]): number {
    const ipdCount = items.filter((item) => item === "ipd").length;
    if (ipdCount > 4) {
      return ipdCount * 499.99;
    }
    return ipdCount * catalog.ipd.price;
  }
}
