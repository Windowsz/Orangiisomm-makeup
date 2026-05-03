import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { kv } from '@vercel/kv'

const SESSION_COOKIE = 'admin_session'
const EXPIRY = '8h'
const CREDENTIALS_KEY = 'admin_credentials'

interface AdminCredentials {
  username: string
  passwordHash: string
}

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not set')
  return new TextEncoder().encode(secret)
}

export async function getAdminCredentials(): Promise<AdminCredentials> {
  try {
    const stored = await kv.get<AdminCredentials>(CREDENTIALS_KEY)
    if (stored?.username && stored?.passwordHash) return stored
  } catch {
    // fall through to env vars
  }
  return {
    username: process.env.ADMIN_USERNAME,
    passwordHash: process.env.ADMIN_PASSWORD_HASH ?? '',
  }
}

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const creds = await getAdminCredentials()
  if (username !== creds.username) return false
  if (!creds.passwordHash) return false
  return bcrypt.compare(password, creds.passwordHash)
}

export async function updateCredentials(username: string, passwordHash: string): Promise<void> {
  await kv.set(CREDENTIALS_KEY, { username, passwordHash })
}

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12)
}

export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(EXPIRY)
    .sign(getSecret())
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecret())
    return true
  } catch {
    return false
  }
}

export { SESSION_COOKIE }
