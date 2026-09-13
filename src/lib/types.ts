export type NavLink = { id: string; title: string }

export type SiteContent = {
  name: string
  handle: string
  title: string
  location: string
  headline: string
  headlineAccent: string
  heroDescription: string
  aboutLabel: string
  aboutTitle: string
  aboutParagraphs: string[]
  highlights: { label: string; value: string }[]
  experienceLabel: string
  experienceTitle: string
  experienceDescription: string
  stackLabel: string
  stackTitle: string
  stackDescription: string
  workLabel: string
  workTitle: string
  workDescription: string
  contactLabel: string
  contactTitle: string
  contactDescription: string
  email: string
  website: string
  github: string
  twitter: string
}

export type ProjectContent = {
  id: string
  title: string
  description: string
  tags: string[]
  imageUrl: string
  links: { label: string; url: string }[]
  order: number
}

export type TechnologyContent = {
  id: string
  name: string
  category: string
  order: number
}

export type ExperienceContent = {
  id: string
  title: string
  company: string
  date: string
  iconUrl: string
  iconBg: string
  points: string[]
  order: number
}

export type PortfolioContent = {
  site: SiteContent
  projects: ProjectContent[]
  technologies: TechnologyContent[]
  experience: ExperienceContent[]
  navLinks: NavLink[]
}
