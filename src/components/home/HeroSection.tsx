import type { HeroContent } from '@/lib/types'

interface HeroSectionProps {
  content: HeroContent
}

export default function HeroSection({ content }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 60% 40%, #FAD4E0 0%, #F7E8EE 40%, #FFF8F9 100%)',
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-brand-blush/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-brand-goldLight/30 blur-3xl pointer-events-none" />

      {/* Gold accent line */}
      <div className="gold-divider mb-8" />

      <p className="font-body text-xs tracking-[0.3em] uppercase text-brand-goldDark mb-4">
        Makeup Artist
      </p>

      <h1 className="font-display text-5xl md:text-7xl font-bold text-brand-goldDark leading-tight mb-6 max-w-3xl">
        {content.headline}
      </h1>

      <p className="font-body text-lg md:text-xl text-gray-600 max-w-xl mb-10 leading-relaxed">
        {content.subheadline}
      </p>

      <a
        href={content.ctaLink}
        className="inline-block bg-brand-crimson text-white font-body font-bold tracking-widest uppercase text-sm px-10 py-4 rounded-full hover:bg-red-800 hover:scale-105 transition-all duration-200 shadow-lg shadow-brand-crimson/30"
      >
        {content.ctaText}
      </a>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
        <span className="font-body text-xs text-brand-rose tracking-widest uppercase">Scroll</span>
        <svg className="w-4 h-4 text-brand-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
