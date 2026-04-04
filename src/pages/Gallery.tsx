import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import LightboxGallery from "../components/LightboxGallery";
import { useLanguage } from "../context/LanguageContext";
import { barbershopImages } from "../data/generatedGallery";

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}>
      {children}
    </motion.div>
  );
}

const STUDIO24_URL = "https://studio24.bg/m/kingdom-place-barber-s13504?m%3Fm&m";

export default function Gallery() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-8 lg:px-24 bg-surface">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="font-label text-[10px] md:text-xs tracking-[0.3em] uppercase text-primary mb-4 block">
              {t.gallery.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl leading-[0.9] -tracking-[0.04em] italic mb-8">
              {t.gallery.titleLine1} <br />
              <span className="not-italic text-on-surface-variant">
                {t.gallery.titleLine2}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-2xl text-on-surface-variant text-lg md:text-xl leading-relaxed">
              {t.gallery.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 md:px-8 lg:px-24 pb-24 md:pb-32 bg-surface">
        <div className="max-w-7xl mx-auto">
          <LightboxGallery images={barbershopImages} columns={4} />
        </div>
      </section>

      {/* CTA — Ready for your transformation? */}
      <section className="border-t border-outline-variant/30 bg-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-24 py-20 md:py-28 flex flex-col items-center text-center">
          <Reveal>
            <h2 className="font-headline text-4xl md:text-5xl lg:text-7xl mb-8">
              {t.gallery.ctaTitle}{" "}
              <span className="text-primary italic">{t.gallery.ctaTitleHighlight}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-body text-on-surface-variant max-w-xl mb-12 text-base md:text-lg">
              {t.gallery.ctaDescription}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-6">
              <a
                href={STUDIO24_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold-gradient px-12 py-5 font-label font-extrabold text-xs tracking-widest uppercase text-on-primary cursor-pointer hover:brightness-110 hover:shadow-[0_6px_24px_rgba(242,202,80,0.3)] transition-all duration-300">
                {t.gallery.ctaPrimary}
              </a>
              <Link
                to="/services"
                className="border border-outline-variant text-on-surface px-12 py-5 font-label font-bold text-xs tracking-widest uppercase hover:bg-surface-container-high transition-all duration-300 cursor-pointer">
                {t.gallery.ctaSecondary}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
