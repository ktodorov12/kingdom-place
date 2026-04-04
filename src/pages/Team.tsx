import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import LightboxGallery from "../components/LightboxGallery";
import { useLanguage } from "../context/LanguageContext";
import barbersData, { type Barber } from "../data/barbersData";

const STUDIO24_URL = "https://studio24.bg/m/kingdom-place-barber-s13504?m%3Fm&m";

function Reveal({
  children,
  delay = 0,
  direction,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "left" | "right";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const x = direction === "left" ? -40 : direction === "right" ? 40 : 0;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: direction ? 0 : 30, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}>
      {children}
    </motion.div>
  );
}

export default function Team() {
  const { t } = useLanguage();
  const [activeBarber, setActiveBarber] = useState<Barber>(barbersData[0]);
  const inactiveBarbers = barbersData.filter((b) => b.id !== activeBarber.id);

  return (
    <>
      {/* ═══ The Master Collective — Hero Header ═══ */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-8 lg:px-24 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-4xl">
              <Reveal>
                <span className="text-primary font-label text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4 block">
                  {t.team.eyebrow}
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl text-on-surface leading-none -tracking-[0.02em]">
                  {t.team.titleLine1} <br />
                  <span className="italic text-primary">{t.team.titleLine2}</span>
                </h1>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="md:w-1/3">
              <p className="text-on-surface-variant font-body text-base md:text-lg leading-relaxed border-l border-outline-variant pl-8">
                {t.team.intro}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ Active Barber Featured Section ═══ */}
      <section className="px-6 md:px-8 lg:px-24 pb-24 md:pb-32 bg-surface">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBarber.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-surface-container-low">
              {/* Portrait */}
              <div className="lg:col-span-7">
                <div className="relative h-[500px] md:h-[716px] overflow-hidden group">
                  <motion.img
                    key={activeBarber.profileImage}
                    src={activeBarber.profileImage}
                    alt={t.barbers[activeBarber.nameKey]}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60" />
                </div>
              </div>

              {/* Bio panel */}
              <div className="lg:col-span-5 flex flex-col justify-center p-8 md:p-12 lg:p-20 border-l-0 lg:border-l border-outline-variant/20">
                {activeBarber.isMaster && (
                  <span className="inline-block py-1 px-3 border border-primary text-primary font-label text-[10px] tracking-widest uppercase mb-6 w-fit">
                    {t.team.badgeLabel}
                  </span>
                )}

                <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl text-on-surface mb-4 -tracking-[0.02em]">
                  {t.barbers[activeBarber.nameKey]}
                </h2>

                <p className="font-body text-xl text-primary italic mb-8">
                  {t.barbers[activeBarber.roleKey]}
                </p>

                <p className="text-on-surface-variant text-base md:text-lg leading-relaxed mb-10">
                  {t.barbers[activeBarber.descKey]}
                </p>

                <div className="grid grid-cols-2 gap-8 border-t border-outline-variant/30 pt-10 mb-10">
                  <div>
                    <span className="block text-primary font-label text-xs tracking-widest uppercase mb-2">
                      {t.team.specialty}
                    </span>
                    <span className="text-on-surface font-body">
                      {t.barbers[activeBarber.specialtyKey]}
                    </span>
                  </div>
                  <div>
                    <span className="block text-primary font-label text-xs tracking-widest uppercase mb-2">
                      {t.team.experience}
                    </span>
                    <span className="text-on-surface font-body">
                      {t.barbers[activeBarber.experienceKey]}
                    </span>
                  </div>
                </div>

                <a
                  href={STUDIO24_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gold-gradient px-8 py-3 font-label text-xs font-extrabold uppercase tracking-widest text-on-primary cursor-pointer transition-all duration-300 hover:brightness-110 hover:shadow-[0_6px_24px_rgba(242,202,80,0.3)] w-fit">
                  {t.team.bookSession}
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ Active Barber Portfolio Gallery ═══ */}
      <section className="py-24 md:py-32 px-6 md:px-8 lg:px-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <Reveal>
              <span className="inline-block py-1.5 px-4 border border-primary text-primary font-label text-[10px] md:text-xs tracking-widest uppercase mb-6">
                {t.team.portfolioEyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                {t.team.hisCraftwork}
              </h2>
            </Reveal>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeBarber.id + "-gallery"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}>
              <LightboxGallery
                images={activeBarber.galleryImages}
                columns={4}
                beforeAfterPairs={activeBarber.beforeAfterPairs}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ Other Masters ═══ */}
      {inactiveBarbers.length > 0 && (
        <section className="py-24 md:py-32 px-6 md:px-8 lg:px-24 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 md:mb-20">
              <Reveal>
                <span className="inline-block py-1.5 px-4 border border-primary text-primary font-label text-[10px] md:text-xs tracking-widest uppercase mb-6">
                  {t.team.otherMasters}
                </span>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {inactiveBarbers.map((barber) => (
                <motion.button
                  key={barber.id}
                  onClick={() => {
                    setActiveBarber(barber);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="group text-left bg-surface-container-low overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(242,202,80,0.08)]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}>
                  <div className="relative h-[350px] md:h-[420px] overflow-hidden">
                    <img
                      src={barber.profileImage}
                      alt={t.barbers[barber.nameKey]}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="inline-block py-1 px-2 border border-primary/40 text-primary font-label text-[9px] tracking-widest uppercase mb-3">
                        {t.barbers[barber.roleKey]}
                      </span>
                      <h3 className="font-headline text-2xl md:text-3xl text-on-surface mb-2 -tracking-[0.02em]">
                        {t.barbers[barber.nameKey]}
                      </h3>
                      <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-2">
                        {t.barbers[barber.descKey]}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ CTA — Ready for your transformation? ═══ */}
      <section className="border-t border-outline-variant/30 bg-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-24 py-20 md:py-28 flex flex-col items-center text-center">
          <Reveal>
            <h2 className="font-headline text-4xl md:text-5xl lg:text-7xl mb-8">
              {t.team.ctaTitle}{" "}
              <span className="text-primary italic">{t.team.ctaTitleHighlight}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-body text-on-surface-variant max-w-xl mb-12 text-base md:text-lg">
              {t.team.ctaDescription}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-6">
              <a
                href={STUDIO24_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold-gradient px-12 py-5 font-label font-extrabold text-xs tracking-widest uppercase text-on-primary cursor-pointer hover:brightness-110 hover:shadow-[0_6px_24px_rgba(242,202,80,0.3)] transition-all duration-300">
                {t.team.ctaPrimary}
              </a>
              <Link
                to="/gallery"
                className="font-label text-xs uppercase tracking-[0.2em] text-primary border-b border-primary/40 hover:border-primary pb-1 transition-all py-4 px-8 cursor-pointer">
                {t.team.ctaSecondary}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
