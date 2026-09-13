'use client'

import { motion } from 'framer-motion'
import type { SiteContent } from '@/lib/types'

type Props = { site: SiteContent }

export default function About({ site }: Props) {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <span className="hash-span" id="about">&nbsp;</span>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="section-label">{site.aboutLabel}</p>
        <h2 className="section-title mt-3">{site.aboutTitle}</h2>
      </motion.div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-5 text-base leading-relaxed text-vapor-muted"
        >
          {site.aboutParagraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid gap-3 sm:grid-cols-2"
        >
          {site.highlights.map((item) => (
            <div key={item.label} className="vapor-card vapor-card-hover p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-vapor-cyan">{item.label}</p>
              <p className="mt-2 text-sm font-medium leading-snug text-white">{item.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
