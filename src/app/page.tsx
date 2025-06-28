// app/page.tsx
'use client'
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <h1 className="text-4xl font-bold">Hello, I'm [Your Name]</h1>
    </main>
  )
}

import { motion } from 'framer-motion'

<motion.h1
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  Hello, I'm [Your Name]
</motion.h1>
