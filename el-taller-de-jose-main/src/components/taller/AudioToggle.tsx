import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { isAudioEnabled, subscribeAudio, toggleAudio } from "@/lib/taller-audio";

export function AudioToggle() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(isAudioEnabled());
    const unsub = subscribeAudio(setOn);
    return () => {
      unsub();
    };
  }, []);


  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, delay: 2 }}
      onClick={() => toggleAudio()}
      className="fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 rounded-full border border-[#e8c98a]/30 bg-[#1a0f06]/70 px-4 py-2.5 font-serif text-xs tracking-wider text-[#e8d9b8]/85 backdrop-blur transition-colors hover:border-[#e8c98a]/60 hover:text-[#f2e2c1]"
      aria-label={on ? "Silenciar el taller" : "Activar el sonido del taller"}
      title={on ? "Silenciar el taller" : "Activar el sonido del taller"}
    >
      {on ? (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M5 9v6h4l5 4V5L9 9H5z" strokeLinejoin="round" />
          <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8 8 0 0 1 0 12" strokeLinecap="round" />
        </svg>
      ) : (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M5 9v6h4l5 4V5L9 9H5z" strokeLinejoin="round" />
          <path d="M17 9l4 6M21 9l-4 6" strokeLinecap="round" />
        </svg>
      )}
      <span className="hidden sm:inline">{on ? "Taller activo" : "Sonido del taller"}</span>
    </motion.button>
  );
}
