'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import type { SocialContent } from '@/lib/types'

const QuillEditor = dynamic(() => import('./QuillEditor'), {
  ssr: false,
  loading: () => (
    <div className="h-80 border border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center text-sm text-gray-400">
      Loading editor…
    </div>
  ),
})

interface SocialEditorProps {
  content: SocialContent
  onUpdate: (content: SocialContent) => void
}

export default function SocialEditor({ content, onUpdate }: SocialEditorProps) {
  const [html, setHtml] = useState(content.html)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [sourceMode, setSourceMode] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    try {
      const res = await fetch('/api/content', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ social: { html } }),
      })
      if (res.ok) {
        onUpdate({ html })
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-display text-lg font-bold text-gray-800">Social Section</h2>
        <button
          onClick={() => setSourceMode(m => !m)}
          className="text-xs font-bold tracking-widest uppercase text-brand-goldDark hover:text-brand-crimson transition-colors"
        >
          {sourceMode ? '✎ Rich Text' : '</> HTML Source'}
        </button>
      </div>
      <p className="text-xs text-gray-400 font-body mb-4">
        {sourceMode
          ? 'Edit raw HTML — paste Facebook embeds, iframes, or any custom HTML here.'
          : 'Use the rich text editor to format content. Switch to HTML Source to embed iframes (Facebook, TikTok, etc.).'}
      </p>

      {sourceMode ? (
        <textarea
          value={html}
          onChange={e => setHtml(e.target.value)}
          rows={16}
          spellCheck={false}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-gold resize-y bg-gray-50"
          placeholder="<div>Your HTML here…</div>"
        />
      ) : (
        <QuillEditor value={html} onChange={setHtml} height={320} />
      )}

      <div className="flex items-center gap-3 mt-4">
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
  )
}
