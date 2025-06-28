"use client";

import { motion } from "framer-motion";

export default function Page() {
  return (
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      Hello, I'm [Your Name]
    </motion.h1>
  );
}
