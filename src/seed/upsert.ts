import type { Payload, PayloadRequest } from 'payload'

import {
  seedExperience,
  seedProjects,
  seedSite,
  seedTechnologies,
} from './data'

type SeedOptions = {
  req?: PayloadRequest
}

async function syncCollection<T extends { seedKey: string }>(
  payload: Payload,
  collection: 'projects' | 'technologies' | 'experience',
  items: T[],
  getMatchKey: (item: T) => string,
  getDocMatchKey: (doc: {
    seedKey?: string | null
    title?: string | null
    name?: string | null
  }) => string,
  options: SeedOptions = {},
) {
  const { req } = options
  const existing = await payload.find({ collection, limit: 1000, req })
  const existingByKey = new Map<string, number | string>()

  for (const doc of existing.docs) {
    const record = doc as {
      id: number | string
      seedKey?: string | null
      title?: string | null
      name?: string | null
    }

    if (record.seedKey) {
      existingByKey.set(String(record.seedKey), record.id)
      continue
    }

    const legacyKey = getDocMatchKey(record)
    const matchingItem = items.find((item) => getMatchKey(item) === legacyKey)

    if (matchingItem) {
      await payload.update({
        collection,
        id: record.id,
        data: { seedKey: matchingItem.seedKey } as never,
        req,
      })
      existingByKey.set(matchingItem.seedKey, record.id)
    }
  }

  const seedKeys = new Set(items.map((item) => item.seedKey))

  for (const item of items) {
    const id = existingByKey.get(item.seedKey)

    if (id) {
      await payload.update({
        collection,
        id,
        // Seed payloads are validated at authoring time in src/seed/data.ts
        data: item as never,
        req,
      })
    } else {
      await payload.create({
        collection,
        data: item as never,
        req,
      })
    }
  }

  for (const doc of existing.docs) {
    const record = doc as { id: number | string; seedKey?: string | null }
    const key = record.seedKey ? String(record.seedKey) : null
    if (!key || !seedKeys.has(key)) {
      await payload.delete({ collection, id: record.id, req })
    }
  }
}

export async function seedPortfolioContent(
  payload: Payload,
  options: SeedOptions = {},
) {
  const { req } = options

  await payload.updateGlobal({
    slug: 'site',
    data: seedSite,
    req,
  })

  await syncCollection(
    payload,
    'projects',
    seedProjects,
    (item) => item.title,
    (doc) => String(doc.title ?? ''),
    options,
  )

  await syncCollection(
    payload,
    'technologies',
    seedTechnologies,
    (item) => item.name,
    (doc) => String(doc.name ?? ''),
    options,
  )

  await syncCollection(
    payload,
    'experience',
    seedExperience,
    (item) => item.title,
    (doc) => String(doc.title ?? ''),
    options,
  )
}
