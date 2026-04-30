'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { SiteContent } from '@/lib/types'
import GalleryManager from '@/components/admin/GalleryManager'
import HeroEditor from '@/components/admin/HeroEditor'
import AboutEditor from '@/components/admin/AboutEditor'

export default function DashboardPage() {
  const router = useRouter()
  const [content, setContent] = useState<SiteContent | null>(null)
  const [loading, setLoading] = useState(true)

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
        <HeroEditor
          content={content.hero}
          onUpdate={hero => setContent(c => c ? { ...c, hero } : c)}
        />
        <AboutEditor
          content={content.about}
          onUpdate={about => setContent(c => c ? { ...c, about } : c)}
        />
      </div>
    </div>
  )
}
