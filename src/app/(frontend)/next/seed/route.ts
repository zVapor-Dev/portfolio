import { createLocalReq, getPayload } from 'payload'
import { headers } from 'next/headers'

import config from '@payload-config'
import {
  seedExperience,
  seedProjects,
  seedSite,
  seedTechnologies,
} from '@/seed/data'

export const maxDuration = 60

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return new Response('Action forbidden.', { status: 403 })
  }

  try {
    const payloadReq = await createLocalReq({ user }, payload)

    await payload.updateGlobal({ slug: 'site', data: seedSite, req: payloadReq })

    for (const collection of ['projects', 'technologies', 'experience'] as const) {
      const existing = await payload.find({ collection, limit: 1000, req: payloadReq })
      for (const doc of existing.docs) {
        await payload.delete({ collection, id: doc.id, req: payloadReq })
      }
    }

    for (const project of seedProjects) {
      await payload.create({ collection: 'projects', data: project, req: payloadReq })
    }
    for (const tech of seedTechnologies) {
      await payload.create({ collection: 'technologies', data: tech, req: payloadReq })
    }
    for (const entry of seedExperience) {
      await payload.create({ collection: 'experience', data: entry, req: payloadReq })
    }

    return Response.json({ success: true })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error seeding data' })
    return new Response('Error seeding data.', { status: 500 })
  }
}
