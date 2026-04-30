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

export interface SiteContent {
  hero: HeroContent
  about: AboutContent
  gallery: GalleryImage[]
  updatedAt: string
}
