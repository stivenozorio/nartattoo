"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, X } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "nartattoo-pwa-dismissed";

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    const handler = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setVisible(false);
  }

  function dismiss() {
    setVisible(false);
    sessionStorage.setItem(DISMISS_KEY, "1");
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="glass fixed bottom-6 left-1/2 z-50 flex w-[calc(100%-3rem)] max-w-sm -translate-x-1/2 items-center gap-3 rounded-2xl p-4 shadow-2xl sm:left-8 sm:translate-x-0"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-electric/15 text-electric">
            <Download size={20} strokeWidth={1.75} />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold text-white">Instala NARTATTOO</p>
            <p className="text-xs text-silver">Acceso rápido desde tu pantalla de inicio.</p>
          </div>
          <button
            type="button"
            data-cursor-hover
            onClick={handleInstall}
            className="rounded-full bg-electric px-3.5 py-2 text-xs font-semibold text-ink transition-transform hover:scale-105"
          >
            Instalar
          </button>
          <button
            type="button"
            aria-label="Cerrar"
            data-cursor-hover
            onClick={dismiss}
            className="text-silver transition-colors hover:text-white"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
