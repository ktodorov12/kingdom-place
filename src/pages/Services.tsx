import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import type { Dictionary } from "../locales/bg";

/* ─── Scroll-reveal wrapper ─── */
function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const initial = {
    opacity: 0,
    y: direction === "up" ? 40 : 0,
    x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Hero image from design reference ─── */
const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCWc79kROECIJVnlfY2voEYo2jo9VDCQ3ATRkr2peDgXEJJAYhUOsTHCjR8CCNjyeqVpw8raDhDFqsyJjmHyhVKDV7Cn9SqARrV-ZX_7P6VpzpTHjBiR7ApzV6J8NPZcRdxWlITcbiWhcuhxp8zRm_mIgyfN7ZrqbdWQJ6hBpDBam4hRlV-nxaTbzROtKjLlqoTfzL6LwJMkmbd7CHPMHFs-eZ4DdETdW2RPMevrgIWp56DYiYwvrmSfcpbPDDxtjn0x2S4fg55-Hg";

const ctaImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDBHtup05_SHrRk7_Dv9-KO2scFEYjHUuP5arNGQDkvmCZRFOwLHGSMdeXBJDQ6rSPh-oh1_nzR13MhXN4TaG1nGPy4VYmwu7umr6Qz5-5O_pdaxHhO4M94K_Cpnh4fQTHEi99FXlNAnus_PFur4MOigkqom8x86A_ZoKz9DCNv-tZ_yb0w6o2E8BQMNpKNk0cKy7ZJTB76o7mgfEN7N2JtH-gsdyCi9wbWkqy4TchFk8tLB4p7vg6PgWuD2aZsng3zZVv6ulcAcNU";

/* ─── Official price list data — names/descs resolved dynamically ─── */
type ServiceKey = keyof Dictionary["serviceNames"];
type ComboIncludesKey = keyof Dictionary["comboIncludes"];

interface ServiceData {
  key: ServiceKey;
  eur: string;
  bgn: string;
  popular?: boolean;
}

const hairdressingData: ServiceData[] = [
  { key: "hair", eur: "13 €", bgn: "25,42 BGN" },
  { key: "hairEyebrowsThread", eur: "20 €", bgn: "39,12 BGN", popular: true },
  { key: "hairEyebrowsRazor", eur: "16 €", bgn: "31,29 BGN" },
  { key: "hairBeard", eur: "20 €", bgn: "39,12 BGN", popular: true },
  { key: "hairBeardDye", eur: "25 €", bgn: "48,90 BGN" },
  { key: "hairBeardEyebrowsMask", eur: "30 €", bgn: "58,67 BGN" },
  { key: "hairBeardEyebrows", eur: "25 €", bgn: "48,90 BGN" },
];

interface ComboData {
  key: ServiceKey;
  eur: string;
  bgn: string;
  includes: ComboIncludesKey[];
  popular?: boolean;
}

const combosData: ComboData[] = [
  {
    key: "eyebrowsThread",
    eur: "7 €",
    bgn: "13,69 BGN",
    includes: ["threadShaping", "finalCorrection"],
  },
  {
    key: "beardDye",
    eur: "15 €",
    bgn: "29,34 BGN",
    includes: ["beardShaping", "dyeing"],
    popular: true,
  },
  {
    key: "beard",
    eur: "10 €",
    bgn: "19,56 BGN",
    includes: ["razorShaping", "styling"],
  },
  {
    key: "blackMask",
    eur: "5 €",
    bgn: "9,78 BGN",
    includes: ["cleansing", "mask"],
  },
  {
    key: "kidsHaircut",
    eur: "10 €",
    bgn: "19,56 BGN",
    includes: ["haircut", "styling"],
  },
];

const STUDIO24_URL = "https://studio24.bg/m/kingdom-place-barber-s13504?m%3Fm&m";

/* ─── Hairdressing grid item ─── */
function ServiceItem({
  name,
  eur,
  bgn,
  desc,
  tag,
  delay = 0,
}: {
  name: string;
  eur: string;
  bgn: string;
  desc: string;
  tag?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.15 }}
        className="group relative bg-surface p-6 md:p-8 transition-all duration-150 cursor-default overflow-hidden hover:shadow-[inset_0_0_20px_rgba(242,202,80,0.05)]">
        {/* Tag */}
        {tag && (
          <span className="absolute top-0 right-0 bg-gold-gradient text-on-primary font-label text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1">
            {tag}
          </span>
        )}

        {/* Header: name + price */}
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-headline text-xl md:text-2xl text-on-surface group-hover:text-primary transition-colors duration-150 leading-tight">
            {name}
          </h4>
          <div className="text-right ml-4 shrink-0">
            <span className="block text-primary font-bold text-xl md:text-2xl leading-none">
              {eur}
            </span>
            <span className="block text-outline text-[10px] mt-1 uppercase tracking-tighter">
              {bgn}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-on-surface-variant text-sm font-light leading-relaxed">
          {desc}
        </p>
      </motion.div>
    </Reveal>
  );
}

/* ═══════════════ SERVICES PAGE ═══════════════ */
export default function Services() {
  const { t } = useLanguage();

  return (
    <>
      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
        <div className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            {/* Left: Title block */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-primary font-label text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4 block">
                {t.services.eyebrow}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="font-headline text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.85] tracking-tighter uppercase mb-8">
                {t.services.titleLine1}
                <br />
                <span className="text-primary italic">{t.services.titleLine2}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="text-on-surface-variant text-base md:text-lg font-light leading-relaxed max-w-lg">
                {t.services.description}
              </motion.p>
            </div>

            {/* Right: Hero image (desktop only) */}
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hidden md:block h-64 lg:h-72 bg-surface-container overflow-hidden group">
              <img
                src={heroImage}
                alt="Close up of premium barber tools on a dark leather surface"
                className="w-full h-full object-cover grayscale opacity-50 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-70"
              />
            </motion.div>
          </div>
        </div>

        {/* Gold line separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent origin-left"
        />
      </section>

      {/* ── HAIRDRESSING SECTION ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-16 bg-surface">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex items-baseline gap-6 mb-12 md:mb-16">
              <h2 className="font-headline text-4xl md:text-5xl font-bold uppercase tracking-tighter">
                {t.services.hairdressing}
              </h2>
              <span className="text-outline font-label text-[10px] md:text-xs tracking-widest uppercase italic hidden sm:inline">
                {t.services.hairdressingSub}
              </span>
              <div className="hidden sm:block flex-grow h-px bg-outline-variant/20" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-outline-variant/15">
            {hairdressingData.map((s, i) => (
              <ServiceItem
                key={s.key}
                name={t.serviceNames[s.key]}
                eur={s.eur}
                bgn={s.bgn}
                desc={t.serviceDescs[s.key]}
                tag={s.popular ? t.services.popular : undefined}
                delay={i * 0.05}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── COMBINATIONS (BEARD & EXTRAS) SECTION ── */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-16 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex items-baseline gap-6 mb-12 md:mb-16">
              <h2 className="font-headline text-4xl md:text-5xl font-bold uppercase tracking-tighter">
                {t.services.beardExtras}
              </h2>
              <span className="text-outline font-label text-[10px] md:text-xs tracking-widest uppercase italic hidden sm:inline">
                {t.services.beardExtrasSub}
              </span>
              <div className="hidden sm:block flex-grow h-px bg-outline-variant/20" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {combosData.map((c, i) => (
              <Reveal key={c.key} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group relative flex flex-col h-full p-6 md:p-8 bg-surface-container border border-outline-variant/10 hover:border-primary/40 transition-all duration-300">
                  {/* Tag */}
                  {c.popular && (
                    <span className="absolute top-0 right-0 bg-gold-gradient text-on-primary font-label text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1">
                      {t.services.popular}
                    </span>
                  )}

                  {/* Header: name + price */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-headline text-xl md:text-2xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300 leading-tight pr-4">
                      {t.serviceNames[c.key]}
                    </h3>
                    <div className="text-right shrink-0">
                      <span className="block text-primary font-black text-2xl md:text-3xl leading-none">
                        {c.eur}
                      </span>
                      <span className="block text-outline text-[10px] mt-1 uppercase tracking-tighter">
                        {c.bgn}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-on-surface-variant text-sm font-light leading-relaxed mb-6">
                    {t.serviceDescs[c.key]}
                  </p>

                  {/* Includes list */}
                  <div className="mt-auto pt-4 border-t border-outline-variant/15">
                    <span className="font-label text-[9px] tracking-[0.3em] uppercase text-outline mb-3 block">
                      {t.services.includes}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {c.includes.map((item) => (
                        <span
                          key={item}
                          className="text-[10px] font-label tracking-wider uppercase text-primary-container bg-surface-container-high px-3 py-1">
                          {t.comboIncludes[item]}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION — with background image ── */}
      <section className="relative overflow-hidden">
        <div className="relative h-[400px] md:h-[500px]">
          <img
            src={ctaImage}
            alt="Interior of a luxury barbershop with vintage chairs and gold accents"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-surface/60 backdrop-blur-[2px]" />

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
            <Reveal>
              <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold uppercase tracking-tighter text-white mb-6 md:mb-8">
                {t.services.ctaTitle}
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-on-surface text-base md:text-xl font-light leading-relaxed mb-10 md:mb-12 max-w-xl mx-auto">
                {t.services.ctaDescription}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <motion.a
                href={STUDIO24_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gold-gradient px-12 md:px-16 py-5 md:py-6 font-label text-sm md:text-lg font-black uppercase tracking-[0.3em] text-on-primary shadow-2xl cursor-pointer hover:brightness-110 hover:shadow-[0_15px_50px_rgba(242,202,80,0.3)] transition-all duration-500">
                {t.services.ctaButton}
              </motion.a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
