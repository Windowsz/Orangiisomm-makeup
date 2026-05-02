import { kv } from '@vercel/kv'
import { readFileSync } from 'fs'
import path from 'path'
import type { SiteContent, SectionStyle } from './types'

const CONTENT_KEY = 'site_content'
const CONTENT_PATH = path.join(process.cwd(), 'data', 'content.json')

function readFromFile(): SiteContent {
  const raw = readFileSync(CONTENT_PATH, 'utf-8')
  return JSON.parse(raw) as SiteContent
}

// Migrate a stored SectionStyle from old format ({ bgColor, bgImageUrl }) to new ({ bgCss })
function migrateSectionStyle(s: Record<string, unknown> | undefined, def: SectionStyle): SectionStyle {
  if (!s) return def
  if (s.bgCss !== undefined) return { bgCss: s.bgCss as string }
  // Old format — convert to CSS string
  const bgColor = (s.bgColor as string) || ''
  const bgImageUrl = (s.bgImageUrl as string) || ''
  if (bgImageUrl) {
    const base = `background-image: url(${bgImageUrl}); background-size: cover; background-position: center;`
    return { bgCss: bgColor ? `${base} background-color: ${bgColor};` : base }
  }
  if (bgColor) return { bgCss: `background-color: ${bgColor};` }
  return { bgCss: '' }
}

function mergeWithDefaults(stored: Partial<SiteContent>, defaults: SiteContent): SiteContent {
  const storedStyles = stored.sectionStyles as Record<string, Record<string, unknown>> | undefined
  // Support migration from old key name "facebook" → "social"
  const storedSocial = storedStyles?.social ?? storedStyles?.facebook

  return {
    hero:    { ...defaults.hero,  ...(stored.hero  ?? {}), qrSize: (stored.hero as SiteContent['hero'] | undefined)?.qrSize ?? defaults.hero.qrSize },
    about:   { ...defaults.about, ...(stored.about ?? {}) },
    contact: {
      ...defaults.contact,
      ...(stored.contact ?? {}),
      cards: (stored.contact as SiteContent['contact'] | undefined)?.cards ?? defaults.contact.cards,
      stats: (stored.contact as SiteContent['contact'] | undefined)?.stats ?? defaults.contact.stats,
    },
    social:          stored.social          ?? defaults.social,
    gallery:         stored.gallery         ?? defaults.gallery,
    gallerySettings: stored.gallerySettings ? { ...defaults.gallerySettings, ...stored.gallerySettings } : defaults.gallerySettings,
    pricing:         stored.pricing         ?? defaults.pricing,
    sectionStyles: {
      hero:         migrateSectionStyle(storedStyles?.hero,         defaults.sectionStyles.hero),
      gallery:      migrateSectionStyle(storedStyles?.gallery,      defaults.sectionStyles.gallery),
      social:       migrateSectionStyle(storedSocial,               defaults.sectionStyles.social),
      pricing:      migrateSectionStyle(storedStyles?.pricing,      defaults.sectionStyles.pricing),
      aboutContact: migrateSectionStyle(storedStyles?.aboutContact, defaults.sectionStyles.aboutContact),
    },
    updatedAt: stored.updatedAt ?? defaults.updatedAt,
  }
}

function needsUpdate(stored: Partial<SiteContent>): boolean {
  return (
    !stored.contact?.cards  ||
    !stored.gallerySettings ||
    !stored.sectionStyles   ||
    !stored.pricing         ||
    !stored.social
  )
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
