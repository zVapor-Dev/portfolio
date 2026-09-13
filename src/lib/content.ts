import config from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

import { fallbackContent } from './fallbacks'
import type { PortfolioContent } from './types'

function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL)
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
  if (!hasDatabaseUrl()) {
    return fallbackContent
  }

  try {
    const { isEnabled: isDraft } = await draftMode()
    const payload = await getPayload({ config })

    const [siteGlobal, projectsResult, technologiesResult, experienceResult] =
      await Promise.all([
        payload.findGlobal({ slug: 'site', draft: isDraft }),
        payload.find({
          collection: 'projects',
          where: { published: { equals: true } },
          sort: 'order',
          limit: 100,
          draft: isDraft,
        }),
        payload.find({
          collection: 'technologies',
          sort: 'order',
          limit: 100,
          draft: isDraft,
        }),
        payload.find({
          collection: 'experience',
          sort: 'order',
          limit: 100,
          draft: isDraft,
        }),
      ])

    const hasData =
      siteGlobal?.name &&
      (projectsResult.docs.length > 0 ||
        technologiesResult.docs.length > 0 ||
        experienceResult.docs.length > 0)

    if (!hasData) {
      return fallbackContent
    }

    return {
      site: {
        name: siteGlobal.name,
        handle: siteGlobal.handle,
        title: siteGlobal.title,
        location: siteGlobal.location,
        headline: siteGlobal.headline,
        headlineAccent: siteGlobal.headlineAccent,
        heroDescription: siteGlobal.heroDescription,
        aboutLabel: siteGlobal.aboutLabel || 'About',
        aboutTitle: siteGlobal.aboutTitle,
        aboutParagraphs:
          siteGlobal.aboutParagraphs?.map((p) => p.paragraph).filter(Boolean) ||
          fallbackContent.site.aboutParagraphs,
        highlights:
          siteGlobal.highlights?.map((h) => ({
            label: h.label,
            value: h.value,
          })) || fallbackContent.site.highlights,
        contactLabel: siteGlobal.contactLabel || 'Contact',
        contactTitle: siteGlobal.contactTitle || "Let's talk.",
        contactDescription:
          siteGlobal.contactDescription ||
          fallbackContent.site.contactDescription,
        email: siteGlobal.email,
        website: siteGlobal.website || '',
        github: siteGlobal.github || '',
        twitter: siteGlobal.twitter || '',
      },
      projects: projectsResult.docs.map((doc) => ({
        id: String(doc.id),
        title: doc.title,
        description: doc.description,
        tags: doc.tags?.map((t) => t.tag).filter(Boolean) || [],
        imageUrl: doc.imageUrl,
        links:
          doc.links?.map((l) => ({ label: l.label, url: l.url })) || [],
        order: doc.order ?? 0,
      })),
      technologies: technologiesResult.docs.map((doc) => ({
        id: String(doc.id),
        name: doc.name,
        category: doc.category,
        order: doc.order ?? 0,
      })),
      experience: experienceResult.docs.map((doc) => ({
        id: String(doc.id),
        title: doc.title,
        company: doc.company,
        date: doc.date,
        iconUrl: doc.iconUrl || '/discord.png',
        iconBg: doc.iconBg || '#5865F2',
        points: doc.points?.map((p) => p.point).filter(Boolean) || [],
        order: doc.order ?? 0,
      })),
      navLinks: fallbackContent.navLinks,
    }
  } catch {
    return fallbackContent
  }
}
