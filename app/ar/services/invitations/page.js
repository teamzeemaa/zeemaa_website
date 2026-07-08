import { readStore } from '../../../../lib/store';
import Nav from '../../../../components/Nav';
import Footer from '../../../../components/Footer';
import Breadcrumb from '../../../../components/Breadcrumb';
import RelatedServices from '../../../../components/RelatedServices';
import InviteReveal from '../../../services/invitations/InviteReveal';

export const metadata = {
  title: 'دعوات وتذكيرات وتأكيدات الفعاليات | زيماء',
  description: 'دعوات رقمية وتذكيرات آلية وتأكيدات حضور وتسليم شارات أو تذاكر إلكترونية لكل فعالية في المملكة العربية السعودية، تُرسل عبر البريد الإلكتروني والواتساب وفق احتياجاتكم، بإدارة كاملة من زيماء.',
  keywords: ['دعوات الفعاليات', 'تذكيرات آلية', 'تأكيد الحضور', 'واتساب', 'السعودية'],
  alternates: {
    canonical: 'https://zeemaa.com/ar/services/invitations',
    languages: { en: 'https://zeemaa.com/services/invitations', ar: 'https://zeemaa.com/ar/services/invitations' },
  },
  openGraph: {
    title: 'دعوات وتذكيرات وتأكيدات الفعاليات | زيماء',
    description: 'دعوات وتذكيرات وتأكيدات الفعاليات في المملكة العربية السعودية.',
    type: 'website',
    url: 'https://zeemaa.com/ar/services/invitations',
    siteName: 'Zeemaa',
    locale: 'ar_SA',
  },
};

export default async function InvitationsPageAr() {
  const store = await readStore();

  const features = [
    { icon:'fa-envelope-open-text', t:'دعوات رقمية', d:'دعوات بهويتكم بالعربية والإنجليزية، تُرسل عبر البريد الإلكتروني أو الواتساب أو كليهما، لأي فعالية من عشاء خاص إلى مؤتمر عام.' },
    { icon:'fa-bell', t:'تذكيرات آلية', d:'تذكيرات مجدولة قبل الفعالية، من حفظ الموعد إلى تنبيهات الأيام الأخيرة وتنبيه يوم الفعالية، دون أي متابعة يدوية.' },
    { icon:'fa-user-check', t:'مسارات التأكيد والموافقة', d:'تتبعوا الردود لحظياً، مع خطوة موافقة اختيارية للمضيف في قوائم الضيوف المقيدة، أو تأكيد تلقائي للتسجيل المفتوح والفعاليات ذات التذاكر.' },
    { icon:'fa-circle-check', t:'تأكيدات فورية', d:'فور رد الضيف أو الموافقة عليه، يُرسل التأكيد تلقائياً عبر البريد الإلكتروني والواتساب.' },
    { icon:'fa-qrcode', t:'تسليم الشارة والتذكرة الإلكترونية', d:'يستلم الضيوف المؤكدون شارتهم أو تذكرتهم المرمّزة بـ QR تلقائياً، مرتبطة مباشرة بخدمتي طباعة الشارات والتذاكر.' },
    { icon:'fa-sliders', t:'تحكم بالقنوات لكل فعالية', d:'اختاروا البريد الإلكتروني فقط أو الواتساب فقط أو كليهما، بإعداد يتوافق مع متطلبات كل فعالية، لا إعداد موحد للجميع.' },
  ];

  return (
    <div dir="rtl" lang="ar">
      <Nav store={store} locale="ar" />
      <main style={{ background: '#060D1F', color: '#fff', fontFamily: "'Tajawal', 'Geist', sans-serif" }}>

        <section className="isp-hero">
          <div className="isp-hero-inner">
            <div className="isp-hero-top">
              <Breadcrumb items={[{ label: 'الرئيسية', href: '/ar' }, { label: 'الخدمات', href: '/ar/services' }, { label: 'الدعوات والتذكيرات' }]} locale="ar" />
              <span className="isp-tag">المنصة</span>
            </div>
            <div className="isp-hero-grid">
              <div>
                <p className="sey">منتج أساسي</p>
                <h1 className="st2 isp-h1">دعوات وتذكيرات وتأكيدات الفعاليات في المملكة العربية السعودية</h1>
                <p className="isp-desc">
                  تدير زيماء طبقة التواصل الكاملة مع الضيوف لفعاليتكم، من أول دعوة إلى التأكيد النهائي. تُرسل الدعوات والتذكيرات والتأكيدات عبر البريد الإلكتروني والواتساب وفق ما تتطلبه فعاليتكم، سواء كان تسجيلاً مفتوحاً أو تذكرة مدفوعة أو قائمة ضيوف معتمدة، بإدارة كاملة من فريقنا.
                </p>
                <div className="isp-cta-row">
                  <a href="/ar/contact" className="bg"><i className="fas fa-paper-plane" /> تواصل معنا</a>
                  <a href="/ar/demo" className="bgh"><i className="fas fa-play" /> احجز عرضاً تجريبياً</a>
                </div>
              </div>
              <div className="isp-hero-visual">
                <span className="isp-chip isp-chip-a">بريد إلكتروني + واتساب</span>
                <span className="isp-chip isp-chip-b">تذكيرات آلية</span>
                <div className="isp-panel">
                  <InviteReveal />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: 'rgba(255,255,255,0.015)', padding: '70px 0' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px' }}>
            <p className="sey">ما ستحصل عليه</p>
            <h2 className="st2">كل ما يجب أن يقوم به التواصل مع الضيوف</h2>
            <p className="sst">طبقة واحدة تتولى الدعوات والتذكيرات والتأكيدات وتسليم بطاقات الاعتماد، لكل نوع فعالية، على القنوات التي يستخدمها ضيوفكم فعلياً.</p>
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
          <h2 className="st2">من الدعوة إلى التأكيد</h2>
          <div style={{ display: 'grid', gap: 24, marginTop: 32 }}>
            {[
              { n:'1', t:'نُعد قائمة ضيوفكم وقنواتكم', d:'تشاركوننا قائمة الضيوف ونوع الفعالية ومتطلباتكم. يُعد فريقنا قوالب البريد الإلكتروني والواتساب وجدول التذكيرات وفق جدولكم الزمني.' },
              { n:'2', t:'يستلم الضيوف دعوتهم', d:'تُرسل دعوة بهويتكم عبر البريد الإلكتروني أو الواتساب أو كليهما، بالعربية والإنجليزية، بما يناسب طريقة وصولكم الفعلية للضيوف.' },
              { n:'3', t:'تُتابع الردود والموافقات لحظياً', d:'تصل التأكيدات عبر لوحة لحظية، مع خطوة موافقة إذا كانت قائمة ضيوفكم تتطلب اعتماد المضيف قبل التأكيد.' },
              { n:'4', t:'تُرسل التأكيدات وبطاقات الاعتماد تلقائياً', d:'فور تأكيد الضيف، تُرسل رسالة التأكيد وشارته أو تذكرته الإلكترونية تلقائياً، دون إرسال يدوي.' },
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

        <RelatedServices currentHref="/ar/services/invitations" locale="ar" />

        <section style={{ background: 'rgba(212,175,55,0.04)', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '60px 32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>تحتاجون دعوات وتذكيرات مُدارة لفعاليتكم؟</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>أخبرونا بقائمة ضيوفكم وقنواتكم وسنحدد الإعداد المناسب لكم.</p>
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
