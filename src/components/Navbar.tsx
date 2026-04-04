import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLanguage, type Lang } from "../context/LanguageContext";

const STUDIO24_URL = "https://studio24.bg/m/kingdom-place-barber-s13504?m%3Fm&m";

const langOptions: { code: Lang; label: string; flag: string }[] = [
  { code: "bg", label: "BG", flag: "🇧🇬" },
  { code: "en", label: "EN", flag: "🇬🇧" },
];

export default function Navbar() {
  const location = useLocation();
  const { lang, t, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { to: "/", label: t.nav.home },
    { to: "/services", label: t.nav.services },
    { to: "/products", label: t.nav.products },
    { to: "/gallery", label: t.nav.gallery },
    { to: "/team", label: t.nav.team },
    { to: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setLangOpen(false);
  }, [location.pathname]);

  // Scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-[1000] px-6 md:px-8 py-4 flex justify-between items-center transition-all duration-500 ${
          scrolled
            ? "bg-surface/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(226,226,226,0.04)]"
            : "bg-transparent"
        }`}>
        {/* Logo */}
        <Link
          to="/"
          className="font-headline text-xl md:text-2xl font-bold text-primary uppercase tracking-tighter hover:scale-105 transition-transform duration-300 cursor-pointer">
          Kingdom Place
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `font-label text-xs tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "text-primary border-b border-primary pb-1 text-shadow-gold"
                    : "text-on-surface-variant hover:text-primary"
                }`
              }>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* CTA + Lang Toggle + Mobile Toggle */}
        <div className="flex items-center gap-4">
          {/* Language Switcher (desktop) */}
          <div ref={langRef} className="relative hidden md:block">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 cursor-pointer group"
              aria-label="Switch language">
              <span className="text-sm leading-none">
                {langOptions.find((o) => o.code === lang)?.flag}
              </span>
              <span className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface-variant group-hover:text-primary transition-colors duration-300">
                {lang.toUpperCase()}
              </span>
              <ChevronDown
                size={12}
                className={`text-on-surface-variant group-hover:text-primary transition-all duration-300 ${langOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 bg-surface border border-outline-variant/30 shadow-[0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden min-w-[120px]">
                  {langOptions.map((opt) => (
                    <button
                      key={opt.code}
                      onClick={() => {
                        setLanguage(opt.code);
                        setLangOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors duration-200 ${
                        lang === opt.code
                          ? "bg-primary/10 text-primary"
                          : "text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                      }`}>
                      <span className="text-sm leading-none">{opt.flag}</span>
                      <span className="font-label text-[10px] tracking-[0.2em] uppercase">
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href={STUDIO24_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block bg-gold-gradient px-6 py-2.5 font-label text-xs font-extrabold uppercase tracking-widest text-on-primary cursor-pointer transition-all duration-300 hover:brightness-110 hover:shadow-[0_6px_24px_rgba(242,202,80,0.3)]">
            {t.nav.bookNow}
          </a>

          {/* Hamburger - lucide-react Menu/X swap */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center cursor-pointer text-primary"
            aria-label="Toggle menu">
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="x"
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="absolute">
                  <X size={24} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="absolute">
                  <Menu size={24} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[999] bg-surface/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden overflow-x-hidden">
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `font-headline text-3xl italic tracking-tight transition-colors cursor-pointer ${
                      isActive
                        ? "text-primary text-shadow-gold"
                        : "text-on-surface hover:text-primary"
                    }`
                  }>
                  {link.label}
                </NavLink>
              ))}

              {/* Language Switcher (mobile) */}
              <div className="flex gap-3 mt-2">
                {langOptions.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => setLanguage(opt.code)}
                    className={`flex items-center gap-2 px-4 py-2 cursor-pointer transition-all duration-300 border ${
                      lang === opt.code
                        ? "border-primary text-primary bg-primary/10"
                        : "border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary/40"
                    }`}>
                    <span className="text-sm leading-none">{opt.flag}</span>
                    <span className="font-label text-sm tracking-[0.2em] uppercase">
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>

              <a
                href={STUDIO24_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="bg-gold-gradient px-10 py-4 font-label text-sm font-extrabold uppercase tracking-widest text-on-primary mt-4 cursor-pointer hover:brightness-110 transition-all duration-300">
                {t.nav.bookNow}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
