'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { ProjectContent } from '@/lib/types'

type Props = { projects: ProjectContent[] }

export default function Works({ projects }: Props) {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <span className="hash-span" id="work">&nbsp;</span>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="section-label">Selected work</p>
        <h2 className="section-title mt-3">Projects that shipped.</h2>
        <p className="mt-4 max-w-2xl text-base text-vapor-muted">
          A focused set of projects — open-source packages, this portfolio, and
          production Discord tooling. No filler, no work-in-progress badges.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group vapor-card vapor-card-hover flex flex-col overflow-hidden"
          >
            <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.06]">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vapor-bg/80 via-transparent to-transparent" />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-xl font-semibold text-white">{project.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-vapor-muted">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3 border-t border-white/[0.06] pt-5">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-vapor-cyan transition-colors hover:text-white"
                  >
                    {link.label} →
                  </a>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
