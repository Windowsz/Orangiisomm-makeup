import { kv } from '@vercel/kv'
import { readFileSync } from 'fs'
import path from 'path'
import type { SiteContent } from './types'

const CONTENT_KEY = 'site_content'
const CONTENT_PATH = path.join(process.cwd(), 'data', 'content.json')

function readFromFile(): SiteContent {
  const raw = readFileSync(CONTENT_PATH, 'utf-8')
  return JSON.parse(raw) as SiteContent
}

export async function readContent(): Promise<SiteContent> {
  // In production use Vercel KV; seed from file if KV is empty
  try {
    const data = await kv.get<SiteContent>(CONTENT_KEY)
    if (data) return data

    // KV is empty on first deploy — seed it from the bundled JSON file
    const seed = readFromFile()
    await kv.set(CONTENT_KEY, seed)
    return seed
  } catch {
    // KV not configured (local dev without KV env vars) — use filesystem
    return readFromFile()
  }
}

export async function writeContent(content: SiteContent): Promise<void> {
  await kv.set(CONTENT_KEY, content)
}
