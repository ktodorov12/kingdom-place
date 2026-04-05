import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function PrivacyPolicy() {
  const { t } = useLanguage();

  const sections = [
    { title: t.privacy.reservationsTitle, body: t.privacy.reservations },
    { title: t.privacy.cookiesTitle, body: t.privacy.cookies },
    { title: t.privacy.logsTitle, body: t.privacy.logs },
  ];

  return (
    <section className="min-h-screen bg-surface-default px-6 md:px-12 py-28 md:py-36">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          className="font-headline text-3xl md:text-5xl text-primary mb-6"
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fade}>
          {t.privacy.title}
        </motion.h1>

        <motion.p
          className="font-body text-on-surface-variant/80 text-sm md:text-base leading-relaxed mb-12"
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fade}>
          {t.privacy.intro}
        </motion.p>

        {sections.map((s, i) => (
          <motion.div
            key={s.title}
            className="mb-10"
            initial="hidden"
            animate="visible"
            custom={i + 2}
            variants={fade}>
            <h2 className="font-headline text-xl md:text-2xl text-primary mb-3">
              {s.title}
            </h2>
            <p className="font-body text-on-surface-variant/70 text-sm md:text-base leading-relaxed">
              {s.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
