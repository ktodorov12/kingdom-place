import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface GalleryImage {
  src: string;
  alt: string;
}

interface LightboxGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
}

export default function LightboxGallery({ images, columns = 3 }: LightboxGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0); // -1 = prev, 1 = next
  const touchStart = useRef<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  const prev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  }, [images.length]);

  const next = useCallback(() => {
    setDirection(1);
    setActiveIndex((i) => (i !== null ? (i + 1) % images.length : null));
  }, [images.length]);

  // Keyboard navigation + scroll lock
  useEffect(() => {
    if (activeIndex === null) return;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close, prev, next]);

  // Touch swipe handlers
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStart.current === null) return;
      const diff = e.changedTouches[0].clientX - touchStart.current;
      if (Math.abs(diff) > 50) {
        if (diff > 0) prev();
        else next();
      }
      touchStart.current = null;
    },
    [prev, next],
  );

  const gridCols =
    columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : columns === 4
        ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <>
      {/* Grid */}
      <div className={`grid ${gridCols} gap-3 md:gap-4`}>
        {images.map((img, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            onClick={() => setActiveIndex(i)}
            className="relative aspect-[4/5] overflow-hidden group cursor-pointer bg-surface-container">
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 brightness-75 group-hover:brightness-100 transition-all duration-500"
            />
            <div className="absolute inset-0 ring-1 ring-white/5 group-hover:ring-primary/30 transition-all duration-500" />
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[3000] bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}>
            {/* Close */}
            <button
              onClick={close}
              className="absolute top-5 right-5 z-20 text-white/70 hover:text-primary transition-colors cursor-pointer p-2"
              aria-label="Close lightbox">
              <X size={28} />
            </button>

            {/* Mobile tap zones — invisible, full-height side panels */}
            <button
              onClick={prev}
              className="absolute left-0 top-0 w-1/4 h-full z-10 md:hidden cursor-pointer"
              aria-label="Previous image"
            />
            <button
              onClick={next}
              className="absolute right-0 top-0 w-1/4 h-full z-10 md:hidden cursor-pointer"
              aria-label="Next image"
            />

            {/* Desktop arrow buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 md:left-6 z-10 text-white/50 hover:text-primary transition-colors cursor-pointer hidden md:block"
              aria-label="Previous image">
              <ChevronLeft size={36} />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={activeIndex}
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[85vh] max-w-[90vw] md:max-w-[80vw] object-contain select-none pointer-events-none md:pointer-events-auto"
              />
            </AnimatePresence>

            {/* Desktop arrow buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 md:right-6 z-10 text-white/50 hover:text-primary transition-colors cursor-pointer hidden md:block"
              aria-label="Next image">
              <ChevronRight size={36} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-label text-xs tracking-[0.3em] uppercase text-white/40">
              {activeIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
