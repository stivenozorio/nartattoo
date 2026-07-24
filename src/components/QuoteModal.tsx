"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useQuoteModal } from "@/hooks/useQuoteModal";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import QuoteForm from "@/components/QuoteForm";

export default function QuoteModal() {
  const { isOpen, close } = useQuoteModal();
  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-modal-title"
          className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-10"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="absolute inset-0 bg-ink/85 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass no-scrollbar relative max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-2xl p-6 sm:p-8"
          >
            <button
              type="button"
              aria-label="Cerrar"
              data-cursor-hover
              onClick={close}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-silver transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>

            <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-electric">
              Cotización
            </span>
            <h3
              id="quote-modal-title"
              className="mb-6 font-display text-3xl tracking-wide text-white sm:text-4xl"
            >
              Convierte tu idea en arte
            </h3>

            <QuoteForm onSuccess={close} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
