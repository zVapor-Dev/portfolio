export const seedSite = {
  name: 'Daan Vrieling',
  handle: 'zVapor_',
  title: 'Full-Stack Product Engineer',
  location: 'Netherlands',
  headline: 'Building products',
  headlineAccent: 'for the web.',
  heroDescription:
    'Full-Stack Product Engineer based in the Netherlands. I ship full-stack web applications with TypeScript, React, and modern infrastructure — with a background in Discord bot development and community tooling.',
  aboutLabel: 'About',
  aboutTitle: 'Product engineer, not just a template.',
  aboutParagraphs: [
    {
      paragraph:
        "I'm Daan Vrieling (zVapor_) — a full-stack product engineer based in the Netherlands. I build web products end to end: typed APIs, polished interfaces, and deployments that stay maintainable as features grow.",
    },
    {
      paragraph:
        'My work spans modern React frontends, Node backends with Prisma, auth with Clerk, and infrastructure on Vercel and Cloudflare. I care about clear architecture, accessible UI, and shipping things people actually use.',
    },
    {
      paragraph:
        'Before focusing on web, I spent years building Discord bots and community tools — including published open-source packages and bots serving thousands of servers. That background taught me how to ship reliable software under real user pressure.',
    },
  ],
  highlights: [
    { label: 'Focus', value: 'Full-stack web & product engineering' },
    { label: 'Stack', value: 'TypeScript, React, Node, Prisma' },
    { label: 'Deploy', value: 'Vercel, Cloudflare, Docker' },
    { label: 'Background', value: 'Discord bots & community tooling' },
  ],
  experienceLabel: 'Experience',
  experienceTitle: "Where I've built.",
  experienceDescription:
    'A mix of independent product work and long-running community projects — with Discord bot development as an earlier chapter that still informs how I think about reliability and scale.',
  stackLabel: 'Stack',
  stackTitle: 'Tools I reach for.',
  stackDescription:
    'A pragmatic toolkit for shipping typed, deployable web products — from UI components to auth, databases, and edge infrastructure.',
  workLabel: 'Selected work',
  workTitle: 'Projects that shipped.',
  workDescription:
    'A focused set of projects — open-source packages, this portfolio, and production Discord tooling. No filler, no work-in-progress badges.',
  contactLabel: 'Contact',
  contactTitle: "Let's talk.",
  contactDescription:
    'Open to collaborations, freelance work, and interesting product ideas. Drop a message or reach out directly.',
  navLinks: [
    { anchor: 'about', title: 'About' },
    { anchor: 'experience', title: 'Experience' },
    { anchor: 'stack', title: 'Stack' },
    { anchor: 'work', title: 'Work' },
    { anchor: 'contact', title: 'Contact' },
  ],
  email: 'contact@zvapor.xyz',
  website: 'https://www.zvapor.xyz',
  github: 'https://github.com/zVapor-Dev',
  twitter: 'https://twitter.com/zvapor_',
}

export const seedProjects = [
  {
    seedKey: 'commapor',
    title: 'Commapor',
    description:
      'Published npm package (@zvapor-dev/commapor) — a discord.js v14 command handler with MongoDB integration. Modular, type-safe, and built for production bot architectures.',
    tags: [{ tag: 'TypeScript' }, { tag: 'discord.js' }, { tag: 'MongoDB' }, { tag: 'npm' }],
    links: [
      { label: 'GitHub', url: 'https://github.com/zVapor-Dev/Commapor' },
      { label: 'npm', url: 'https://www.npmjs.com/package/@zvapor-dev/commapor' },
    ],
    imageUrl: 'https://opengraph.githubassets.com/1/zVapor-Dev/Commapor',
    order: 1,
    published: true,
  },
  {
    seedKey: 'portfolio',
    title: 'Portfolio',
    description:
      'This site — a Next.js + Payload portfolio with a dark vapor aesthetic, motion accents, and CMS-driven content.',
    tags: [
      { tag: 'Next.js' },
      { tag: 'Payload' },
      { tag: 'Three.js' },
      { tag: 'Tailwind CSS' },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/zVapor-Dev/portfolio' },
      { label: 'Live', url: 'https://www.zvapor.xyz' },
    ],
    imageUrl: 'https://i.imgur.com/9ZKpiWf.png',
    order: 2,
    published: true,
  },
  {
    seedKey: 'doubt-bot',
    title: 'Doubt Bot',
    description:
      'Advanced multi-purpose Discord bot — moderation, automation, and server management tools designed to keep communities running smoothly.',
    tags: [{ tag: 'discord.js' }, { tag: 'Node.js' }, { tag: 'MongoDB' }],
    links: [{ label: 'Invite', url: 'https://top.gg/bot/941052587837378570/invite' }],
    imageUrl:
      'https://cdn.discordapp.com/icons/833675115408523264/845331e69b03351e3c40bd48938bd469.webp?size=256',
    order: 3,
    published: true,
  },
]

export const seedTechnologies = [
  { seedKey: 'typescript', name: 'TypeScript', category: 'language' as const, order: 1 },
  { seedKey: 'react', name: 'React', category: 'frontend' as const, order: 2 },
  { seedKey: 'nodejs', name: 'Node.js', category: 'backend' as const, order: 3 },
  { seedKey: 'prisma', name: 'Prisma', category: 'backend' as const, order: 4 },
  { seedKey: 'tailwind', name: 'Tailwind CSS', category: 'frontend' as const, order: 5 },
  { seedKey: 'shadcn', name: 'shadcn/ui', category: 'frontend' as const, order: 6 },
  { seedKey: 'vercel', name: 'Vercel', category: 'platform' as const, order: 7 },
  { seedKey: 'clerk', name: 'Clerk', category: 'platform' as const, order: 8 },
  { seedKey: 'cloudflare', name: 'Cloudflare', category: 'platform' as const, order: 9 },
  { seedKey: 'mongodb', name: 'MongoDB', category: 'database' as const, order: 10 },
  { seedKey: 'threejs', name: 'Three.js', category: 'frontend' as const, order: 11 },
  { seedKey: 'docker', name: 'Docker', category: 'platform' as const, order: 12 },
]

export const seedExperience = [
  {
    seedKey: 'discord-bot-dev',
    title: 'Bot Developer',
    company: 'Discord Ecosystem',
    date: 'Q1 2019 — Present',
    iconUrl: '/discord.png',
    iconBg: '#5865F2',
    points: [
      {
        point:
          'Built and maintained production Discord bots serving thousands of guilds, using discord.js and MongoDB.',
      },
      {
        point:
          'Shipped Commapor — a published npm package for discord.js v14 command handling with database integration.',
      },
      {
        point:
          'Designed modular architectures for multi-purpose bots with moderation, automation, and custom integrations.',
      },
      {
        point:
          'Collaborated with server owners and communities to scope features, iterate on feedback, and keep bots reliable at scale.',
      },
    ],
    order: 1,
  },
]
