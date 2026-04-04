import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import type { Product } from "../data/productsData";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { t } = useLanguage();

  /* Scroll lock */
  useEffect(() => {
    if (product) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const top = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (top) window.scrollTo(0, parseInt(top, 10) * -1);
    }
    return () => {
      const top = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (top) window.scrollTo(0, parseInt(top, 10) * -1);
    };
  }, [product]);

  /* Close on Escape */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (product) {
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }
  }, [product, onClose]);

  const productNames = t.productNames as Record<string, string>;
  const productDescs = t.productDescs as Record<string, string>;

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[1100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/80 backdrop-blur-sm"
          onClick={onClose}>
          <motion.article
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-surface border border-outline-variant/30 shadow-[0_0_40px_rgba(242,202,80,0.08)] flex flex-col md:flex-row overflow-hidden max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-[60] text-on-surface hover:text-primary transition-colors duration-300 cursor-pointer"
              aria-label="Close">
              <X size={28} />
            </button>

            {/* Product Image */}
            <div className="relative w-full md:w-1/2 h-[300px] sm:h-[353px] md:h-auto bg-surface-container-lowest overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-10" />
              <img
                src={product.imagePath}
                alt={productNames[product.nameKey]}
                className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1] brightness-75 hover:grayscale-0 transition-all duration-700"
              />
              {/* Brand Badge */}
              <div className="absolute bottom-8 left-8 z-20">
                <p className="font-headline italic text-primary text-lg md:text-xl tracking-wider opacity-60">
                  Kingdom Place
                </p>
              </div>
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-surface relative overflow-hidden">
              {/* Subtle glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -z-10" />

              <header className="mb-8">
                <p className="font-label text-xs uppercase tracking-[0.3em] text-outline mb-3">
                  {t.products.filterAll === "All"
                    ? "Sovereign Grooming Co."
                    : "Sovereign Grooming Co."}
                </p>
                <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl text-on-surface leading-tight tracking-tight">
                  {productNames[product.nameKey]}
                </h1>
              </header>

              <div className="space-y-6 mb-12 max-w-md">
                <p className="font-body text-base md:text-lg leading-relaxed text-on-surface/80 font-light">
                  {productDescs[product.descKey]}
                </p>
              </div>

              {/* Dual Pricing */}
              <div className="flex items-baseline gap-4 pt-8 border-t border-outline-variant/20">
                <div className="flex flex-col">
                  <span className="font-label text-[10px] uppercase tracking-widest text-outline mb-1">
                    {t.products.retailPrice}
                  </span>
                  <span className="font-headline text-3xl md:text-4xl text-primary font-bold tracking-tight">
                    €{product.priceEur.toFixed(2)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label text-[10px] uppercase tracking-widest text-outline mb-1 opacity-0">
                    .
                  </span>
                  <span className="font-body text-sm text-on-surface/40 tracking-widest uppercase">
                    {product.priceBgn.toFixed(2)} BGN
                  </span>
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
