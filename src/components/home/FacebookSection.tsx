'use client'

import { useEffect, useRef } from 'react'

const FB_PAGE_URL = 'https://www.facebook.com/Orangiisommmakeup'
const ENCODED_URL = encodeURIComponent(FB_PAGE_URL)

export default function FacebookSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Resize the iframe width to match the container (Facebook SDK does this automatically,
  // but we trigger a re-parse when the component mounts so the plugin adapts to the layout)
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Load the Facebook JS SDK once
    if (!document.getElementById('facebook-jssdk')) {
      const script = document.createElement('script')
      script.id = 'facebook-jssdk'
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0'
      script.async = true
      script.defer = true
      script.crossOrigin = 'anonymous'
      document.body.appendChild(script)
    } else if (window.FB) {
      window.FB.XFBML.parse(containerRef.current ?? undefined)
    }
  }, [])

  return (
    <section id="facebook" className="py-20 px-6 bg-white">
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

        {/* Two-column layout: plugin left, fallback link right */}
        <div className="flex flex-col lg:flex-row gap-10 items-start justify-center">
          {/* Facebook Page Plugin — adapts width to container */}
          <div ref={containerRef} className="w-full lg:w-auto flex justify-center">
            <div
              className="fb-page shadow-xl rounded-2xl overflow-hidden"
              data-href={FB_PAGE_URL}
              data-tabs="timeline"
              data-width="500"
              data-height="600"
              data-small-header="false"
              data-adapt-container-width="true"
              data-hide-cover="false"
              data-show-facepile="true"
            />
          </div>

          {/* Sidebar CTA */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-brand-petal rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">💄</div>
              <h3 className="font-display text-xl font-bold text-brand-goldDark mb-3">
                See More on Facebook
              </h3>
              <p className="font-body text-gray-600 text-sm leading-relaxed mb-6">
                Follow the page for the latest makeup looks, behind-the-scenes, and booking availability.
              </p>
              <a
                href={FB_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1877F2] text-white font-body font-bold tracking-wider text-sm px-7 py-3 rounded-full hover:bg-[#0d6efd] hover:scale-105 transition-all duration-200 shadow-lg shadow-blue-400/30"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                </svg>
                Like &amp; Follow
              </a>

              <div className="mt-8 pt-6 border-t border-brand-rose/30">
                <p className="font-body text-xs text-gray-400 leading-relaxed">
                  DM on Facebook for bookings, pricing, and availability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
