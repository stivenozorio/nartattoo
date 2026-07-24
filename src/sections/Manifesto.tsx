"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUp, scaleIn, viewportOnce } from "@/lib/motion";
import SectionHeading from "@/components/SectionHeading";

export default function Manifesto() {
  return (
    <section className="relative bg-ink py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-10">
        <SectionHeading
          eyebrow="Nuestra filosofía"
          title={
            <>
              No hacemos tatuajes.
              <br />
              <span className="text-gradient-electric">Creamos historias.</span>
            </>
          }
          description="Cada diseño nace de una conversación, no de un catálogo. Estudiamos tu piel, tu idea y tu estilo de vida para crear una pieza que sea completamente tuya — irrepetible, deliberada y hecha para durar toda la vida."
        />

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,174,239,0.25),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-br from-ink-soft via-graphite to-ink" />
          <Image
            src="/logo/nartattoo-mark.svg"
            alt="Detalle de diseño NARTATTOO"
            width={140}
            height={140}
            unoptimized
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-90 drop-shadow-[0_0_50px_rgba(0,174,239,0.45)]"
          />
          <motion.div
            variants={fadeUp}
            className="absolute inset-x-0 bottom-0 glass p-6"
          >
            <p className="font-display text-lg tracking-wide text-white">
              Diseño exclusivo, trazo definitivo.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
