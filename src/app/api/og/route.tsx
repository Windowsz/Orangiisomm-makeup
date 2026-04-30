import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(ellipse at 60% 40%, #FAD4E0 0%, #F7E8EE 45%, #FFF8F9 100%)',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            left: 60,
            width: 260,
            height: 260,
            borderRadius: '50%',
            background: 'rgba(250,212,224,0.5)',
            filter: 'blur(60px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            right: 60,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(232,213,176,0.4)',
            filter: 'blur(60px)',
          }}
        />

        {/* Gold top divider */}
        <div style={{ width: 80, height: 3, background: '#C9A96E', marginBottom: 32, borderRadius: 2 }} />

        {/* Thai subtitle */}
        <p
          style={{
            fontSize: 28,
            color: '#A07840',
            letterSpacing: '0.2em',
            margin: '0 0 16px 0',
            fontFamily: 'Georgia, serif',
          }}
        >
          ช่างแต่งหน้ามืออาชีพ
        </p>

        {/* Brand name */}
        <h1
          style={{
            fontSize: 96,
            fontWeight: 'bold',
            color: '#A07840',
            margin: '0 0 16px 0',
            letterSpacing: '-0.01em',
            fontFamily: 'Georgia, serif',
          }}
        >
          Orangiisomm
        </h1>

        {/* English subtitle */}
        <p
          style={{
            fontSize: 32,
            color: '#6b7280',
            margin: '0 0 40px 0',
            fontFamily: 'Georgia, serif',
          }}
        >
          Professional Makeup Artist
        </p>

        {/* Gold bottom divider */}
        <div style={{ width: 80, height: 3, background: '#C9A96E', marginBottom: 32, borderRadius: 2 }} />

        {/* Lipstick accent + Facebook */}
        <p style={{ fontSize: 24, color: '#A07840', margin: 0 }}>
          💄 facebook.com/Orangiisommmakeup
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
