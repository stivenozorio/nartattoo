"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { fadeUp, fadeIn, staggerContainer, EASE_PREMIUM } from "@/lib/motion";
import { useQuoteModal } from "@/hooks/useQuoteModal";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";

export default function Hero() {
  const { open } = useQuoteModal();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Very subtle parallax — background drifts slower than the scroll.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden bg-ink"
    >
      {/*
        Placeholder atmospheric backdrop. To use a real photo or dark video of a
        tattoo session instead, see the README section "Cómo cambiar las imágenes":
        drop the file into /public/hero and swap this block for an <Image>/<video>.
      */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,174,239,0.16),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(14,111,184,0.22),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.2)_0%,rgba(5,5,5,0.55)_55%,#050505_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        variants={staggerContainer(0.16, 0.1)}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <motion.div variants={fadeIn} className="mb-8">
          <Image
            src="/logo/nartattoo-mark.svg"
            alt="NARTATTOO"
            width={72}
            height={72}
            priority
            unoptimized
            className="animate-float-slow drop-shadow-[0_0_30px_rgba(0,174,239,0.5)]"
          />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-balance font-gothic text-[15vw] leading-[0.95] tracking-wide text-white [text-shadow:0_0_40px_rgba(0,174,239,0.35)] sm:text-[8vw] lg:text-[6.5rem]"
        >
          NAR<span className="text-gradient-electric">TATTOO</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-8 font-display text-2xl leading-tight tracking-wide text-silver sm:text-3xl"
        >
          Tu piel.
          <br className="sm:hidden" /> Tu historia.
          <br className="sm:hidden" /> Una obra de arte.
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-md text-balance text-base leading-relaxed text-silver/80"
        >
          Creamos tatuajes personalizados que representan quién eres.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button size="lg" onClick={open} data-cursor-hover>
            Cotizar por WhatsApp
          </Button>
          <ButtonLink href="#galeria" variant="secondary" size="lg" data-cursor-hover>
            Ver Galería
          </ButtonLink>
        </motion.div>
      </motion.div>

      <motion.a
        href="#galeria"
        aria-label="Desplázate hacia abajo"
        data-cursor-hover
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8, ease: EASE_PREMIUM }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-silver/60 transition-colors hover:text-electric"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Explora</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.span>
      </motion.a>
    </section>
  );
}
