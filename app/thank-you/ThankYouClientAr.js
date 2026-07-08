'use client';
import { useEffect } from 'react';
import { LogoIcon, LogoText } from '../../components/Logo';

export default function ThankYouClientAr() {
  useEffect(() => {
    /* ── Fire Google Ads conversion on page load ── */
    if (typeof window !== 'undefined' && window.gtag) {
      /* Determine which conversion to fire from sessionStorage flag */
      const convType = sessionStorage.getItem('_zm_last_conv') || 'contact';
      const convId = convType === 'demo'
        ? window._GADS_CONV_DEMO
        : window._GADS_CONV_CONTACT;

      window.gtag('event', 'conversion', {
        send_to: convId,
        event_callback: () => {},
      });

      /* GA4 purchase-equivalent for lead value tracking */
      window.gtag('event', 'generate_lead', {
        event_category: 'Lead',
        event_label: convType === 'demo' ? 'Demo Request' : 'Contact Form',
        currency: 'SAR',
        value: convType === 'demo' ? 500 : 200,
      });

      sessionStorage.removeItem('_zm_last_conv');
    }
  }, []);

  return (
    <div dir="rtl" lang="ar">
      <main style={{
        minHeight: '100vh',
        background: '#060D1F',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        textAlign: 'center',
        fontFamily: "'Tajawal', 'Geist', sans-serif",
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
          <LogoIcon height={36} />
          <LogoText height={18} />
        </div>

        <div style={{
          background: 'rgba(0,212,180,0.06)',
          border: '1px solid rgba(0,212,180,0.2)',
          borderRadius: 16,
          padding: '48px 40px',
          maxWidth: 520,
          width: '100%',
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
          <h1 style={{ color: '#00D4B4', fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
            شكراً لك
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.7, marginBottom: 8 }}>
            تم استلام رسالتك. سيرد عليك فريقنا خلال 24 ساعة.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginBottom: 32 }}>
            للأمور العاجلة، تواصل معنا مباشرة عبر واتساب.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/ar"
              style={{
                background: '#D4AF37',
                color: '#060D1F',
                padding: '12px 28px',
                borderRadius: 8,
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: 14,
              }}
            >
              العودة للرئيسية
            </a>
            <a
              href="https://wa.me/966552995295"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'transparent',
                color: '#00D4B4',
                border: '1px solid rgba(0,212,180,0.3)',
                padding: '12px 28px',
                borderRadius: 8,
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: 14,
              }}
            >
              راسلنا عبر واتساب
            </a>
          </div>
        </div>

        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, marginTop: 40 }}>
          © {new Date().getFullYear()} زيماء. جميع الحقوق محفوظة.
        </p>
      </main>
    </div>
  );
}
