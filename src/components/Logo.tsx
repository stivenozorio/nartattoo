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
      <Image
        src="/logo/nartattoo-mark.svg"
        alt=""
        width={markSize}
        height={markSize}
        priority
        className="drop-shadow-[0_0_10px_rgba(0,174,239,0.45)] transition-transform duration-500 group-hover:scale-105"
      />
      <span className="font-display text-xl tracking-[0.12em] text-white transition-colors duration-300 group-hover:text-electric">
        NARTATTOO
      </span>
    </Link>
  );
}
