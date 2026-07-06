import './globals.css';
import Script from 'next/script';
import FloatingButtons from '../components/FloatingButtons';

const GA4_ID          = process.env.NEXT_PUBLIC_GA4_ID          || 'G-XXXXXXXXXX';
const GADS_ID         = process.env.NEXT_PUBLIC_GADS_ID         || 'AW-XXXXXXXXX';
const GADS_CONV_DEMO  = process.env.NEXT_PUBLIC_GADS_CONV_DEMO  || 'AW-XXXXXXXXX/XXXXXXXXX';
const GADS_CONV_CONTACT = process.env.NEXT_PUBLIC_GADS_CONV_CONTACT || 'AW-XXXXXXXXX/XXXXXXXXX';
const SITE_URL = 'https://zeemaa.com';

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Zeemaa',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  description: 'Leading event technology provider in Saudi Arabia.',
  telephone: '+966552995295',
  email: 'hello@zeemaa.com',
  address: [
    { '@type': 'PostalAddress', addressLocality: 'Riyadh', addressCountry: 'SA' },
    { '@type': 'PostalAddress', addressLocality: 'Dammam', addressCountry: 'SA' },
  ],
  areaServed: { '@type': 'Country', name: 'Saudi Arabia' },
  sameAs: ['https://www.linkedin.com/company/zeemaa', 'https://www.instagram.com/zeemaa.ksa'],
};

const schemaWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: SITE_URL,
  name: 'Zeemaa',
};

const schemaLocalRiyadh = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Zeemaa Event Technology Riyadh',
  url: SITE_URL,
  telephone: '+966552995295',
  address: { '@type': 'PostalAddress', addressLocality: 'Riyadh', addressCountry: 'SA' },
};

const schemaLocalDammam = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Zeemaa Event Technology Dammam',
  url: SITE_URL,
  telephone: '+966552995295',
  address: { '@type': 'PostalAddress', addressLocality: 'Dammam', addressCountry: 'SA' },
};

const schemaFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What types of events does Zeemaa support?', acceptedAnswer: { '@type': 'Answer', text: 'Conferences, exhibitions, corporate events, award ceremonies, government events, workshops and seminars across KSA.' } },
    { '@type': 'Question', name: 'How quickly can you set up a registration platform?', acceptedAnswer: { '@type': 'Answer', text: '5 to 7 business days for standard events. Rush setups available.' } },
    { '@type': 'Question', name: 'Do you provide on-site support?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Our team manages check-in, badge printing, and tech support throughout your event.' } },
    { '@type': 'Question', name: 'What payment methods are supported?', acceptedAnswer: { '@type': 'Answer', text: 'MADA, Apple Pay, Visa, Mastercard via certified Saudi gateways including Moyasar.' } },
    { '@type': 'Question', name: 'Can the platform handle Arabic and English?', acceptedAnswer: { '@type': 'Answer', text: 'Full bilingual support including RTL layouts, forms, badges and certificates.' } },
  ],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Zeemaa | Event Technology & Registration Solutions in Saudi Arabia',
    template: '%s',
  },
  description: 'Zeemaa delivers fully managed on-site event technology across KSA: registration, QR check-in, badge printing, accreditation, ticketing, certificates, on-site comms, and CCTV.',
  robots: { index: true, follow: true },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Zeemaa | Event Technology & Registration Solutions in Saudi Arabia',
    description: 'Fully managed on-site event technology across KSA.',
    type: 'website',
    url: SITE_URL,
    siteName: 'Zeemaa',
    locale: 'en_US',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zeemaa | Event Technology Solutions Saudi Arabia',
    description: 'Registration, badges, certificates, ticketing, and full on-site event operations across KSA.',
    images: [`${SITE_URL}/og-image.png`],
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 25 215 170'%3E%3Cpath d='M105.28,92.35H64.31c-12.14,0-23.4,6.29-29.78,16.62L8.65,150.91c0,0-0.2,0.28-0.2,0.32h60.5c0,19.85,16.09,35.95,35.95,35.95h40.27v-35.95H68.95L105.28,92.35z' fill='%23D4AF37'/%3E%3Cpath d='M146.56,68.04c0-19.85-16.09-35.95-35.95-35.95H70.34v35.95H146.56l-36.33,58.89h40.97c12.14,0,23.4-6.29,29.78-16.62l25.88-41.95c0,0,0.2-0.28,0.2-0.32H146.56z' fill='%23D4AF37'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebSite) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLocalRiyadh) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLocalDammam) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Tajawal:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/css/all.min.css" />
        <script dangerouslySetInnerHTML={{ __html: `
          window._GADS_ID="${GADS_ID}";
          window._GADS_CONV_DEMO="${GADS_CONV_DEMO}";
          window._GADS_CONV_CONTACT="${GADS_CONV_CONTACT}";
          try{var u=new URL(window.location.href);var g=u.searchParams.get('gclid');if(g)sessionStorage.setItem('_gclid',g);}catch(e){}
        `}} />
      </head>
      <body>
        {children}

        <Script id="consent-banner" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
          (function(){
            var KEY='zm_consent';
            if(localStorage.getItem(KEY)!==null)return;
            var b=document.createElement('div');
            b.id='consent-banner';
            b.style.cssText='position:fixed;bottom:0;left:0;right:0;background:#0d1b2e;border-top:1px solid rgba(255,255,255,0.1);padding:16px 24px;z-index:9999;font-size:13px;color:rgba(255,255,255,0.7);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap';
            b.innerHTML='<p>We use analytics cookies to improve your experience. <a href="/privacy-policy" style="color:#D4AF37">Privacy Policy</a></p><div style="display:flex;gap:10px"><button id="ca" style="background:#D4AF37;color:#060D1F;border:none;padding:8px 20px;border-radius:6px;cursor:pointer;font-weight:600">Accept</button><button id="cd" style="background:transparent;color:rgba(255,255,255,0.5);border:1px solid rgba(255,255,255,0.15);padding:8px 20px;border-radius:6px;cursor:pointer">Decline</button></div>';
            document.body.appendChild(b);
            document.getElementById('ca').onclick=function(){localStorage.setItem(KEY,'granted');b.remove();loadAnalytics();};
            document.getElementById('cd').onclick=function(){localStorage.setItem(KEY,'denied');b.remove();};
          })();
        `}} />

        <Script id="ga4-loader" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
          function loadAnalytics(){
            if(window._analyticsLoaded)return;
            window._analyticsLoaded=true;
            var s=document.createElement('script');
            s.src='https://www.googletagmanager.com/gtag/js?id=${GA4_ID}';
            s.async=true;
            document.head.appendChild(s);
            s.onload=function(){
              window.dataLayer=window.dataLayer||[];
              function gtag(){dataLayer.push(arguments);}
              window.gtag=gtag;
              gtag('js',new Date());
              gtag('config','${GA4_ID}');
              gtag('config','${GADS_ID}');
            };
          }
          if(typeof localStorage!=='undefined'&&localStorage.getItem('zm_consent')==='granted'){loadAnalytics();}
        `}} />
        <FloatingButtons whatsapp="966552995295" />
      </body>
    </html>
  );
}
