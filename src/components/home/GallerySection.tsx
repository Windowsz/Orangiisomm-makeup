import type { GalleryImage } from '@/lib/types'
import GalleryGrid from '@/components/gallery/GalleryGrid'

interface GallerySectionProps {
  images: GalleryImage[]
}

const FB_IFRAME_SRC =
  'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FOrangiisommmakeup&tabs=timeline&width=500&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=1361869480966534'

export default function GallerySection({ images }: GallerySectionProps) {
  return (
    <section id="gallery" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-12">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-brand-goldDark mb-3">
            Portfolio &amp; Feed
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            My Work
          </h2>
          <div className="gold-divider" />
          <p className="mt-4 font-body text-gray-500 text-sm">
            Click any image to view full screen
          </p>
        </div>

        {/* Split layout: gallery left, Facebook feed right */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Gallery grid — takes remaining space */}
          <div className="flex-1 min-w-0">
            <GalleryGrid images={images} />
          </div>

          {/* Facebook Page iframe — fixed width, matches gallery height */}
          <div className="w-full lg:w-[340px] flex-shrink-0">
            <div className="sticky top-20">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                </svg>
                <span className="font-body text-xs tracking-widest uppercase text-brand-goldDark font-bold">
                  Latest Posts
                </span>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-brand-rose/20">
                <iframe
                  src={FB_IFRAME_SRC}
                  width="340"
                  height="700"
                  style={{ border: 'none', overflow: 'hidden', display: 'block', width: '100%' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Orangiisomm Facebook Page"
                />
              </div>
              <a
                href="https://www.facebook.com/Orangiisommmakeup"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 bg-[#1877F2] text-white font-body font-bold text-xs tracking-widest uppercase py-2.5 rounded-xl hover:bg-[#0d6efd] transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                </svg>
                Open Facebook Page
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
