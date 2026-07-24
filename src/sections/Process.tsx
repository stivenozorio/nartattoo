"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { PROCESS_STEPS } from "@/lib/constants";
import SectionHeading from "@/components/SectionHeading";

export default function Process() {
  return (
    <section id="proceso" className="relative overflow-hidden bg-ink py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Cómo trabajamos"
          title="De la idea a la piel."
          description="Un proceso claro y sin fricciones, diseñado para que cada etapa se sienta tan cuidada como el resultado final."
          align="center"
          className="mx-auto"
        />

        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div className="pointer-events-none absolute left-0 right-0 top-11 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />

          {PROCESS_STEPS.map((step) => (
            <motion.div key={step.number} variants={fadeUp} className="group relative">
              <div className="mb-6 flex h-[88px] w-[88px] items-center justify-center rounded-full border border-white/10 bg-ink-soft font-display text-3xl text-electric transition-all duration-500 group-hover:border-electric/60 group-hover:shadow-[0_0_30px_rgba(0,174,239,0.3)]">
                {step.number}
              </div>
              <h3 className="mb-2 font-display text-2xl tracking-wide text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-silver">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
