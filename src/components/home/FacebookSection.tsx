const FB_IFRAME_SRC =
  'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FOrangiisommmakeup&tabs=timeline&width=500&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=1361869480966534'

const FB_PAGE_URL = 'https://www.facebook.com/Orangiisommmakeup'

export default function FacebookSection() {
  return (
    <section id="facebook" className="py-20 px-6 bg-brand-petal">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-brand-goldDark mb-3">
            Follow Along
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Latest from Facebook
          </h2>
          <div className="gold-divider mb-4" />
          <a
            href={FB_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#1877F2] font-body text-sm font-bold hover:underline"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
            </svg>
            @Orangiisommmakeup
          </a>
        </div>

        {/* Centered iframe with CTA below */}
        <div className="flex flex-col items-center gap-6">
          <div className="w-full max-w-[500px] rounded-2xl overflow-hidden shadow-xl border border-brand-rose/20">
            <iframe
              src={FB_IFRAME_SRC}
              width="500"
              height="700"
              style={{ border: 'none', overflow: 'hidden', display: 'block', width: '100%' }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              title="Orangiisomm Facebook Page"
            />
          </div>

          <a
            href={FB_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1877F2] text-white font-body font-bold tracking-wider text-sm px-8 py-3.5 rounded-full hover:bg-[#0d6efd] hover:scale-105 transition-all duration-200 shadow-lg shadow-blue-400/30"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
            </svg>
            Like &amp; Follow on Facebook
          </a>
        </div>
      </div>
    </section>
  )
}
