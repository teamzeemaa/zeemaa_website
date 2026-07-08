import { readStore } from '../../../lib/store';
import IndustriesClientAr from '../../industries/IndustriesClientAr';

export const metadata = {
  title: 'القطاعات | زيماء لتقنية الفعاليات',
  description: 'تقنية فعاليات للمؤتمرات والمعارض والفعاليات المؤسسية وحفلات توزيع الجوائز والفعاليات الحكومية وورش العمل في جميع أنحاء المملكة العربية السعودية.',
  keywords: ['قطاعات الفعاليات', 'تقنية المؤتمرات', 'تقنية المعارض', 'الفعاليات الحكومية', 'ورش العمل', 'السعودية'],
  alternates: {
    canonical: 'https://zeemaa.com/ar/industries',
    languages: { en: 'https://zeemaa.com/industries', ar: 'https://zeemaa.com/ar/industries' },
  },
  openGraph: {
    title: 'القطاعات | زيماء لتقنية الفعاليات',
    description: 'فعاليات بجميع الأحجام والأنواع.',
    type: 'website',
    url: 'https://zeemaa.com/ar/industries',
    siteName: 'Zeemaa',
    locale: 'ar_SA',
  },
};

export default async function IndustriesPageAr() {
  const store = await readStore();
  return <IndustriesClientAr store={store} />;
}
