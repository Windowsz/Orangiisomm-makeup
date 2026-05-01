'use client'

import { useState, useEffect, useCallback } from 'react'
import type { GalleryImage } from '@/lib/types'
import Lightbox from './Lightbox'

interface CarouselGalleryProps {
  images: GalleryImage[]
  autoPlay: boolean
  interval: number
}

export default function CarouselGallery({ images, autoPlay, interval }: CarouselGalleryProps) {
  const [current, setCurrent] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + images.length) % images.length)
  }, [images.length])

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    if (!autoPlay || lightboxIndex !== null) return
    const timer = setInterval(next, interval * 1000)
    return () => clearInterval(timer)
  }, [autoPlay, interval, next, lightboxIndex])

  if (images.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400 font-body">
        No images yet. Add some from the admin dashboard.
      </div>
    )
  }

  return (
    <>
      <div className="relative select-none">
        {/* Main image */}
        <div className="relative h-72 sm:h-96 md:h-[520px] rounded-2xl overflow-hidden shadow-xl bg-gray-100">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setLightboxIndex(i)}
              aria-label={`View ${img.alt} fullscreen`}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
              {img.caption && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-6 py-4 text-left">
                  <p className="font-body text-white text-sm font-bold">{img.caption}</p>
                </div>
              )}
            </button>
          ))}

          {/* Arrow buttons */}
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute top-3 right-3 z-20 bg-black/50 text-white text-xs font-body px-2.5 py-1 rounded-full">
            {current + 1} / {images.length}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2.5 bg-brand-goldDark' : 'w-2.5 h-2.5 bg-brand-rose/50 hover:bg-brand-rose'}`}
            />
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => i !== null ? (i - 1 + images.length) % images.length : null)}
          onNext={() => setLightboxIndex(i => i !== null ? (i + 1) % images.length : null)}
        />
      )}
    </>
  )
}
