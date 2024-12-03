export interface PricingRule {
  item: string;
  apply(count: number): number;
}
