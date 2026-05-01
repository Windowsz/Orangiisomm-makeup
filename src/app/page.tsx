import { readContent } from '@/lib/content'
import HeroSection from '@/components/home/HeroSection'
import GallerySection from '@/components/home/GallerySection'
import FacebookSection from '@/components/home/FacebookSection'
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
      <FacebookSection style={content.sectionStyles.facebook} />
      <PricingSection content={content.pricing} style={content.sectionStyles.pricing} />
      <AboutContactSection
        aboutContent={content.about}
        contactContent={content.contact}
        style={content.sectionStyles.aboutContact}
      />
    </main>
  )
}
