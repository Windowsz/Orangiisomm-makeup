'use client'

import { useState } from 'react'
import type { PricingContent, PricingCard } from '@/lib/types'

interface PricingEditorProps {
  content: PricingContent
  onUpdate: (content: PricingContent) => void
}

function newCard(): PricingCard {
  return {
    id: Date.now().toString(),
    title: 'New Package',
    price: '฿0',
    priceNote: 'per session',
    description: '',
    features: [''],
    highlighted: false,
    ctaText: 'Book Now',
    ctaHref: '#contact',
  }
}

export default function PricingEditor({ content, onUpdate }: PricingEditorProps) {
  const [form, setForm] = useState(content)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(form.cards[0]?.id ?? null)

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    try {
      const res = await fetch('/api/content', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pricing: form }),
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

  const updateCard = (index: number, patch: Partial<PricingCard>) => {
    setForm(f => ({
      ...f,
      cards: f.cards.map((c, i) => i === index ? { ...c, ...patch } : c),
    }))
  }

  const updateFeature = (cardIndex: number, featIndex: number, value: string) => {
    const features = [...form.cards[cardIndex].features]
    features[featIndex] = value
    updateCard(cardIndex, { features })
  }

  const addFeature = (cardIndex: number) => {
    const features = [...form.cards[cardIndex].features, '']
    updateCard(cardIndex, { features })
  }

  const removeFeature = (cardIndex: number, featIndex: number) => {
    const features = form.cards[cardIndex].features.filter((_, i) => i !== featIndex)
    updateCard(cardIndex, { features })
  }

  const addCard = () => {
    const card = newCard()
    setForm(f => ({ ...f, cards: [...f.cards, card] }))
    setExpanded(card.id)
  }

  const removeCard = (index: number) => {
    setForm(f => ({ ...f, cards: f.cards.filter((_, i) => i !== index) }))
  }

  const moveCard = (index: number, dir: -1 | 1) => {
    const cards = [...form.cards]
    const swap = index + dir
    if (swap < 0 || swap >= cards.length) return
    ;[cards[index], cards[swap]] = [cards[swap], cards[index]]
    setForm(f => ({ ...f, cards }))
  }

  const inputCls = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold'

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="font-display text-lg font-bold text-gray-800 mb-4">Pricing Section</h2>

      <div className="flex flex-col gap-5">
        {/* Section headline */}
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-1">Section Headline</label>
          <input
            type="text"
            value={form.headline}
            onChange={e => setForm(f => ({ ...f, headline: e.target.value }))}
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-gray-500 mb-1">Section Subheadline</label>
          <input
            type="text"
            value={form.subheadline ?? ''}
            onChange={e => setForm(f => ({ ...f, subheadline: e.target.value }))}
            placeholder="Optional subtitle text"
            className={inputCls}
          />
        </div>

        {/* Cards */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold tracking-widest uppercase text-gray-500">Pricing Cards</label>
            <button
              onClick={addCard}
              className="text-xs text-brand-goldDark font-bold hover:text-brand-crimson transition-colors"
            >
              + Add Card
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {form.cards.map((card, ci) => (
              <div key={card.id} className="border border-gray-100 rounded-xl overflow-hidden">
                {/* Card header — click to expand */}
                <button
                  type="button"
                  onClick={() => setExpanded(expanded === card.id ? null : card.id)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-body font-bold text-sm text-gray-700">{card.title || 'Untitled'}</span>
                    <span className="font-body text-xs text-gray-400">{card.price}</span>
                    {card.highlighted && (
                      <span className="text-[10px] bg-brand-crimson text-white px-2 py-0.5 rounded-full font-bold">Popular</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={e => { e.stopPropagation(); moveCard(ci, -1) }}
                      disabled={ci === 0}
                      className="text-gray-400 hover:text-gray-700 disabled:opacity-30 px-1"
                      title="Move up"
                    >↑</button>
                    <button
                      onClick={e => { e.stopPropagation(); moveCard(ci, 1) }}
                      disabled={ci === form.cards.length - 1}
                      className="text-gray-400 hover:text-gray-700 disabled:opacity-30 px-1"
                      title="Move down"
                    >↓</button>
                    <button
                      onClick={e => { e.stopPropagation(); removeCard(ci) }}
                      className="text-red-300 hover:text-brand-crimson text-xs font-bold px-1"
                    >✕</button>
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform ${expanded === card.id ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Card body */}
                {expanded === card.id && (
                  <div className="p-4 flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-0.5">Title</label>
                        <input type="text" value={card.title} onChange={e => updateCard(ci, { title: e.target.value })} className={inputCls} />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-0.5">Price</label>
                        <input type="text" value={card.price} onChange={e => updateCard(ci, { price: e.target.value })} placeholder="฿0" className={inputCls} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-0.5">Price Note</label>
                        <input type="text" value={card.priceNote ?? ''} onChange={e => updateCard(ci, { priceNote: e.target.value })} placeholder="per session" className={inputCls} />
                      </div>
                      <div className="flex items-center gap-2 pt-5">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={!!card.highlighted}
                            onChange={e => updateCard(ci, { highlighted: e.target.checked })}
                          />
                          <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-goldDark" />
                        </label>
                        <span className="text-sm text-gray-600 font-body">Mark as Popular</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-0.5">Description</label>
                      <textarea
                        rows={2}
                        value={card.description ?? ''}
                        onChange={e => updateCard(ci, { description: e.target.value })}
                        className={`${inputCls} resize-none`}
                      />
                    </div>

                    {/* Features */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs text-gray-400">Features (checklist)</label>
                        <button onClick={() => addFeature(ci)} className="text-xs text-brand-goldDark font-bold hover:text-brand-crimson">+ Add</button>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {card.features.map((feat, fi) => (
                          <div key={fi} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={feat}
                              onChange={e => updateFeature(ci, fi, e.target.value)}
                              placeholder={`Feature ${fi + 1}`}
                              className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
                            />
                            <button
                              onClick={() => removeFeature(ci, fi)}
                              className="text-red-300 hover:text-brand-crimson text-xs px-1"
                            >✕</button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-0.5">Button Text</label>
                        <input type="text" value={card.ctaText ?? ''} onChange={e => updateCard(ci, { ctaText: e.target.value })} placeholder="Book Now" className={inputCls} />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-0.5">Button Link</label>
                        <input type="text" value={card.ctaHref ?? ''} onChange={e => updateCard(ci, { ctaHref: e.target.value })} placeholder="#contact" className={inputCls} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-1">
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
