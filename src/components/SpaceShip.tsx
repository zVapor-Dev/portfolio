'use client'

import { useEffect, useId, useState } from 'react'

import { SUMMON_SHIP_EVENT } from '@/lib/shipEasterEgg'

/**
 * Decorative ship that drifts across the background every so often and
 * shoots a star on the way. Clicking the navbar logo five times in a row
 * summons an extra ship (see lib/shipEasterEgg.ts). All motion is CSS
 * (`.space-ship*` in globals.css) and the whole layer is hidden for
 * prefers-reduced-motion.
 */
export default function SpaceShip() {
  const [summoned, setSummoned] = useState<number[]>([])

  useEffect(() => {
    let next = 0
    const onSummon = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const id = next++
      setSummoned((ships) => [...ships.slice(-2), id])
    }
    window.addEventListener(SUMMON_SHIP_EVENT, onSummon)
    return () => window.removeEventListener(SUMMON_SHIP_EVENT, onSummon)
  }, [])

  return (
    <div aria-hidden="true" className="space-ship-layer">
      <div className="space-ship-target">
        <span className="space-ship-star" />
        <span className="space-ship-burst" />
      </div>
      <span className="space-ship-laser" />

      <div className="space-ship">
        <ShipSvg />
      </div>

      {summoned.map((id) => (
        <div
          key={id}
          className="space-ship space-ship-summoned"
          onAnimationEnd={(e) => {
            if (e.animationName === 'ship-summon') {
              setSummoned((ships) => ships.filter((s) => s !== id))
            }
          }}
        >
          <ShipSvg />
        </div>
      ))}
    </div>
  )
}

function ShipSvg() {
  const uid = useId().replace(/:/g, '')
  const flame = `${uid}-flame`
  const hull = `${uid}-hull`
  const wing = `${uid}-wing`

  return (
    <svg
      className="space-ship-bob"
      viewBox="0 0 120 60"
      width="120"
      height="60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={flame} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
          <stop offset="55%" stopColor="#a855f7" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#00e5ff" />
        </linearGradient>
        <linearGradient id={hull} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1a26" />
          <stop offset="100%" stopColor="#0a0a12" />
        </linearGradient>
        <linearGradient id={wing} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#00e5ff" />
        </linearGradient>
      </defs>

      <path className="space-ship-flame" d="M30 25 Q14 27 2 30 Q14 33 30 35 Z" fill={`url(#${flame})`} />

      <path d="M44 22 L60 22 L50 7 L41 7 Z" fill={`url(#${wing})`} opacity="0.85" />
      <path d="M44 38 L60 38 L50 53 L41 53 Z" fill={`url(#${wing})`} opacity="0.85" />

      <rect x="26" y="25" width="6" height="10" rx="1.5" fill="#111118" stroke="#a855f7" strokeWidth="1" />
      <path
        d="M30 22 L78 22 Q104 24 115 30 Q104 36 78 38 L30 38 Z"
        fill={`url(#${hull})`}
        stroke="#00e5ff"
        strokeOpacity="0.7"
        strokeWidth="1.2"
      />
      <path d="M38 30 L72 30" stroke="#ec4899" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="88" cy="30" rx="10" ry="4.5" fill="#00e5ff" fillOpacity="0.75" />
      <ellipse cx="91" cy="28.5" rx="4" ry="1.4" fill="#ffffff" fillOpacity="0.6" />
    </svg>
  )
}
