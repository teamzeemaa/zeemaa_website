import { readStore } from '../../../lib/store';
import ServicesClientAr from '../../services/ServicesClientAr';

export const metadata = {
  title: 'الخدمات | تقنية فعاليات زيماء',
  description: 'تقنية فعاليات كاملة في المملكة العربية السعودية: منصة تسجيل، نظام طباعة شارات آمن، خدمات اعتماد بتحكم دخول، تذاكر فعاليات ببوابات دفع سعودية، ولوحة تحليلات لحظية، بإدارة ميدانية متكاملة.',
  keywords: ['خدمات تقنية الفعاليات', 'نظام تسجيل الفعاليات', 'طباعة الشارات', 'الاعتماد', 'منصة التذاكر', 'تحليلات الفعاليات', 'السعودية'],
  alternates: {
    canonical: 'https://zeemaa.com/ar/services',
    languages: { en: 'https://zeemaa.com/services', ar: 'https://zeemaa.com/ar/services' },
  },
  openGraph: {
    title: 'الخدمات | تقنية فعاليات زيماء',
    description: 'تقنية فعاليات متكاملة. شريك واحد.',
    type: 'website',
    url: 'https://zeemaa.com/ar/services',
    siteName: 'Zeemaa',
    locale: 'ar_SA',
  },
};

export default async function ServicesPageAr() {
  const store = await readStore();
  return <ServicesClientAr store={store} />;
}
