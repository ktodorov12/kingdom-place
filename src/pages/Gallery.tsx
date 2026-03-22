import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import LightboxGallery, { type GalleryImage } from "../components/LightboxGallery";
import { useBookingModal } from "../context/BookingModalContext";

/* ── placeholder images (barbershop interior / work shots) ── */
const galleryImages: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1585747860019-8005b2f45a82?w=800&q=80",
    alt: "Kingdom Place interior",
  },
  {
    src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
    alt: "Barber chair detail",
  },
  {
    src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80",
    alt: "Haircut in progress",
  },
  {
    src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80",
    alt: "Classic barbershop tools",
  },
  {
    src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80",
    alt: "Beard grooming",
  },
  {
    src: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
    alt: "Barber at work",
  },
  {
    src: "https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=800&q=80",
    alt: "Styled finish",
  },
  {
    src: "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=800&q=80",
    alt: "Premium grooming products",
  },
  {
    src: "https://images.unsplash.com/photo-1635273051427-7tried0a3e2c?w=800&q=80",
    alt: "Salon atmosphere",
  },
];

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

export default function Gallery() {
  const { openModal } = useBookingModal();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-8 lg:px-24 bg-surface">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="font-label text-[10px] md:text-xs tracking-[0.3em] uppercase text-primary mb-4 block">
              Visual Excellence
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl leading-[0.9] -tracking-[0.04em] italic mb-8">
              The Master <br />
              <span className="not-italic text-on-surface-variant">Gallery.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-2xl text-on-surface-variant text-lg md:text-xl leading-relaxed">
              A curated showcase of precision, craft, and the sovereign atmosphere of our
              studio. Every frame captures the standard we uphold.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 md:px-8 lg:px-24 pb-24 md:pb-32 bg-surface">
        <div className="max-w-7xl mx-auto">
          <LightboxGallery images={galleryImages} columns={3} />
        </div>
      </section>

      {/* CTA — Ready for your transformation? */}
      <section className="border-t border-outline-variant/30 bg-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-24 py-20 md:py-28 flex flex-col items-center text-center">
          <Reveal>
            <h2 className="font-headline text-4xl md:text-5xl lg:text-7xl mb-8">
              Ready for your <span className="text-primary italic">transformation?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-body text-on-surface-variant max-w-xl mb-12 text-base md:text-lg">
              Experience the zenith of male grooming. Book your session at Kingdom Place
              today.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-6">
              <button
                onClick={openModal}
                className="bg-gold-gradient px-12 py-5 font-label font-extrabold text-xs tracking-widest uppercase text-on-primary cursor-pointer hover:brightness-110 hover:shadow-[0_6px_24px_rgba(242,202,80,0.3)] transition-all duration-300">
                Secure Appointment
              </button>
              <Link
                to="/services"
                className="border border-outline-variant text-on-surface px-12 py-5 font-label font-bold text-xs tracking-widest uppercase hover:bg-surface-container-high transition-all duration-300 cursor-pointer">
                View Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
