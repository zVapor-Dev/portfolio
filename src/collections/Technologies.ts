import type { CollectionConfig } from 'payload'

const categories = [
  { label: 'Language', value: 'language' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
  { label: 'Database', value: 'database' },
  { label: 'Platform', value: 'platform' },
]

export const Technologies: CollectionConfig = {
  slug: 'technologies',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'order'],
    livePreview: {
      url: ({ req }) => {
        const base =
          process.env.NEXT_PUBLIC_SERVER_URL ||
          `${req.protocol}//${req.host}`
        return `${base}#stack`
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
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: categories,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}
