'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

import type { NavLink, SiteContent } from '@/lib/types'

type Props = {
  navLinks: NavLink[]
  site: SiteContent
}

export default function Navbar({ navLinks, site }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/[0.06] bg-vapor-bg/80 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <Link href="/" className="group flex items-center gap-2.5">
          <Image src="/logo.svg" alt="zVapor logo" width={32} height={32} />
          <span className="font-display text-lg font-semibold text-white">
            {site.handle}
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="text-sm font-medium text-vapor-muted transition-colors hover:text-vapor-cyan"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`mailto:${site.email}`}
            className="btn-primary !py-2 !px-4 text-xs"
          >
            Get in touch
          </a>
          <Link href="/admin" className="btn-ghost !py-2 !px-4 text-xs">
            Login
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden text-white"
          onClick={() => setToggle(!toggle)}
          aria-label={toggle ? 'Close menu' : 'Open menu'}
        >
          {toggle ? '✕' : '☰'}
        </button>
      </div>

      <AnimatePresence>
        {toggle && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-white/[0.06] bg-vapor-bg/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-4 px-5 py-6 sm:px-8">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-base font-medium text-vapor-muted transition-colors hover:text-white"
                    onClick={() => setToggle(false)}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
              <li className="flex flex-col gap-3 pt-2">
                <a
                  href={`mailto:${site.email}`}
                  className="btn-primary w-full text-center"
                  onClick={() => setToggle(false)}
                >
                  Get in touch
                </a>
                <Link
                  href="/admin"
                  className="btn-ghost w-full text-center"
                  onClick={() => setToggle(false)}
                >
                  Login
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
