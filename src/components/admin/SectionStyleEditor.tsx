'use client'

import type { SectionStyle } from '@/lib/types'

interface SectionStyleEditorProps {
  label: string
  value: SectionStyle
  onChange: (v: SectionStyle) => void
}

export default function SectionStyleEditor({ label, value, onChange }: SectionStyleEditorProps) {
  return (
    <div className="border border-gray-100 rounded-xl p-4 bg-gray-50">
      <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">{label}</p>
      <div className="flex flex-col gap-3">
        {/* Background colour */}
        <div>
          <label className="block text-xs text-gray-400 mb-1">Background Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={value.bgColor || '#ffffff'}
              onChange={e => onChange({ ...value, bgColor: e.target.value })}
              className="w-9 h-9 rounded cursor-pointer border border-gray-200 p-0.5 bg-white"
            />
            <input
              type="text"
              value={value.bgColor || ''}
              onChange={e => onChange({ ...value, bgColor: e.target.value })}
              placeholder="#ffffff or empty for default"
              className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold font-mono"
            />
            {value.bgColor && (
              <button
                onClick={() => onChange({ ...value, bgColor: '' })}
                className="text-xs text-gray-400 hover:text-brand-crimson px-2 py-1.5 rounded border border-gray-200 hover:border-brand-crimson transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Background image URL */}
        <div>
          <label className="block text-xs text-gray-400 mb-1">Background Image URL</label>
          <input
            type="text"
            value={value.bgImageUrl || ''}
            onChange={e => onChange({ ...value, bgImageUrl: e.target.value })}
            placeholder="https://... (overrides color)"
            className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </div>
      </div>
    </div>
  )
}
