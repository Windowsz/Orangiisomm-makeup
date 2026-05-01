'use client'

import { useState } from 'react'
import type { HeroContent } from '@/lib/types'

interface HeroEditorProps {
  content: HeroContent
  onUpdate: (content: HeroContent) => void
}

export default function HeroEditor({ content, onUpdate }: HeroEditorProps) {
  const [form, setForm] = useState(content)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    try {
      const res = await fetch('/api/content', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hero: form }),
      })
      if (res.ok) {
        onUpdate(form)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="font-display text-lg font-bold text-gray-800 mb-4">Hero Section</h2>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-1">Headline</label>
          <input
            type="text"
            value={form.headline}
            onChange={e => setForm(f => ({ ...f, headline: e.target.value }))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-1">Subheadline</label>
          <textarea
            rows={2}
            value={form.subheadline}
            onChange={e => setForm(f => ({ ...f, subheadline: e.target.value }))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold resize-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-1">CTA Text</label>
            <input
              type="text"
              value={form.ctaText}
              onChange={e => setForm(f => ({ ...f, ctaText: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
            />
          </div>
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-1">CTA Link</label>
            <input
              type="text"
              value={form.ctaLink}
              onChange={e => setForm(f => ({ ...f, ctaLink: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-1">QR Code Image URL</label>
          <input
            type="text"
            value={form.qrImageUrl || ''}
            onChange={e => setForm(f => ({ ...f, qrImageUrl: e.target.value }))}
            placeholder="https://... (leave empty to hide)"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-1">QR Code Caption</label>
          <input
            type="text"
            value={form.qrCaption || ''}
            onChange={e => setForm(f => ({ ...f, qrCaption: e.target.value }))}
            placeholder="e.g. สแกนเพื่อติดต่อ / Scan to contact"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-brand-goldDark text-white text-sm font-bold tracking-widest uppercase px-5 py-2 rounded-lg hover:bg-brand-gold transition-colors disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
          {saved && <span className="text-green-600 text-sm font-body">Saved ✓</span>}
        </div>
      </div>
    </div>
  )
}
