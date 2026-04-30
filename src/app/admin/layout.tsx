import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — Orangiisomm',
  robots: { index: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 font-body">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
        <span className="font-display text-lg font-bold text-brand-goldDark">Orangiisomm</span>
        <span className="text-gray-300">|</span>
        <span className="text-sm text-gray-500 tracking-widest uppercase">Admin</span>
      </header>
      {children}
    </div>
  )
}
