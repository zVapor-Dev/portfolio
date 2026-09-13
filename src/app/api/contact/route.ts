import { NextRequest, NextResponse } from 'next/server'

import { isSmtpConfigured, sendContactEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  if (!isSmtpConfigured()) {
    return NextResponse.json(
      { error: 'SMTP is not configured on this deployment.' },
      { status: 503 },
    )
  }

  try {
    const body = await req.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
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
