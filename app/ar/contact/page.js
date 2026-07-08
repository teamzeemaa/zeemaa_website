import ContactClientAr from '../../contact/ContactClientAr';

export const metadata = {
  title: 'تواصل معنا | زيماء لتقنية الفعاليات',
  description: 'تواصلوا مع زيماء لمناقشة تقنية فعاليتكم القادمة في المملكة العربية السعودية. تسجيل، اعتماد، شارات، تذاكر، ودعم ميداني متكامل. نرد خلال 24 ساعة.',
  keywords: ['تواصل مع زيماء', 'تقنية الفعاليات السعودية', 'طلب عرض سعر فعالية', 'واتساب زيماء'],
  alternates: {
    canonical: 'https://zeemaa.com/ar/contact',
    languages: { en: 'https://zeemaa.com/contact', ar: 'https://zeemaa.com/ar/contact' },
  },
  openGraph: {
    title: 'تواصل معنا | زيماء لتقنية الفعاليات',
    description: 'لنتحدث عن فعاليتك القادمة.',
    type: 'website',
    url: 'https://zeemaa.com/ar/contact',
    siteName: 'Zeemaa',
    locale: 'ar_SA',
  },
};

export default function ContactPageAr() {
  return <ContactClientAr />;
}
