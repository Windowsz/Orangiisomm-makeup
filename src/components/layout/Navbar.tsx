'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '#home',     label: 'Home' },
  { href: '#gallery',  label: 'Gallery' },
  { href: '#social',   label: 'Social' },
  { href: '#pricing',  label: 'Pricing' },
  { href: '#contact',  label: 'Contact' },
]

export default function Navbar() {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  const [ink, setInk] = useState(false)
  const onAdmin = path.startsWith('/admin')

  useEffect(() => {
    const sync = () => setInk(document.documentElement.dataset.nav === 'ink')
    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-nav'] })
    sync()
    return () => observer.disconnect()
  }, [])

  if (onAdmin) return null

  const tone = ink ? 'text-[#100e0c]' : 'text-[#f6f1e8]'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors ${tone} ${open ? (ink ? 'bg-[#f6f1e8]' : 'bg-[#100e0c]') : 'bg-transparent'}`}>
      <div className="px-6 md:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="font-editorial text-3xl tracking-wide">
          Orangiisomm
        </Link>

        <ul className="hidden md:flex gap-8">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-body text-[11px] tracking-[0.24em] uppercase opacity-80 hover:opacity-100 transition-opacity"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-current transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-4">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 font-body text-sm tracking-widest uppercase border-b border-current/15 last:border-0"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
