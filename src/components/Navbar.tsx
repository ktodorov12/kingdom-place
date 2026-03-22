import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

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
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`font-label text-xs tracking-[0.2em] uppercase transition-colors duration-300 cursor-pointer ${
                  isActive
                    ? "text-primary border-b border-primary pb-1"
                    : "text-on-surface-variant hover:text-primary"
                }`}>
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="https://studio24.bg"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block bg-gold-gradient px-6 py-2.5 font-label text-xs font-extrabold uppercase tracking-widest text-on-primary cursor-pointer transition-all duration-300 hover:brightness-110 hover:shadow-[0_6px_24px_rgba(242,202,80,0.3)]">
            Book Now
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
            className="fixed inset-0 z-[999] bg-surface/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-headline text-3xl italic tracking-tight transition-colors cursor-pointer ${
                  location.pathname === link.to
                    ? "text-primary"
                    : "text-on-surface hover:text-primary"
                }`}>
                {link.label}
              </Link>
            ))}
            <a
              href="https://studio24.bg"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-gradient px-10 py-4 font-label text-sm font-extrabold uppercase tracking-widest text-on-primary mt-4 cursor-pointer hover:brightness-110 transition-all duration-300">
              Book Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
