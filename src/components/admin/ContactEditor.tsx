'use client'

import { useState } from 'react'
import type { ContactContent } from '@/lib/types'

interface ContactEditorProps {
  content: ContactContent
  onUpdate: (content: ContactContent) => void
}

export default function ContactEditor({ content, onUpdate }: ContactEditorProps) {
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
        body: JSON.stringify({ contact: form }),
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

  const updateStat = (index: number, field: 'value' | 'label', value: string) => {
    const stats = [...form.stats] as ContactContent['stats']
    stats[index] = { ...stats[index], [field]: value }
    setForm(f => ({ ...f, stats }))
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="font-display text-lg font-bold text-gray-800 mb-4">Contact Section</h2>
      <div className="flex flex-col gap-4">
        {/* Headline */}
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-1">Headline</label>
          <input
            type="text"
            value={form.headline}
            onChange={e => setForm(f => ({ ...f, headline: e.target.value }))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </div>

        {/* Body */}
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-1">Body Text</label>
          <textarea
            rows={3}
            value={form.body}
            onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold resize-none"
          />
        </div>

        {/* CTA Button text */}
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-1">Button Text</label>
          <input
            type="text"
            value={form.ctaText}
            onChange={e => setForm(f => ({ ...f, ctaText: e.target.value }))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </div>

        {/* Stats */}
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">Stats</label>
          <div className="grid grid-cols-3 gap-3">
            {form.stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-2 bg-brand-petal rounded-lg p-3">
                <input
                  type="text"
                  value={stat.value}
                  onChange={e => updateStat(i, 'value', e.target.value)}
                  placeholder="e.g. 100+"
                  className="border border-gray-200 rounded-md px-2 py-1.5 text-sm text-center font-bold focus:outline-none focus:ring-2 focus:ring-brand-gold"
                />
                <input
                  type="text"
                  value={stat.label}
                  onChange={e => updateStat(i, 'label', e.target.value)}
                  placeholder="e.g. Happy Clients"
                  className="border border-gray-200 rounded-md px-2 py-1.5 text-xs text-center focus:outline-none focus:ring-2 focus:ring-brand-gold"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Save */}
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
