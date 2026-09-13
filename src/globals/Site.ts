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
          label: 'Experience',
          fields: [
            { name: 'experienceLabel', type: 'text', defaultValue: 'Experience' },
            { name: 'experienceTitle', type: 'text', defaultValue: "Where I've built." },
            {
              name: 'experienceDescription',
              type: 'textarea',
              defaultValue:
                'A mix of independent product work and long-running community projects — with Discord bot development as an earlier chapter that still informs how I think about reliability and scale.',
            },
          ],
        },
        {
          label: 'Stack',
          fields: [
            { name: 'stackLabel', type: 'text', defaultValue: 'Stack' },
            { name: 'stackTitle', type: 'text', defaultValue: 'Tools I reach for.' },
            {
              name: 'stackDescription',
              type: 'textarea',
              defaultValue:
                'A pragmatic toolkit for shipping typed, deployable web products — from UI components to auth, databases, and edge infrastructure.',
            },
          ],
        },
        {
          label: 'Work',
          fields: [
            { name: 'workLabel', type: 'text', defaultValue: 'Selected work' },
            { name: 'workTitle', type: 'text', defaultValue: 'Projects that shipped.' },
            {
              name: 'workDescription',
              type: 'textarea',
              defaultValue:
                'A focused set of projects — open-source packages, this portfolio, and production Discord tooling. No filler, no work-in-progress badges.',
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
          label: 'Navigation',
          fields: [
            {
              name: 'navLinks',
              type: 'array',
              fields: [
                { name: 'anchor', type: 'text', required: true },
                { name: 'title', type: 'text', required: true },
              ],
            },
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
