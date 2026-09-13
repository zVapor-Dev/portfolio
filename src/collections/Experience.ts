import type { CollectionConfig } from 'payload'

import { validateAllowedUrl } from '@/lib/validateUrl'

export const Experience: CollectionConfig = {
  slug: 'experience',
  labels: {
    singular: 'Experience Entry',
    plural: 'Experience',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'company', 'date', 'order'],
    livePreview: {
      url: ({ req }) => {
        const base =
          process.env.NEXT_PUBLIC_SERVER_URL ||
          `${req.protocol}//${req.host}`
        return `${base}#experience`
      },
    },
  },
  access: {
    read: () => true,
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
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'text',
      required: true,
    },
    {
      name: 'iconUrl',
      type: 'text',
      label: 'Icon URL',
      defaultValue: '/discord.png',
      validate: validateAllowedUrl,
    },
    {
      name: 'iconBg',
      type: 'text',
      label: 'Icon background color',
      defaultValue: '#5865F2',
    },
    {
      name: 'points',
      type: 'array',
      fields: [{ name: 'point', type: 'textarea', required: true }],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}
