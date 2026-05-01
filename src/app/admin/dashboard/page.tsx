'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { SiteContent, SectionStyles } from '@/lib/types'
import GalleryManager from '@/components/admin/GalleryManager'
import HeroEditor from '@/components/admin/HeroEditor'
import AboutEditor from '@/components/admin/AboutEditor'
import ContactEditor from '@/components/admin/ContactEditor'
import GallerySettingsEditor from '@/components/admin/GallerySettingsEditor'
import SectionStyleEditor from '@/components/admin/SectionStyleEditor'

export default function DashboardPage() {
  const router = useRouter()
  const [content, setContent] = useState<SiteContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [stylesSaving, setStylesSaving] = useState(false)
  const [stylesSaved, setStylesSaved] = useState(false)

  useEffect(() => {
    fetch('/api/content')
      .then(r => r.json())
      .then((data: SiteContent) => setContent(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin')
  }

  const saveSectionStyles = async (sectionStyles: SectionStyles) => {
    setStylesSaving(true)
    setStylesSaved(false)
    try {
      const res = await fetch('/api/content', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sectionStyles }),
      })
      if (res.ok) {
        setContent(c => c ? { ...c, sectionStyles } : c)
        setStylesSaved(true)
        setTimeout(() => setStylesSaved(false), 3000)
      }
    } finally {
      setStylesSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-65px)]">
        <div className="text-brand-goldDark font-display text-lg animate-pulse">Loading…</div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-65px)]">
        <p className="text-brand-crimson">Failed to load content. Please refresh.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-800">Content Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Last updated: {new Date(content.updatedAt).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            className="text-sm text-brand-goldDark hover:underline font-body"
          >
            View Site ↗
          </a>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-brand-crimson font-body transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <GalleryManager
          images={content.gallery}
          onUpdate={gallery => setContent(c => c ? { ...c, gallery } : c)}
        />

        <GallerySettingsEditor
          settings={content.gallerySettings}
          onUpdate={gallerySettings => setContent(c => c ? { ...c, gallerySettings } : c)}
        />

        <HeroEditor
          content={content.hero}
          onUpdate={hero => setContent(c => c ? { ...c, hero } : c)}
        />

        <AboutEditor
          content={content.about}
          onUpdate={about => setContent(c => c ? { ...c, about } : c)}
        />

        <ContactEditor
          content={content.contact}
          onUpdate={contact => setContent(c => c ? { ...c, contact } : c)}
        />

        {/* Section Backgrounds */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-display text-lg font-bold text-gray-800 mb-4">Section Backgrounds</h2>
          <p className="text-xs text-gray-400 mb-4 font-body">
            Set a background color or image URL for each section. Leave empty to use the default style.
          </p>
          <div className="flex flex-col gap-3">
            <SectionStyleEditor
              label="Hero"
              value={content.sectionStyles.hero}
              onChange={v => setContent(c => c ? { ...c, sectionStyles: { ...c.sectionStyles, hero: v } } : c)}
            />
            <SectionStyleEditor
              label="Gallery"
              value={content.sectionStyles.gallery}
              onChange={v => setContent(c => c ? { ...c, sectionStyles: { ...c.sectionStyles, gallery: v } } : c)}
            />
            <SectionStyleEditor
              label="Facebook"
              value={content.sectionStyles.facebook}
              onChange={v => setContent(c => c ? { ...c, sectionStyles: { ...c.sectionStyles, facebook: v } } : c)}
            />
            <SectionStyleEditor
              label="About & Contact"
              value={content.sectionStyles.aboutContact}
              onChange={v => setContent(c => c ? { ...c, sectionStyles: { ...c.sectionStyles, aboutContact: v } } : c)}
            />
          </div>
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => content && saveSectionStyles(content.sectionStyles)}
              disabled={stylesSaving}
              className="bg-brand-goldDark text-white text-sm font-bold tracking-widest uppercase px-5 py-2 rounded-lg hover:bg-brand-gold transition-colors disabled:opacity-60"
            >
              {stylesSaving ? 'Saving…' : 'Save Backgrounds'}
            </button>
            {stylesSaved && <span className="text-green-600 text-sm font-body">Saved ✓</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
