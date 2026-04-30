export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 text-center">
      <p className="font-display text-brand-gold text-lg mb-2">Orangiisomm</p>
      <p className="text-sm mb-4 italic">Made with love &amp; lipstick ♥</p>
      <a
        href="https://www.facebook.com/Orangiisommakeup"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-goldLight transition-colors text-sm"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
        </svg>
        Facebook
      </a>
      <p className="mt-6 text-xs text-gray-600">
        © {new Date().getFullYear()} Orangiisomm. All rights reserved.
      </p>
    </footer>
  )
}
