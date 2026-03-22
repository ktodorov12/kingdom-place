import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import LightboxGallery, { type GalleryImage } from "../components/LightboxGallery";
import { useBookingModal } from "../context/BookingModalContext";

const teamImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCHNuY4eS0cfJuNXyl8EJh-IczBf9gM1RLsXlKljWkkPEHM7n7e6g4_TLZu-WPKxKcOskkqRuXsRPNFOquSTqqhuXzLQVosyz_zq9s9iBjSkXmZ3FyKAS_nupA3xaslMWqjHDkYQ2YlioCkL6bCZkPF6vFa18-jiZHn9i71I2_gI56hgJ71GTEeIEWUq60vjk62YBZ8jUqv7NOZ8nWPnbsbbNJOPTqL1ej0a_-7oUHa-BEr0L1WyZhjz3HmjFIyDomz3NPM4CmN0G4";

/* ── portfolio images (haircut / style work) ── */
const portfolioImages: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80",
    alt: "Fade haircut",
  },
  {
    src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
    alt: "Classic taper",
  },
  {
    src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80",
    alt: "Beard sculpting",
  },
  {
    src: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
    alt: "Precision line-up",
  },
  {
    src: "https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=800&q=80",
    alt: "Textured crop",
  },
  {
    src: "https://images.unsplash.com/photo-1585747860019-8005b2f45a82?w=800&q=80",
    alt: "Gentleman cut",
  },
];

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
  const { openModal } = useBookingModal();

  return (
    <>
      {/* ═══ The Master Collective — Hero Header ═══ */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-8 lg:px-24 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-4xl">
              <Reveal>
                <span className="text-primary font-label text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4 block">
                  Our Artisans
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl text-on-surface leading-none -tracking-[0.02em]">
                  THE MASTER <br />
                  <span className="italic text-primary">COLLECTIVE</span>
                </h1>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="md:w-1/3">
              <p className="text-on-surface-variant font-body text-base md:text-lg leading-relaxed border-l border-outline-variant pl-8">
                Crafting excellence through precision and tradition. Meet the hands that
                define the sovereign standard of grooming.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ Master Barber Featured Section ═══ */}
      <section className="px-6 md:px-8 lg:px-24 pb-24 md:pb-32 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-surface-container-low">
            {/* Portrait */}
            <Reveal direction="left" className="lg:col-span-7">
              <div className="relative h-[500px] md:h-[716px] overflow-hidden group">
                <img
                  src={teamImage}
                  alt="Мохамад Алаюби — Master Barber"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60" />
              </div>
            </Reveal>

            {/* Bio panel */}
            <div className="lg:col-span-5 flex flex-col justify-center p-8 md:p-12 lg:p-20 border-l-0 lg:border-l border-outline-variant/20">
              <Reveal delay={0.1}>
                <span className="inline-block py-1 px-3 border border-primary text-primary font-label text-[10px] tracking-widest uppercase mb-6">
                  Master Craftsman
                </span>
              </Reveal>

              <Reveal delay={0.2}>
                <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl text-on-surface mb-4 -tracking-[0.02em]">
                  Мохамад Алаюби
                </h2>
              </Reveal>

              <Reveal delay={0.25}>
                <p className="font-body text-xl text-primary italic mb-8">
                  The Master Barber
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <p className="text-on-surface-variant text-base md:text-lg leading-relaxed mb-10">
                  С над 15 години опит в международни салони, Мохамад съчетава източната
                  прецизност със съвременните европейски тенденции. Неговият подход е
                  индивидуален към всяка черта на лицето, гарантирайки не просто
                  подстригване, а пълна трансформация на стила.
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="grid grid-cols-2 gap-8 border-t border-outline-variant/30 pt-10 mb-10">
                  <div>
                    <span className="block text-primary font-label text-xs tracking-widest uppercase mb-2">
                      Specialty
                    </span>
                    <span className="text-on-surface font-body">
                      Signature Scissor Cuts
                    </span>
                  </div>
                  <div>
                    <span className="block text-primary font-label text-xs tracking-widest uppercase mb-2">
                      Experience
                    </span>
                    <span className="text-on-surface font-body">15+ Years</span>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.5}>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={openModal}
                    className="bg-gold-gradient px-8 py-3 font-label text-xs font-extrabold uppercase tracking-widest text-on-primary cursor-pointer transition-all duration-300 hover:brightness-110 hover:shadow-[0_6px_24px_rgba(242,202,80,0.3)]">
                    Book Session
                  </button>
                  <a
                    href="https://www.instagram.com/kingdom_place_barbershop/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-outline-variant/30 px-4 py-3 text-on-surface-variant hover:text-primary hover:border-primary/40 transition-all duration-300 cursor-pointer flex items-center gap-2">
                    <Instagram size={16} />
                    <span className="font-label text-xs tracking-[0.15em] uppercase">
                      Follow
                    </span>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Portfolio Gallery ═══ */}
      <section className="py-24 md:py-32 px-6 md:px-8 lg:px-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <Reveal>
              <span className="inline-block py-1.5 px-4 border border-primary text-primary font-label text-[10px] md:text-xs tracking-widest uppercase mb-6">
                His Work
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Неговото майсторство
              </h2>
            </Reveal>
          </div>

          <LightboxGallery images={portfolioImages} columns={3} />
        </div>
      </section>

      {/* ═══ CTA — Ready for your transformation? ═══ */}
      <section className="border-t border-outline-variant/30 bg-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-24 py-20 md:py-28 flex flex-col items-center text-center">
          <Reveal>
            <h2 className="font-headline text-4xl md:text-5xl lg:text-7xl mb-8">
              Ready for your <span className="text-primary italic">transformation?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-body text-on-surface-variant max-w-xl mb-12 text-base md:text-lg">
              Join the ranks of the sovereigns. Every appointment is a dedicated hour of
              precision, craftsmanship, and unparalleled grooming excellence.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-6">
              <button
                onClick={openModal}
                className="bg-gold-gradient px-12 py-5 font-label font-extrabold text-xs tracking-widest uppercase text-on-primary cursor-pointer hover:brightness-110 hover:shadow-[0_6px_24px_rgba(242,202,80,0.3)] transition-all duration-300">
                Request an Appointment
              </button>
              <Link
                to="/gallery"
                className="font-label text-xs uppercase tracking-[0.2em] text-primary border-b border-primary/40 hover:border-primary pb-1 transition-all py-4 px-8 cursor-pointer">
                View Full Gallery
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
