import { readContent } from '@/lib/content'
import HeroSection from '@/components/home/HeroSection'
import GallerySection from '@/components/home/GallerySection'
import FacebookSection from '@/components/home/FacebookSection'
import AboutSection from '@/components/home/AboutSection'
import ContactSection from '@/components/home/ContactSection'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const content = await readContent()

  return (
    <main>
      <HeroSection content={content.hero} />
      <GallerySection images={content.gallery} />
      <FacebookSection />
      <AboutSection content={content.about} />
      <ContactSection content={content.contact} />
    </main>
  )
}
