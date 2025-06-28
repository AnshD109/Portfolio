"use client";

import { motion } from "framer-motion";

export default function Page() {
  return (
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      Hello i am ansh
    </motion.h1>
  );
}