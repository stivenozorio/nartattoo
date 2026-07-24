"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_DEFAULT_URL } from "@/lib/constants";

export default function WhatsAppFloatingButton() {
  return (
    <motion.a
      href={WHATSAPP_DEFAULT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Cotizar por WhatsApp"
      data-cursor-hover
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="glow-electric fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-electric text-ink md:bottom-8 md:right-8"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-electric/40" />
      <MessageCircle size={26} strokeWidth={1.75} />
    </motion.a>
  );
}
