import { readStore } from '../../../../lib/store';
import Nav from '../../../../components/Nav';
import Footer from '../../../../components/Footer';
import Breadcrumb from '../../../../components/Breadcrumb';
import RelatedServices from '../../../../components/RelatedServices';
import TicketReveal from '../../../services/ticketing/TicketReveal';

export const metadata = {
  title: 'منصة تذاكر الفعاليات في المملكة العربية السعودية | زيماء',
  description: 'نظام تذاكر فعاليات مخصص للمؤتمرات والمعارض والفعاليات المؤسسية في جميع أنحاء المملكة العربية السعودية. أسعار متدرجة وأكواد ترويجية ومدفوعات آمنة عبر مدى وApple Pay وتذاكر إلكترونية بـ QR وتتبع مبيعات لحظي، بإدارة كاملة من زيماء.',
  keywords: ['منصة التذاكر', 'تذاكر الفعاليات', 'مدى', 'Apple Pay', 'تذاكر QR', 'السعودية'],
  alternates: {
    canonical: 'https://zeemaa.com/ar/services/ticketing',
    languages: { en: 'https://zeemaa.com/services/ticketing', ar: 'https://zeemaa.com/ar/services/ticketing' },
  },
  openGraph: {
    title: 'منصة تذاكر الفعاليات في المملكة العربية السعودية | زيماء',
    description: 'منصة تذاكر الفعاليات للمملكة العربية السعودية.',
    type: 'website',
    url: 'https://zeemaa.com/ar/services/ticketing',
    siteName: 'Zeemaa',
    locale: 'ar_SA',
  },
};

export default async function TicketingPageAr() {
  const store = await readStore();

  const features = [
    { icon:'fa-layer-group', t:'أسعار متدرجة', d:'كبار الشخصيات، الأسعار العادية، الطلاب، وأي فئة تحتاجها فعاليتكم، لكل منها سعرها ومخصصاتها ومستوى دخولها.' },
    { icon:'fa-tags', t:'الحجز المبكر وأكواد الترويج', d:'أسعار محدودة المدة وأكواد خصم وعروض جماعية تتحكمون بها، بإيقاف تلقائي دون الحاجة لمتابعة يدوية.' },
    { icon:'fa-credit-card', t:'بوابات دفع سعودية', d:'مدى وApple Pay وفيزا وماستركارد عبر بوابات معتمدة منها ميسر، مع التسوية بالريال السعودي.' },
    { icon:'fa-qrcode', t:'تذاكر إلكترونية بـ QR', d:'كل عملية شراء تُسلّم تذكرة إلكترونية مرمّزة بـ QR عبر البريد الإلكتروني والواتساب، جاهزة للمسح عند البوابة دون طباعة.' },
    { icon:'fa-chart-line', t:'تتبع مبيعات لحظي', d:'راقبوا مبيعات التذاكر والإيرادات وأداء كل فئة لحظياً، لتعديل الأسعار أو التسويق في الوقت المناسب.' },
    { icon:'fa-rotate-left', t:'الاسترجاع والتحويل', d:'إلغاءات واسترجاعات وتحويلات أسماء تُدار عبر مسار واضح يحافظ على دقة سجلاتكم وإيراداتكم.' },
  ];

  return (
    <div dir="rtl" lang="ar">
      <Nav store={store} locale="ar" />
      <main style={{ background: '#060D1F', color: '#fff', fontFamily: "'Tajawal', 'Geist', sans-serif" }}>

        <section className="isp-hero">
          <div className="isp-hero-inner">
            <div className="isp-hero-top">
              <Breadcrumb items={[{ label: 'الرئيسية', href: '/ar' }, { label: 'الخدمات', href: '/ar/services' }, { label: 'التذاكر' }]} locale="ar" />
              <span className="isp-tag">المنصة</span>
            </div>
            <div className="isp-hero-grid">
              <div>
                <p className="sey">منتج أساسي</p>
                <h1 className="st2 isp-h1">منصة تذاكر الفعاليات للمملكة العربية السعودية</h1>
                <p className="isp-desc">
                  تدير زيماء طبقة التذاكر الكاملة لفعاليتكم، من الأسعار المتدرجة وأكواد الترويج إلى الدفع الآمن والدخول عبر QR عند البوابة. مبنية للمؤتمرات والمعارض والفعاليات المؤسسية في جميع أنحاء المملكة، وبإدارة كاملة من فريقنا حتى لا يصبح بيع التذاكر عملاً إضافياً عليكم.
                </p>
                <div className="isp-cta-row">
                  <a href="/ar/contact" className="bg"><i className="fas fa-paper-plane" /> تواصل معنا</a>
                  <a href="/ar/demo" className="bgh"><i className="fas fa-play" /> احجز عرضاً تجريبياً</a>
                </div>
              </div>
              <div className="isp-hero-visual">
                <span className="isp-chip isp-chip-a">أسعار متدرجة</span>
                <span className="isp-chip isp-chip-b">مدى وApple Pay</span>
                <div className="isp-panel">
                  <TicketReveal />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: 'rgba(255,255,255,0.015)', padding: '70px 0' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px' }}>
            <p className="sey">ما ستحصل عليه</p>
            <h2 className="st2">كل ما يجب أن تقوم به منصة التذاكر</h2>
            <p className="sst">منصة واحدة تتولى التسعير والدفع والتسليم والدخول، دون ربط بوابة دفع بأداة تذاكر منفصلة.</p>
            <div className="pgrid">
              {features.map((c, i) => (
                <div key={i} className="pc">
                  <div className="pci"><i className={`fas ${c.icon}`} /></div>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '70px 32px', maxWidth: 1000, margin: '0 auto' }}>
          <p className="sey">كيف نعمل</p>
          <h2 className="st2">من التسعير إلى البوابة</h2>
          <div style={{ display: 'grid', gap: 24, marginTop: 32 }}>
            {[
              { n:'1', t:'نُعد هيكل تذاكركم', d:'تشاركوننا فئاتكم وأسعاركم وجدول المبيعات. يبني فريقنا مسار التذاكر ويربط الدفع، ويسلمكم إياه للمراجعة قبل فتح المبيعات.' },
              { n:'2', t:'يشتري الحضور بالعربية أو الإنجليزية', d:'تنطلق صفحة التذاكر على نطاقكم. يدفع المشترون عبر مدى أو Apple Pay أو البطاقة، ويستلمون تذكرتهم الإلكترونية بـ QR فوراً.' },
              { n:'3', t:'تراقبون المبيعات لحظياً', d:'تتبعوا الإيرادات وأداء كل فئة والمخصصات المتبقية لحظياً، وأطلقوا أكواد ترويج أو فئات جديدة متى احتجتم.' },
              { n:'4', t:'دخول عبر QR يوم الفعالية', d:'يمسح فريقنا الميداني التذاكر عند البوابة، وينبّه فوراً لأي تكرار، مع إبقاء الدخول سلساً بعدّاد حضور لحظي.' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.n}</div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{s.t}</h3>
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, textAlign: 'justify' }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <RelatedServices currentHref="/ar/services/ticketing" locale="ar" />

        <section style={{ background: 'rgba(212,175,55,0.04)', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '60px 32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>تبيعون تذاكر لفعالية في المملكة العربية السعودية؟</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>أخبرونا بفئاتكم وجدولكم الزمني وسنحدد إعداد التذاكر المناسب لكم.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/ar/contact" className="bg"><i className="fas fa-paper-plane" /> تواصل معنا</a>
            <a href="/ar/demo" className="bgh"><i className="fas fa-play" /> احجز عرضاً تجريبياً</a>
          </div>
        </section>
      </main>
      <Footer locale="ar" />
    </div>
  );
}
