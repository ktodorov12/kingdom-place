export type ProductCategory = "hair" | "beard" | "styling" | "tools";

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
    id: "matte-clay-pomade",
    nameKey: "matteClayPomade",
    descKey: "matteClayPomadeDesc",
    categoryKey: "styling",
    priceEur: 24,
    priceBgn: 46.94,
    imagePath:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDtKpUR2UKj7nzOVjFjL5wgQhMG25kircIjRQxQ6sAVs_9EIy2DO_UFoqU4P6ObXH5a4sUb4lkQMNF64YGMB2QN1OCreHcqHjEWq6m_fzUyPbublqP_yrr3UhGuRwMFKQFx-6hbO8Bf_Vs8C4lKgqR3NtsmbaLspQVqBjICOrihvWaZj-4ynCuNpRTw0A1ljNgRUeBkn655uE-T_L2gA9QJQ1rIhDYeKMaYgNgQU5NWTX6VNNxawb_kUFbBJU7tQC1TjjCKUvNz058",
  },
  {
    id: "sovereign-beard-oil",
    nameKey: "sovereignBeardOil",
    descKey: "sovereignBeardOilDesc",
    categoryKey: "beard",
    priceEur: 18.5,
    priceBgn: 36.18,
    imagePath:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuALB-FHKxjsMNDNyufaQeSFShuepuPpjH1BO7vF4XzLhGsN2jI6Ev-fClrnDmpFXuRLkev0LbU3aglvJULyMf7Cod7iZI83DB2CE6IpbTpo8Ybl074kqFUWGpTr1WW0QWhP9yLzEy_FoIqRTdugOTfUSFmjZOwfdw1241jQ6FmlwYoPBS5sWpDKwxq5mzcLNLWaEKqqJAGwWMT0qy_x-nmU_dNsugl_gSI3CXDuQLmfA2oxKxKYlMScMYY5piaQI4eaaTx1Xargh_8",
  },
  {
    id: "master-shears",
    nameKey: "masterShears",
    descKey: "masterShearsDesc",
    categoryKey: "tools",
    priceEur: 145,
    priceBgn: 283.59,
    imagePath:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCRizPMhbR1UaR0qAOvoL25KWaY6pHDIIcn31zY2PDJIjMHhCj9YB_msMxXrj3Ek5FC98FoyBSzaIIUPxNjR22LhTMOmWP8WOF8cO3CkcbfGgJ7E8Bg_lOaeEnfcQDJSSOFFl92uXjHmtiAPfpXs3imxgBI1QPXmIapy-x2WizLcVqDBD37LRqX8gViQt9fiNEUC1sh6FiFI16OP00tqCat7hfaNQscq5kcn2gJ6Hrpy08OF4faY13mmwciAugkoFOTdgQstBqiefM",
  },
  {
    id: "atlantic-salt-spray",
    nameKey: "atlanticSaltSpray",
    descKey: "atlanticSaltSprayDesc",
    categoryKey: "styling",
    priceEur: 21,
    priceBgn: 41.07,
    imagePath:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCW-A7KMiAVfonqF_mFMSivWu3upE3KIZ3VoMEncv8hKtn8lwDfMuwoQu8cPbxb3giCR3kb22oYUE1elgT6WpfYOsBcIGZn4qexl4mAOQ5w0897XhCWf5Xa6jS9v7b_BsQHhCyXK7j--LDsu5IDdEKcqS1LTXQmmckYvtHTGTjREfJaviTIFoYXx8rBlgGwG_pTD_WlnuIXLNNIPGMYtVcEDtUfth5vo3ZH1o8-dlvHIfuAOzOW3vym8qCSQDR4ExTSza2wp_ideAQ",
  },
  {
    id: "restorative-shampoo",
    nameKey: "restorativeShampoo",
    descKey: "restorativeShampooDesc",
    categoryKey: "hair",
    priceEur: 26,
    priceBgn: 50.85,
    imagePath:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBNNDygMFJGOuvestybU32ZycRE_ddasxa_N983CqhwdAnDJZQwaRS_oLoYvMbMx9ZVOZhWNnw4rmG_-BltcfPnqq_GPVTtb-QyR6bvmiFqN-2AkmdhzrOlujVV_L4HEg-HE0Q7QkgZZ_JaCIBjE3EjGMFreVdIz66YXjKRgM37fKfXyBdRIwxY5bBBleeOey0YscMr-4wnzSHvJbNfDrj0u6swco3Ew2zmid-XXcOORK5N9n_250ZwnP6qtyypgvQVN8ga-2VelPM",
  },
  {
    id: "royal-shave-brush",
    nameKey: "royalShaveBrush",
    descKey: "royalShaveBrushDesc",
    categoryKey: "tools",
    priceEur: 55,
    priceBgn: 107.57,
    imagePath:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCEY5lUoQoMv5qG-KETKJ-7euBMYrDTluSEhEgmLDq8Ja5O-KEtrqyxWAHJJ2D_1lecNBjoyKcKU2mKa2NWd6jbiOmRJZbXuVNMjByIX7q0CTNp96SntmEqhj7oRVzSy7etBNSrSmjDhO18vw-0Z_SK0_O7nX42a1qQiQMZyJb6YlCbfFWDAKznyfwPSdHQ6wweGVhZI3RWvilEBiZ0yuCU5Pkb0qvIAXjQFfHz5Xb8y3DEf_cW-4fjYMAiwIQ1jaN_sR1F7DRMxXk",
  },
  {
    id: "signature-fine-comb",
    nameKey: "signatureFineComb",
    descKey: "signatureFineCombDesc",
    categoryKey: "tools",
    priceEur: 15,
    priceBgn: 29.34,
    imagePath:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBDZmBUVMDIlECEhBJRCCsYQooDMg_nhIgTwLpgEkXGdlFlv5ht-vtysaOXg4sFmTCpPIxzXKyzbHo_Tqb1g3rTBldnZVXBySdfvNcyozndS0xFfZTbLOE7q43P2P3tVZFYAM-TcAqlUAuRhANnHfPR40hgSMpGQOD7homqYByhGJWLIU4_1PJxMt3wqXrrxSeKCnBopx8idn8U_GHyWLnaqGt4k1RhP4xBrdbHmNX6vQtzrbemBRwbdrAWcXadNP8JwPMsMWP9H2g",
  },
  {
    id: "sculpt-wax",
    nameKey: "sculptWax",
    descKey: "sculptWaxDesc",
    categoryKey: "styling",
    priceEur: 12,
    priceBgn: 23.47,
    imagePath:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuApMzEP5uXeo_qVE1KcbIilIwlTvrXcLaL2uovdU3Qn0gkX77hxFZYV34NnDciAan9jnYGCy-9Uk3nxJodplv0lCKdoYXN1t-P9fMdWM5OhjIy4wthHRyZTWLTujVPWW_0XyyZEAp1AXdkQWHdpgWjL4cKPC7KUUqaDFsFxjZBXCKrPuVGbQoU6tKLtWzFTq8aMHOLCvJZyuPyGkaRZV2l7X0C_urIWRfXw6ulbXiIcp3ElcEqLzK7VCfFieXlUxmLL0iJA20l1_Ks",
  },
];

export default productsData;
