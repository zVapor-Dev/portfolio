'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { SiteContent } from '@/lib/types'

type Props = { site: SiteContent }

export default function Contact({ site }: Props) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'success' | 'error' | 'unconfigured' | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.status === 503) {
        setStatus('unconfigured')
      } else if (!res.ok) {
        setStatus('error')
      } else {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      }
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <span className="hash-span" id="contact">&nbsp;</span>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <p className="section-label">{site.contactLabel}</p>
          <h2 className="section-title mt-3">{site.contactTitle}</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-vapor-muted">
            {site.contactDescription}
          </p>
          <div className="mt-8 space-y-4">
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-sm text-vapor-muted hover:text-vapor-cyan">
              <span className="font-mono text-xs text-vapor-cyan">email</span>{site.email}
            </a>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-vapor-muted hover:text-vapor-cyan">
              <span className="font-mono text-xs text-vapor-cyan">github</span>zVapor-Dev
            </a>
            <a href={site.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-vapor-muted hover:text-vapor-cyan">
              <span className="font-mono text-xs text-vapor-cyan">twitter</span>@zvapor_
            </a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <form onSubmit={handleSubmit} className="vapor-card space-y-5 p-6 sm:p-8">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">Name</label>
              <input id="name" name="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">Email</label>
              <input id="email" type="email" name="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-white">Message</label>
              <textarea id="message" name="message" rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-field resize-none" placeholder="What's on your mind?" />
            </div>

            {status === 'success' && <p className="text-sm text-emerald-400">Message sent — I&apos;ll get back to you soon.</p>}
            {status === 'error' && <p className="text-sm text-red-400">Something went wrong. Please try again or email me directly.</p>}
            {status === 'unconfigured' && <p className="text-sm text-amber-400">Contact form is not configured on this deployment. Please email directly.</p>}

            <button type="submit" className="btn-primary w-full sm:w-auto" disabled={loading}>
              {loading ? 'Sending…' : 'Send message'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
