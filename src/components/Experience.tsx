'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { ExperienceContent, SiteContent } from '@/lib/types'

type Props = {
  experience: ExperienceContent[]
  site: SiteContent
}

export default function Experience({ experience, site }: Props) {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <span className="hash-span" id="experience">&nbsp;</span>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="section-label">{site.experienceLabel}</p>
        <h2 className="section-title mt-3">{site.experienceTitle}</h2>
        <p className="mt-4 max-w-2xl text-base text-vapor-muted">
          {site.experienceDescription}
        </p>
      </motion.div>

      <div className="mt-12 space-y-2">
        {experience.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-8 sm:pl-10"
          >
            <div className="absolute left-0 top-0 flex h-full flex-col items-center">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10"
                style={{ backgroundColor: entry.iconBg }}
              >
                <Image src={entry.iconUrl} alt="" width={20} height={20} className="object-contain" />
              </div>
              <div className="mt-2 w-px flex-1 bg-gradient-to-b from-vapor-cyan/40 to-transparent" />
            </div>

            <div className="vapor-card vapor-card-hover pb-8 pl-2 sm:pl-4">
              <div className="flex flex-wrap items-start justify-between gap-2 p-6 pb-4">
                <div>
                  <h3 className="font-display text-xl font-semibold text-white">{entry.title}</h3>
                  <p className="mt-1 text-sm text-vapor-muted">{entry.company}</p>
                </div>
                <span className="tag shrink-0">{entry.date}</span>
              </div>
              <ul className="space-y-3 px-6 pb-6">
                {entry.points.map((point, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-vapor-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-vapor-cyan" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
