'use client'

import { useState } from 'react'
import type { GalleryImage } from '@/lib/types'

interface GalleryManagerProps {
  images: GalleryImage[]
  onUpdate: (images: GalleryImage[]) => void
}

export default function GalleryManager({ images, onUpdate }: GalleryManagerProps) {
  const [list, setList] = useState(images)
  const [newUrl, setNewUrl] = useState('')
  const [newAlt, setNewAlt] = useState('')
  const [newCaption, setNewCaption] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const save = async (updated: GalleryImage[]) => {
    setSaving(true)
    setSaved(false)
    try {
      const res = await fetch('/api/content', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gallery: updated }),
      })
      if (res.ok) {
        onUpdate(updated)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } finally {
      setSaving(false)
    }
  }

  const addImage = () => {
    if (!newUrl.trim()) return
    const img: GalleryImage = {
      id: Date.now().toString(),
      url: newUrl.trim(),
      alt: newAlt.trim() || 'Makeup look',
      caption: newCaption.trim() || undefined,
    }
    const updated = [...list, img]
    setList(updated)
    save(updated)
    setNewUrl('')
    setNewAlt('')
    setNewCaption('')
  }

  const removeImage = (id: string) => {
    const updated = list.filter(img => img.id !== id)
    setList(updated)
    save(updated)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-bold text-gray-800">Gallery Images</h2>
        {saved && <span className="text-green-600 text-sm font-body">Saved ✓</span>}
      </div>

      {/* Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-xs text-amber-700 mb-6 leading-relaxed">
        <strong>Tip:</strong> Facebook CDN URLs (fbcdn.net) may expire after a few days.
        For permanent images, right-click a Facebook photo → &quot;Copy image address&quot; and paste it here,
        or re-host on a service like <a href="https://cloudinary.com" target="_blank" rel="noopener noreferrer" className="underline">Cloudinary</a>.
      </div>

      {/* Add form */}
      <div className="border border-dashed border-brand-rose rounded-xl p-4 mb-6 flex flex-col gap-3">
        <p className="text-xs font-bold tracking-widest uppercase text-gray-500">Add New Image</p>
        <input
          type="url"
          value={newUrl}
          onChange={e => setNewUrl(e.target.value)}
          placeholder="Image URL (e.g. from Facebook or Unsplash)"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            value={newAlt}
            onChange={e => setNewAlt(e.target.value)}
            placeholder="Alt text (describe the image)"
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
          <input
            type="text"
            value={newCaption}
            onChange={e => setNewCaption(e.target.value)}
            placeholder="Caption (optional)"
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </div>
        <button
          onClick={addImage}
          disabled={!newUrl.trim() || saving}
          className="self-start bg-brand-crimson text-white text-sm font-bold tracking-widest uppercase px-5 py-2 rounded-lg hover:bg-red-800 transition-colors disabled:opacity-40"
        >
          + Add Image
        </button>
      </div>

      {/* Image list */}
      <div className="flex flex-col gap-3">
        {list.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-6">No images yet.</p>
        )}
        {list.map((img, i) => (
          <div key={img.id} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
            <span className="text-xs text-gray-400 w-5 text-center">{i + 1}</span>
            {/* Thumbnail */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt={img.alt}
              className="w-12 h-12 object-cover rounded-md flex-shrink-0 bg-gray-200"
              onError={e => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><rect fill="%23eee" width="48" height="48"/><text x="50%" y="55%" text-anchor="middle" fill="%23aaa" font-size="10">ERR</text></svg>' }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">{img.alt}</p>
              <p className="text-xs text-gray-400 truncate">{img.url}</p>
            </div>
            <button
              onClick={() => removeImage(img.id)}
              className="text-gray-400 hover:text-brand-crimson transition-colors p-1 flex-shrink-0"
              aria-label={`Remove ${img.alt}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
