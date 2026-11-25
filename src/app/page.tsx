import { readContent } from '@/lib/content'
import CinematicIntro from '@/components/home/CinematicIntro'
import SocialSection from '@/components/home/SocialSection'
import PricingSection from '@/components/home/PricingSection'
import AboutContactSection from '@/components/home/AboutContactSection'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const content = await readContent()

  return (
    <main>
      <CinematicIntro hero={content.hero} images={content.gallery} />
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
