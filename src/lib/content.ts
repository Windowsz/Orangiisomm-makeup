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

// Merge stored data with file defaults — fills in any fields added after initial deploy
function mergeWithDefaults(stored: Partial<SiteContent>, defaults: SiteContent): SiteContent {
  return {
    hero:      { ...defaults.hero,    ...(stored.hero    ?? {}) },
    about:     { ...defaults.about,   ...(stored.about   ?? {}) },
    contact:   { ...defaults.contact, ...(stored.contact ?? {}) },
    gallery:   stored.gallery ?? defaults.gallery,
    updatedAt: stored.updatedAt ?? defaults.updatedAt,
  }
}

export async function readContent(): Promise<SiteContent> {
  try {
    const defaults = readFromFile()
    const stored = await kv.get<Partial<SiteContent>>(CONTENT_KEY)

    if (!stored) {
      // KV is empty — seed with defaults
      await kv.set(CONTENT_KEY, defaults)
      return defaults
    }

    // Merge so any newly added fields (e.g. contact) are never undefined
    const merged = mergeWithDefaults(stored, defaults)

    // If we added new fields, persist the merged version back to KV
    if (!stored.contact) {
      await kv.set(CONTENT_KEY, merged)
    }

    return merged
  } catch {
    // KV not configured (local dev) — use filesystem
    return readFromFile()
  }
}

export async function writeContent(content: SiteContent): Promise<void> {
  await kv.set(CONTENT_KEY, content)
}
