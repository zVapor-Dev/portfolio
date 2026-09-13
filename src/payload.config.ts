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
  secret: process.env.PAYLOAD_SECRET || 'build-time-secret-change-me',
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
