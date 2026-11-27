import Image from 'next/image'
import type { AboutContent, ContactContent, ContactCard, SectionStyle } from '@/lib/types'

interface AboutContactSectionProps {
  aboutContent: AboutContent
  contactContent: ContactContent
  style?: SectionStyle
}

function ContactIcon({ type }: { type: string }) {
  if (type === 'tiktok') return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.22 8.22 0 004.8 1.54V6.78a4.85 4.85 0 01-1.03-.09z" />
    </svg>
  )
  if (type === 'line') return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  )
  if (type === 'phone') return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.5a2 2 0 012-2h1.5a1 1 0 011 .76l.75 3a1 1 0 01-.29 1L6.91 9.35a16.016 16.016 0 006.74 6.74l1.09-1.05a1 1 0 011-.29l3 .75a1 1 0 01.76 1V18a2 2 0 01-2 2A16 16 0 013 5.5z" />
    </svg>
  )
  if (type === 'facebook') return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  )
  if (type === 'instagram') return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  )
}

function CardIcon({ card }: { card: ContactCard }) {
  if (card.iconImageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={card.iconImageUrl} alt={card.label} className="w-full h-full object-cover rounded-full" />
    )
  }
  return <ContactIcon type={card.icon} />
}

export default function AboutContactSection({ aboutContent, contactContent, style }: AboutContactSectionProps) {
  return (
    <section id="about" className="bg-[#100e0c] text-[#f6f1e8]">
      {style?.bgCss && <style>{`#about { ${style.bgCss} }`}</style>}
      <div className="grid md:grid-cols-2 min-h-[70vh]">
        <div className="relative min-h-[420px]">
          {aboutContent.imageUrl ? (
            <Image
              src={aboutContent.imageUrl}
              alt="Orangiisomm makeup artist"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 bg-[#1a1612] flex items-center justify-center">
              <span className="font-editorial italic text-6xl text-[#c6a56e]">O</span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-end px-8 md:px-16 py-16 border-t md:border-t-0 md:border-l border-[#c6a56e]/30">
          <p className="text-[11px] tracking-[0.36em] uppercase text-[#c6a56e] mb-4">The Artist</p>
          <h2 className="font-editorial italic font-medium text-5xl md:text-6xl leading-none mb-6">
            {aboutContent.title}
          </h2>
          <p className="text-[#b7ab9e] font-light leading-relaxed text-lg max-w-md">
            {aboutContent.body}
          </p>
        </div>
      </div>

      <div id="contact" className="px-6 md:px-16 py-24 border-t border-[#c6a56e]/30">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] tracking-[0.36em] uppercase text-[#c6a56e] mb-3">Contact</p>
          <h2 className="font-editorial italic font-medium text-5xl md:text-7xl leading-none max-w-3xl">
            {contactContent.headline}
          </h2>
          <p className="mt-5 max-w-xl text-[#b7ab9e] font-light leading-relaxed">{contactContent.body}</p>

          <div className="grid grid-cols-3 gap-6 max-w-xl mt-12">
            {contactContent.stats.map(stat => (
              <div key={stat.label}>
                <p className="font-editorial text-4xl">{stat.value}</p>
                <p className="mt-1 text-[11px] tracking-[0.18em] uppercase text-[#b7ab9e]">{stat.label}</p>
              </div>
            ))}
          </div>

          {contactContent.cards.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-12">
              {contactContent.cards.map(card => (
                <a
                  key={card.id}
                  href={card.href}
                  target={card.href.startsWith('tel:') || card.href.startsWith('mailto:') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 border border-[#c6a56e]/30 px-5 py-4 hover:border-[#c6a56e] transition-colors"
                >
                  <span className={`flex-shrink-0 w-10 h-10 flex items-center justify-center overflow-hidden text-[#c6a56e] ${card.iconImageUrl ? '' : ''}`}>
                    <CardIcon card={card} />
                  </span>
                  <span className="text-left min-w-0">
                    <span className="block text-[11px] tracking-[0.2em] uppercase text-[#b7ab9e]">{card.label}</span>
                    <span className="block text-sm truncate">{card.value}</span>
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
