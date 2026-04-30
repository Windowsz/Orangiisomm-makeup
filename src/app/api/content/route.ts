export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import { readContent, writeContent } from '@/lib/content'
import { verifySessionToken, SESSION_COOKIE } from '@/lib/auth'
import type { SiteContent } from '@/lib/types'

export async function GET() {
  try {
    const content = await readContent()
    return NextResponse.json(content)
  } catch {
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value
  if (!token || !(await verifySessionToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const patch = await req.json() as Partial<SiteContent>
    const current = await readContent()

    const updated: SiteContent = {
      hero:      patch.hero      ? { ...current.hero,  ...patch.hero }  : current.hero,
      about:     patch.about     ? { ...current.about, ...patch.about } : current.about,
      gallery:   patch.gallery   !== undefined ? patch.gallery          : current.gallery,
      updatedAt: new Date().toISOString(),
    }

    await writeContent(updated)
    return NextResponse.json({ ok: true, content: updated })
  } catch {
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
  }
}
