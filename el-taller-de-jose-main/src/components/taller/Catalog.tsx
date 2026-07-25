import { motion } from "motion/react";
import { useState } from "react";
import { catalogo, type Proyecto } from "@/data/catalog";
import { ProjectRow } from "./ProjectRow";
import { Lightbox } from "./Lightbox";

export function Catalog() {
  const [open, setOpen] = useState<Proyecto | null>(null);

  return (
    <section className="relative bg-[#f2e6cf] px-6 py-32 md:py-40">
      {/* subtle wood grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 3px, rgba(90,50,20,0.5) 3px 4px, transparent 4px 9px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-24 text-center md:mb-32"
        >
          <p className="mb-4 font-sans text-[0.7rem] uppercase tracking-[0.5em] text-[#8b5a2b]">
            Un libro de ideas
          </p>
          <h2 className="font-serif text-5xl text-[#3a2415] md:text-7xl">
            Catálogo <span className="italic">de Proyectos</span>
          </h2>
          <div className="mx-auto my-8 h-px w-24 bg-[#8b5a2b]/40" />
          <p className="mx-auto max-w-2xl font-serif text-lg italic leading-relaxed text-[#5c3a1e]/90">
            «Estas son algunas ideas para comenzar. Pero cada pedazo de madera puede
            convertirse en algo único cuando dejás volar tu imaginación.»
          </p>
        </motion.header>

        <div className="space-y-32 md:space-y-48">
          {catalogo.map((p, i) => (
            <ProjectRow key={p.id} proyecto={p} index={i} onOpen={setOpen} />
          ))}
        </div>
      </div>

      <Lightbox proyecto={open} onClose={() => setOpen(null)} />
    </section>
  );
}
