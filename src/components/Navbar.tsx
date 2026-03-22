import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowLeft, ArrowRight } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useBookingModal } from "../context/BookingModalContext";

const STUDIO24_URL = "https://studio24.bg/m/kingdom-place-barber-s13504?m%3Fm&m";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
];

type MenuView = "navigation" | "booking";

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuView, setMenuView] = useState<MenuView>("navigation");
  const { openModal } = useBookingModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMenuView("navigation");
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
          {mobileOpen && menuView === "booking"
            ? "Book Your Appointment"
            : "Kingdom Place"}
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

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={openModal}
            className="hidden sm:block bg-gold-gradient px-6 py-2.5 font-label text-xs font-extrabold uppercase tracking-widest text-on-primary cursor-pointer transition-all duration-300 hover:brightness-110 hover:shadow-[0_6px_24px_rgba(242,202,80,0.3)]">
            Book Now
          </button>

          {/* Hamburger - lucide-react Menu/X swap */}
          <button
            onClick={() => {
              setMobileOpen(!mobileOpen);
              if (mobileOpen) setMenuView("navigation");
            }}
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
            <AnimatePresence mode="wait">
              {menuView === "navigation" ? (
                <motion.div
                  key="nav"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-8">
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
                  <button
                    onClick={() => setMenuView("booking")}
                    className="bg-gold-gradient px-10 py-4 font-label text-sm font-extrabold uppercase tracking-widest text-on-primary mt-4 cursor-pointer hover:brightness-110 transition-all duration-300">
                    Book Now
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="booking"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-6 px-6 w-full max-w-md">
                  {/* QR + booking info */}
                  <h2 className="font-headline text-3xl font-bold italic text-primary text-shadow-gold leading-none text-center">
                    Book Your Appointment
                  </h2>
                  <p className="font-body text-sm text-on-surface-variant text-center leading-relaxed">
                    Scan the QR code or tap the button below to reserve your chair.
                  </p>

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
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />
                  </div>

                  <a
                    href={STUDIO24_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gold-gradient w-full py-4 px-8 flex items-center justify-between text-on-primary font-label text-sm font-black tracking-[0.2em] uppercase group hover:shadow-[0_0_30px_rgba(242,202,80,0.2)] transition-all duration-500 cursor-pointer mt-2">
                    <span>Go to Studio24</span>
                    <ArrowRight
                      size={20}
                      className="transition-transform duration-500 group-hover:translate-x-2"
                    />
                  </a>

                  {/* Back to menu */}
                  <button
                    onClick={() => setMenuView("navigation")}
                    className="w-full py-3 mt-1 border border-outline-variant/30 text-on-surface-variant font-label text-[11px] tracking-[0.25em] uppercase hover:text-primary hover:border-primary/40 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2">
                    <ArrowLeft size={14} />
                    <span>Back to Menu</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
