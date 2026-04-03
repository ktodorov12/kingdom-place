import { Link } from "react-router-dom";
import { Share2, Instagram, CreditCard, Banknote } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const STUDIO24_URL = "https://studio24.bg/m/kingdom-place-barber-s13504?m%3Fm&m";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-surface-container-low w-full py-16 md:py-20 px-6 md:px-8 border-t border-outline-variant/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-start">
        {/* Brand */}
        <div>
          <div className="font-headline text-2xl md:text-3xl italic text-primary mb-6">
            Kingdom Place
          </div>
          <p className="font-body text-sm tracking-[0.2em] uppercase text-on-surface-variant/60 leading-loose">
            {t.footer.tagline}
            <br />
            {t.footer.legacy}
          </p>

          {/* Payment methods */}
          <div className="mt-8 flex items-center gap-3 text-primary">
            <CreditCard size={20} />
            <Banknote size={20} />
            <span className="text-[10px] tracking-[0.2em] uppercase">
              {t.footer.payment}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-4">
          <h4 className="text-primary font-bold text-xs tracking-[0.3em] uppercase mb-6 md:mb-8">
            {t.footer.navigation}
          </h4>
          <a
            href={STUDIO24_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block font-body text-sm tracking-[0.2em] uppercase text-on-surface-variant/60 hover:text-primary transition-all cursor-pointer text-left">
            {t.footer.studio24Booking}
          </a>
          <Link
            to="/services"
            className="block font-body text-sm tracking-[0.2em] uppercase text-on-surface-variant/60 hover:text-primary transition-all cursor-pointer">
            {t.nav.services}
          </Link>
          <Link
            to="/team"
            className="block font-body text-sm tracking-[0.2em] uppercase text-on-surface-variant/60 hover:text-primary transition-all cursor-pointer">
            {t.nav.team}
          </Link>
        </div>

        {/* Social & Copyright */}
        <div className="space-y-4">
          <h4 className="text-primary font-bold text-xs tracking-[0.3em] uppercase mb-6 md:mb-8">
            {t.footer.follow}
          </h4>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-11 h-11 border border-outline-variant/20 flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all cursor-pointer"
              aria-label="Share">
              <Share2 size={20} />
            </a>
            <a
              href="#"
              className="w-11 h-11 border border-outline-variant/20 flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all cursor-pointer"
              aria-label="Instagram">
              <Instagram size={20} />
            </a>
          </div>
          <p className="pt-6 text-[10px] tracking-[0.3em] uppercase text-on-surface-variant/40">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
