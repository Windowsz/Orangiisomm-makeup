'use client'

import { useEffect, useCallback, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import type { GalleryImage } from '@/lib/types'

interface LightboxProps {
  images: GalleryImage[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)
  const [animKey, setAnimKey] = useState(0)
  const image = images[currentIndex]

  const handlePrev = useCallback(() => {
    setDirection('right')
    setAnimKey(k => k + 1)
    onPrev()
  }, [onPrev])

  const handleNext = useCallback(() => {
    setDirection('left')
    setAnimKey(k => k + 1)
    onNext()
  }, [onNext])

  useEffect(() => {
    const saved = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = saved }
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, handlePrev, handleNext])

  const portal = document.getElementById('portal-root')
  if (!portal || !image) return null

  const animClass = direction === 'left' ? 'animate-slide-left' : direction === 'right' ? 'animate-slide-right' : 'animate-scale-up'

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 z-10 text-white bg-white/10 hover:bg-white/25 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
        onClick={onClose}
        aria-label="Close"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev button */}
      {images.length > 1 && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white bg-white/10 hover:bg-white/25 rounded-full w-12 h-12 flex items-center justify-center transition-colors"
          onClick={e => { e.stopPropagation(); handlePrev() }}
          aria-label="Previous image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white bg-white/10 hover:bg-white/25 rounded-full w-12 h-12 flex items-center justify-center transition-colors"
          onClick={e => { e.stopPropagation(); handleNext() }}
          aria-label="Next image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Image container */}
      <div
        key={animKey}
        className={`${animClass} relative max-h-[85vh] max-w-[85vw] flex flex-col items-center gap-3`}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative max-h-[80vh] max-w-[85vw]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.url}
            alt={image.alt}
            className="max-h-[80vh] max-w-[85vw] object-contain rounded-lg shadow-2xl"
          />
        </div>

        {/* Caption & counter */}
        <div className="text-center">
          {image.caption && (
            <p className="font-body italic text-white/80 text-sm mb-1">{image.caption}</p>
          )}
          {images.length > 1 && (
            <p className="font-body text-white/50 text-xs tracking-widest">
              {currentIndex + 1} / {images.length}
            </p>
          )}
        </div>
      </div>

      {/* ESC hint */}
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-xs font-body tracking-widest">
        ESC to close · ← → to navigate
      </p>
    </div>,
    portal
  )
}
