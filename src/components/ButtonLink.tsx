"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { buttonStyles, type ButtonSize, type ButtonVariant } from "@/components/Button";

type ButtonLinkProps = HTMLMotionProps<"a"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export default function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <motion.a
      whileHover={{ y: -2, scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={buttonStyles(variant, size, className)}
      {...props}
    >
      {children}
    </motion.a>
  );
}
