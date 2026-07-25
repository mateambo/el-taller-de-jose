import { motion } from "motion/react";
import type { Proyecto } from "@/data/catalog";

interface ProjectRowProps {
  proyecto: Proyecto;
  index: number;
  onOpen: (p: Proyecto) => void;
}


export function ProjectRow({ proyecto, index, onOpen }: ProjectRowProps) {
  const imageLeft = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className={`grid items-center gap-12 md:gap-20 lg:gap-28 ${
        imageLeft ? "md:grid-cols-[1.1fr_1fr]" : "md:grid-cols-[1fr_1.1fr]"
      }`}
    >
      <div
        className={`${imageLeft ? "md:order-1" : "md:order-2"} relative`}
      >
        <motion.button
          onClick={() => onOpen(proyecto)}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3 }}
          className="group relative block w-full overflow-hidden rounded-sm shadow-[0_20px_60px_-20px_rgba(60,30,10,0.4)] transition-shadow duration-300 hover:shadow-[0_30px_80px_-20px_rgba(180,120,60,0.45)]"
          aria-label={`Ver ${proyecto.titulo} en detalle`}
        >
          <img
            src={proyecto.imagen}
            alt={proyecto.titulo}
            width={1200}
            height={1200}
            loading="lazy"
            className="aspect-square w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#3a2415]/10 via-transparent to-[#f5d68c]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </motion.button>
      </div>

      <div className={`${imageLeft ? "md:order-2" : "md:order-1"} space-y-8`}>
        <div>
          <p className="mb-3 font-sans text-[0.65rem] uppercase tracking-[0.4em] text-[#8b5a2b]">
            Proyecto {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="font-serif text-5xl text-[#3a2415] md:text-6xl">
            {proyecto.titulo}
          </h3>
        </div>

        <p className="max-w-lg font-serif text-lg leading-relaxed text-[#5c3a1e]/90">
          {proyecto.descripcion}
        </p>

      </div>
    </motion.article>
  );
}
