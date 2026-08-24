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
            <img
              src="data:image/png;base64,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"
              width={40}
              height={40}
              style={{ borderRadius: '10px' }}
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
