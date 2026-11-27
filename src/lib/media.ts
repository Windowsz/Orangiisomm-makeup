import { kv } from '@vercel/kv'
import { mkdir, readFile, writeFile, unlink } from 'fs/promises'
import path from 'path'

const MAX_BYTES = 4_000_000

export type StoredMedia = {
  contentType: 'image/jpeg' | 'image/png' | 'image/webp'
  data: string
}

const TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const

function key(id: string) {
  return `media:${id}`
}

export function isMediaId(id: string) {
  return /^[0-9a-f-]{36}$/i.test(id)
}

export function sniffImage(bytes: Buffer): StoredMedia['contentType'] | null {
  if (bytes.length < 12 || bytes.length > MAX_BYTES) return null
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg'
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return 'image/png'
  if (bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP') return 'image/webp'
  return null
}

function ext(type: StoredMedia['contentType']) {
  if (type === 'image/png') return 'png'
  if (type === 'image/webp') return 'webp'
  return 'jpg'
}

function uploadPath(id: string, type: StoredMedia['contentType']) {
  return path.join(process.cwd(), 'public', 'uploads', `${id}.${ext(type)}`)
}

export async function saveMedia(id: string, bytes: Buffer): Promise<string> {
  const contentType = sniffImage(bytes)
  if (!contentType || !isMediaId(id) || !TYPES.includes(contentType)) {
    throw new Error('Invalid image')
  }
  const payload: StoredMedia = { contentType, data: bytes.toString('base64') }
  try {
    await kv.set(key(id), payload)
    return `/api/media/${id}`
  } catch {
    const file = uploadPath(id, contentType)
    await mkdir(path.dirname(file), { recursive: true })
    await writeFile(file, bytes)
    return `/uploads/${id}.${ext(contentType)}`
  }
}

export async function readMedia(id: string): Promise<{ bytes: Buffer; contentType: string } | null> {
  if (!isMediaId(id)) return null
  try {
    const stored = await kv.get<StoredMedia>(key(id))
    if (stored?.data && TYPES.includes(stored.contentType)) {
      return { bytes: Buffer.from(stored.data, 'base64'), contentType: stored.contentType }
    }
  } catch {
    // KV is unavailable locally; fall through to the public folder.
  }
  for (const type of TYPES) {
    try {
      const bytes = await readFile(uploadPath(id, type))
      return { bytes, contentType: type }
    } catch {
      // Try the next extension.
    }
  }
  return null
}

export async function deleteMedia(id: string): Promise<void> {
  if (!isMediaId(id)) return
  try {
    await kv.del(key(id))
  } catch {
    // Ignore a missing KV connection.
  }
  await Promise.all(TYPES.map(async type => {
    try {
      await unlink(uploadPath(id, type))
    } catch {
      // The file may live only in KV.
    }
  }))
}

export function mediaIdFromUrl(url: string): string | null {
  const api = url.match(/^\/api\/media\/([0-9a-f-]{36})$/i)
  if (api) return api[1]
  const file = url.match(/^\/uploads\/([0-9a-f-]{36})\.(?:jpg|png|webp)$/i)
  return file ? file[1] : null
}
