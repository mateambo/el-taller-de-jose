import { motion, useInView } from "motion/react";
import { useRef } from "react";
import finalBlur from "@/assets/final-blur.jpg";

export function FinalSection() {
  const signRef = useRef<HTMLParagraphElement>(null);
  const inView = useInView(signRef, { once: true, margin: "-50px" });

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${finalBlur})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f06]/85 via-[#2a190b]/80 to-[#0f0805]/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(255,180,90,0.18),transparent_60%)]" />

      <div className="relative mx-auto max-w-3xl px-6 py-40 text-center md:py-56">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="font-serif text-3xl leading-relaxed text-[#f2e2c1] md:text-5xl md:leading-[1.3]"
        >
          José transformaba la madera con sus manos.
          <br />
          <span className="italic text-[#e8c98a]">
            Ahora te toca a vos transformar tus ideas.
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.5 }}
          className="mx-auto mt-16 max-w-xl space-y-6 font-serif text-base leading-loose text-[#e8d9b8]/85 md:text-lg"
        >
          <p>
            La madera que hoy tenés delante no es solamente un material. Es una
            oportunidad.
          </p>
          <p>Cada corte enseña paciencia.</p>
          <p>Cada error enseña a volver a empezar.</p>
          <p>Cada creación habla un poco de quien la construyó.</p>
          <p>
            Este catálogo no marca un límite.
            <br />
            Marca un comienzo.
          </p>
          <p className="italic text-[#e8c98a]">
            Porque las mejores ideas nunca estuvieron escritas en un plano. Nacen en
            el corazón de quien se anima a crear.
          </p>
        </motion.div>

        {/* Tools illustration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.35 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.8 }}
          className="mt-24 flex items-center justify-center gap-8 text-[#e8c98a]"
        >
          <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M8 40l16-16 8 8-16 16-8 4 0-12z" />
            <path d="M24 24l24-24 8 8-24 24" />
          </svg>
          <div className="h-px w-16 bg-[#e8c98a]/40" />
          <svg viewBox="0 0 64 64" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="8" y="28" width="48" height="8" />
            <path d="M8 32l6-8h36l6 8" />
          </svg>
          <div className="h-px w-16 bg-[#e8c98a]/40" />
          <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 52l20-20M32 32l4-4a8 8 0 1 0-4-4l-4 4M28 36l-4-4" />
          </svg>
        </motion.div>

        <div className="mt-32 space-y-2">
          <motion.p
            ref={signRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="font-serif text-sm italic text-[#c9a875]/70 md:text-base"
          >
            «Toda gran obra comenzó siendo solamente un pedazo de madera.»
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 3, delay: 1, ease: "easeOut" }}
            className="font-sans text-[0.65rem] uppercase tracking-[0.5em] text-[#c9a875]/60"
          >
            — El Taller de José
          </motion.p>
        </div>
      </div>
    </section>
  );
}
