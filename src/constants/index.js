import { discord } from "../assets";

export const site = {
  name: "Daan Vrieling",
  handle: "zVapor_",
  title: "Full-Stack Product Engineer",
  location: "Netherlands",
  email: "contact@zvapor.xyz",
  website: "https://www.zvapor.xyz",
  github: "https://github.com/zVapor-Dev",
  twitter: "https://twitter.com/zvapor_",
};

export const navLinks = [
  { id: "about", title: "About" },
  { id: "experience", title: "Experience" },
  { id: "stack", title: "Stack" },
  { id: "work", title: "Work" },
  { id: "contact", title: "Contact" },
];

export const technologies = [
  { name: "TypeScript", category: "language" },
  { name: "React", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "Prisma", category: "backend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "shadcn/ui", category: "frontend" },
  { name: "Vercel", category: "platform" },
  { name: "Clerk", category: "platform" },
  { name: "Cloudflare", category: "platform" },
  { name: "MongoDB", category: "database" },
  { name: "Three.js", category: "frontend" },
  { name: "Docker", category: "platform" },
];

export const experiences = [
  {
    title: "Bot Developer",
    company: "Discord Ecosystem",
    date: "Q1 2019 — Present",
    icon: discord,
    iconBg: "#5865F2",
    points: [
      "Built and maintained production Discord bots serving thousands of guilds, using discord.js and MongoDB.",
      "Shipped Commapor — a published npm package for discord.js v14 command handling with database integration.",
      "Designed modular architectures for multi-purpose bots with moderation, automation, and custom integrations.",
      "Collaborated with server owners and communities to scope features, iterate on feedback, and keep bots reliable at scale.",
    ],
  },
];

export const projects = [
  {
    name: "Commapor",
    description:
      "Published npm package (@zvapor-dev/commapor) — a discord.js v14 command handler with MongoDB integration. Modular, type-safe, and built for production bot architectures.",
    tags: ["TypeScript", "discord.js", "MongoDB", "npm"],
    image:
      "https://opengraph.githubassets.com/1/zVapor-Dev/Commapor",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/zVapor-Dev/Commapor",
      },
      {
        label: "npm",
        url: "https://www.npmjs.com/package/@zvapor-dev/commapor",
      },
    ],
  },
  {
    name: "Portfolio",
    description:
      "This site — a Vite + React portfolio with a dark vapor aesthetic, motion accents, and a focus on product engineering over template filler.",
    tags: ["React", "Vite", "Three.js", "Tailwind CSS"],
    image: "https://i.imgur.com/9ZKpiWf.png",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/zVapor-Dev/portfolio",
      },
      {
        label: "Live",
        url: "https://www.zvapor.xyz",
      },
    ],
  },
  {
    name: "Doubt Bot",
    description:
      "Advanced multi-purpose Discord bot — moderation, automation, and server management tools designed to keep communities running smoothly.",
    tags: ["discord.js", "Node.js", "MongoDB"],
    image:
      "https://cdn.discordapp.com/icons/833675115408523264/845331e69b03351e3c40bd48938bd469.webp?size=256",
    links: [
      {
        label: "Invite",
        url: "https://top.gg/bot/941052587837378570/invite",
      },
    ],
  },
];
