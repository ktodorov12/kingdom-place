import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Phone, ArrowRight, ExternalLink } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import type { Dictionary } from "../locales/bg";

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

/* ─── Constants ─── */
const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=%D0%A1%D0%BE%D1%84%D0%B8%D1%8F,+%D1%83%D0%BB.+%D0%9F%D0%B8%D1%80%D0%BE%D1%82%D1%81%D0%BA%D0%B0+1";

const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCRfO7PFq0FtZOzQPpeIzBmQmGFjZjxpxsTBciayxf-nsymQT81rbqW0FGzOtYAWOQgcG9PNlrKWIALORGjiWhLx1TK57hN0eKwlthiqUUU6TrjeLRkv9b4nP5Ghc0lB3KYhV_UqjchnPXrmWdqYGHum1juKQfjlJUa-HUr6KOG7twTxA6CxSjMHUBCu7sWWHTnEMLJU9s85Ju1zGM3nRTsrgSruPe5UgyIT_uZSQ5v3CbvOAZKkj-1T6TtN_Y_qLHPP2sdR-eiDJ0";

type ScheduleKey = keyof Dictionary["schedule"];

const scheduleData: { key: ScheduleKey; hours: string; closed?: boolean }[] = [
  { key: "monday", hours: "", closed: true },
  { key: "tuesday", hours: "09:00 – 21:00" },
  { key: "wednesday", hours: "09:00 – 21:00" },
  { key: "thursday", hours: "09:00 – 21:00" },
  { key: "friday", hours: "09:00 – 21:00" },
  { key: "saturday", hours: "09:00 – 21:00" },
  { key: "sunday", hours: "09:00 – 21:00" },
];

/* ─── Helper: is today this day? ─── */
const dayKeyToJs: Record<ScheduleKey, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  closed: -1,
};

function isTodayKey(key: ScheduleKey): boolean {
  return new Date().getDay() === dayKeyToJs[key];
}

const STUDIO24_URL = "https://studio24.bg/m/kingdom-place-barber-s13504?m%3Fm&m";

/* ═══════════════════════════════════════════════════════
   Contact Page
   ═══════════════════════════════════════════════════════ */
export default function Contact() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-surface">
      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Main Content Grid ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          {/* Left — Establishment Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Reveal>
                <h2 className="font-headline text-4xl md:text-5xl mb-12 tracking-tighter uppercase whitespace-pre-line">
                  {t.contact.detailsTitle}
                </h2>
              </Reveal>

              <div className="space-y-14">
                {/* Location */}
                <Reveal delay={0.1}>
                  <div className="group">
                    <label className="text-primary font-label text-[10px] tracking-[0.3em] uppercase mb-4 block opacity-60">
                      {t.contact.locationLabel}
                    </label>
                    <div className="flex items-start gap-3">
                      <MapPin size={20} className="text-primary mt-1 shrink-0" />
                      <a
                        href={GOOGLE_MAPS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl md:text-2xl font-body leading-relaxed hover:text-primary transition-colors duration-300 cursor-pointer">
                        {t.contact.address}
                      </a>
                    </div>
                  </div>
                </Reveal>

                {/* Communication */}
                <Reveal delay={0.2}>
                  <div className="group">
                    <label className="text-primary font-label text-[10px] tracking-[0.3em] uppercase mb-4 block opacity-60">
                      {t.contact.commLabel}
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Phone size={18} className="text-primary shrink-0" />
                        <a
                          href="tel:+359893236974"
                          className="text-xl md:text-2xl font-body hover:text-primary transition-colors duration-300 cursor-pointer">
                          +359 89 3236 974
                        </a>
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Open in Maps CTA */}
                <Reveal delay={0.3}>
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-gold-gradient px-8 py-4 font-label text-xs font-extrabold uppercase tracking-[0.2em] text-on-primary hover:brightness-110 hover:shadow-[0_6px_24px_rgba(242,202,80,0.3)] transition-all duration-300 group cursor-pointer">
                    <span>{t.contact.openMaps}</span>
                    <ExternalLink
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>
                </Reveal>
              </div>
            </div>

            {/* Social links */}
            <Reveal delay={0.4}>
              <div className="mt-16 pt-10 border-t border-outline-variant/30 flex gap-8">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-xs tracking-[0.2em] uppercase font-label hover:underline underline-offset-8 transition-all duration-300 cursor-pointer">
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-xs tracking-[0.2em] uppercase font-label hover:underline underline-offset-8 transition-all duration-300 cursor-pointer">
                  Facebook
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right — Working Hours (replaces the form) */}
          <div className="lg:col-span-7">
            <Reveal direction="right">
              <div className="bg-surface-container-low p-8 md:p-14 border border-outline-variant/10 h-full">
                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                  <Clock size={24} className="text-primary" />
                  <h3 className="font-headline text-2xl md:text-3xl tracking-tight uppercase">
                    {t.contact.scheduleTitle}
                  </h3>
                </div>

                {/* Schedule */}
                <div className="space-y-0">
                  {scheduleData.map(({ key, hours, closed }, i) => {
                    const today = isTodayKey(key);
                    return (
                      <Reveal key={key} delay={0.1 + i * 0.05}>
                        <div
                          className={`flex items-center justify-between py-5 transition-colors duration-300 ${
                            i < scheduleData.length - 1
                              ? "border-b border-outline-variant/10"
                              : ""
                          } ${today ? "bg-primary/5 -mx-4 px-4" : ""}`}>
                          <div className="flex items-center gap-3">
                            {today && (
                              <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(242,202,80,0.6)]" />
                            )}
                            <span
                              className={`font-body text-sm md:text-base uppercase tracking-wider ${
                                today
                                  ? "text-primary font-bold"
                                  : closed
                                    ? "text-on-surface-variant/50"
                                    : "text-on-surface-variant"
                              }`}>
                              {t.schedule[key]}
                            </span>
                          </div>
                          <span
                            className={`font-headline text-lg md:text-xl italic ${
                              today
                                ? "text-primary font-bold"
                                : closed
                                  ? "text-on-surface-variant/40"
                                  : "text-on-surface"
                            }`}>
                            {closed ? t.schedule.closed : hours}
                          </span>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>

                {/* Book CTA */}
                <Reveal delay={0.5}>
                  <a
                    href={STUDIO24_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-10 w-full bg-gold-gradient py-5 font-label text-xs font-extrabold uppercase tracking-[0.3em] text-on-primary hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-3 group cursor-pointer">
                    <span>{t.contact.bookAppointment}</span>
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-2"
                    />
                  </a>
                </Reveal>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Map Section ── */}
      <MapSection />
    </div>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative h-[500px] md:h-[614px] flex items-center justify-center overflow-hidden">
      {/* background image */}
      <div className="absolute inset-0 bg-surface-container-lowest">
        <img
          src={heroImage}
          alt="Premium barbershop interior"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-b from-surface/20 via-surface/60 to-surface" />
      </div>

      {/* content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-2/3">
            <span className="text-primary font-label text-[10px] tracking-[0.4em] uppercase block mb-4">
              {t.contact.heroEyebrow}
            </span>
            <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl font-light leading-none tracking-tighter uppercase">
              {t.contact.heroTitle}{" "}
              <span className="italic font-bold text-primary">
                {t.contact.heroTitleHighlight}
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-1/3 pb-4 hidden md:block">
            <p className="text-on-surface-variant font-body text-xs leading-relaxed uppercase tracking-[0.15em] opacity-80">
              {t.contact.heroDescription}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Map Section ─── */
function MapSection() {
  return (
    <section className="w-full h-[450px] md:h-[550px] relative bg-surface-container-lowest overflow-hidden">
      {/* Interactive Google Map */}
      <iframe
        title="Kingdom Place location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.6!2d23.3194!3d42.6977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa856e2aa4295d%3A0x5bb38ba120108319!2z0YPQuy4g0J_QuNGA0L7RgtGB0LrQsCAxLCDQodC-0YTQuNGP!5e0!3m2!1sen!2sbg!4v1"
        className="absolute inset-0 w-full h-full grayscale opacity-35"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        style={{ border: 0 }}
        allowFullScreen
      />

      {/* Map overlay card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-8 left-6 md:bottom-12 md:left-12 p-6 md:p-8 bg-surface-container-high/90 backdrop-blur-xl border border-outline-variant/20 max-w-sm">
        <h4 className="font-headline text-xl md:text-2xl text-primary mb-2 uppercase">
          Sofia Center
        </h4>
        <p className="text-sm text-on-surface-variant leading-relaxed mb-1">
          София, ул. Пиротска 1
        </p>
        <p className="text-xs text-on-surface-variant/60 leading-relaxed">
          Our flagship location in the heart of Sofia, offering privacy and prestige.
        </p>
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-xs tracking-widest uppercase border-b border-primary text-primary pb-1 hover:text-on-surface hover:border-on-surface transition-all duration-300 cursor-pointer">
          Open in Maps
          <ExternalLink size={12} />
        </a>
      </motion.div>
    </section>
  );
}
