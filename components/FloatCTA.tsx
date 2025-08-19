'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'

export default function FloatCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link
        href="tel:+919876543210"
        className="group inline-flex items-center gap-2 rounded-full px-5 py-3 premium-shadow bg-himalayan-600 text-white hover:bg-himalayan-700 transition-colors"
      >
        <Phone className="h-4 w-4" />
        <span className="font-semibold">Talk to an Expert</span>
      </Link>
    </motion.div>
  )
}
