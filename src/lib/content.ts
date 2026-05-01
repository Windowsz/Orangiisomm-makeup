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

function mergeWithDefaults(stored: Partial<SiteContent>, defaults: SiteContent): SiteContent {
  return {
    hero:      { ...defaults.hero,    ...(stored.hero    ?? {}) },
    about:     { ...defaults.about,   ...(stored.about   ?? {}) },
    contact: {
      ...defaults.contact,
      ...(stored.contact ?? {}),
      // ensure cards array always exists
      cards: (stored.contact as SiteContent['contact'] | undefined)?.cards ?? defaults.contact.cards,
      stats: (stored.contact as SiteContent['contact'] | undefined)?.stats ?? defaults.contact.stats,
    },
    gallery:         stored.gallery         ?? defaults.gallery,
    gallerySettings: stored.gallerySettings ? { ...defaults.gallerySettings, ...stored.gallerySettings } : defaults.gallerySettings,
    pricing:         stored.pricing         ?? defaults.pricing,
    sectionStyles:   stored.sectionStyles   ? {
      hero:         { ...defaults.sectionStyles.hero,         ...(stored.sectionStyles.hero         ?? {}) },
      gallery:      { ...defaults.sectionStyles.gallery,      ...(stored.sectionStyles.gallery      ?? {}) },
      facebook:     { ...defaults.sectionStyles.facebook,     ...(stored.sectionStyles.facebook     ?? {}) },
      aboutContact: { ...defaults.sectionStyles.aboutContact, ...(stored.sectionStyles.aboutContact ?? {}) },
      pricing:      { ...defaults.sectionStyles.pricing,      ...(stored.sectionStyles.pricing      ?? {}) },
    } : defaults.sectionStyles,
    updatedAt: stored.updatedAt ?? defaults.updatedAt,
  }
}

function needsUpdate(stored: Partial<SiteContent>): boolean {
  return !stored.contact?.cards || !stored.gallerySettings || !stored.sectionStyles || !stored.pricing
}

export async function readContent(): Promise<SiteContent> {
  try {
    const defaults = readFromFile()
    const stored = await kv.get<Partial<SiteContent>>(CONTENT_KEY)

    if (!stored) {
      await kv.set(CONTENT_KEY, defaults)
      return defaults
    }

    const merged = mergeWithDefaults(stored, defaults)

    if (needsUpdate(stored)) {
      await kv.set(CONTENT_KEY, merged)
    }

    return merged
  } catch {
    return readFromFile()
  }
}

export async function writeContent(content: SiteContent): Promise<void> {
  await kv.set(CONTENT_KEY, content)
}
