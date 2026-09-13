import type { PayloadRequest } from 'payload'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import { isSafeRedirectPath } from '@/lib/safeRedirect'

import config from '@payload-config'

export async function GET(req: NextRequest): Promise<Response> {
  const payload = await getPayload({ config })
  const { searchParams } = new URL(req.url)

  const path = searchParams.get('path') || '/'
  const previewSecret = searchParams.get('previewSecret')

  if (!isSafeRedirectPath(path)) {
    return new Response('Invalid preview path', { status: 400 })
  }

  if (previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  let user
  try {
    const authResult = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers,
    })
    user = authResult.user
  } catch {
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  const draft = await draftMode()

  if (!user) {
    draft.disable()
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  draft.enable()
  redirect(path)
}
