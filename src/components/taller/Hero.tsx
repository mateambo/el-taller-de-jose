import { motion } from "motion/react";
import { useMemo } from "react";
import heroImg from "@/assets/workshop-hero.jpg";

interface HeroProps {
  entered: boolean;
  onEnter: () => void;
  isRevealing: boolean;
  isFullyVisible: boolean;
}

export function Hero({ entered, onEnter, isRevealing, isFullyVisible }: HeroProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 20,
        delay: Math.random() * 10,
      })),
    [],
  );

  return (
    <motion.section
      animate={{
        scale: entered ? 1.12 : 1,
        y: entered ? -40 : 0,
      }}
      transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-screen w-full overflow-hidden"
    >
      <motion.img
        src={heroImg}
        alt="Interior del taller de José en Nazaret"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ opacity: 0, scale: 1.12 }}
        animate={{
          opacity: isRevealing ? 1 : 0,
          scale: isRevealing ? 1 : 1.12,
        }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />

      {/* warm overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1a0f06]/60 via-[#2a190b]/45 to-[#0f0805]/80" />
      {/* window light */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_25%,rgba(255,190,110,0.35),transparent_55%)] mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(0,0,0,0.6),transparent_60%)]" />

      {/* dust particles */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-[#fbe6be]/40"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              filter: "blur(1px)",
            }}
            animate={{
              y: [-20, 20, -20],
              x: [0, 10, 0],
              opacity: [0.15, 0.5, 0.15],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* content */}
      <motion.div
        animate={{ opacity: entered ? 0 : 1, y: entered ? -30 : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        {isFullyVisible && (
          <>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.1, ease: "easeOut" }}
              className="mb-6 font-sans text-[0.7rem] uppercase tracking-[0.5em] text-[#d9c8a8]/80"
            >
              Nazaret · Circa 30 d.C.
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, delay: 0.3, ease: "easeOut" }}
              className="font-serif text-5xl leading-[1.05] text-[#f2e2c1] drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)] sm:text-6xl md:text-7xl lg:text-8xl"
            >
              El Taller <span className="italic text-[#e8c98a]">de José</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
              className="mt-8 max-w-xl font-serif text-base italic leading-relaxed text-[#e8d9b8]/90 md:text-lg"
            >
              «La madera es solo el comienzo. Lo verdaderamente importante es lo que
              construís con ella.»
            </motion.p>

            <motion.button
              onClick={onEnter}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.9, ease: "easeOut" }}
              whileHover={{ y: -4, boxShadow: "0 20px 40px -12px rgba(255,180,90,0.45)" }}
              className="group mt-12 inline-flex items-center gap-3 rounded-full border border-[#e8c98a]/40 bg-[#3a2415]/60 px-10 py-4 font-serif text-base tracking-wide text-[#f2e2c1] backdrop-blur-sm transition-colors duration-500 hover:border-[#e8c98a] hover:bg-[#4a2f1a]/70"
            >
              <span>Entrar al Taller</span>
              <svg
                className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </>
        )}
      </motion.div>
    </motion.section>
  );
}
