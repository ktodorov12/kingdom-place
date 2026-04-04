import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import productsData, { type Product, type ProductCategory } from "../data/productsData";
import ProductModal from "../components/ProductModal";

/* ─── Reusable scroll-reveal wrapper ─── */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

const categories: (ProductCategory | "all")[] = [
  "all",
  "hair",
  "beard",
  "styling",
  "tools",
];

export default function Products() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<ProductCategory | "all">("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const productNames = t.productNames as Record<string, string>;
  const productDescs = t.productDescs as Record<string, string>;

  const categoryLabels: Record<ProductCategory | "all", string> = {
    all: t.products.filterAll,
    hair: t.products.categoryHair,
    beard: t.products.categoryBeard,
    styling: t.products.categoryStyling,
    tools: t.products.categoryTools,
  };

  const filtered =
    activeFilter === "all"
      ? productsData
      : productsData.filter((p) => p.categoryKey === activeFilter);

  return (
    <>
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto">
        {/* Hero Header */}
        <section className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <Reveal className="max-w-2xl">
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-4">
              {t.products.heroTitle}
            </h1>
            <p className="font-body text-lg md:text-xl text-on-surface-variant uppercase tracking-widest font-light">
              {t.products.heroSubtitle}
            </p>
          </Reveal>

          {/* Filter dropdown (desktop) */}
          <Reveal delay={0.1} className="relative min-w-[240px] hidden md:block">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center justify-between w-full border border-outline-variant px-5 py-4 bg-surface-container-low cursor-pointer hover:border-primary transition-colors">
              <span className="font-label text-sm uppercase tracking-[0.2em]">
                {categoryLabels[activeFilter]}
              </span>
              <ChevronDown
                size={20}
                className={`text-primary transition-transform duration-300 ${filterOpen ? "rotate-180" : ""}`}
              />
            </button>
            {filterOpen && (
              <div className="absolute top-full left-0 w-full bg-surface-container-high border-x border-b border-primary z-40">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveFilter(cat);
                      setFilterOpen(false);
                    }}
                    className={`block w-full text-left px-5 py-4 font-label text-xs uppercase tracking-[0.2em] cursor-pointer transition-colors ${
                      activeFilter === cat
                        ? "bg-primary text-on-primary"
                        : "hover:bg-primary hover:text-on-primary"
                    }`}>
                    {categoryLabels[cat]}
                  </button>
                ))}
              </div>
            )}
          </Reveal>
        </section>

        {/* Mobile filter pills */}
        <Reveal className="flex flex-wrap gap-2 mb-12 md:hidden">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 text-[10px] uppercase font-bold tracking-tighter border cursor-pointer transition-all duration-300 ${
                activeFilter === cat
                  ? "border-primary text-primary"
                  : "border-outline-variant/30 text-on-surface-variant/50 hover:border-primary/40 hover:text-primary"
              }`}>
              {categoryLabels[cat]}
            </button>
          ))}
        </Reveal>

        {/* Product Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.05}>
              <button
                onClick={() => setSelectedProduct(product)}
                className="group border border-transparent hover:shadow-[0_0_25px_rgba(242,202,80,0.15)] hover:border-primary/50 transition-all duration-500 text-left w-full cursor-pointer">
                <div className="aspect-[4/5] bg-surface-container overflow-hidden mb-6 relative">
                  <img
                    src={product.imagePath}
                    alt={productNames[product.nameKey]}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-dim/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="px-2">
                  <h3 className="font-headline text-xl lg:text-2xl font-bold mb-2 text-on-surface group-hover:text-primary transition-colors">
                    {productNames[product.nameKey]}
                  </h3>
                  <p className="font-body text-sm text-on-surface-variant mb-6 line-clamp-2">
                    {productDescs[product.descKey]}
                  </p>
                  <div className="flex items-baseline gap-4">
                    <span className="font-label text-2xl font-bold text-primary">
                      €{product.priceEur.toFixed(2)}
                    </span>
                    <span className="font-label text-xs text-on-surface/60 uppercase tracking-tighter italic">
                      {product.priceBgn.toFixed(2)} BGN
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </section>

        {/* CTA Section */}
        <Reveal>
          <section className="mt-24 pt-24 border-t border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h2 className="font-headline text-4xl font-bold mb-6 text-on-surface">
                {t.products.ctaTitle}
              </h2>
              <p className="font-body text-lg text-on-surface-variant">
                {t.products.ctaDescription}
              </p>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <Link
                to="/contact"
                className="bg-gold-gradient text-on-primary font-bold px-12 py-5 tracking-widest text-sm uppercase text-center transition-all duration-300 hover:brightness-110 hover:shadow-[0_6px_24px_rgba(242,202,80,0.3)]">
                {t.products.ctaPrimary}
              </Link>
              <Link
                to="/contact"
                className="border border-outline-variant/30 text-primary font-bold px-12 py-5 tracking-widest text-sm transition-all hover:bg-primary/5 uppercase text-center">
                {t.products.ctaSecondary}
              </Link>
            </div>
          </section>
        </Reveal>
      </main>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
