export default function ContactSection() {
  return (
    <section id="contact" className="py-20 px-6 bg-brand-blush">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-body text-xs tracking-[0.3em] uppercase text-brand-goldDark mb-3">
          Get In Touch
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Book Your Look
        </h2>
        <div className="gold-divider mb-6" />
        <p className="font-body text-gray-600 text-lg leading-relaxed mb-10">
          Ready to transform your look? DM me on Facebook for bookings, pricing, and availability.
          Whether it&apos;s a wedding, photoshoot, or special occasion — I&apos;d love to work with you.
        </p>

        <a
          href="https://www.facebook.com/Orangiisommakeup"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#1877F2] text-white font-body font-bold tracking-wider text-sm px-10 py-4 rounded-full hover:bg-[#0d6efd] hover:scale-105 transition-all duration-200 shadow-lg shadow-blue-400/30"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
          </svg>
          Message on Facebook
        </a>

        <div className="mt-12 flex justify-center gap-8 text-brand-goldDark">
          <div className="text-center">
            <p className="font-display text-3xl font-bold">100+</p>
            <p className="font-body text-sm text-gray-500 mt-1">Happy Clients</p>
          </div>
          <div className="w-px bg-brand-rose" />
          <div className="text-center">
            <p className="font-display text-3xl font-bold">5★</p>
            <p className="font-body text-sm text-gray-500 mt-1">Rated Service</p>
          </div>
          <div className="w-px bg-brand-rose" />
          <div className="text-center">
            <p className="font-display text-3xl font-bold">3+</p>
            <p className="font-body text-sm text-gray-500 mt-1">Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  )
}
