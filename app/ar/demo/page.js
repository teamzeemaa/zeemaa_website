import { readStore } from '../../../lib/store';
import DemoClientAr from '../../demo/DemoClientAr';

export const metadata = {
  title: 'احجز عرضاً تجريبياً | شاهد تقنية زيماء للفعاليات أثناء العمل',
  description: 'احجز جولة مخصصة في منصة زيماء: التسجيل، تسجيل الدخول عبر QR، طباعة الشارات، الاعتماد، والتحليلات اللحظية، مصممة خصيصاً لفعاليتك في المملكة العربية السعودية.',
  keywords: ['حجز عرض تجريبي', 'عرض منصة زيماء', 'تجربة نظام تسجيل الفعاليات', 'السعودية'],
  alternates: {
    canonical: 'https://zeemaa.com/ar/demo',
    languages: { en: 'https://zeemaa.com/demo', ar: 'https://zeemaa.com/ar/demo' },
  },
  openGraph: {
    title: 'احجز عرضاً تجريبياً | زيماء لتقنية الفعاليات',
    description: 'شاهد زيماء أثناء العمل.',
    type: 'website',
    url: 'https://zeemaa.com/ar/demo',
    siteName: 'Zeemaa',
    locale: 'ar_SA',
  },
};

export default async function DemoPageAr() {
  const store = await readStore();
  return <DemoClientAr store={store} />;
}
