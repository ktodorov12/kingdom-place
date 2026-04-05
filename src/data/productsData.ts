export type ProductCategory = "wax" | "cologne" | "cream" | "beards";

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
    priceEur: 7,
    priceBgn: 13.69,
    imagePath:
      "/products/img/Вакса за коса RedOne Spider Hair Wax 100ml – Passionate.jpg",
  },
  {
    id: "redone-volcanic-cologne",
    nameKey: "redoneVolcanicCologne",
    descKey: "redoneVolcanicCologneDesc",
    categoryKey: "cologne",
    priceEur: 7,
    priceBgn: 13.69,
    imagePath: "/products/img/Redone NATURAL COLOGNE VOLCANIC 400ml.jpg",
  },
  {
    id: "redone-cobra-aqua-wax",
    nameKey: "redoneCobraAquaWax",
    descKey: "redoneCobraAquaWaxDesc",
    categoryKey: "wax",
    priceEur: 6,
    priceBgn: 11.73,
    imagePath:
      "/products/img/Redone COBRA AQUA hair wax 150ml FULL FORCE maximum control.jpg",
  },
  {
    id: "redone-after-shave-cream",
    nameKey: "redoneAfterShaveCream",
    descKey: "redoneAfterShaveCreamDesc",
    categoryKey: "cream",
    priceEur: 7,
    priceBgn: 13.69,
    imagePath: "/products/img/Red One After Shave Cream - 400ml.png",
  },
  {
    id: "redone-beard-care-oil",
    nameKey: "redoneBeardAndMustacheArganeCareOil",
    descKey: "redoneBeardAndMustacheArganeCareOilDesc",
    categoryKey: "beards",
    priceEur: 10,
    priceBgn: 19.55,
    imagePath: "/products/img/RedOne Beard and Mustache Argan Care Oil - 50ml.png",
  },
];

export default productsData;
