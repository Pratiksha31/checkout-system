interface CatalogItem {
  name: string;

  price: number;
}

export const catalog: { [key: string]: CatalogItem } = {
  ipd: { name: "Super iPad", price: 549.99 },

  mbp: { name: "MacBook Pro", price: 1399.99 },

  atv: { name: "Apple TV", price: 109.5 },

  vga: { name: "VGA adapter", price: 30.0 },
};
