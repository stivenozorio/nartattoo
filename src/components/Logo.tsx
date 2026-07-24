import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({ className, markSize = 34 }: { className?: string; markSize?: number }) {
  return (
    <Link
      href="#inicio"
      aria-label="NARTATTOO — Inicio"
      data-cursor-hover
      className={cn("group flex items-center gap-3", className)}
    >
      {/* unoptimized: Next's image optimizer 400s on local SVGs unless dangerouslyAllowSVG is set */}
      <Image
        src="/logo/nartattoo-mark.svg"
        alt=""
        width={markSize}
        height={markSize}
        priority
        unoptimized
        className="drop-shadow-[0_0_10px_rgba(0,174,239,0.45)] transition-transform duration-500 group-hover:scale-105"
      />
      <span className="font-gothic text-2xl tracking-[0.04em] text-gradient-electric transition-opacity duration-300 group-hover:opacity-80">
        NARTATTOO
      </span>
    </Link>
  );
}
