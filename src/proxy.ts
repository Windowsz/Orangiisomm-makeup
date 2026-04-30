import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function proxy(req: NextRequest) {
  const token = req.cookies.get('admin_session')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  try {
    const secret = process.env.ADMIN_SESSION_SECRET
    if (!secret) throw new Error('No secret')
    await jwtVerify(token, new TextEncoder().encode(secret))
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/admin', req.url))
  }
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
}
