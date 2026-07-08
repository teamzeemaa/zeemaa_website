import { readStore } from '../../lib/store';
import HomeClientAr from '../../components/HomeClientAr';

export const metadata = {
  title: 'زيماء | حلول تقنية الفعاليات والتسجيل في المملكة العربية السعودية',
  description: 'تقدم زيماء تقنية فعاليات متكاملة الإدارة في جميع أنحاء المملكة العربية السعودية: التسجيل، تسجيل الدخول عبر QR، طباعة الشارات، الاعتماد، التذاكر، الشهادات، والعمليات الميدانية للمؤتمرات والمعارض والفعاليات المؤسسية.',
  keywords: ['تقنية الفعاليات', 'نظام تسجيل الفعاليات', 'طباعة الشارات', 'الاعتماد الإلكتروني', 'منصة التذاكر', 'تسجيل دخول QR', 'فعاليات السعودية', 'الرياض', 'الدمام'],
  alternates: {
    canonical: 'https://zeemaa.com/ar',
    languages: { en: 'https://zeemaa.com', ar: 'https://zeemaa.com/ar' },
  },
  openGraph: {
    title: 'زيماء | حلول تقنية الفعاليات والتسجيل في المملكة العربية السعودية',
    description: 'تقنية فعاليات متكاملة الإدارة في جميع أنحاء المملكة العربية السعودية.',
    type: 'website',
    url: 'https://zeemaa.com/ar',
    siteName: 'Zeemaa',
    locale: 'ar_SA',
    images: [{ url: 'https://zeemaa.com/og-image.png', width: 1200, height: 630 }],
  },
};

export default async function HomePageAr() {
  const store = await readStore();
  return (
    <div dir="rtl" lang="ar">
      <HomeClientAr store={store} />
    </div>
  );
}
