import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Clock, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import productsData, { type Product } from "../data/productsData";
import ProductModal from "../components/ProductModal";

/* ─── Reusable scroll-reveal wrapper ─── */
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

/* ─── Image assets from reference code.html ─── */
const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAD5iUYI9WbfUYoGXVSSi5jwp0N9mKIwBxsQ_MrjLAvl48yD3LkFFE0iDQ4eoosDiVvgOWRlscm343iRRSvJpLM9bThPxUQGqrsmKTXj4kuBfE1DPsjIHetLtBSjPgLtc4DpnzzG78DczBqpm7zYJc4HRvB47kekWZutiEQcFvRBySZdJkVJk8RbNjRU9VYXFf5adSNVhRNXCvBGxJ1BPuerxs9veVKvlIl8pfc2m7can1PykjxeMv1qiiAVc_Xi1_XGDPemYVrNoA";
const teamImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCHNuY4eS0cfJuNXyl8EJh-IczBf9gM1RLsXlKljWkkPEHM7n7e6g4_TLZu-WPKxKcOskkqRuXsRPNFOquSTqqhuXzLQVosyz_zq9s9iBjSkXmZ3FyKAS_nupA3xaslMWqjHDkYQ2YlioCkL6bCZkPF6vFa18-jiZHn9i71I2_gI56hgJ71GTEeIEWUq60vjk62YBZ8jUqv7NOZ8nWPnbsbbNJOPTqL1ej0a_-7oUHa-BEr0L1WyZhjz3HmjFIyDomz3NPM4CmN0G4";

const STUDIO24_URL = "https://studio24.bg/m/kingdom-place-barber-s13504?m%3Fm&m";

/* ─── Service price data (names resolved dynamically from translations) ─── */
type ServiceKey =
  | "hair"
  | "hairEyebrowsThread"
  | "hairEyebrowsRazor"
  | "hairBeard"
  | "hairBeardDye"
  | "hairBeardEyebrowsMask"
  | "hairBeardEyebrows";
type BeardKey = "eyebrowsThread" | "beardDye" | "beard" | "blackMask" | "kidsHaircut";

const hairdressingData: { key: ServiceKey; eur: string; bgn: string }[] = [
  { key: "hair", eur: "13 €", bgn: "25,42 BGN" },
  { key: "hairEyebrowsThread", eur: "20 €", bgn: "39,12 BGN" },
  { key: "hairEyebrowsRazor", eur: "16 €", bgn: "31,29 BGN" },
  { key: "hairBeard", eur: "20 €", bgn: "39,12 BGN" },
  { key: "hairBeardDye", eur: "25 €", bgn: "48,90 BGN" },
  { key: "hairBeardEyebrowsMask", eur: "30 €", bgn: "58,67 BGN" },
  { key: "hairBeardEyebrows", eur: "25 €", bgn: "48,90 BGN" },
];

const beardGroomingData: { key: BeardKey; eur: string; bgn: string }[] = [
  { key: "eyebrowsThread", eur: "7 €", bgn: "13,69 BGN" },
  { key: "beardDye", eur: "15 €", bgn: "29,34 BGN" },
  { key: "beard", eur: "10 €", bgn: "19,56 BGN" },
  { key: "blackMask", eur: "5 €", bgn: "9,78 BGN" },
  { key: "kidsHaircut", eur: "10 €", bgn: "19,56 BGN" },
];

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TeamSection />
      <FeaturedProductsSection />
      <ContactSection />
    </>
  );
}

/* ═══════════════ HERO SECTION ═══════════════ */
function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-stretch overflow-hidden">
      {/* Mobile background image (behind content) */}
      <div className="absolute inset-0 md:hidden">
        <img
          src={heroImage}
          alt="Vintage barber pole outside a luxury barbershop"
          className="w-full h-full object-cover opacity-50 grayscale brightness-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/70 via-surface/50 to-surface" />
      </div>

      {/* Content Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-20 lg:px-24 py-28 md:py-20 z-10 relative">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-primary font-label text-[10px] md:text-xs tracking-[0.4em] uppercase mb-6 block">
          {t.hero.eyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] tracking-tighter mb-6 md:mb-8">
          {t.hero.mottoLine1}
          <br />
          {t.hero.mottoLine2}
          <br className="md:hidden" />
          <span className="hidden md:inline"> </span>
          {t.hero.mottoLine3}
          <br />
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="italic text-primary text-shadow-gold">
            {t.hero.mottoHighlight}
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="text-on-surface-variant text-base md:text-lg max-w-md mb-10 md:mb-12 font-light leading-relaxed">
          {t.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 md:gap-6">
          <motion.a
            href={STUDIO24_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-gold-gradient px-10 md:px-12 py-4 md:py-5 font-label font-extrabold uppercase tracking-widest text-on-primary text-center text-sm shadow-[0_10px_40px_rgba(242,202,80,0.2)] cursor-pointer hover:brightness-110 transition-all duration-300">
            {t.hero.ctaPrimary}
          </motion.a>
          <Link to="/gallery">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="block border border-outline-variant/40 px-10 md:px-12 py-4 md:py-5 font-label font-extrabold uppercase tracking-widest text-primary hover:bg-surface-container-low cursor-pointer transition-all duration-300 text-sm text-center">
              {t.hero.ctaSecondary}
            </motion.span>
          </Link>
        </motion.div>
      </div>

      {/* Desktop Image Side (hidden on mobile — mobile uses bg image above) */}
      <div className="hidden md:block w-1/2 relative min-h-[500px]">
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-surface-container-lowest overflow-hidden">
          <img
            src={heroImage}
            alt="Vintage barber pole outside a luxury barbershop"
            className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/40 to-transparent" />
        </motion.div>

        {/* Decorative number */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute bottom-12 right-12 text-right">
          <div className="text-primary/15 font-headline text-9xl font-bold select-none tracking-tighter">
            01
          </div>
        </motion.div>
      </div>

      {/* Animated gold line at hero bottom */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent origin-left"
      />
    </section>
  );
}

/* ═══════════════ ABOUT SECTION ═══════════════ */
function AboutSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 px-6 md:px-8 relative overflow-hidden bg-surface-container-low">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <Reveal>
          <div className="mb-12 md:mb-16 inline-block w-12 h-[2px] bg-primary" />
        </Reveal>

        <Reveal delay={0.15}>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl italic text-white mb-8 md:mb-12">
            {t.about.title}
          </h2>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="font-body text-lg md:text-xl lg:text-2xl leading-relaxed text-on-surface/80 italic font-light">
            {t.about.quote}
          </p>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="mt-12 md:mt-16 inline-block w-12 h-[2px] bg-primary" />
        </Reveal>
      </div>

      {/* Decorative rotated text */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 font-headline text-[10rem] md:text-[15rem] font-bold text-surface-container-highest/10 rotate-90 pointer-events-none select-none hidden lg:block">
        KINGDOM
      </div>
    </section>
  );
}

/* ═══════════════ SERVICES SECTION ═══════════════ */
function ServiceItem({
  name,
  eur,
  bgn,
  delay = 0,
}: {
  name: string;
  eur: string;
  bgn: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <motion.div
        whileHover={{ x: 4 }}
        className="group relative flex justify-between items-center border-b border-outline-variant/20 py-5 px-2 hover:border-primary transition-colors cursor-pointer overflow-hidden">
        {/* Background hover fill — use inset-0 with h-full coverage */}
        <div className="absolute inset-0 bg-surface-container-high origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
        <div className="relative z-10">
          <h4 className="font-headline text-lg md:text-xl lg:text-2xl text-on-surface group-hover:text-primary transition-colors">
            {name}
          </h4>
        </div>
        <div className="relative z-10 flex items-baseline gap-2 whitespace-nowrap ml-4">
          <span className="text-primary font-bold text-xl md:text-2xl">{eur}</span>
          <span className="text-on-surface-variant/60 text-xs md:text-sm font-light">
            / {bgn}
          </span>
        </div>
      </motion.div>
    </Reveal>
  );
}

function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 px-6 md:px-24 bg-surface">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start max-w-7xl mx-auto">
        {/* Left: Title */}
        <div className="lg:col-span-4 lg:sticky lg:top-32">
          <Reveal>
            <h2 className="font-headline text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tighter mb-6 md:mb-8">
              {t.servicesPreview.titleLine1}
              <br />
              <span className="text-primary italic">{t.servicesPreview.titleLine2}</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-on-surface-variant uppercase tracking-[0.2em] text-sm mb-6 md:mb-8">
              {t.servicesPreview.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="p-6 md:p-8 border-l-2 border-primary bg-surface-container-low">
              <p className="text-on-surface mb-4 text-sm md:text-base">
                {t.servicesPreview.note}
              </p>
              <span className="text-primary font-bold text-sm">
                {t.servicesPreview.noteHighlight}
              </span>
            </div>
          </Reveal>
        </div>

        {/* Right: Menu Items */}
        <div className="lg:col-span-8 space-y-10 md:space-y-12">
          {/* Hairdressing */}
          <div>
            <Reveal>
              <h3 className="font-label text-[10px] md:text-xs tracking-[0.4em] uppercase text-primary mb-8 md:mb-12">
                {t.servicesPreview.hairdressing}
              </h3>
            </Reveal>
            <div className="space-y-0">
              {hairdressingData.map((s, i) => (
                <ServiceItem
                  key={s.key}
                  name={t.serviceNames[s.key]}
                  eur={s.eur}
                  bgn={s.bgn}
                  delay={i * 0.06}
                />
              ))}
            </div>
          </div>

          {/* Beard grooming */}
          <div>
            <Reveal>
              <h3 className="font-label text-[10px] md:text-xs tracking-[0.4em] uppercase text-primary mb-8 md:mb-12">
                {t.servicesPreview.beardExtras}
              </h3>
            </Reveal>
            <div className="space-y-0">
              {beardGroomingData.map((s, i) => (
                <ServiceItem
                  key={s.key}
                  name={t.serviceNames[s.key]}
                  eur={s.eur}
                  bgn={s.bgn}
                  delay={i * 0.06}
                />
              ))}
            </div>
          </div>

          {/* Link to full services page */}
          <Reveal delay={0.3}>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 font-label text-xs tracking-[0.2em] uppercase text-primary hover:text-white transition-colors duration-300 group cursor-pointer mt-2">
              <span>{t.servicesPreview.viewAll}</span>
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ TEAM SECTION ═══════════════ */
function TeamSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 px-6 md:px-8 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        {/* ── Alayoubi — Primary Feature ── */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
          {/* Portrait */}
          <Reveal direction="left" className="w-full md:w-1/2">
            <div className="aspect-[4/5] bg-surface relative overflow-hidden group">
              <img
                src={teamImage}
                alt="Portrait of Master Barber Mohamad Alayoubi"
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
              />
              <div className="absolute inset-0 border-[12px] md:border-[20px] border-surface/20" />
              {/* Gold glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[inset_0_0_60px_rgba(242,202,80,0.08)]" />
            </div>
          </Reveal>

          {/* Bio text */}
          <div className="w-full md:w-1/2">
            <Reveal delay={0.1}>
              <span className="text-primary font-label text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4 md:mb-6 block">
                {t.teamPreview.eyebrow}
              </span>
            </Reveal>

            <Reveal delay={0.2}>
              <h2 className="font-headline text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 md:mb-8">
                {t.teamPreview.name}
              </h2>
            </Reveal>

            <Reveal delay={0.3}>
              <h3 className="font-headline text-xl md:text-2xl italic text-primary mb-6 md:mb-8">
                {t.teamPreview.role}
              </h3>
            </Reveal>

            <Reveal delay={0.4}>
              <p className="text-on-surface-variant text-base md:text-lg leading-relaxed mb-10 md:mb-12">
                {t.teamPreview.bio}
              </p>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="grid grid-cols-2 gap-6 md:gap-8">
                <div>
                  <div className="text-primary font-bold text-2xl md:text-3xl mb-1">
                    15+
                  </div>
                  <div className="text-on-surface-variant text-[10px] md:text-xs uppercase tracking-widest">
                    {t.teamPreview.yearsExp}
                  </div>
                </div>
                <div>
                  <div className="text-primary font-bold text-2xl md:text-3xl mb-1">
                    5000+
                  </div>
                  <div className="text-on-surface-variant text-[10px] md:text-xs uppercase tracking-widest">
                    {t.teamPreview.crownsSculpted}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.6}>
              <Link
                to="/team"
                className="inline-flex items-center gap-2 font-label text-xs tracking-[0.2em] uppercase text-primary hover:text-white transition-colors duration-300 group cursor-pointer mt-8">
                <span>{t.teamPreview.viewWork}</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* ── Khalil — Secondary Compact Card ── */}
        <Reveal delay={0.2}>
          <Link
            to="/team"
            className="mt-20 md:mt-24 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 bg-surface-container-high p-6 md:p-8 group cursor-pointer transition-all duration-500 hover:shadow-[0_0_40px_rgba(242,202,80,0.06)]">
            <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 overflow-hidden">
              <img
                src={
                  t.barbers.khalilName
                    ? "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&q=80"
                    : ""
                }
                alt={t.barbers.khalilName}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-headline text-2xl md:text-3xl text-on-surface mb-2 -tracking-[0.02em]">
                {t.barbers.khalilName}
              </h3>
              <p className="font-body text-sm text-primary italic mb-2">
                {t.barbers.khalilRole}
              </p>
              <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-2">
                {t.barbers.khalilBio}
              </p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-2 font-label text-xs tracking-[0.2em] uppercase text-primary group-hover:text-white transition-colors duration-300">
                {t.teamPreview.meetTeam}
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════ FEATURED PRODUCTS SECTION ═══════════════ */
function FeaturedProductsSection() {
  const { t } = useLanguage();
  const featured = productsData.slice(0, 3);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section className="py-24 md:py-32 px-6 md:px-8 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Reveal className="mb-16">
          <span className="font-label text-xs tracking-[0.3em] uppercase text-primary/80 block mb-4">
            {t.featuredProducts.eyebrow}
          </span>
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-on-surface">
            {t.featuredProducts.title}
          </h2>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featured.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.1}>
              <button
                onClick={() => setSelectedProduct(product)}
                className="group block border border-transparent hover:shadow-[0_0_25px_rgba(242,202,80,0.15)] hover:border-primary/50 transition-all duration-500 text-left w-full cursor-pointer">
                <div className="aspect-[4/5] bg-surface-container overflow-hidden mb-6 relative">
                  <img
                    src={product.imagePath}
                    alt={(t.productNames as Record<string, string>)[product.nameKey]}
                    className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 scale-100 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-dim/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="px-2 pb-4">
                  <h3 className="font-headline text-2xl font-bold mb-2 text-on-surface group-hover:text-primary transition-colors">
                    {(t.productNames as Record<string, string>)[product.nameKey]}
                  </h3>
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
        </div>

        {/* CTA */}
        <Reveal className="flex justify-center">
          <Link
            to="/products"
            className="border border-outline-variant/30 text-primary font-label text-xs font-extrabold uppercase tracking-widest px-10 py-4 hover:bg-primary/5 transition-all duration-300">
            {t.featuredProducts.viewAll}
          </Link>
        </Reveal>
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}

/* ═══════════════ CONTACT SECTION ═══════════════ */
function ContactSection() {
  const { t } = useLanguage();
  const GOOGLE_MAPS_URL =
    "https://www.google.com/maps/search/?api=1&query=%D0%A1%D0%BE%D1%84%D0%B8%D1%8F,+%D1%83%D0%BB.+%D0%9F%D0%B8%D1%80%D0%BE%D1%82%D1%81%D0%BA%D0%B0+1";

  return (
    <section className="py-24 md:py-32 px-6 md:px-8 bg-surface">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {/* Info */}
        <div>
          <Reveal>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-white mb-8 md:mb-12">
              {t.contactPreview.title}{" "}
              <span className="italic text-primary">
                {t.contactPreview.titleHighlight}
              </span>
            </h2>
          </Reveal>

          <div className="space-y-8 md:space-y-12">
            <Reveal delay={0.1}>
              <div className="flex gap-4 md:gap-6">
                <MapPin size={28} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white uppercase tracking-widest text-xs md:text-sm mb-2">
                    {t.contactPreview.location}
                  </h4>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-on-surface-variant text-base md:text-lg hover:text-primary transition-colors duration-300">
                    {t.contactPreview.address}
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex gap-4 md:gap-6">
                <Clock size={28} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white uppercase tracking-widest text-xs md:text-sm mb-2">
                    {t.contactPreview.hours}
                  </h4>
                  <p className="text-on-surface-variant text-base md:text-lg">
                    {t.contactPreview.schedule}
                    <br />
                    {t.contactPreview.scheduleTime}
                  </p>
                  <p className="text-on-surface-variant/40 text-sm mt-2 italic">
                    {t.contactPreview.closed}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex gap-4 md:gap-6">
                <Phone size={28} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white uppercase tracking-widest text-xs md:text-sm mb-2">
                    {t.contactPreview.inquiries}
                  </h4>
                  <a
                    href="tel:+359888123456"
                    className="text-on-surface-variant text-base md:text-lg hover:text-primary transition-colors duration-300">
                    +359 888 123 456
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 font-label text-xs tracking-[0.2em] uppercase text-primary hover:text-white transition-colors duration-300 group cursor-pointer mt-2">
                <span>{t.contactPreview.moreInfo}</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Interactive Map */}
        <Reveal direction="right">
          <div className="h-[350px] md:h-[500px] bg-surface-container-high relative overflow-hidden">
            <iframe
              title="Kingdom Place location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.6!2d23.3194!3d42.6977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa856e2aa4295d%3A0x5bb38ba120108319!2z0YPQuy4g0J_QuNGA0L7RgtGB0LrQsCAxLCDQodC-0YTQuNGP!5e0!3m2!1sen!2sbg!4v1"
              className="absolute inset-0 w-full h-full grayscale opacity-35"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
