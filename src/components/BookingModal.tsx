import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useBookingModal } from "../context/BookingModalContext";
import { useLanguage } from "../context/LanguageContext";

const STUDIO24_URL = "https://studio24.bg/m/kingdom-place-barber-s13504?m%3Fm&m";

export default function BookingModal() {
  const { isOpen, closeModal } = useBookingModal();
  const { t } = useLanguage();

  // Scroll lock — prevents background scroll on mobile and desktop
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-2000 flex items-center justify-center"
          onClick={closeModal}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-surface/80 backdrop-blur-xl" />

          {/* ── DESKTOP MODAL ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-surface-container-lowest border border-outline-variant/30 hidden md:flex flex-col md:flex-row shadow-[0_0_80px_rgba(0,0,0,0.8)] mx-6">
            {/* Left: QR panel */}
            <div className="w-full md:w-5/12 bg-surface-container-high p-12 flex flex-col items-center justify-center space-y-8">
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-all duration-700" />
                <div className="relative p-4 bg-white">
                  <QRCodeSVG
                    value={STUDIO24_URL}
                    size={160}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="H"
                  />
                </div>
              </div>
              <div className="text-center space-y-2">
                <span className="font-label text-[10px] tracking-[0.3em] uppercase text-primary font-bold">
                  {t.booking.quickScan}
                </span>
                <p className="font-label text-xs text-on-surface-variant leading-relaxed px-4">
                  {t.booking.scanDesc}
                </p>
              </div>
            </div>

            {/* Right: Info panel */}
            <div className="w-full md:w-7/12 p-12 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Header + close */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="font-label text-[11px] tracking-[0.4em] uppercase text-outline">
                      {t.booking.portalEyebrow}
                    </span>
                    <h2 className="font-headline text-4xl font-light italic text-primary text-shadow-gold leading-none">
                      {t.booking.portalTitle}
                    </h2>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-outline hover:text-primary transition-colors duration-300 cursor-pointer"
                    aria-label="Close modal">
                    <X size={28} />
                  </button>
                </div>

                <div className="h-px w-full bg-outline-variant/20" />

                <div className="space-y-4">
                  <h3 className="font-headline text-2xl text-on-surface leading-tight">
                    {t.booking.portalHeading}
                  </h3>
                  <p className="font-body text-on-surface-variant text-sm leading-relaxed">
                    {t.booking.portalDesc}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center space-x-4 group">
                    <div className="w-10 h-10 flex items-center justify-center bg-surface-container-highest text-primary">
                      <ShieldCheck size={20} />
                    </div>
                    <span className="font-label text-xs tracking-widest uppercase text-on-surface group-hover:text-primary transition-colors">
                      {t.booking.instantConfirmation}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 group">
                    <div className="w-10 h-10 flex items-center justify-center bg-surface-container-highest text-primary">
                      <Clock size={20} />
                    </div>
                    <span className="font-label text-xs tracking-widest uppercase text-on-surface group-hover:text-primary transition-colors">
                      {t.booking.realTimeAvailability}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-12 space-y-4">
                <a
                  href={STUDIO24_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gold-gradient w-full py-5 px-8 flex items-center justify-between text-on-primary font-label text-sm font-black tracking-[0.2em] uppercase group hover:shadow-[0_0_30px_rgba(242,202,80,0.2)] transition-all duration-500 cursor-pointer">
                  <span>{t.booking.goToStudio24}</span>
                  <ArrowRight
                    size={20}
                    className="transition-transform duration-500 group-hover:translate-x-2"
                  />
                </a>
                <button
                  onClick={closeModal}
                  className="w-full py-4 text-on-surface-variant font-label text-[10px] tracking-[0.3em] uppercase hover:text-primary transition-colors duration-300 cursor-pointer">
                  {t.booking.close}
                </button>
              </div>
            </div>
          </motion.div>

          {/* ── MOBILE MODAL ── */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="fixed inset-0 z-10 flex flex-col md:hidden bg-surface-container-low overflow-x-hidden">
            {/* Mobile top bar */}
            <header className="shrink-0 bg-surface shadow-[0_4px_20px_rgba(226,226,226,0.04)]">
              <div className="flex items-center justify-between px-6 h-20">
                <button
                  onClick={closeModal}
                  className="text-primary active:scale-95 transition-transform cursor-pointer"
                  aria-label="Close modal">
                  <X size={24} />
                </button>
                <h1 className="font-headline text-lg uppercase tracking-tighter text-primary">
                  {t.booking.mobileTitle}
                </h1>
                <div className="w-6" />
              </div>
            </header>

            {/* Mobile content — scrollable, constrained */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden p-4">
              <div className="min-h-full flex items-center justify-center">
                <div className="w-full max-w-md bg-surface-container-low p-6 relative overflow-hidden ring-1 ring-outline-variant/20 shadow-2xl">
                  <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                    <div className="space-y-3">
                      <h2 className="font-headline text-3xl font-bold tracking-tight text-primary leading-none">
                        Kingdom Place
                      </h2>
                      <p className="font-body text-sm text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                        {t.booking.mobileDesc}
                      </p>
                    </div>

                    {/* QR */}
                    <div className="relative p-4 bg-surface-container-high ring-1 ring-primary/30 shadow-[0_0_25px_rgba(242,202,80,0.15)] overflow-hidden">
                      <div className="relative p-2 bg-white">
                        <QRCodeSVG
                          value={STUDIO24_URL}
                          size={160}
                          bgColor="#ffffff"
                          fgColor="#000000"
                          level="H"
                        />
                      </div>
                      {/* Corner accents */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />
                    </div>

                    {/* Divider accent */}
                    <div className="flex items-center space-x-2 text-primary-container">
                      <span className="h-px w-8 bg-primary-container/30" />
                      <span className="font-label text-[10px] tracking-[0.3em] uppercase font-bold">
                        {t.booking.portalTitle}
                      </span>
                      <span className="h-px w-8 bg-primary-container/30" />
                    </div>
                  </div>
                </div>
              </div>
            </main>

            {/* Mobile bottom nav */}
            <nav className="shrink-0 w-full flex items-stretch h-20 bg-surface/70 backdrop-blur-xl border-t border-outline-variant/20">
              <a
                href={STUDIO24_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center bg-gold-gradient text-on-primary p-4 w-full h-full active:brightness-110 transition-all cursor-pointer">
                <ArrowRight size={20} className="mb-1" />
                <span className="font-label text-[10px] font-bold tracking-[0.2em] uppercase">
                  {t.booking.goToStudio24}
                </span>
              </a>
              <button
                onClick={closeModal}
                className="flex flex-col items-center justify-center text-on-surface p-4 w-full h-full hover:bg-surface-container-low transition-all active:brightness-110 cursor-pointer">
                <X size={20} className="mb-1" />
                <span className="font-label text-[10px] font-bold tracking-[0.2em] uppercase">
                  {t.booking.close}
                </span>
              </button>
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
