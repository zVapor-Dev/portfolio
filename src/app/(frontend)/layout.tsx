import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import StarsCanvas from '@/components/canvas/Stars'
import { getServerSideURL } from '@/lib/url'

import './globals.css'

export const metadata: Metadata = {
  title: 'zVapor_ | Full-Stack Product Engineer',
  description:
    'Daan Vrieling (zVapor_) — Full-stack product engineer building web applications with TypeScript, React, and modern tooling.',
  metadataBase: new URL(getServerSideURL()),
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isEnabled: isPreview } = await draftMode()

  return (
    <html lang="en">
      <body>
        <div className="relative z-0 min-h-screen bg-vapor-bg">
          <div className="pointer-events-none fixed inset-0 z-0">
            <StarsCanvas />
          </div>
          <div className="relative z-10">{children}</div>
        </div>
        {isPreview && <LivePreviewListener />}
        <SpeedInsights />
      </body>
    </html>
  )
}
