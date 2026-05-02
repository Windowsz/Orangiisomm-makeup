import { readContent } from '@/lib/content'
import HeroSection from '@/components/home/HeroSection'
import GallerySection from '@/components/home/GallerySection'
import SocialSection from '@/components/home/SocialSection'
import PricingSection from '@/components/home/PricingSection'
import AboutContactSection from '@/components/home/AboutContactSection'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const content = await readContent()

  return (
    <main>
      <HeroSection content={content.hero} style={content.sectionStyles.hero} />
      <GallerySection
        images={content.gallery}
        settings={content.gallerySettings}
        style={content.sectionStyles.gallery}
      />
      <SocialSection content={content.social} style={content.sectionStyles.social} />
      <PricingSection content={content.pricing} style={content.sectionStyles.pricing} />
      <AboutContactSection
        aboutContent={content.about}
        contactContent={content.contact}
        style={content.sectionStyles.aboutContact}
      />
    </main>
  )
}
