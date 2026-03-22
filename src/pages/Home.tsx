import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useBookingModal } from "../context/BookingModalContext";

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
const mapImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCJTCN9sTQBv8DhO4u6GleYZtVnRlsrwG1gKDF34ZBaFP7RuITHcFH_OZO0OdTy5AOh1qBrTvamMRCBmzsbmSCYLb7As30fRXcP7r78qgyJcGVTe10AVva1oJp4SKO7xSX3jLRpGHZ-txcKodbDFnI3HDt0KR6q1YlJdUPbb7rvK_FK-_rdgwk7hGQiDfNnvFEqwjy9XYNN93htbhcPRdtvUoMduGqYAOpkXJ-_uIQDuyF-rhqfTdry0nB4UV72ejx9zUKll5ThP5M";

/* ─── Service data (split EUR + BGN) ─── */
const hairdressing = [
  { name: "Коса", eur: "13 €", bgn: "25,42 BGN" },
  { name: "Коса + вежди с конец", eur: "20 €", bgn: "39,12 BGN" },
  { name: "Коса + вежди с бръснач", eur: "16 €", bgn: "31,29 BGN" },
  { name: "Коса + брада", eur: "20 €", bgn: "39,12 BGN" },
  { name: "Коса + брада + боядисване", eur: "25 €", bgn: "48,90 BGN" },
  { name: "Коса + брада + вежди + маска", eur: "30 €", bgn: "58,67 BGN" },
  { name: "Коса + брада + вежди", eur: "25 €", bgn: "48,90 BGN" },
];

const beardGrooming = [
  { name: "Оформяне на вежди с конец", eur: "7 €", bgn: "13,69 BGN" },
  { name: "Брада + боядисване", eur: "15 €", bgn: "29,34 BGN" },
  { name: "Брада", eur: "10 €", bgn: "19,56 BGN" },
  { name: "Черна маска (уши и нос)", eur: "5 €", bgn: "9,78 BGN" },
  { name: "Детско подстригване", eur: "10 €", bgn: "19,56 BGN" },
];

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TeamSection />
      <ContactSection />
    </>
  );
}

/* ═══════════════ HERO SECTION ═══════════════ */
function HeroSection() {
  const { openModal } = useBookingModal();

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-stretch overflow-hidden">
      {/* Mobile background image (behind content) */}
      <div className="absolute inset-0 md:hidden">
        <img
          src={heroImage}
          alt="Vintage barber pole outside a luxury barbershop"
          className="w-full h-full object-cover opacity-30 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/80 to-surface" />
      </div>

      {/* Content Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-20 lg:px-24 py-28 md:py-20 z-10 relative">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-primary font-label text-[10px] md:text-xs tracking-[0.4em] uppercase mb-6 block">
          Premium Barbershop Experience
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] tracking-tighter mb-6 md:mb-8">
          Влез като
          <br />
          мъж,
          <br className="md:hidden" />
          <span className="hidden md:inline"> </span>
          излез като
          <br />
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="italic text-primary text-shadow-gold">
            крал.
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="text-on-surface-variant text-base md:text-lg max-w-md mb-10 md:mb-12 font-light leading-relaxed">
          Преоткрийте класическото бръснарско изкуство в атмосфера на дискретен лукс и
          професионализъм.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 md:gap-6">
          <motion.button
            onClick={openModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-gold-gradient px-10 md:px-12 py-4 md:py-5 font-label font-extrabold uppercase tracking-widest text-on-primary text-center text-sm shadow-[0_10px_40px_rgba(242,202,80,0.2)] cursor-pointer hover:brightness-110 transition-all duration-300">
            Book Now
          </motion.button>
          <Link to="/gallery">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="block border border-outline-variant/40 px-10 md:px-12 py-4 md:py-5 font-label font-extrabold uppercase tracking-widest text-primary hover:bg-surface-container-low cursor-pointer transition-all duration-300 text-sm text-center">
              View Gallery
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
  return (
    <section className="py-24 md:py-32 px-6 md:px-8 relative overflow-hidden bg-surface-container-low">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <Reveal>
          <div className="mb-12 md:mb-16 inline-block w-12 h-[2px] bg-primary" />
        </Reveal>

        <Reveal delay={0.15}>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl italic text-white mb-8 md:mb-12">
            The Sovereign Philosophy
          </h2>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="font-body text-lg md:text-xl lg:text-2xl leading-relaxed text-on-surface/80 italic font-light">
            "Kingdom Place не е просто място за подстригване. Това е Вашето лично убежище,
            където детайлът е закон, а обслужването – традиция. Ние вярваме, че всеки мъж
            заслужава корона, изваяна с прецизност и майсторство."
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
  return (
    <section className="py-24 md:py-32 px-6 md:px-24 bg-surface">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start max-w-7xl mx-auto">
        {/* Left: Title */}
        <div className="lg:col-span-4 lg:sticky lg:top-32">
          <Reveal>
            <h2 className="font-headline text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tighter mb-6 md:mb-8">
              The Service
              <br />
              <span className="text-primary italic">Menu</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-on-surface-variant uppercase tracking-[0.2em] text-sm mb-6 md:mb-8">
              Signature Grooming Rituals
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="p-6 md:p-8 border-l-2 border-primary bg-surface-container-low">
              <p className="text-on-surface mb-4 text-sm md:text-base">
                Every session includes a complementary premium drink and a scalp
                consultation.
              </p>
              <span className="text-primary font-bold text-sm">
                Kingdom Place Exclusive
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
                Hairdressing
              </h3>
            </Reveal>
            <div className="space-y-0">
              {hairdressing.map((s, i) => (
                <ServiceItem
                  key={s.name}
                  name={s.name}
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
                Beard & Extras
              </h3>
            </Reveal>
            <div className="space-y-0">
              {beardGrooming.map((s, i) => (
                <ServiceItem
                  key={s.name}
                  name={s.name}
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
              <span>Разгледай всички услуги</span>
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
  return (
    <section className="py-24 md:py-32 px-6 md:px-8 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
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
                The Craftsman
              </span>
            </Reveal>

            <Reveal delay={0.2}>
              <h2 className="font-headline text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 md:mb-8">
                Мохамад Алаюби
              </h2>
            </Reveal>

            <Reveal delay={0.3}>
              <h3 className="font-headline text-xl md:text-2xl italic text-primary mb-6 md:mb-8">
                Master Barber
              </h3>
            </Reveal>

            <Reveal delay={0.4}>
              <p className="text-on-surface-variant text-base md:text-lg leading-relaxed mb-10 md:mb-12">
                С над 15 години опит в международни салони, Мохамад съчетава източната
                прецизност със съвременните европейски тенденции. Неговият подход е
                индивидуален към всяка черта на лицето, гарантирайки не просто
                подстригване, а пълна трансформация на стила.
              </p>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="grid grid-cols-2 gap-6 md:gap-8">
                <div>
                  <div className="text-primary font-bold text-2xl md:text-3xl mb-1">
                    15+
                  </div>
                  <div className="text-on-surface-variant text-[10px] md:text-xs uppercase tracking-widest">
                    Years Experience
                  </div>
                </div>
                <div>
                  <div className="text-primary font-bold text-2xl md:text-3xl mb-1">
                    5000+
                  </div>
                  <div className="text-on-surface-variant text-[10px] md:text-xs uppercase tracking-widest">
                    Crowns Sculpted
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.6}>
              <Link
                to="/team"
                className="inline-flex items-center gap-2 font-label text-xs tracking-[0.2em] uppercase text-primary hover:text-white transition-colors duration-300 group cursor-pointer mt-8">
                <span>Вижте работата му</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ CONTACT SECTION ═══════════════ */
function ContactSection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-8 bg-surface">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {/* Info */}
        <div>
          <Reveal>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-white mb-8 md:mb-12">
              Visit the <span className="italic text-primary">Palace</span>
            </h2>
          </Reveal>

          <div className="space-y-8 md:space-y-12">
            <Reveal delay={0.1}>
              <div className="flex gap-4 md:gap-6">
                <MapPin size={28} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white uppercase tracking-widest text-xs md:text-sm mb-2">
                    Location
                  </h4>
                  <p className="text-on-surface-variant text-base md:text-lg">
                    ул. "Цар Иван Асен II" 12, София, България
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex gap-4 md:gap-6">
                <Clock size={28} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white uppercase tracking-widest text-xs md:text-sm mb-2">
                    Hours
                  </h4>
                  <p className="text-on-surface-variant text-base md:text-lg">
                    Tuesday – Sunday
                    <br />
                    09:00 – 21:00
                  </p>
                  <p className="text-on-surface-variant/40 text-sm mt-2 italic">
                    Monday: Reserved for Royals (Closed)
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex gap-4 md:gap-6">
                <Phone size={28} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white uppercase tracking-widest text-xs md:text-sm mb-2">
                    Inquiries
                  </h4>
                  <p className="text-on-surface-variant text-base md:text-lg">
                    +359 888 123 456
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Map placeholder */}
        <Reveal direction="right">
          <div className="h-[350px] md:h-[500px] bg-surface-container-high relative overflow-hidden group cursor-pointer">
            <img
              src={mapImage}
              alt="Map view of Sofia city center"
              className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-110 transition-transform duration-[2000ms]"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-14 h-14 md:w-16 md:h-16 bg-primary flex items-center justify-center shadow-[0_0_50px_rgba(242,202,80,0.4)]">
                <MapPin size={28} className="text-on-primary" />
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
