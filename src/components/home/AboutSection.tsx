import Image from 'next/image'
import type { AboutContent } from '@/lib/types'

interface AboutSectionProps {
  content: AboutContent
}

export default function AboutSection({ content }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 px-6 bg-brand-petal">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="relative">
          <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl">
            {content.imageUrl ? (
              <Image
                src={content.imageUrl}
                alt="Orangiisomm makeup artist"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full bg-brand-blush flex items-center justify-center">
                <span className="font-display text-4xl text-brand-goldDark">O</span>
              </div>
            )}
          </div>
          {/* Decorative frame offset */}
          <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-brand-gold rounded-2xl -z-10" />
        </div>

        {/* Text */}
        <div>
          <p className="font-body text-xs tracking-[0.3em] uppercase text-brand-goldDark mb-3">
            The Artist
          </p>
          <h2 className="font-display text-4xl font-bold text-gray-800 mb-4">
            {content.title}
          </h2>
          <div className="gold-divider-left mb-6" />
          <p className="font-body text-gray-600 leading-relaxed text-lg">
            {content.body}
          </p>
          <a
            href="https://www.facebook.com/Orangiisommmakeup"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-brand-goldDark font-body font-bold text-sm tracking-widest uppercase border-b-2 border-brand-gold hover:border-brand-crimson hover:text-brand-crimson transition-colors"
          >
            Follow on Facebook
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
