"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { useQuoteModal } from "@/hooks/useQuoteModal";
import Button from "@/components/Button";

export default function CTA() {
  const { open } = useQuoteModal();

  return (
    <section id="contacto" className="relative overflow-hidden bg-ink py-32 sm:py-44">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_40%,rgba(0,174,239,0.14),transparent_55%)]" />

      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-balance font-display text-5xl leading-[0.95] tracking-wide text-white sm:text-6xl lg:text-7xl"
        >
          ¿Listo para convertir
          <br />
          tu idea en <span className="text-gradient-electric">arte</span>?
        </motion.h2>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ delay: 0.15 }}
          className="mt-12"
        >
          <Button size="lg" onClick={open} data-cursor-hover className="h-16 px-12 text-lg">
            Solicitar Cotización
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
