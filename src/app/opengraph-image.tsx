import { ImageResponse } from 'next/og';

export const alt = 'Göktuğ Turhan — Embedded & Software Engineering Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: '#ff9500',
              }}
            />
            <span style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.5px' }}>
              alazlab.com
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              padding: '6px 16px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              fontSize: '16px',
              fontFamily: 'monospace',
              color: '#a1a1aa',
            }}
          >
            41 Systems · TR & EN
          </div>
        </div>

        {/* Center Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: '64px',
              fontWeight: 900,
              letterSpacing: '-2px',
              lineHeight: 1.1,
              color: '#ffffff',
            }}
          >
            Göktuğ Turhan
          </div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 400,
              color: '#a1a1aa',
              maxWidth: '850px',
              lineHeight: 1.4,
            }}
          >
            Embedded Hardware & Software Engineer. Automotive CAN Radar, Android Launchers, and Rust Orchestration Kernels.
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {['ESP32-S3', 'CAN 2.0B / FD', 'Kotlin Compose', 'Rust Tokio', 'Next.js 16'].map((tag) => (
            <div
              key={tag}
              style={{
                padding: '8px 18px',
                borderRadius: '12px',
                background: 'rgba(255, 149, 0, 0.15)',
                border: '1px solid rgba(255, 149, 0, 0.3)',
                color: '#ff9500',
                fontSize: '16px',
                fontWeight: 700,
                fontFamily: 'monospace',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
