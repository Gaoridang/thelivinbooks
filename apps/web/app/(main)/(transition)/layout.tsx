"use client";

import { AnimatePresence } from "framer-motion";
import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}
