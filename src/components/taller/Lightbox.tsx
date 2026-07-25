import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import type { Proyecto } from "@/data/catalog";

interface LightboxProps {
  proyecto: Proyecto | null;
  onClose: () => void;
}

export function Lightbox({ proyecto, onClose }: LightboxProps) {
  useEffect(() => {
    if (!proyecto) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [proyecto, onClose]);

  return (
    <AnimatePresence>
      {proyecto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a0f06]/80 p-6 backdrop-blur-xl"
        >
          <motion.img
            src={proyecto.imagen}
            alt={proyecto.titulo}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[85vh] max-w-[85vw] rounded-sm object-contain shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)]"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={onClose}
            className="absolute right-6 top-6 font-serif text-sm tracking-widest text-[#e8d9b8] transition-opacity hover:opacity-70"
            aria-label="Cerrar"
          >
            CERRAR ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
