'use client'

import { useState } from 'react'
import type { GallerySettings } from '@/lib/types'

interface GallerySettingsEditorProps {
  settings: GallerySettings
  onUpdate: (settings: GallerySettings) => void
}

export default function GallerySettingsEditor({ settings, onUpdate }: GallerySettingsEditorProps) {
  const [form, setForm] = useState(settings)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    try {
      const res = await fetch('/api/content', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gallerySettings: form }),
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
      <h2 className="font-display text-lg font-bold text-gray-800 mb-4">Gallery Display</h2>
      <div className="flex flex-col gap-5">
        {/* Mode */}
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">Display Mode</label>
          <div className="flex gap-3">
            {(['grid', 'carousel'] as const).map(m => (
              <button
                key={m}
                onClick={() => setForm(f => ({ ...f, mode: m }))}
                className={`px-5 py-2 rounded-lg text-sm font-body font-bold border transition-colors ${form.mode === m ? 'bg-brand-goldDark text-white border-brand-goldDark' : 'border-gray-200 text-gray-600 hover:border-brand-gold'}`}
              >
                {m === 'grid' ? '⊞ Grid' : '▶ Carousel'}
              </button>
            ))}
          </div>
        </div>

        {/* Auto-play (only relevant for carousel) */}
        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={form.autoPlay}
              onChange={e => setForm(f => ({ ...f, autoPlay: e.target.checked }))}
            />
            <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-goldDark" />
          </label>
          <span className="text-sm font-body text-gray-700">Auto-play (carousel)</span>
        </div>

        {/* Interval */}
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-1">
            Slide Interval (seconds)
          </label>
          <input
            type="number"
            min={1}
            max={30}
            value={form.interval}
            onChange={e => setForm(f => ({ ...f, interval: Math.max(1, Math.min(30, Number(e.target.value))) }))}
            className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
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
