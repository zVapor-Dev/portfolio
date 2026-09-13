import { NextRequest, NextResponse } from 'next/server'

import { isSmtpConfigured, sendContactEmail } from '@/lib/email'
import { checkRateLimit, getClientIp } from '@/lib/rateLimit'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  if (!isSmtpConfigured()) {
    return NextResponse.json(
      { error: 'SMTP is not configured on this deployment.' },
      { status: 503 },
    )
  }

  const clientIp = getClientIp(req)
  const rateLimit = checkRateLimit(`contact:${clientIp}`)

  if (!rateLimit.allowed) {
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((rateLimit.resetAt - Date.now()) / 1000),
    )

    return NextResponse.json(
      { error: 'Too many contact requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfterSeconds),
        },
      },
    )
  }

  try {
    const body = await req.json()
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const result = await sendContactEmail({ name, email, message })

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
  }
}
