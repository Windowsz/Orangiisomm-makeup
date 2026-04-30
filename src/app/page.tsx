import { readContent } from '@/lib/content'
import HeroSection from '@/components/home/HeroSection'
import GallerySection from '@/components/home/GallerySection'
import AboutSection from '@/components/home/AboutSection'
import ContactSection from '@/components/home/ContactSection'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  const content = readContent()

  return (
    <main>
      <HeroSection content={content.hero} />
      <GallerySection images={content.gallery} />
      <AboutSection content={content.about} />
      <ContactSection />
    </main>
  )
}
