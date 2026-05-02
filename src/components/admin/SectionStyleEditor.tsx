'use client'

import type { SectionStyle } from '@/lib/types'

interface SectionStyleEditorProps {
  label: string
  value: SectionStyle
  onChange: (v: SectionStyle) => void
}

const EXAMPLES = [
  'background-color: #FAD4E0;',
  'background: linear-gradient(135deg, #FAD4E0 0%, #C9A96E 100%);',
  'background-image: url(https://...); background-size: cover; background-position: center;',
]

export default function SectionStyleEditor({ label, value, onChange }: SectionStyleEditorProps) {
  return (
    <div className="border border-gray-100 rounded-xl p-4 bg-gray-50">
      <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">{label}</p>
      <textarea
        rows={3}
        value={value.bgCss ?? ''}
        onChange={e => onChange({ bgCss: e.target.value })}
        spellCheck={false}
        placeholder={`CSS only (not SCSS). Examples:\n${EXAMPLES[0]}\n${EXAMPLES[1]}`}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-gold resize-y bg-white"
      />
      <p className="text-[10px] text-gray-400 mt-1">
        Leave empty to use the default background. CSS only — SCSS is not supported.
      </p>
    </div>
  )
}
