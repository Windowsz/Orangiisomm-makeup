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
  qrImageUrl?: string
  qrCaption?: string
  qrSize?: number   // width/height in px, default 112
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

export interface ContactCard {
  id: string
  label: string
  value: string
  href: string
  icon: 'line' | 'phone' | 'facebook' | 'instagram' | 'custom'
}

export interface ContactContent {
  headline: string
  body: string
  ctaText: string
  stats: [StatItem, StatItem, StatItem]
  cards: ContactCard[]
}

export interface SocialContent {
  html: string
}

export interface SectionStyle {
  bgCss?: string   // raw CSS applied to the section, e.g. "background: linear-gradient(...)"
}

export interface SectionStyles {
  hero: SectionStyle
  gallery: SectionStyle
  social: SectionStyle
  pricing: SectionStyle
  aboutContact: SectionStyle
}

export interface GallerySettings {
  mode: 'grid' | 'carousel'
  autoPlay: boolean
  interval: number
}

export interface PricingCard {
  id: string
  title: string
  price: string
  priceNote?: string
  description?: string
  features: string[]
  highlighted?: boolean
  ctaText?: string
  ctaHref?: string
}

export interface PricingContent {
  headline: string
  subheadline?: string
  cards: PricingCard[]
}

export interface SiteContent {
  hero: HeroContent
  about: AboutContent
  contact: ContactContent
  social: SocialContent
  gallery: GalleryImage[]
  gallerySettings: GallerySettings
  pricing: PricingContent
  sectionStyles: SectionStyles
  updatedAt: string
}
