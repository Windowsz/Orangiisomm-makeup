'use client'

import { useRef, useState } from 'react'
import type { GalleryImage } from '@/lib/types'

const MAX_EDGE = 2000

async function compressImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height))
  const width = Math.max(1, Math.round(bitmap.width * scale))
  const height = Math.max(1, Math.round(bitmap.height * scale))
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('canvas')
  ctx.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()
  const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.82))
  if (!blob || blob.size > 4_000_000) throw new Error('large')
  return blob
}

async function uploadFile(file: File): Promise<string> {
  const blob = await compressImage(file)
  const body = new FormData()
  body.set('file', new File([blob], 'look.jpg', { type: 'image/jpeg' }))
  const res = await fetch('/api/media', { method: 'POST', body })
  const data = await res.json().catch(() => ({})) as { url?: string; error?: string }
  if (!res.ok || !data.url) throw new Error(data.error || 'อัปโหลดไม่สำเร็จ')
  return data.url
}

function forgetMedia(url: string) {
  const id = url.match(/^\/api\/media\/([0-9a-f-]{36})$/i)?.[1]
    ?? url.match(/^\/uploads\/([0-9a-f-]{36})\.(?:jpg|png|webp)$/i)?.[1]
  if (id) fetch(`/api/media/${id}`, { method: 'DELETE' }).catch(() => {})
}

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
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const save = async (updated: GalleryImage[]) => {
    setSaving(true)
    setSaved(false)
    try {
      const res = await fetch('/api/content', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gallery: updated }),
      })
      if (!res.ok) return false
      onUpdate(updated)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      return true
    } finally {
      setSaving(false)
    }
  }

  const addFiles = async (files: FileList | null) => {
    if (!files?.length) return
    setUploading(true)
    setError('')
    const added: GalleryImage[] = []
    try {
      for (const file of Array.from(files)) {
        const url = await uploadFile(file)
        added.push({
          id: Date.now().toString() + added.length,
          url,
          alt: newAlt.trim() || 'Makeup look',
          caption: newCaption.trim() || undefined,
        })
      }
      const updated = [...listRef.current, ...added]
      listRef.current = updated
      setList(updated)
      const stored = await save(updated)
      if (!stored) throw new Error('save')
      setNewAlt('')
      setNewCaption('')
    } catch {
      added.forEach(img => forgetMedia(img.url))
      setError('อัปโหลดไม่สำเร็จ ใช้ไฟล์ JPG, PNG หรือ WEBP')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const replaceFile = async (id: string, file: File | undefined) => {
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const url = await uploadFile(file)
      const previous = listRef.current.find(img => img.id === id)?.url
      commit(listRef.current.map(img => (img.id === id ? { ...img, url } : img)))
      if (previous) forgetMedia(previous)
    } catch {
      setError('เปลี่ยนรูปไม่สำเร็จ ใช้ไฟล์ JPG, PNG หรือ WEBP')
    } finally {
      setUploading(false)
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

  const remove = (id: string) => {
    const current = listRef.current.find(img => img.id === id)
    if (current) forgetMedia(current.url)
    commit(listRef.current.filter(item => item.id !== id))
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
        <span className="text-sm font-body">
          {saved && <span className="text-green-600">Saved ✓</span>}
          {error && <span className="text-brand-crimson">{error}</span>}
        </span>
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
                  <label className="mb-2 inline-flex text-xs text-gray-500 underline cursor-pointer">
                    เปลี่ยนรูป
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="sr-only"
                      disabled={saving || uploading}
                      onChange={e => {
                        const file = e.target.files?.[0]
                        e.target.value = ''
                        replaceFile(img.id, file)
                      }}
                    />
                  </label>
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
                  onClick={() => remove(img.id)}
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
        <p className="text-xs text-gray-400">อัปโหลดไฟล์ได้เลย ระบบย่อด้านยาวให้ไม่เกิน 2000 พิกเซลแล้วเก็บไว้บนเว็บ</p>
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
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={saving || uploading}
            className="bg-brand-crimson text-white text-sm font-bold tracking-widest uppercase px-5 py-2 rounded-lg hover:bg-red-800 transition-colors disabled:opacity-40"
          >
            {uploading ? 'กำลังอัปโหลด…' : '+ อัปโหลดรูป'}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="sr-only"
            onChange={e => addFiles(e.target.files)}
          />
        </div>
        <input
          type="url"
          value={newUrl}
          onChange={e => setNewUrl(e.target.value)}
          placeholder="หรือวางลิงก์รูปที่เปิดได้ถาวร"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
        />
        <button
          type="button"
          onClick={addImage}
          disabled={!newUrl.trim() || saving || uploading}
          className="self-start border border-gray-300 text-gray-600 text-sm font-bold tracking-widest uppercase px-5 py-2 rounded-lg hover:border-brand-gold disabled:opacity-40"
        >
          เพิ่มจากลิงก์
        </button>
      </div>
    </div>
  )
}
