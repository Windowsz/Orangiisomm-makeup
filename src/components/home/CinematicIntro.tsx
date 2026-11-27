'use client'

import { useEffect, useRef, useState } from 'react'
import type { GalleryImage, HeroContent } from '@/lib/types'
import Lightbox from '@/components/gallery/Lightbox'

interface CinematicIntroProps {
  hero: HeroContent
  images: GalleryImage[]
}

function splitHeadline(headline: string): [string, string] {
  const parts = headline.trim().split(/\s+/)
  if (parts.length < 2) return [headline, '']
  const mid = Math.ceil(parts.length / 2)
  return [parts.slice(0, mid).join(' '), parts.slice(mid).join(' ')]
}

export default function CinematicIntro({ hero, images }: CinematicIntroProps) {
  const veilRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLElement>(null)
  const reelRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const frameRefs = useRef<(HTMLDivElement | null)[]>([])
  const slideRefs = useRef<(HTMLElement | null)[]>([])
  const dotRefs = useRef<(HTMLElement | null)[]>([])
  const [lightbox, setLightbox] = useState<number | null>(null)

  const story = images.slice(0, Math.min(3, images.length))
  const [lineA, lineB] = splitHeadline(hero.headline || '')
  const veil = images[0]?.url
  const qrSize = hero.qrSize ?? 112
  const storyHeight = story.length <= 1 ? '100vh' : `${140 + story.length * 80}vh`

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n))
    let ticking = false

    const render = () => {
      const y = window.scrollY
      const vh = window.innerHeight
      const doc = document.documentElement.scrollHeight - vh
      if (progressRef.current) {
        progressRef.current.style.width = `${doc > 0 ? (y / doc) * 100 : 0}%`
      }

      const heroP = clamp(y / (vh * 0.85), 0, 1)
      if (veilRef.current) {
        veilRef.current.style.transform = `scale(${1.12 + heroP * 0.18})`
        veilRef.current.style.opacity = String(1 - heroP * 0.35)
      }
      if (copyRef.current) {
        copyRef.current.style.transform = `translateY(${heroP * -80}px)`
        copyRef.current.style.opacity = String(1 - heroP)
      }

      const storyEl = storyRef.current
      if (storyEl && story.length > 1) {
        const total = storyEl.offsetHeight - vh
        const p = clamp((y - storyEl.offsetTop) / Math.max(total, 1), 0, 1)
        const x = p * (story.length - 1)
        const i = Math.min(story.length - 2, Math.floor(x))
        const f = x - i
        frameRefs.current.forEach((el, idx) => {
          if (!el) return
          let o = 0
          if (idx === i) o = 1 - f
          else if (idx === i + 1) o = f
          if (p > 0.995 && idx === story.length - 1) o = 1
          el.style.opacity = String(o)
          const drift = (idx % 2 === 0 ? -1 : 1) * (1 - o) * 24
          el.style.transform = `scale(${1.16 - o * 0.1}) translate3d(0, ${drift}px, 0)`
        })
        const active = Math.min(story.length - 1, Math.round(x))
        slideRefs.current.forEach((el, idx) => {
          if (!el) return
          const on = idx === active
          el.style.opacity = on ? '1' : '0'
          el.style.transform = on ? 'translateY(0)' : 'translateY(36px)'
        })
        dotRefs.current.forEach((el, idx) => {
          el?.classList.toggle('is-on', idx === active)
        })
      }

      const reel = reelRef.current
      const track = trackRef.current
      if (reel && track && images.length > 1) {
        const max = Math.max(0, track.scrollWidth - window.innerWidth + 40)
        const rp = clamp((y - reel.offsetTop) / Math.max(reel.offsetHeight - vh, 1), 0, 1)
        track.style.transform = `translate3d(${-rp * max}px, 0, 0)`
        Array.from(track.children).forEach(card => {
          const node = card as HTMLElement
          const rect = node.getBoundingClientRect()
          const mid = rect.left + rect.width / 2
          const dist = Math.abs(mid - window.innerWidth * 0.42) / window.innerWidth
          const img = node.querySelector('img')
          if (img) img.style.transform = `scale(${1.12 - Math.min(dist, 0.45) * 0.18})`
        })
      }

      const reelEnd = reel ? reel.offsetTop + reel.offsetHeight : 0
      const overGallery = Boolean(reel) && y > reel.offsetTop - 8 && y < reelEnd - 40
      document.documentElement.dataset.nav = overGallery ? 'ink' : 'light'
    }

    const ask = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        render()
        ticking = false
      })
    }

    document.documentElement.dataset.nav = 'light'
    render()
    window.addEventListener('scroll', ask, { passive: true })
    window.addEventListener('resize', ask)
    return () => {
      window.removeEventListener('scroll', ask)
      window.removeEventListener('resize', ask)
      delete document.documentElement.dataset.nav
    }
  }, [images.length, story.length])

  return (
    <>
      <div ref={progressRef} className="cine-progress" />

      <header id="home" className="cine-hero">
        <div
          ref={veilRef}
          className="cine-veil"
          style={veil ? { backgroundImage: `url("${veil}")` } : undefined}
        />
        <div className="cine-shade" />
        <div ref={copyRef} className="cine-hero-copy">
          <div className="cine-rule" />
          <p className="cine-eyebrow">Makeup Artist</p>
          <h1>
            <span><i>{lineA}</i></span>
            {lineB && <span><i>{lineB}</i></span>}
          </h1>
          {hero.subheadline && <p className="cine-sub">{hero.subheadline}</p>}
          {hero.ctaText && (
            <a className="cine-cta" href={hero.ctaLink || '#gallery'}>{hero.ctaText}</a>
          )}
          {hero.qrImageUrl && (
            <div className="cine-qr">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={hero.qrImageUrl} alt="QR Code" style={{ width: qrSize, height: qrSize }} />
              {hero.qrCaption && <p>{hero.qrCaption}</p>}
            </div>
          )}
        </div>
      </header>

      {story.length > 0 && (
        <section
          ref={storyRef}
          className="cine-story"
          style={{ height: storyHeight }}
          aria-label="Looks"
        >
          <div className="cine-sticky">
            <div className="cine-stage">
              {story.map((img, idx) => (
                <div
                  key={img.id}
                  ref={el => { frameRefs.current[idx] = el }}
                  className="cine-frame"
                  style={{
                    backgroundImage: `url("${img.url}")`,
                    opacity: idx === 0 ? 1 : 0,
                  }}
                />
              ))}
            </div>
            <div className="cine-copy">
              <div className="cine-slides">
                {story.map((img, idx) => (
                  <article
                    key={img.id}
                    ref={el => { slideRefs.current[idx] = el }}
                    className="cine-slide"
                    style={{
                      opacity: idx === 0 ? 1 : 0,
                      transform: idx === 0 ? 'translateY(0)' : 'translateY(36px)',
                    }}
                  >
                    <p className="cine-index">Look 0{idx + 1}</p>
                    <h2>{img.caption || img.alt}</h2>
                    <p>{img.alt}</p>
                  </article>
                ))}
              </div>
            </div>
            {story.length > 1 && (
              <div className="cine-dots" aria-hidden="true">
                {story.map((img, idx) => (
                  <b
                    key={img.id}
                    ref={el => { dotRefs.current[idx] = el }}
                    className={idx === 0 ? 'is-on' : undefined}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section id="gallery" ref={reelRef} className="cine-reel" style={{ height: images.length > 1 ? '320vh' : 'auto' }}>
        <div className="cine-reel-sticky">
          <div className="cine-reel-head">
            <div>
              <p>Gallery</p>
              <h2>Selected looks</h2>
            </div>
            {images.length > 1 && <p>Scroll to drift</p>}
          </div>
          {images.length === 0 ? (
            <p className="cine-empty">No images yet.</p>
          ) : (
            <div ref={trackRef} className="cine-track">
              {images.map((img, index) => (
                <button
                  key={img.id}
                  type="button"
                  className="cine-card"
                  onClick={() => setLightbox(index)}
                  aria-label={`View ${img.alt}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={img.alt} />
                  <span>{img.caption || img.alt}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightbox !== null && (
        <Lightbox
          images={images}
          currentIndex={lightbox}
          onClose={() => setLightbox(null)}
          onPrev={() => setLightbox(i => (i === null ? i : (i - 1 + images.length) % images.length))}
          onNext={() => setLightbox(i => (i === null ? i : (i + 1) % images.length))}
        />
      )}
    </>
  )
}
