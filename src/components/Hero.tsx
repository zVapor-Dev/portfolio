'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import VaporSceneCanvas from '@/components/canvas/VaporScene'
import type { SiteContent } from '@/lib/types'

type Props = { site: SiteContent }

export default function Hero({ site }: Props) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-vapor-mesh" />
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-60" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-5 pt-28 pb-20 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-12">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-label mb-4"
          >
            {site.name}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {site.headline}
            <br />
            <span className="bg-gradient-to-r from-vapor-cyan via-vapor-violet to-vapor-pink bg-clip-text text-transparent">
              {site.headlineAccent}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-vapor-muted sm:text-lg"
          >
            {site.heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a href="#contact" className="btn-primary">Get in touch</a>
            <Link href="/admin" className="btn-ghost">Login</Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4 font-mono text-xs text-vapor-muted"
          >
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-vapor-cyan">GitHub</a>
            <span className="text-white/20">/</span>
            <a href={site.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-vapor-cyan">@zvapor_</a>
            <span className="text-white/20">/</span>
            <a href={`mailto:${site.email}`} className="hover:text-vapor-cyan">{site.email}</a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative hidden h-[420px] lg:block"
        >
          <div className="absolute inset-0 rounded-2xl bg-vapor-gradient opacity-50 blur-3xl" />
          <div className="relative h-full w-full rounded-2xl border border-white/[0.06] bg-vapor-surface/30 backdrop-blur-sm">
            <VaporSceneCanvas />
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-label="Scroll to about section"
      >
        <div className="flex h-12 w-7 items-start justify-center rounded-full border border-white/20 p-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="h-2 w-1 rounded-full bg-vapor-cyan"
          />
        </div>
      </motion.a>
    </section>
  )
}
