import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { playTypewriterKey } from "@/lib/taller-audio";

const FRASE =
  "Hace más de dos mil años, en un pequeño taller de Nazaret, un carpintero enseñaba que las grandes obras no comienzan con herramientas… sino con unas manos dispuestas a crear.";

interface IntroProps {
  onStartHeroReveal: () => void;
  onFinish: () => void;
}

export function Intro({ onStartHeroReveal, onFinish }: IntroProps) {
  const [typed, setTyped] = useState("");
  const [visible, setVisible] = useState(true);
  const [fadeText, setFadeText] = useState(false);

  useEffect(() => {
    let i = 0;
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setTyped(FRASE.slice(0, i));
        const ch = FRASE[i - 1];
        // click only on visible characters, skip most spaces for natural cadence
        if (ch && ch !== " " ? true : Math.random() < 0.35) {
          playTypewriterKey();
        }
        if (i >= FRASE.length) {
          clearInterval(interval);
          // 1. Remain visible for ~2.5 seconds after typing finishes
          setTimeout(() => {
            setFadeText(true);
            onStartHeroReveal();
          }, 2500);
          // 2. Smooth fade out transition over 2.5 seconds, completing at 5.0s total
          setTimeout(() => {
            onFinish();
            setVisible(false);
          }, 5000);
        }
      }, 38);
      return () => clearInterval(interval);
    }, 1000);
    return () => clearTimeout(startDelay);
  }, [onStartHeroReveal, onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: fadeText ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black px-6 pointer-events-none"
        >
          <motion.p
            animate={{ opacity: fadeText ? 0 : 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="font-serif max-w-3xl text-center text-lg leading-relaxed tracking-wide text-[#d9c8a8] md:text-2xl md:leading-relaxed"
          >
            {typed}
            <span className="ml-1 inline-block h-[1em] w-[2px] translate-y-[3px] animate-pulse bg-[#d9c8a8]" />
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
