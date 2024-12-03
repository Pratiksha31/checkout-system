import { Checkout } from "./checkout";
import { AppleTVDeal } from "./pricingRules/appleTVDeal";
import { SuperIPadBulkDiscount } from "./pricingRules/superIPadBulkDiscount";

const pricingRules = [new AppleTVDeal(), new SuperIPadBulkDiscount()];
const co = new Checkout(pricingRules);
co.scan("atv");
co.scan("atv");
co.scan("atv");
co.scan("vga");
// co.scan("va");
console.log(co.total()); // Total expected: $249.00
// co.scan("atv");
// co.scan("ipd");
// co.scan("ipd");
// co.scan("atv");
// co.scan("ipd");
// co.scan("ipd");
// co.scan("ipd");
// console.log(co.total()); //Total expected: $2718.95
