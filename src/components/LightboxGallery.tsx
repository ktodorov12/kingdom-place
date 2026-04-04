import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface GalleryImage {
  src: string;
  alt: string;
}

/** Represents either a single image or a before/after pair */
export interface GallerySlide {
  type: "single" | "comparison";
  before?: GalleryImage;
  after?: GalleryImage;
  single?: GalleryImage;
}

/** Detect before/after pairs from an image array and produce slides */
export function buildSlides(images: GalleryImage[]): GallerySlide[] {
  const slides: GallerySlide[] = [];
  const paired = new Set<number>();

  for (let i = 0; i < images.length; i++) {
    if (paired.has(i)) continue;

    const filename = images[i].src.split("/").pop() || "";
    if (filename.startsWith("before-")) {
      const suffix = filename.replace(/^before-/, "");
      const afterIdx = images.findIndex((img, j) => {
        if (j === i) return false;
        const f = img.src.split("/").pop() || "";
        return f.startsWith("after-") && f.replace(/^after-/, "") === suffix;
      });
      if (afterIdx !== -1) {
        paired.add(i);
        paired.add(afterIdx);
        slides.push({
          type: "comparison",
          before: images[i],
          after: images[afterIdx],
        });
        continue;
      }
    }

    slides.push({ type: "single", single: images[i] });
  }

  return slides;
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 120 : -120,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -120 : 120,
    opacity: 0,
  }),
};

interface LightboxGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  beforeAfterPairs?: { before: GalleryImage; after: GalleryImage }[];
}

export default function LightboxGallery({
  images,
  columns = 3,
  beforeAfterPairs = [],
}: LightboxGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  const slides = useMemo(() => {
    // Build single slides from images (no before/after detection needed)
    const singleSlides: GallerySlide[] = images.map((img) => ({
      type: "single",
      single: img,
    }));
    // Build comparison slides from explicit pairs
    const comparisonSlides: GallerySlide[] = beforeAfterPairs.map((p) => ({
      type: "comparison",
      before: p.before,
      after: p.after,
    }));
    return [...comparisonSlides, ...singleSlides];
  }, [images, beforeAfterPairs]);

  const close = useCallback(() => setActiveIndex(null), []);

  const prev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((i) => (i !== null ? (i - 1 + slides.length) % slides.length : null));
  }, [slides.length]);

  const next = useCallback(() => {
    setDirection(1);
    setActiveIndex((i) => (i !== null ? (i + 1) % slides.length : null));
  }, [slides.length]);

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

  // Framer Motion drag handler — fixes swipe direction desync
  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.x < -50) {
        setDirection(1);
        setActiveIndex((i) => (i !== null ? (i + 1) % slides.length : null));
      } else if (info.offset.x > 50) {
        setDirection(-1);
        setActiveIndex((i) =>
          i !== null ? (i - 1 + slides.length) % slides.length : null,
        );
      }
    },
    [slides.length],
  );

  const gridCols =
    columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : columns === 4
        ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  // For the thumbnail grid, flatten slides back to images for display
  const thumbnailImages = useMemo(() => {
    const items: { image: GalleryImage; slideIdx: number; isComparison: boolean }[] = [];
    slides.forEach((slide, idx) => {
      if (slide.type === "comparison" && slide.before) {
        items.push({ image: slide.before, slideIdx: idx, isComparison: true });
      } else if (slide.single) {
        items.push({ image: slide.single, slideIdx: idx, isComparison: false });
      }
    });
    return items;
  }, [slides]);

  return (
    <>
      {/* Grid */}
      <div className={`grid ${gridCols} gap-3 md:gap-4`}>
        {thumbnailImages.map((item, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            onClick={() => setActiveIndex(item.slideIdx)}
            className="relative aspect-[5/5] overflow-hidden group cursor-pointer bg-surface-container">
            <img
              src={item.image.src}
              alt={item.image.alt}
              loading="lazy"
              className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 brightness-75 group-hover:brightness-100 transition-all duration-500"
            />
            <div className="absolute inset-0 ring-1 ring-white/5 group-hover:ring-primary/30 transition-all duration-500" />
            {item.isComparison && (
              <div className="absolute top-3 left-3 bg-primary/80 text-on-primary text-[10px] font-label uppercase tracking-wider px-2 py-1">
                Before / After
              </div>
            )}
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
            onClick={close}>
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

            {/* Slide content */}
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              {slides[activeIndex].type === "comparison" ? (
                <motion.div
                  key={`comparison-${activeIndex}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-col md:flex-row gap-2 md:gap-4 max-h-[85vh] max-w-[90vw] md:max-w-[80vw] select-none">
                  <div className="flex-1 relative">
                    <span className="absolute top-3 left-3 z-10 bg-black/60 text-white font-label text-[10px] uppercase tracking-widest px-3 py-1">
                      Before
                    </span>
                    <img
                      src={slides[activeIndex].before!.src}
                      alt={slides[activeIndex].before!.alt}
                      className="h-full max-h-[40vh] md:max-h-[85vh] w-full object-contain pointer-events-none"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <span className="absolute top-3 left-3 z-10 bg-primary/80 text-on-primary font-label text-[10px] uppercase tracking-widest px-3 py-1">
                      After
                    </span>
                    <img
                      src={slides[activeIndex].after!.src}
                      alt={slides[activeIndex].after!.alt}
                      className="h-full max-h-[40vh] md:max-h-[85vh] w-full object-contain pointer-events-none"
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.img
                  key={activeIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                  src={slides[activeIndex].single!.src}
                  alt={slides[activeIndex].single!.alt}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  onClick={(e) => e.stopPropagation()}
                  className="max-h-[85vh] max-w-[90vw] md:max-w-[80vw] object-contain select-none"
                />
              )}
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
              {activeIndex + 1} / {slides.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
