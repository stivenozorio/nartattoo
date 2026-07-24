"use client";

import { useContext } from "react";
import { QuoteModalContext } from "@/components/QuoteModalProvider";

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) {
    throw new Error("useQuoteModal must be used within a QuoteModalProvider");
  }
  return ctx;
}
