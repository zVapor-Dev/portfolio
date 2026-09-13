import config from '@payload-config'
import { getPayload } from 'payload'

import {
  seedExperience,
  seedProjects,
  seedSite,
  seedTechnologies,
} from './data'

async function seed() {
  if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
    console.error(
      'DATABASE_URL or POSTGRES_URL is required. Create a free Neon Postgres database and set the connection string.',
    )
    process.exit(1)
  }

  const payload = await getPayload({ config })

  console.log('Seeding site global...')
  await payload.updateGlobal({ slug: 'site', data: seedSite })

  console.log('Clearing and seeding collections...')
  for (const collection of ['projects', 'technologies', 'experience'] as const) {
    const existing = await payload.find({ collection, limit: 1000 })
    for (const doc of existing.docs) {
      await payload.delete({ collection, id: doc.id })
    }
  }

  for (const project of seedProjects) {
    await payload.create({ collection: 'projects', data: project })
  }

  for (const tech of seedTechnologies) {
    await payload.create({ collection: 'technologies', data: tech })
  }

  for (const entry of seedExperience) {
    await payload.create({ collection: 'experience', data: entry })
  }

  console.log('Seed complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
