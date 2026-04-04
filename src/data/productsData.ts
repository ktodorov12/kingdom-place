export type ProductCategory = "wax" | "cologne" | "cream";

export interface Product {
  id: string;
  nameKey: string;
  descKey: string;
  categoryKey: ProductCategory;
  priceEur: number;
  priceBgn: number;
  imagePath: string;
}

const productsData: Product[] = [
  {
    id: "redone-spider-wax",
    nameKey: "redoneSpiderWax",
    descKey: "redoneSpiderWaxDesc",
    categoryKey: "wax",
    priceEur: 6.54,
    priceBgn: 12.8,
    imagePath:
      "/products/img/Вакса за коса RedOne Spider Hair Wax 100ml – Passionate.jpg",
  },
  {
    id: "redone-volcanic-cologne",
    nameKey: "redoneVolcanicCologne",
    descKey: "redoneVolcanicCologneDesc",
    categoryKey: "cologne",
    priceEur: 5.73,
    priceBgn: 11.2,
    imagePath: "/products/img/Redone NATURAL COLOGNE VOLCANIC 400ml.jpg",
  },
  {
    id: "redone-cobra-aqua-wax",
    nameKey: "redoneCobraAquaWax",
    descKey: "redoneCobraAquaWaxDesc",
    categoryKey: "wax",
    priceEur: 4.35,
    priceBgn: 8.5,
    imagePath:
      "/products/img/Redone COBRA AQUA hair wax 150ml FULL FORCE maximum control.jpg",
  },
  {
    id: "redone-after-shave-cream",
    nameKey: "redoneAfterShaveCream",
    descKey: "redoneAfterShaveCreamDesc",
    categoryKey: "cream",
    priceEur: 6.44,
    priceBgn: 12.6,
    imagePath: "/products/img/Red One After Shave Cream - 400ml.png",
  },
];

export default productsData;
