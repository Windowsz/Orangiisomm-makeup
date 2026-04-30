'use client'

import { useState } from 'react'
import Link from 'next/link'

const links = [
  { href: '#home',     label: 'Home' },
  { href: '#gallery',  label: 'Gallery' },
  { href: '#facebook', label: 'Facebook' },
  { href: '#about',    label: 'About' },
  { href: '#contact',  label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-cream/90 backdrop-blur-md border-b border-brand-rose/30">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display text-xl font-bold tracking-wide text-brand-goldDark">
          Orangiisomm
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-body text-sm tracking-widest uppercase text-gray-600 hover:text-brand-goldDark transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-brand-goldDark transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-brand-goldDark transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-brand-goldDark transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-brand-cream border-t border-brand-rose/30 px-6 pb-4">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 font-body text-sm tracking-widest uppercase text-gray-600 hover:text-brand-goldDark border-b border-brand-rose/20 last:border-0"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
