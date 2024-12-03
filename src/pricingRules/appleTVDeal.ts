import { catalog } from "../catalog";
import { PricingRule } from "../model/PricingRule";

export class AppleTVDeal implements PricingRule {
  apply(items: string[]): number {
    const appleTVCount = items.filter((item) => item === "atv").length;
    const discountedCount = Math.floor(appleTVCount / 3);
    const fullPriceCount = appleTVCount - discountedCount;
    return fullPriceCount * catalog.atv.price;
  }
}
