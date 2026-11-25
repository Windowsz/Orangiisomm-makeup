'use client'

import { useEffect, useRef, useState } from 'react'
import type { SocialContent, SectionStyle } from '@/lib/types'

interface SocialSectionProps {
  content: SocialContent
  style?: SectionStyle
}

const FB_PAGE = 'https://www.facebook.com/Orangiisommmakeup'
const FB_NATIVE_W = 500
const FB_NATIVE_H = 1400
const IG_H = 760
const FB_PLUGIN = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(FB_PAGE)}&tabs=timeline&width=${FB_NATIVE_W}&height=${FB_NATIVE_H}&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=false`
const IG_USER = 'orangiisomm.makeup'
const IG_PLUGIN = `https://www.instagram.com/${IG_USER}/embed`

function FacebookFill() {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => setScale((el.clientWidth || FB_NATIVE_W) / FB_NATIVE_W)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative w-full overflow-hidden bg-white" style={{ height: FB_NATIVE_H * scale }}>
      <iframe
        src={FB_PLUGIN}
        title="Orangiisomm on Facebook"
        width={FB_NATIVE_W}
        height={FB_NATIVE_H}
        scrolling="no"
        style={{
          border: 'none',
          width: FB_NATIVE_W,
          height: FB_NATIVE_H,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  )
}

function Frame({
  label,
  href,
  children,
}: {
  label: string
  href: string
  children: React.ReactNode
}) {
  return (
    <figure className="w-full">
      <figcaption className="mb-3 flex items-baseline justify-between gap-4">
        <span className="text-[11px] tracking-[0.32em] uppercase text-[#c6a56e]">{label}</span>
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-[0.16em] uppercase text-[#b7ab9e] hover:text-[#f6f1e8]">
          Open
        </a>
      </figcaption>
      <div className="overflow-hidden border border-[#c6a56e]/35 bg-white">
        {children}
      </div>
    </figure>
  )
}

function TikTokEmbed({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return
    const doc = new DOMParser().parseFromString(html, 'text/html')
    const scripts = [...doc.querySelectorAll('script')]
    scripts.forEach(script => script.remove())
    container.innerHTML = doc.body.innerHTML
    scripts.forEach(old => {
      const script = document.createElement('script')
      Array.from(old.attributes).forEach(attr => script.setAttribute(attr.name, attr.value))
      script.textContent = old.textContent
      container.appendChild(script)
    })
    return () => {
      container.innerHTML = ''
    }
  }, [html])

  return <div ref={ref} className="social-embed bg-white px-4 py-2" />
}

export default function SocialSection({ content, style }: SocialSectionProps) {
  const hasTikTok = content.html.trim().length > 0

  return (
    <section id="social" className="bg-[#100e0c] text-[#f6f1e8] px-6 py-24">
      {style?.bgCss && <style>{`#social { ${style.bgCss} }`}</style>}
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <div>
            <p className="text-[11px] tracking-[0.36em] uppercase text-[#c6a56e] mb-3">Social</p>
            <h2 className="font-editorial italic font-medium text-5xl md:text-7xl leading-none">The feed</h2>
            <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-[#b7ab9e]">
              Instagram for the looks. Facebook for the latest posts.
            </p>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[640px] flex-col gap-14">
          <Frame label="Instagram" href={`https://www.instagram.com/${IG_USER}`}>
            <iframe
              src={IG_PLUGIN}
              title="Orangiisomm on Instagram"
              height={IG_H}
              style={{ border: 'none', width: '100%', height: IG_H }}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          </Frame>
          <Frame label="Facebook" href={FB_PAGE}>
            <FacebookFill />
          </Frame>
          {hasTikTok && (
            <Frame label="TikTok" href="https://www.tiktok.com/@orangiisomm">
              <TikTokEmbed html={content.html} />
            </Frame>
          )}
        </div>
      </div>
    </section>
  )
}
