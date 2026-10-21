import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms & Privacy — zVapor_',
  description:
    'Terms of use and privacy policy for zvapor.xyz, the portfolio of Daan Vrieling (zVapor_).',
}

const UPDATED = '21 October 2026'

export default function LegalPage() {
  return (
    <>
      <header className="fixed top-0 z-50 w-full border-b border-white/[0.06] bg-vapor-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="zVapor logo" width={32} height={32} />
            <span className="font-display text-lg font-semibold text-white">
              zVapor_
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-vapor-muted transition-colors hover:text-vapor-cyan"
          >
            Back to site
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-3xl px-5 pb-20 pt-28 sm:px-8">
        <p className="section-label">Legal</p>
        <h1 className="section-title mt-3">Terms & privacy</h1>
        <p className="mt-4 text-sm text-vapor-muted">
          Last updated {UPDATED}. This page covers{' '}
          <a href="https://www.zvapor.xyz" className="text-vapor-cyan">
            zvapor.xyz
          </a>
          , the personal portfolio of Daan Vrieling (zVapor_).
        </p>

        <nav className="mt-8 flex flex-wrap gap-3">
          <a href="#privacy" className="btn-ghost !px-4 !py-2 text-xs">
            Privacy policy
          </a>
          <a href="#terms" className="btn-ghost !px-4 !py-2 text-xs">
            Terms of use
          </a>
        </nav>

        <div className="mt-14 space-y-14">
          <section id="privacy" className="scroll-mt-28">
            <h2 className="font-display text-2xl font-semibold text-white">
              Privacy policy
            </h2>
            <div className="mt-6 space-y-8 text-sm leading-relaxed text-vapor-muted">
              <Block title="Who I am">
                <p>
                  The site is operated by Daan Vrieling, based in the
                  Netherlands. For privacy questions, email{' '}
                  <a
                    href="mailto:contact@zvapor.xyz"
                    className="text-vapor-cyan"
                  >
                    contact@zvapor.xyz
                  </a>
                  .
                </p>
              </Block>

              <Block title="What I collect">
                <p>I only collect information needed to run this site.</p>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li>
                    <strong className="font-medium text-white">
                      Contact form.
                    </strong>{' '}
                    If you send a message, I receive your name, email address,
                    and message. That content is emailed to me. It is not saved
                    in the website database.
                  </li>
                  <li>
                    <strong className="font-medium text-white">
                      Abuse prevention.
                    </strong>{' '}
                    The contact form is rate limited. Your IP address and email
                    address are used as short-lived keys so the form cannot be
                    flooded. Those keys expire after the limit window (one hour
                    by default).
                  </li>
                  <li>
                    <strong className="font-medium text-white">
                      Hosting logs.
                    </strong>{' '}
                    The site runs on my own server in Finland, behind
                    Cloudflare. Cloudflare and the server may log requests,
                    including IP address and user agent, to operate and secure
                    the site.
                  </li>
                </ul>
              </Block>

              <Block title="Cookies">
                <p>
                  The public site does not set marketing, analytics or account
                  cookies.
                  Signing in to the CMS at{' '}
                  <span className="font-mono text-xs text-white">/admin</span>{' '}
                  sets a session cookie for that login only. Visitors do not
                  need an account to read the site or use the contact form.
                </p>
              </Block>

              <Block title="Why I use it">
                <p>
                  I process contact details so I can reply to you. I process IP
                  addresses and rate-limit keys to keep the form usable, and
                  request logs to keep the site running and secure.
                  Under the GDPR, that is based on steps you take when you ask
                  me to contact you, and on my legitimate interest in running
                  and protecting the site.
                </p>
              </Block>

              <Block title="Who else sees it">
                <p>I use a few processors to host and deliver the site:</p>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li>
                    Cloudflare — DNS, delivery and protection of the site.
                  </li>
                  <li>
                    The site mail server — delivery of contact-form messages.
                  </li>
                  <li>
                    Upstash — short-lived rate-limit keys, when that service is
                    configured. Otherwise those keys stay in server memory and
                    are discarded when the server restarts.
                  </li>
                </ul>
                <p className="mt-3">
                  Some project images load from GitHub or Imgur. Those services
                  receive your IP address when your browser requests the image.
                  Links to GitHub, X, npm, and other sites are third parties
                  with their own policies.
                </p>
                <p className="mt-3">
                  Some of these providers are outside the European Economic
                  Area. Where they transfer personal data, they do so under
                  their own safeguards, such as standard contractual clauses.
                </p>
              </Block>

              <Block title="How long I keep it">
                <p>
                  I keep contact emails for as long as I need them to handle
                  your message and any follow-up, then delete them. Rate-limit
                  keys expire automatically with the limit window. Request logs
                  are kept according to Cloudflare’s and the server’s retention
                  periods.
                </p>
              </Block>

              <Block title="Your rights">
                <p>
                  If you are in the EEA or UK, you can ask for access,
                  correction, deletion, or a copy of your personal data, and
                  you can object to or restrict processing based on legitimate
                  interests. Email{' '}
                  <a
                    href="mailto:contact@zvapor.xyz"
                    className="text-vapor-cyan"
                  >
                    contact@zvapor.xyz
                  </a>
                  . You can also lodge a complaint with the Dutch data
                  protection authority, the{' '}
                  <a
                    href="https://www.autoriteitpersoonsgegevens.nl"
                    className="text-vapor-cyan"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Autoriteit Persoonsgegevens
                  </a>
                  .
                </p>
              </Block>

              <Block title="Children">
                <p>
                  This site is not directed at children, and I do not knowingly
                  collect personal data from anyone under 16.
                </p>
              </Block>
            </div>
          </section>

          <section id="terms" className="scroll-mt-28 border-t border-white/[0.06] pt-14">
            <h2 className="font-display text-2xl font-semibold text-white">
              Terms of use
            </h2>
            <div className="mt-6 space-y-8 text-sm leading-relaxed text-vapor-muted">
              <Block title="Using the site">
                <p>
                  You can browse this portfolio for personal, non-commercial
                  use. Do not misuse it: no attempts to break, scrape in a way
                  that degrades the service, or interfere with the contact form
                  or the CMS.
                </p>
              </Block>

              <Block title="Content">
                <p>
                  Text, design, and original project material on this site
                  belong to Daan Vrieling unless a project page says otherwise.
                  You may share links to the site. You may not copy the design
                  or republish the content as your own. Third-party names,
                  logos, and linked projects remain the property of their
                  owners.
                </p>
              </Block>

              <Block title="Contact form">
                <p>
                  Use the form for genuine messages. Do not send unlawful,
                  abusive, or unsolicited bulk messages. I may ignore or block
                  messages that look like spam. Sending a message means I can
                  use the details you provide to reply, as described in the
                  privacy policy.
                </p>
              </Block>

              <Block title="No warranty">
                <p>
                  The site is a personal portfolio. Project descriptions are
                  informational. Nothing here is professional, legal, or
                  technical advice, and nothing creates a client relationship
                  until we agree to one separately. The site is provided as is,
                  without a promise that it will always be available or
                  error-free.
                </p>
              </Block>

              <Block title="Liability">
                <p>
                  To the extent Dutch law allows, I am not liable for damage
                  that comes from using the site, relying on its content, or
                  following a link to another website. This does not limit
                  liability that cannot legally be limited.
                </p>
              </Block>

              <Block title="Law">
                <p>
                  These terms are governed by the laws of the Netherlands. If
                  you and I cannot resolve a dispute, the courts of the
                  Netherlands have jurisdiction, without limiting rights you
                  have as a consumer where you live.
                </p>
              </Block>
            </div>
          </section>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/[0.06] px-5 py-8 text-center sm:px-8">
        <p className="font-mono text-xs text-vapor-muted">
          © {new Date().getFullYear()} Daan Vrieling · zVapor_
        </p>
        <p className="mt-3 flex items-center justify-center gap-4 text-xs">
          <a href="#privacy" className="text-vapor-muted hover:text-vapor-cyan">
            Privacy
          </a>
          <a href="#terms" className="text-vapor-muted hover:text-vapor-cyan">
            Terms
          </a>
        </p>
      </footer>
    </>
  )
}

function Block({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h3 className="font-display text-base font-semibold text-white">
        {title}
      </h3>
      <div className="mt-2">{children}</div>
    </div>
  )
}
