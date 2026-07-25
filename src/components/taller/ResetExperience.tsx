import { motion } from "motion/react";
import { RotateCcw } from "lucide-react";

export function ResetExperience() {
  const handleReset = () => {
    // Reload the page from scratch to replay the full cinematic intro.
    window.location.reload();
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      onClick={handleReset}
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full border border-[#e8c98a]/30 bg-[#1a0f06]/70 px-4 py-2.5 font-serif text-xs tracking-wider text-[#e8d9b8]/85 backdrop-blur transition-colors hover:border-[#e8c98a]/60 hover:text-[#f2e2c1]"
      aria-label="Reiniciar experiencia"
      title="Reiniciar experiencia"
    >
      <RotateCcw className="h-4 w-4" strokeWidth={1.4} />
      <span className="hidden sm:inline">Reiniciar experiencia</span>
    </motion.button>
  );
}
