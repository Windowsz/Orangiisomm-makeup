const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://orangiisomm-makeup.vercel.app'
const FB_URL = 'https://www.facebook.com/Orangiisommmakeup'

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Orangiisomm',
      alternateName: 'Orangiisomm ช่างแต่งหน้ามืออาชีพ',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.svg`,
      },
      sameAs: [FB_URL],
    },
    {
      '@type': ['LocalBusiness', 'BeautyService'],
      '@id': `${SITE_URL}/#business`,
      name: 'Orangiisomm — ช่างแต่งหน้ามืออาชีพ',
      alternateName: 'Orangiisomm Professional Makeup Artist',
      description:
        'ช่างแต่งหน้ามืออาชีพ รับแต่งหน้าเจ้าสาว งานแต่งงาน ถ่ายภาพ และโอกาสพิเศษทุกประเภท — Professional makeup artist for bridal, wedding, editorial, and special occasions in Thailand.',
      url: SITE_URL,
      image: `${SITE_URL}/api/og`,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'TH',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Thailand',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'บริการแต่งหน้า / Makeup Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'แต่งหน้าเจ้าสาว / Bridal Makeup' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'แต่งหน้างานแต่งงาน / Wedding Makeup' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'แต่งหน้าถ่ายภาพ / Editorial & Photoshoot Makeup' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'แต่งหน้าโอกาสพิเศษ / Special Occasion Makeup' } },
        ],
      },
      sameAs: [FB_URL],
      parentOrganization: { '@id': `${SITE_URL}/#organization` },
    },
  ],
}

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
