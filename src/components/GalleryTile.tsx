"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/motion";
import type { GalleryImage } from "@/lib/constants";

export default function GalleryTile({ image, index }: { image: GalleryImage; index: number }) {
  return (
    <motion.figure
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay: (index % 4) * 0.06 }}
      data-cursor-hover
      className="group relative mb-4 block break-inside-avoid overflow-hidden rounded-xl bg-ink-soft"
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={800}
        height={800}
        sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 92vw"
        className="h-auto w-full scale-100 object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/90 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="flex w-full items-center justify-between p-5">
          <span className="max-w-[80%] text-sm font-medium text-white">{image.alt}</span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-electric/50 text-electric">
            <ZoomIn size={16} />
          </span>
        </div>
      </div>
    </motion.figure>
  );
}
