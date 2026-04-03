import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const STUDIO24_URL = "https://studio24.bg/m/kingdom-place-barber-s13504?m%3Fm&m";

export default function StickyBookCTA() {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Mobile: full-width bottom bar */}
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-3 bg-surface/90 backdrop-blur-xl border-t border-outline-variant/20">
            <a
              href={STUDIO24_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gold-gradient py-3.5 font-label text-sm font-extrabold uppercase tracking-widest text-on-primary text-center cursor-pointer hover:brightness-110 transition-all duration-300">
              {t.stickyCta.bookNow}
            </a>
          </motion.div>

          {/* Desktop: floating corner button */}
          <motion.a
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            href={STUDIO24_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex fixed bottom-8 right-8 z-50 bg-gold-gradient w-14 h-14 items-center justify-center cursor-pointer shadow-[0_10px_30px_rgba(242,202,80,0.3)] hover:shadow-[0_14px_40px_rgba(242,202,80,0.45)] hover:brightness-110 transition-all duration-300"
            aria-label={t.stickyCta.bookNow}>
            <CalendarCheck size={22} className="text-on-primary" />
          </motion.a>
        </>
      )}
    </AnimatePresence>
  );
}
