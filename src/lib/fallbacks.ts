import type { PortfolioContent } from './types'

export const fallbackContent: PortfolioContent = {
  site: {
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
      "I'm Daan Vrieling (zVapor_) — a full-stack product engineer based in the Netherlands. I build web products end to end: typed APIs, polished interfaces, and deployments that stay maintainable as features grow.",
      'My work spans modern React frontends, Node backends with Prisma, auth with Clerk, and infrastructure on Vercel and Cloudflare. I care about clear architecture, accessible UI, and shipping things people actually use.',
      'Before focusing on web, I spent years building Discord bots and community tools — including published open-source packages and bots serving thousands of servers. That background taught me how to ship reliable software under real user pressure.',
    ],
    highlights: [
      { label: 'Focus', value: 'Full-stack web & product engineering' },
      { label: 'Stack', value: 'TypeScript, React, Node, Prisma' },
      { label: 'Deploy', value: 'Vercel, Cloudflare, Docker' },
      { label: 'Background', value: 'Discord bots & community tooling' },
    ],
    contactLabel: 'Contact',
    contactTitle: "Let's talk.",
    contactDescription:
      'Open to collaborations, freelance work, and interesting product ideas. Drop a message or reach out directly.',
    email: 'contact@zvapor.xyz',
    website: 'https://www.zvapor.xyz',
    github: 'https://github.com/zVapor-Dev',
    twitter: 'https://twitter.com/zvapor_',
  },
  projects: [
    {
      id: 'commapor',
      title: 'Commapor',
      description:
        'Published npm package (@zvapor-dev/commapor) — a discord.js v14 command handler with MongoDB integration. Modular, type-safe, and built for production bot architectures.',
      tags: ['TypeScript', 'discord.js', 'MongoDB', 'npm'],
      imageUrl: 'https://opengraph.githubassets.com/1/zVapor-Dev/Commapor',
      links: [
        { label: 'GitHub', url: 'https://github.com/zVapor-Dev/Commapor' },
        { label: 'npm', url: 'https://www.npmjs.com/package/@zvapor-dev/commapor' },
      ],
      order: 1,
    },
    {
      id: 'portfolio',
      title: 'Portfolio',
      description:
        'This site — a Next.js + Payload portfolio with a dark vapor aesthetic, motion accents, and CMS-driven content.',
      tags: ['Next.js', 'Payload', 'Three.js', 'Tailwind CSS'],
      imageUrl: 'https://i.imgur.com/9ZKpiWf.png',
      links: [
        { label: 'GitHub', url: 'https://github.com/zVapor-Dev/portfolio' },
        { label: 'Live', url: 'https://www.zvapor.xyz' },
      ],
      order: 2,
    },
    {
      id: 'doubt-bot',
      title: 'Doubt Bot',
      description:
        'Advanced multi-purpose Discord bot — moderation, automation, and server management tools designed to keep communities running smoothly.',
      tags: ['discord.js', 'Node.js', 'MongoDB'],
      imageUrl:
        'https://cdn.discordapp.com/icons/833675115408523264/845331e69b03351e3c40bd48938bd469.webp?size=256',
      links: [
        { label: 'Invite', url: 'https://top.gg/bot/941052587837378570/invite' },
      ],
      order: 3,
    },
  ],
  technologies: [
    { id: 'ts', name: 'TypeScript', category: 'language', order: 1 },
    { id: 'react', name: 'React', category: 'frontend', order: 2 },
    { id: 'node', name: 'Node.js', category: 'backend', order: 3 },
    { id: 'prisma', name: 'Prisma', category: 'backend', order: 4 },
    { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', order: 5 },
    { id: 'shadcn', name: 'shadcn/ui', category: 'frontend', order: 6 },
    { id: 'vercel', name: 'Vercel', category: 'platform', order: 7 },
    { id: 'clerk', name: 'Clerk', category: 'platform', order: 8 },
    { id: 'cloudflare', name: 'Cloudflare', category: 'platform', order: 9 },
    { id: 'mongo', name: 'MongoDB', category: 'database', order: 10 },
    { id: 'three', name: 'Three.js', category: 'frontend', order: 11 },
    { id: 'docker', name: 'Docker', category: 'platform', order: 12 },
  ],
  experience: [
    {
      id: 'discord-bot-dev',
      title: 'Bot Developer',
      company: 'Discord Ecosystem',
      date: 'Q1 2019 — Present',
      iconUrl: '/discord.png',
      iconBg: '#5865F2',
      points: [
        'Built and maintained production Discord bots serving thousands of guilds, using discord.js and MongoDB.',
        'Shipped Commapor — a published npm package for discord.js v14 command handling with database integration.',
        'Designed modular architectures for multi-purpose bots with moderation, automation, and custom integrations.',
        'Collaborated with server owners and communities to scope features, iterate on feedback, and keep bots reliable at scale.',
      ],
      order: 1,
    },
  ],
  navLinks: [
    { id: 'about', title: 'About' },
    { id: 'experience', title: 'Experience' },
    { id: 'stack', title: 'Stack' },
    { id: 'work', title: 'Work' },
    { id: 'contact', title: 'Contact' },
  ],
}
