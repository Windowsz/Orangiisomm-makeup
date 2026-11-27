export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth'
import { saveMedia } from '@/lib/media'

export async function POST(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value
  if (!token || !(await verifySessionToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let file: FormDataEntryValue | null
  try {
    const form = await req.formData()
    file = form.get('file')
  } catch {
    return NextResponse.json({ error: 'อ่านไฟล์ไม่ได้' }, { status: 400 })
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'ไม่ได้แนบไฟล์' }, { status: 400 })
  }

  const bytes = Buffer.from(await file.arrayBuffer())
  try {
    const url = await saveMedia(randomUUID(), bytes)
    return NextResponse.json({ url })
  } catch {
    return NextResponse.json({ error: 'ใช้ไฟล์ JPG, PNG หรือ WEBP ที่ไม่เกิน 4MB' }, { status: 400 })
  }
}
