"use client";

import { createContext, useCallback, useMemo, useState } from "react";

type QuoteModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export default function QuoteModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return <QuoteModalContext.Provider value={value}>{children}</QuoteModalContext.Provider>;
}
