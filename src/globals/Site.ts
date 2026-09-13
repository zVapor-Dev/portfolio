import type { GlobalConfig } from 'payload'

export const Site: GlobalConfig = {
  slug: 'site',
  label: 'Site Content',
  admin: {
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
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'handle', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'location', type: 'text', required: true },
            {
              name: 'headline',
              type: 'text',
              required: true,
              defaultValue: 'Building products',
            },
            {
              name: 'headlineAccent',
              type: 'text',
              required: true,
              defaultValue: 'for the web.',
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              required: true,
            },
          ],
        },
        {
          label: 'About',
          fields: [
            { name: 'aboutLabel', type: 'text', defaultValue: 'About' },
            { name: 'aboutTitle', type: 'text', required: true },
            {
              name: 'aboutParagraphs',
              type: 'array',
              fields: [{ name: 'paragraph', type: 'textarea', required: true }],
            },
            {
              name: 'highlights',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'value', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            { name: 'contactLabel', type: 'text', defaultValue: 'Contact' },
            { name: 'contactTitle', type: 'text', defaultValue: "Let's talk." },
            { name: 'contactDescription', type: 'textarea' },
          ],
        },
        {
          label: 'Socials',
          fields: [
            { name: 'email', type: 'email', required: true },
            { name: 'website', type: 'text' },
            { name: 'github', type: 'text' },
            { name: 'twitter', type: 'text' },
          ],
        },
      ],
    },
  ],
}
