import nodemailer from 'nodemailer'

export type ContactPayload = {
  name: string
  email: string
  message: string
}

export function isSmtpConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASSWORD &&
      process.env.CONTACT_TO,
  )
}

export async function sendContactEmail(data: ContactPayload) {
  if (!isSmtpConfigured()) {
    return {
      ok: false,
      error: 'SMTP is not configured. Set SMTP_PASSWORD and related env vars.',
    }
  }

  const port = Number(process.env.SMTP_PORT || 587)
  const secure = process.env.SMTP_SECURE === 'true'

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  const from = process.env.SMTP_FROM || process.env.SMTP_USER
  const to = process.env.CONTACT_TO!

  await transporter.sendMail({
    from,
    to,
    replyTo: data.email,
    subject: `Portfolio contact from ${data.name}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
    html: `<p><strong>Name:</strong> ${data.name}</p><p><strong>Email:</strong> ${data.email}</p><p>${data.message}</p>`,
  })

  return { ok: true }
}
