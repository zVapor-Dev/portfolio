import { NextRequest, NextResponse } from 'next/server'

import { contactSchema } from '@/lib/contactSchema'
import { isSmtpConfigured, sendContactEmail } from '@/lib/email'
import {
  checkContactRateLimit,
  getClientIp,
  rateLimitResponseHeaders,
} from '@/lib/rateLimit'

export async function POST(req: NextRequest) {
  if (!isSmtpConfigured()) {
    return NextResponse.json(
      { error: 'SMTP is not configured on this deployment.' },
      { status: 503 },
    )
  }

  try {
    const body = await req.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? 'Invalid request body.'
      return NextResponse.json({ error: message }, { status: 400 })
    }

    const { name, email, message } = parsed.data
    const clientIp = getClientIp(req)
    const normalizedEmail = email.toLowerCase()

    const rateLimit = await checkContactRateLimit([
      `contact:${clientIp}`,
      `contact:email:${normalizedEmail}`,
    ])

    const rateHeaders = rateLimitResponseHeaders(rateLimit)

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many contact requests. Please try again later.' },
        { status: 429, headers: rateHeaders },
      )
    }

    const result = await sendContactEmail({ name, email, message })

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { headers: rateHeaders })
  } catch {
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
  }
}
