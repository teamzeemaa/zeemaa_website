import { readStore } from '../../../../lib/store';
import Nav from '../../../../components/Nav';
import Footer from '../../../../components/Footer';
import Breadcrumb from '../../../../components/Breadcrumb';
import RelatedServices from '../../../../components/RelatedServices';
import BadgePrintReveal from '../../../services/badge-printing/BadgePrintReveal';

export const metadata = {
  title: 'طباعة الشارات والاعتماد في المملكة العربية السعودية | زيماء',
  description: 'طباعة شارات ميدانية واعتماد قائم على المناطق للمؤتمرات والمعارض والفعاليات المؤسسية في جميع أنحاء المملكة العربية السعودية. شارات مرمّزة بـ QR، دخول حسب الأدوار، وتحكم لحظي بالبوابات، بإدارة كاملة من زيماء.',
  keywords: ['طباعة الشارات', 'الاعتماد', 'شارات QR', 'تحكم بالدخول', 'السعودية', 'الرياض'],
  alternates: {
    canonical: 'https://zeemaa.com/ar/services/badge-printing',
    languages: { en: 'https://zeemaa.com/services/badge-printing', ar: 'https://zeemaa.com/ar/services/badge-printing' },
  },
  openGraph: {
    title: 'طباعة الشارات والاعتماد في المملكة العربية السعودية | زيماء',
    description: 'طباعة الشارات والاعتماد للمملكة العربية السعودية.',
    type: 'website',
    url: 'https://zeemaa.com/ar/services/badge-printing',
    siteName: 'Zeemaa',
    locale: 'ar_SA',
  },
};

export default async function BadgePrintingPageAr() {
  const store = await readStore();

  const features = [
    { icon:'fa-print', t:'طباعة شارات عند الطلب', d:'يحصل الحضور على شاراتهم فور تسجيل الدخول، تُطبع ميدانياً دون طباعة مسبقة أو فرز يدوي.' },
    { icon:'fa-qrcode', t:'شارات مرمّزة بـ QR', d:'تحمل كل شارة رمز QR فريداً مرتبطاً بملف الحاضر، يُستخدم للدخول والوصول إلى الجلسات وجمع بيانات العملاء المحتملين.' },
    { icon:'fa-id-badge', t:'تصميم شارات مخصص', d:'قوالب بهويتكم تشمل صورة الحاضر واسمه وشركته وفئته، بما يتوافق مع هوية فعاليتكم.' },
    { icon:'fa-user-shield', t:'اعتماد حسب الدور', d:'حدد مستويات دخول مثل كبار الشخصيات والمتحدثين والعارضين والفريق والإعلاميين، مطبقة مباشرة عبر الشارة نفسها.' },
    { icon:'fa-door-open', t:'تحكم لحظي بالدخول', d:'تتحقق عمليات مسح QR عند نقاط الدخول ومناطق التفتيش من الصلاحية فوراً وتنبّه لأي محاولة خارج فئة الحاضر.' },
    { icon:'fa-headset', t:'فريق دعم ميداني', d:'يدير فريقنا محطات الطباعة ومكاتب الاعتماد طوال الفعالية، ويتولى إعادة الطباعة والحالات الاستثنائية فوراً.' },
  ];

  return (
    <div dir="rtl" lang="ar">
      <Nav store={store} locale="ar" />
      <main style={{ background: '#060D1F', color: '#fff', fontFamily: "'Tajawal', 'Geist', sans-serif" }}>

        <section className="isp-hero">
          <div className="isp-hero-inner">
            <div className="isp-hero-top">
              <Breadcrumb items={[{ label: 'الرئيسية', href: '/ar' }, { label: 'الخدمات', href: '/ar/services' }, { label: 'طباعة الشارات' }]} locale="ar" />
              <span className="isp-tag">ميداني</span>
            </div>
            <div className="isp-hero-grid">
              <div>
                <p className="sey">منتج أساسي</p>
                <h1 className="st2 isp-h1">طباعة الشارات والاعتماد للمملكة العربية السعودية</h1>
                <p className="isp-desc">
                  تتولى زيماء طباعة الشارات والاعتماد ميدانياً، من تصميم شارة بهويتكم إلى تحكم بالدخول حسب المناطق عند البوابة. مبنية للمؤتمرات والمعارض والفعاليات المؤسسية في جميع أنحاء المملكة، وبإدارة كاملة من فريقنا حتى لا يتباطأ تسجيل الدخول أبداً.
                </p>
                <div className="isp-cta-row">
                  <a href="/ar/contact" className="bg"><i className="fas fa-paper-plane" /> تواصل معنا</a>
                  <a href="/ar/demo" className="bgh"><i className="fas fa-play" /> احجز عرضاً تجريبياً</a>
                </div>
              </div>
              <div className="isp-hero-visual">
                <span className="isp-chip isp-chip-a">دخول مرمّز بـ QR</span>
                <span className="isp-chip isp-chip-b">طباعة فورية</span>
                <div className="isp-panel">
                  <BadgePrintReveal />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: 'rgba(255,255,255,0.015)', padding: '70px 0' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px' }}>
            <p className="sey">ما ستحصل عليه</p>
            <h2 className="st2">كل ما يجب أن تقوم به طباعة الشارات</h2>
            <p className="sst">نظام واحد يتولى التصميم والطباعة والتحكم بالدخول، دون موردين منفصلين أو قوائم تسجيل يدوية.</p>
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
          <h2 className="st2">من التصميم إلى التحكم بالبوابة</h2>
          <div style={{ display: 'grid', gap: 24, marginTop: 32 }}>
            {[
              { n:'1', t:'نصمم شاراتكم ومستويات الدخول', d:'تشاركوننا تفاصيل فعاليتكم وفئاتها. يصمم فريقنا قوالب شارات بهويتكم ويعد مستويات دخول مثل كبار الشخصيات والمتحدثين والعارضين والفريق.' },
              { n:'2', t:'يحصل الحضور على شارات فورية مرمّزة بـ QR', d:'عند تسجيل الدخول، تُطبع كل شارة عند الطلب برمز QR مرتبط بملف الحاضر ومستوى دخوله.' },
              { n:'3', t:'مسح QR يتحكم بالدخول عند كل نقطة تفتيش', d:'تُحكم نقاط الدخول ومناطق كبار الشخصيات والجلسات بتحقق QR لحظي، مع تنبيه فوري لأي محاولة غير مصرح بها.' },
              { n:'4', t:'يدير فريقنا المحطات يوم الفعالية', d:'يتولى فريق زيماء الطباعة والتوزيع وإعادة الطباعة ميدانياً، حتى لا يتعطل تسجيل الدخول والتحكم بالدخول أبداً.' },
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

        <RelatedServices currentHref="/ar/services/badge-printing" locale="ar" />

        <section style={{ background: 'rgba(212,175,55,0.04)', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '60px 32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>تحتاجون طباعة شارات واعتماد لفعاليتكم؟</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>أخبرونا بمستويات الدخول لديكم وسنحدد الإعداد المناسب للشارات والاعتماد.</p>
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
