import type { SocialContent, SectionStyle } from '@/lib/types'

interface SocialSectionProps {
  content: SocialContent
  style?: SectionStyle
}

export default function SocialSection({ content, style }: SocialSectionProps) {
  return (
    <section id="social" className="py-20 px-6 bg-brand-petal">
      {style?.bgCss && <style>{`#social { ${style.bgCss} }`}</style>}
      <div
        className="max-w-6xl mx-auto"
        /* Admin-controlled HTML — only editable by authenticated admin */
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
    </section>
  )
}
