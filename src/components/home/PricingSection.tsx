import type { PricingContent, SectionStyle } from '@/lib/types'

interface PricingSectionProps {
  content: PricingContent
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

export default function PricingSection({ content, style }: PricingSectionProps) {
  const hasBg = !!(style?.bgColor || style?.bgImageUrl)

  return (
    <section
      id="pricing"
      className={`py-20 px-6 ${hasBg ? '' : 'bg-brand-blush/40'}`}
      style={hasBg ? sectionBg(style) : undefined}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-brand-goldDark mb-3">
            Packages
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {content.headline}
          </h2>
          <div className="gold-divider mb-4" />
          {content.subheadline && (
            <p className="font-body text-gray-500 text-sm max-w-xl mx-auto mt-4">
              {content.subheadline}
            </p>
          )}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {content.cards.map(card => (
            <div
              key={card.id}
              className={`relative rounded-2xl overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1 ${
                card.highlighted
                  ? 'bg-brand-goldDark text-white shadow-2xl shadow-brand-goldDark/30 ring-2 ring-brand-gold'
                  : 'bg-white text-gray-800 shadow-lg'
              }`}
            >
              {/* Popular badge */}
              {card.highlighted && (
                <div className="absolute top-4 right-4 bg-brand-crimson text-white text-[10px] font-body font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                  Popular
                </div>
              )}

              <div className="p-7 flex flex-col flex-1">
                {/* Title & price */}
                <p className={`font-body text-xs tracking-[0.25em] uppercase mb-2 ${card.highlighted ? 'text-brand-goldLight' : 'text-brand-goldDark'}`}>
                  {card.title}
                </p>
                <div className="flex items-end gap-1.5 mb-1">
                  <span className="font-display text-4xl font-bold leading-none">{card.price}</span>
                  {card.priceNote && (
                    <span className={`font-body text-sm pb-0.5 ${card.highlighted ? 'text-white/70' : 'text-gray-400'}`}>
                      / {card.priceNote}
                    </span>
                  )}
                </div>

                {card.description && (
                  <p className={`font-body text-sm leading-relaxed mt-3 mb-6 ${card.highlighted ? 'text-white/80' : 'text-gray-500'}`}>
                    {card.description}
                  </p>
                )}

                {/* Divider */}
                <div className={`h-px mb-6 ${card.highlighted ? 'bg-white/20' : 'bg-gray-100'}`} />

                {/* Features list */}
                <ul className="flex flex-col gap-2.5 flex-1 mb-8">
                  {card.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 font-body text-sm">
                      <svg
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${card.highlighted ? 'text-brand-gold' : 'text-brand-goldDark'}`}
                        fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={card.highlighted ? 'text-white/90' : 'text-gray-600'}>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {card.ctaText && (
                  <a
                    href={card.ctaHref || '#contact'}
                    className={`block text-center font-body font-bold tracking-widest uppercase text-sm px-6 py-3 rounded-full transition-all duration-200 ${
                      card.highlighted
                        ? 'bg-white text-brand-goldDark hover:bg-brand-gold hover:text-white'
                        : 'bg-brand-goldDark text-white hover:bg-brand-gold'
                    }`}
                  >
                    {card.ctaText}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
