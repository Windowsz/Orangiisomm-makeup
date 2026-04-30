import type { GalleryImage } from '@/lib/types'
import GalleryGrid from '@/components/gallery/GalleryGrid'

interface GallerySectionProps {
  images: GalleryImage[]
}

export default function GallerySection({ images }: GallerySectionProps) {
  return (
    <section id="gallery" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-brand-goldDark mb-3">
            Portfolio
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            My Work
          </h2>
          <div className="gold-divider" />
          <p className="mt-4 font-body text-gray-500 text-sm">
            Click any image to view full screen
          </p>
        </div>

        <GalleryGrid images={images} />
      </div>
    </section>
  )
}
