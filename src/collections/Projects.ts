import type { CollectionConfig } from 'payload'

import { validateAllowedUrl } from '@/lib/validateUrl'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'published'],
    livePreview: {
      url: ({ req }) => {
        const base =
          process.env.NEXT_PUBLIC_SERVER_URL ||
          `${req.protocol}//${req.host}`
        return base
      },
    },
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { published: { equals: true } }
    },
  },
  fields: [
    {
      name: 'seedKey',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Stable identifier used by the seed script for idempotent upserts.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        {
          name: 'url',
          type: 'text',
          required: true,
          validate: validateAllowedUrl,
        },
      ],
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'Image URL',
      required: true,
      validate: validateAllowedUrl,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
}
