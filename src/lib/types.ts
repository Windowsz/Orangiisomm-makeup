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
  label: string   // e.g. "Line", "โทรศัพท์"
  value: string   // display text e.g. "@orangiisomm", "083-437-5181"
  href: string    // actual link e.g. "https://lin.ee/Hjhy6rb", "tel:0834375181"
  icon: 'line' | 'phone' | 'facebook' | 'instagram' | 'custom'
}

export interface ContactContent {
  headline: string
  body: string
  ctaText: string
  stats: [StatItem, StatItem, StatItem]
  cards: ContactCard[]
}

export interface SectionStyle {
  bgColor?: string
  bgImageUrl?: string
}

export interface SectionStyles {
  hero: SectionStyle
  gallery: SectionStyle
  facebook: SectionStyle
  aboutContact: SectionStyle
  pricing: SectionStyle
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

export interface GallerySettings {
  mode: 'grid' | 'carousel'
  autoPlay: boolean
  interval: number   // seconds between slides
}

export interface SiteContent {
  hero: HeroContent
  about: AboutContent
  contact: ContactContent
  gallery: GalleryImage[]
  gallerySettings: GallerySettings
  pricing: PricingContent
  sectionStyles: SectionStyles
  updatedAt: string
}
