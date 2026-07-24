"use client";

import { useEffect } from "react";

/** Locks body scroll while `active` is true — used by the quote modal. */
export function useLockBodyScroll(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [active]);
}
