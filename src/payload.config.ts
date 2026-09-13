import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Experience } from './collections/Experience'
import { Projects } from './collections/Projects'
import { Technologies } from './collections/Technologies'
import { Users } from './collections/Users'
import { Site } from './globals/Site'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const connectionString =
  process.env.DATABASE_URL || process.env.POSTGRES_URL || ''

function getPayloadSecret(): string {
  const secret = process.env.PAYLOAD_SECRET
  if (secret) return secret

  const vercelEnv = process.env.VERCEL_ENV
  if (vercelEnv === 'production' || vercelEnv === 'preview') {
    throw new Error(
      'PAYLOAD_SECRET environment variable is required on Vercel. Generate one with: openssl rand -base64 48',
    )
  }

  const isProductionRuntime =
    process.env.NODE_ENV === 'production' &&
    process.env.NEXT_PHASE !== 'phase-production-build'

  if (isProductionRuntime) {
    throw new Error(
      'PAYLOAD_SECRET environment variable is required in production. Generate one with: openssl rand -base64 48',
    )
  }

  if (process.env.NEXT_PHASE === 'phase-production-build') {
    // Local build-only placeholder — not used at runtime (production runtime throws above).
    return '__LOCAL_BUILD_PLACEHOLDER_NOT_A_SECRET__'
  }

  throw new Error(
    'PAYLOAD_SECRET environment variable is required. Add it to .env.local (generate with: openssl rand -base64 48)',
  )
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— zVapor CMS',
    },
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
      url: ({ req }) => {
        const base =
          process.env.NEXT_PUBLIC_SERVER_URL ||
          `${req.protocol}//${req.host}`
        return base
      },
      collections: ['projects', 'technologies', 'experience'],
      globals: ['site'],
    },
  },
  collections: [Users, Projects, Technologies, Experience],
  globals: [Site],
  editor: lexicalEditor(),
  secret: getPayloadSecret(),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString,
    },
    push: process.env.NODE_ENV !== 'production',
  }),
  sharp,
})
