'use client'

import { useEffect, useRef } from 'react'
import type { SocialContent, SectionStyle } from '@/lib/types'

interface SocialSectionProps {
  content: SocialContent
  style?: SectionStyle
}

export default function SocialSection({ content, style }: SocialSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    container.querySelectorAll('script').forEach(old => {
      const s = document.createElement('script')
      Array.from(old.attributes).forEach(a => s.setAttribute(a.name, a.value))
      s.textContent = old.textContent
      old.parentNode?.replaceChild(s, old)
    })
  }, [content.html])

  return (
    <section id="social" className="py-20 px-6 bg-brand-petal">
      {style?.bgCss && <style>{`#social { ${style.bgCss} }`}</style>}
      <div
        ref={containerRef}
        className="max-w-6xl mx-auto"
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
    </section>
  )
}
