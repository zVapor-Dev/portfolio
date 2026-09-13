'use client'

import { motion } from 'framer-motion'
import type { SiteContent, TechnologyContent } from '@/lib/types'

const categoryLabels: Record<string, string> = {
  language: 'Languages',
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Data',
  platform: 'Platform & Infra',
}

const categoryColors: Record<string, string> = {
  language: 'border-sky-500/30 text-sky-300',
  frontend: 'border-violet-500/30 text-violet-300',
  backend: 'border-emerald-500/30 text-emerald-300',
  database: 'border-amber-500/30 text-amber-300',
  platform: 'border-cyan-500/30 text-cyan-300',
}

type Props = {
  technologies: TechnologyContent[]
  site: SiteContent
}

export default function Tech({ technologies, site }: Props) {
  const grouped = technologies.reduce<Record<string, TechnologyContent[]>>((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = []
    acc[tech.category].push(tech)
    return acc
  }, {})

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <span className="hash-span" id="stack">&nbsp;</span>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="section-label">{site.stackLabel}</p>
        <h2 className="section-title mt-3">{site.stackTitle}</h2>
        <p className="mt-4 max-w-2xl text-base text-vapor-muted">
          {site.stackDescription}
        </p>
      </motion.div>

      <div className="mt-12 space-y-10">
        {Object.entries(grouped).map(([category, items], groupIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: groupIndex * 0.1 }}
          >
            <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-vapor-muted">
              {categoryLabels[category] || category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {items.map((tech) => (
                <span
                  key={tech.id}
                  className={`inline-flex items-center rounded-lg border bg-white/[0.03] px-4 py-2.5 text-sm font-medium transition-colors hover:bg-white/[0.06] ${
                    categoryColors[tech.category] || 'border-white/10 text-white'
                  }`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
