import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  discord,
} from "../assets";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Discord Bot Developer",
    icon: mobile,
  },
  {
    title: "Content Creator",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Bot Developer",
    company_name: "Discord",
    icon: discord,
    iconBg: "#383E56",
    date: "Q1 2019 - Present",
    points: [
      "Developing and maintaining discord bots using discord.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive & readable code.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Vapor is a great addition to the team, I can trust that the work he produces is done to a high standard. Customer Service is on point!",
    name: "NP",
    designation: "CEO",
    company: "Resolv",
    image:
      "https://cdn.discordapp.com/avatars/887296580955283537/a_835f4f17d8dc5028aaf4662e2c9f2dc9.webp?size=80",
  },
  {
    testimonial:
      "I try to work hard to achieve the best work possible. I put my heart and soul into my work.",
    name: "Vapor",
    designation: "CEO",
    company: "Vapor Development",
    image:
      "https://cdn.discordapp.com/avatars/501700626690998280/a_cbb7036dc635697ffeb9520970dd8f27.gif?size=80",
  },
  {
    testimonial:
      "You're efficient and hard working, you literally don't give up until its done. You're the most stubborn person I've met when it comes to getting the job done.",
    name: "Vampy",
    designation: "Developer",
    company: "Resolv",
    image:
      "https://cdn.discordapp.com/avatars/330528293843632130/ec22be68549dbfdc4d3fa22619d2a778.webp?size=80",
  },
];

const projects = [
  {
    name: "Doubt Bot",
    description:
      "An advanced multi-purpose discord bot designed to make your discord server run more smoothly!",
    tags: [
      {
        name: "discord.js",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
    ],
    image:
      "https://cdn.discordapp.com/icons/833675115408523264/845331e69b03351e3c40bd48938bd469.webp?size=128",
    source_code_link: "https://github.com/zVapor-Dev/Doubt-Discord-Bot",
    invite_link: "https://top.gg/bot/941052587837378570/invite",
  },
  {
    name: "Portfolio",
    description:
      "The portfolio you are currently viewing, built using React, Tailwind CSS and Three.js.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "tailwind.css",
        color: "green-text-gradient",
      },
      {
        name: "three.js",
        color: "pink-text-gradient",
      },
    ],
    image: "https://i.imgur.com/9ZKpiWf.png",
    source_code_link: "https://github.com/zVapor-Dev/portfolio",
    invite_link: "https://www.zvapor.xyz",
  },
];

export { services, technologies, experiences, testimonials, projects };
