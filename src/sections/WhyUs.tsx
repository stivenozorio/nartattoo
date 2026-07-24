"use client";

import { motion } from "framer-motion";
import { Gem, ShieldCheck, HeartHandshake } from "lucide-react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { WHY_US } from "@/lib/constants";
import SectionHeading from "@/components/SectionHeading";

const ICONS = [Gem, ShieldCheck, HeartHandshake];

export default function WhyUs() {
  return (
    <section className="relative bg-ink-soft py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Por qué elegirnos"
          title="Un estándar diferente."
          align="center"
          className="mx-auto"
        />

        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {WHY_US.map((item, i) => {
            const Icon = ICONS[i] ?? Gem;
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="glass rounded-2xl p-8 transition-colors duration-500 hover:border-electric/40"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-electric/10 text-electric">
                  <Icon size={26} strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 font-display text-2xl tracking-wide text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-silver">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
