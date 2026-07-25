import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Intro } from "@/components/taller/Intro";
import { Hero } from "@/components/taller/Hero";
import { Catalog } from "@/components/taller/Catalog";
import { FinalSection } from "@/components/taller/FinalSection";
import { BackToTop } from "@/components/taller/BackToTop";
import { AudioToggle } from "@/components/taller/AudioToggle";
import { ResetExperience } from "@/components/taller/ResetExperience";
import { duckAmbient, playHammerKnock, tryStartAmbient } from "@/lib/taller-audio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "El Taller de José — Una experiencia inmersiva de carpintería" },
      {
        name: "description",
        content:
          "Entrá al taller de José en Nazaret. Una experiencia cinematográfica que invita a construir con las manos y con el corazón.",
      },
      { property: "og:title", content: "El Taller de José" },
      {
        property: "og:description",
        content:
          "Cada corte enseña paciencia. Cada creación habla de quien la construyó.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [introDone, setIntroDone] = useState(false);
  const [entered, setEntered] = useState(false);
  const [showRest, setShowRest] = useState(false);
  const catalogRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    if (entered) return;
    setEntered(true);
    setShowRest(true);
    playHammerKnock();
    tryStartAmbient(); // start ambient workshop tone after user gesture
    duckAmbient(2200);
    setTimeout(() => {
      catalogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 900);
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <main className="min-h-screen bg-[#1a0f06] text-[#3a2415]">
      {!introDone && <Intro onFinish={() => setIntroDone(true)} />}

      <Hero entered={entered} onEnter={handleEnter} />

      <AnimatePresence>
        {showRest && (
          <motion.div
            ref={catalogRef}
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Catalog />
            <FinalSection />
          </motion.div>
        )}
      </AnimatePresence>

      <BackToTop />
      {introDone && <AudioToggle />}
    </main>
  );
}

