import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Tech from '@/components/Tech'
import Works from '@/components/Works'
import Contact from '@/components/Contact'
import { getPortfolioContent } from '@/lib/content'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const content = await getPortfolioContent()

  return (
    <>
      <Navbar navLinks={content.navLinks} site={content.site} />
      <Hero site={content.site} />
      <About site={content.site} />
      <Experience experience={content.experience} site={content.site} />
      <Tech technologies={content.technologies} site={content.site} />
      <Works projects={content.projects} site={content.site} />
      <Contact site={content.site} />
      <footer className="relative z-10 border-t border-white/[0.06] px-5 py-8 text-center sm:px-8 lg:px-12">
        <p className="font-mono text-xs text-vapor-muted">
          © {new Date().getFullYear()} {content.site.name} · {content.site.handle}
        </p>
      </footer>
    </>
  )
}
