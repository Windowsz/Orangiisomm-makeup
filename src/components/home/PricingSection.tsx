import type { PricingContent, SectionStyle } from '@/lib/types'

interface PricingSectionProps {
  content: PricingContent
  style?: SectionStyle
}

export default function PricingSection({ content, style }: PricingSectionProps) {
  return (
    <section id="pricing" className="bg-[#100e0c] text-[#f6f1e8] px-6 py-24">
      {style?.bgCss && <style>{`#pricing { ${style.bgCss} }`}</style>}
      <div className="max-w-6xl mx-auto">
        <p className="text-[11px] tracking-[0.36em] uppercase text-[#c6a56e] mb-3">Packages</p>
        <h2 className="font-editorial italic font-medium text-5xl md:text-7xl leading-none max-w-3xl">
          {content.headline}
        </h2>
        {content.subheadline && (
          <p className="mt-5 max-w-xl text-[#b7ab9e] font-light leading-relaxed">{content.subheadline}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-14 items-stretch">
          {content.cards.map(card => (
            <article
              key={card.id}
              className={`flex flex-col border p-7 ${
                card.highlighted
                  ? 'border-[#c6a56e] bg-[#1a1612]'
                  : 'border-[#c6a56e]/30 bg-transparent'
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-6">
                <p className="text-[11px] tracking-[0.28em] uppercase text-[#c6a56e]">{card.title}</p>
                {card.highlighted && (
                  <span className="text-[10px] tracking-[0.22em] uppercase text-[#100e0c] bg-[#c6a56e] px-2 py-1">Popular</span>
                )}
              </div>
              <div className="flex items-end gap-2">
                <span className="font-editorial text-5xl leading-none">{card.price}</span>
                {card.priceNote && <span className="text-sm text-[#b7ab9e] pb-1">/ {card.priceNote}</span>}
              </div>
              {card.description && (
                <p className="text-sm text-[#b7ab9e] leading-relaxed mt-4">{card.description}</p>
              )}
              <ul className="mt-6 flex flex-col gap-2.5 flex-1">
                {card.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#f6f1e8]/85">
                    <span className="mt-2 w-3 h-px bg-[#c6a56e] flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              {card.ctaText && (
                <a
                  href={card.ctaHref || '#contact'}
                  className="mt-8 inline-block text-center text-[11px] tracking-[0.26em] uppercase bg-[#c6a56e] text-[#100e0c] px-6 py-3 hover:bg-[#e8d5b0] transition-colors"
                >
                  {card.ctaText}
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
