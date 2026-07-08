import { readStore } from '../../../../lib/store';
import Nav from '../../../../components/Nav';
import Footer from '../../../../components/Footer';
import Breadcrumb from '../../../../components/Breadcrumb';
import RelatedServices from '../../../../components/RelatedServices';
import RegDashboard from '../../../services/registration/RegDashboard';

export const metadata = {
  title: 'نظام تسجيل الفعاليات في المملكة العربية السعودية | زيماء',
  description: 'منصة تسجيل فعاليات مخصصة للمؤتمرات والمعارض والفعاليات المؤسسية في جميع أنحاء المملكة العربية السعودية. صفحات تسجيل بهويتكم، دعم للعربية والإنجليزية، تسجيل دخول عبر QR، وتحليلات لحظية، بإدارة كاملة من زيماء.',
  keywords: ['نظام تسجيل الفعاليات', 'منصة تسجيل', 'تسجيل دخول QR', 'تسجيل المؤتمرات', 'السعودية', 'الرياض'],
  alternates: {
    canonical: 'https://zeemaa.com/ar/services/registration',
    languages: { en: 'https://zeemaa.com/services/registration', ar: 'https://zeemaa.com/ar/services/registration' },
  },
  openGraph: {
    title: 'نظام تسجيل الفعاليات في المملكة العربية السعودية | زيماء',
    description: 'نظام تسجيل الفعاليات للمملكة العربية السعودية.',
    type: 'website',
    url: 'https://zeemaa.com/ar/services/registration',
    siteName: 'Zeemaa',
    locale: 'ar_SA',
  },
};

export default async function RegistrationPageAr() {
  const store = await readStore();

  const features = [
    { icon:'fa-palette', t:'صفحات تسجيل بهويتكم', d:'صفحات تسجيل مخصصة مبنية حول هوية فعاليتكم، بشعاركم وألوانكم ونطاقكم. يرى الحضور علامتكم منذ أول نقرة.' },
    { icon:'fa-language', t:'دعم كامل للعربية والإنجليزية', d:'نماذج ثنائية اللغة بدعم الكتابة من اليمين لليسار، ليسجل كل حاضر بلغته المفضلة دون عوائق.' },
    { icon:'fa-sliders', t:'نماذج ومنطق مخصص', d:'حقول شرطية وفئات حضور متعددة ومسارات اعتماد مصممة وفق طريقة سير فعاليتكم فعلياً.' },
    { icon:'fa-qrcode', t:'تسجيل دخول عبر QR مدمج', d:'كل عملية تسجيل تُصدر رمز QR آمناً لدخول سريع دون تلامس يوم الفعالية. دون أي إعداد إضافي.' },
    { icon:'fa-chart-line', t:'تحليلات لحظية', d:'تتبع التسجيلات والحضور ومعدلات تسجيل الدخول لحظياً، بتقارير قابلة للتصدير قبل الفعالية وأثناءها وبعدها.' },
    { icon:'fa-credit-card', t:'مدفوعات متكاملة', d:'تحصيل الرسوم بأمان عبر مدى وApple Pay وفيزا وماستركارد من خلال بوابات سعودية معتمدة منها ميسر.' },
  ];

  return (
    <div dir="rtl" lang="ar">
      <Nav store={store} locale="ar" />
      <main style={{ background: '#060D1F', color: '#fff', fontFamily: "'Tajawal', 'Geist', sans-serif" }}>

        <section className="isp-hero">
          <div className="isp-hero-inner">
            <div className="isp-hero-top">
              <Breadcrumb items={[{ label: 'الرئيسية', href: '/ar' }, { label: 'الخدمات', href: '/ar/services' }, { label: 'التسجيل' }]} locale="ar" />
              <span className="isp-tag">المنصة</span>
            </div>
            <div className="isp-hero-grid">
              <div>
                <p className="sey">منتج أساسي</p>
                <h1 className="st2 isp-h1">نظام تسجيل الفعاليات للمملكة العربية السعودية</h1>
                <p className="isp-desc">
                  تبني زيماء وتدير طبقة التسجيل الكاملة لفعاليتك، من صفحة تسجيل بهويتك إلى تسجيل الدخول عبر QR عند البوابة. مصممة خصيصاً للمؤتمرات والمعارض والفعاليات المؤسسية في جميع أنحاء المملكة، وبإدارة كاملة من فريقنا دون أن تلمس الجانب التقني.
                </p>
                <div className="isp-cta-row">
                  <a href="/ar/contact" className="bg"><i className="fas fa-paper-plane" /> تواصل معنا</a>
                  <a href="/ar/demo" className="bgh"><i className="fas fa-play" /> احجز عرضاً تجريبياً</a>
                </div>
              </div>
              <div className="isp-hero-visual">
                <span className="isp-chip isp-chip-a">2,847 تسجيلاً</span>
                <span className="isp-chip isp-chip-b">94% معدل تسجيل الدخول</span>
                <div className="isp-panel">
                  <RegDashboard />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: 'rgba(255,255,255,0.015)', padding: '70px 0' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px' }}>
            <p className="sey">ما ستحصل عليه</p>
            <h2 className="st2">كل ما يجب أن يقوم به نظام التسجيل</h2>
            <p className="sst">منصة واحدة تتولى التسجيل والدفع والتواصل وتسجيل الدخول، دون الحاجة لدمج أدوات متفرقة.</p>
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
          <h2 className="st2">من الإعداد إلى تسجيل الدخول</h2>
          <div style={{ display: 'grid', gap: 24, marginTop: 32 }}>
            {[
              { n:'1', t:'نبني منصة تسجيلكم', d:'تشاركوننا تفاصيل فعاليتكم ومتطلباتكم. يصمم فريقنا نظام تسجيل بهويتكم، ويعد الفئات والنماذج والدفع، ويسلمكم إياه للمراجعة قبل الإطلاق.' },
              { n:'2', t:'يسجل الحضور بالعربية أو الإنجليزية', d:'تنطلق صفحة التسجيل على نطاقكم. يسجل الحضور ويدفعون إن لزم، ويستلمون تأكيداً برمز QR، كل ذلك بلغتهم.' },
              { n:'3', t:'تتابعون كل شيء لحظياً', d:'شاهدوا التسجيلات تتوارد عبر لوحة لحظية، بالبيانات التي تحتاجونها لتخطيط الفريق والضيافة والتنظيم.' },
              { n:'4', t:'تسجيل دخول سريع عبر QR يوم الفعالية', d:'يدير فريقنا الميداني محطات تسجيل الدخول، بمسح رموز QR لدخول فوري دون تلامس وتتبع حضور لحظي.' },
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

        <RelatedServices currentHref="/ar/services/registration" locale="ar" />

        <section style={{ background: 'rgba(212,175,55,0.04)', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '60px 32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>تخططون لفعالية في المملكة العربية السعودية؟</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>أخبرونا بما تحتاجونه وسنحدد إعداد التسجيل المناسب لكم.</p>
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
