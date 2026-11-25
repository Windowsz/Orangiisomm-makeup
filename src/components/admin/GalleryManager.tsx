'use client'

import { useRef, useState } from 'react'
import type { GalleryImage } from '@/lib/types'

interface GalleryManagerProps {
  images: GalleryImage[]
  onUpdate: (images: GalleryImage[]) => void
}

function placement(index: number) {
  if (index === 0) {
    return {
      title: 'หน้าแรก และ Look 1',
      note: 'รูปนี้เป็นพื้นหลังชื่อหน้าแรก และเป็นลุคแรกที่ค้างตอนเลื่อน',
    }
  }
  if (index === 1) return { title: 'Look 2', note: 'ลุคที่สองที่จางสลับตอนเลื่อนลง' }
  if (index === 2) return { title: 'Look 3', note: 'ลุคที่สามที่จางสลับตอนเลื่อนลง' }
  return { title: 'แถบ Gallery', note: 'อยู่ในแถบรูปที่ไหลไปด้านข้าง' }
}

export default function GalleryManager({ images, onUpdate }: GalleryManagerProps) {
  const [list, setList] = useState(images)
  const listRef = useRef(list)
  listRef.current = list
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

  const commit = (updated: GalleryImage[]) => {
    listRef.current = updated
    setList(updated)
    save(updated)
  }

  const move = (index: number, dir: -1 | 1) => {
    const curr = listRef.current
    const next = index + dir
    if (next < 0 || next >= curr.length) return
    const updated = [...curr]
    const [item] = updated.splice(index, 1)
    updated.splice(next, 0, item)
    commit(updated)
  }

  const patch = (id: string, fields: Partial<GalleryImage>) => {
    commit(listRef.current.map(img => (img.id === id ? { ...img, ...fields } : img)))
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-display text-lg font-bold text-gray-800">รูปบนหน้าแรก</h2>
        {saved && <span className="text-green-600 text-sm font-body">Saved ✓</span>}
      </div>
      <p className="text-sm text-gray-500 leading-relaxed mb-5">
        ลำดับบนลงล่างคือลำดับบนเว็บ รูปที่ 1 ถึง 3 เป็นลุคตอนเลื่อน และรูปที่ 1 เป็นพื้นหลังชื่อหน้าแรกด้วย
        ทุกรูปอยู่ในแถบ Gallery
      </p>

      <div className="flex flex-col gap-3 mb-6">
        {list.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-6">ยังไม่มีรูป</p>
        )}
        {list.map((img, i) => {
          const place = placement(i)
          const featured = i < 3
          return (
            <div
              key={img.id}
              className={`rounded-xl border p-3 ${featured ? 'border-brand-gold/50 bg-brand-cream' : 'border-gray-100 bg-gray-50'}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center gap-1 pt-1">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    disabled={i === 0 || saving}
                    className="text-gray-400 hover:text-brand-goldDark disabled:opacity-30"
                    aria-label="ย้ายขึ้น"
                  >
                    ▲
                  </button>
                  <span className="text-xs font-bold text-gray-400">{i + 1}</span>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    disabled={i === list.length - 1 || saving}
                    className="text-gray-400 hover:text-brand-goldDark disabled:opacity-30"
                    aria-label="ย้ายลง"
                  >
                    ▼
                  </button>
                </div>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt=""
                  className="w-16 h-20 object-cover rounded-md bg-gray-200 flex-shrink-0"
                  onError={e => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="80"><rect fill="%23eee" width="64" height="80"/></svg>' }}
                />

                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold tracking-wide uppercase ${featured ? 'text-brand-goldDark' : 'text-gray-500'}`}>
                    {place.title}
                  </p>
                  <p className="text-xs text-gray-400 mb-2">{place.note}</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={img.caption ?? ''}
                      onChange={e => setList(curr => curr.map(item => item.id === img.id ? { ...item, caption: e.target.value } : item))}
                      onBlur={e => patch(img.id, { caption: e.target.value.trim() || undefined })}
                      placeholder={featured ? 'ชื่อลุคที่โชว์ตัวใหญ่' : 'ป้ายบนรูปในแถบ Gallery'}
                      className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    />
                    <input
                      type="text"
                      value={img.alt}
                      onChange={e => setList(curr => curr.map(item => item.id === img.id ? { ...item, alt: e.target.value } : item))}
                      onBlur={e => patch(img.id, { alt: e.target.value.trim() || 'Makeup look' })}
                      placeholder={featured ? 'คำอธิบายสั้นใต้ชื่อลุค' : 'คำอธิบายรูป'}
                      className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => commit(listRef.current.filter(item => item.id !== img.id))}
                  disabled={saving}
                  className="text-gray-400 hover:text-brand-crimson p-1"
                  aria-label={`ลบ ${img.caption || img.alt}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="border border-dashed border-brand-rose rounded-xl p-4 flex flex-col gap-3">
        <p className="text-xs font-bold tracking-widest uppercase text-gray-500">เพิ่มรูป</p>
        <p className="text-xs text-gray-400">ใช้ลิงก์รูปที่เปิดได้ถาวร ลิงก์จาก Facebook หมดอายุแล้วรูปจะหาย</p>
        <input
          type="url"
          value={newUrl}
          onChange={e => setNewUrl(e.target.value)}
          placeholder="ลิงก์รูป"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
        />
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={newCaption}
            onChange={e => setNewCaption(e.target.value)}
            placeholder="ชื่อที่แสดง"
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
          <input
            type="text"
            value={newAlt}
            onChange={e => setNewAlt(e.target.value)}
            placeholder="คำอธิบาย"
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
        </div>
        <button
          type="button"
          onClick={addImage}
          disabled={!newUrl.trim() || saving}
          className="self-start bg-brand-crimson text-white text-sm font-bold tracking-widest uppercase px-5 py-2 rounded-lg hover:bg-red-800 transition-colors disabled:opacity-40"
        >
          + เพิ่มท้ายรายการ
        </button>
      </div>
    </div>
  )
}
