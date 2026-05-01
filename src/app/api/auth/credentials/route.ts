export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import {
  verifySessionToken,
  verifyCredentials,
  getAdminCredentials,
  updateCredentials,
  hashPassword,
  SESSION_COOKIE,
} from '@/lib/auth'

export async function PATCH(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value
  if (!token || !(await verifySessionToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { currentPassword, newUsername, newPassword } = await req.json() as {
      currentPassword?: string
      newUsername?: string
      newPassword?: string
    }

    if (!currentPassword) {
      return NextResponse.json({ error: 'Current password is required' }, { status: 400 })
    }
    if (!newUsername && !newPassword) {
      return NextResponse.json({ error: 'Provide a new username or new password' }, { status: 400 })
    }

    const current = await getAdminCredentials()
    const valid = await verifyCredentials(current.username, currentPassword)
    if (!valid) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 })
    }

    const username = newUsername?.trim() || current.username
    const passwordHash = newPassword ? await hashPassword(newPassword) : current.passwordHash

    if (!username) {
      return NextResponse.json({ error: 'Username cannot be empty' }, { status: 400 })
    }

    await updateCredentials(username, passwordHash)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
