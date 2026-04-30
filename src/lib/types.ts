export interface GalleryImage {
  id: string
  url: string
  alt: string
  caption?: string
}

export interface HeroContent {
  headline: string
  subheadline: string
  ctaText: string
  ctaLink: string
}

export interface AboutContent {
  title: string
  body: string
  imageUrl?: string
}

export interface StatItem {
  value: string
  label: string
}

export interface ContactContent {
  headline: string
  body: string
  ctaText: string
  stats: [StatItem, StatItem, StatItem]
}

export interface SiteContent {
  hero: HeroContent
  about: AboutContent
  contact: ContactContent
  gallery: GalleryImage[]
  updatedAt: string
}
