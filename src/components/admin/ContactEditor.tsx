'use client'

import { useState } from 'react'
import type { ContactContent, ContactCard } from '@/lib/types'

interface ContactEditorProps {
  content: ContactContent
  onUpdate: (content: ContactContent) => void
}

const ICON_OPTIONS: ContactCard['icon'][] = ['line', 'phone', 'facebook', 'instagram', 'custom']

function newCard(): ContactCard {
  return { id: Date.now().toString(), label: '', value: '', href: '', icon: 'custom' }
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

  const updateCard = (index: number, patch: Partial<ContactCard>) => {
    const cards = form.cards.map((c, i) => i === index ? { ...c, ...patch } : c)
    setForm(f => ({ ...f, cards }))
  }

  const addCard = () => setForm(f => ({ ...f, cards: [...(f.cards ?? []), newCard()] }))

  const removeCard = (index: number) => {
    setForm(f => ({ ...f, cards: f.cards.filter((_, i) => i !== index) }))
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

        {/* Contact Cards */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold tracking-widest uppercase text-gray-500">Contact Cards</label>
            <button
              onClick={addCard}
              className="text-xs text-brand-goldDark font-bold hover:text-brand-crimson transition-colors"
            >
              + Add Card
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {(form.cards ?? []).map((card, i) => (
              <div key={card.id} className="border border-gray-100 rounded-xl p-3 bg-gray-50 flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-400 mb-0.5">Label</label>
                    <input
                      type="text"
                      value={card.label}
                      onChange={e => updateCard(i, { label: e.target.value })}
                      placeholder="e.g. Line"
                      className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-0.5">Display Value</label>
                    <input
                      type="text"
                      value={card.value}
                      onChange={e => updateCard(i, { value: e.target.value })}
                      placeholder="e.g. @orangiisomm"
                      className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-0.5">Link (href)</label>
                  <input
                    type="text"
                    value={card.href}
                    onChange={e => updateCard(i, { href: e.target.value })}
                    placeholder="https://... or tel:..."
                    className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-gray-400">Icon</label>
                    <select
                      value={card.icon}
                      onChange={e => updateCard(i, { icon: e.target.value as ContactCard['icon'] })}
                      className="border border-gray-200 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    >
                      {ICON_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => removeCard(i)}
                    className="text-xs text-red-400 hover:text-brand-crimson font-bold transition-colors"
                  >
                    Remove
                  </button>
                </div>
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
