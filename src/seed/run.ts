import config from '@payload-config'
import { getPayload } from 'payload'

import { seedPortfolioContent } from './upsert'

async function seed() {
  if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
    console.error(
      'DATABASE_URL or POSTGRES_URL is required. Create a free Neon Postgres database and set the connection string.',
    )
    process.exit(1)
  }

  const payload = await getPayload({ config })

  console.log('Seeding portfolio content (idempotent upsert)...')
  await seedPortfolioContent(payload)
  console.log('Seed complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
