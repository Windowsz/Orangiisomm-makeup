import type { GalleryImage, GallerySettings, SectionStyle } from '@/lib/types'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import CarouselGallery from '@/components/gallery/CarouselGallery'

interface GallerySectionProps {
  images: GalleryImage[]
  settings: GallerySettings
  style?: SectionStyle
}

function sectionBg(style?: SectionStyle): React.CSSProperties {
  if (!style || (!style.bgColor && !style.bgImageUrl)) return {}
  if (style.bgImageUrl) return {
    backgroundImage: `url(${style.bgImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: style.bgColor || undefined,
  }
  return { backgroundColor: style.bgColor }
}

export default function GallerySection({ images, settings, style }: GallerySectionProps) {
  const hasBg = !!(style?.bgColor || style?.bgImageUrl)
  return (
    <section
      id="gallery"
      className={`py-20 px-6 ${hasBg ? '' : 'bg-white'}`}
      style={hasBg ? sectionBg(style) : undefined}
    >
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

        {settings.mode === 'carousel' ? (
          <CarouselGallery images={images} autoPlay={settings.autoPlay} interval={settings.interval} />
        ) : (
          <GalleryGrid images={images} />
        )}
      </div>
    </section>
  )
}
