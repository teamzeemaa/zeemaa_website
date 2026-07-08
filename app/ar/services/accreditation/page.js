import { readStore } from '../../../../lib/store';
import Nav from '../../../../components/Nav';
import Footer from '../../../../components/Footer';
import Breadcrumb from '../../../../components/Breadcrumb';
import RelatedServices from '../../../../components/RelatedServices';
import AccessControlReveal from '../../../services/accreditation/AccessControlReveal';

export const metadata = {
  title: 'خدمات اعتماد الفعاليات في المملكة العربية السعودية | QR وRFID | زيماء',
  description: 'خدمات اعتماد فعاليات ومنصة تحكم بالدخول للمملكة العربية السعودية. شارات مرمّزة بـ QR كخيار افتراضي، مع إتاحة أساور وبطاقات RFID للبوابات عالية الكثافة والدفع الميداني دون نقد، بإدارة كاملة من زيماء.',
  keywords: ['اعتماد الفعاليات', 'تحكم بالدخول', 'RFID', 'QR', 'الرياض', 'السعودية'],
  alternates: {
    canonical: 'https://zeemaa.com/ar/services/accreditation',
    languages: { en: 'https://zeemaa.com/services/accreditation', ar: 'https://zeemaa.com/ar/services/accreditation' },
  },
  openGraph: {
    title: 'خدمات اعتماد الفعاليات في المملكة العربية السعودية | زيماء',
    description: 'اعتماد فعاليات وتحكم بالدخول عبر QR وRFID.',
    type: 'website',
    url: 'https://zeemaa.com/ar/services/accreditation',
    siteName: 'Zeemaa',
    locale: 'ar_SA',
  },
};

export default async function AccreditationPageAr() {
  const store = await readStore();

  const features = [
    { icon:'fa-layer-group', t:'اعتماد متعدد المستويات', d:'فئات كبار الشخصيات والمتحدثين والعارضين والفريق والإعلاميين، لكل منها قواعد وصلاحيات دخول خاصة بها.' },
    { icon:'fa-qrcode', t:'شارات QR كخيار افتراضي', d:'يحصل كل حاضر على بطاقة اعتماد مرمّزة بـ QR كمعيار أساسي، تُمسح عند كل نقطة تفتيش دون أجهزة إضافية.' },
    { icon:'fa-wave-square', t:'RFID كخيار إضافي', d:'أساور أو بطاقات دخول باللمس متاحة إلى جانب QR للبوابات عالية الكثافة أو المدفوعات الميدانية دون نقد، وليست بديلاً عنه أبداً.' },
    { icon:'fa-door-open', t:'تحكم بالدخول حسب المناطق', d:'تطبّق نقاط الدخول وبوابات الجلسات فئة كل حاضر تلقائياً، لتبقى المناطق المقيدة مقيدة.' },
    { icon:'fa-bolt', t:'تحقق لحظي', d:'تتم عمليات التحقق من الصلاحية فوراً، مع تنبيه لأي محاولة غير مصرح بها لحظة حدوثها، دون قوائم ضيوف يدوية.' },
    { icon:'fa-headset', t:'دعم ميداني للاعتماد', d:'يدير فريقنا مكاتب الاعتماد وإعادة الطباعة وإعادة الإصدار طوال الفعالية، في الرياض وجميع أنحاء المملكة.' },
  ];

  return (
    <div dir="rtl" lang="ar">
      <Nav store={store} locale="ar" />
      <main style={{ background: '#060D1F', color: '#fff', fontFamily: "'Tajawal', 'Geist', sans-serif" }}>

        <section className="isp-hero">
          <div className="isp-hero-inner">
            <div className="isp-hero-top">
              <Breadcrumb items={[{ label: 'الرئيسية', href: '/ar' }, { label: 'الخدمات', href: '/ar/services' }, { label: 'الاعتماد' }]} locale="ar" />
              <span className="isp-tag">التحكم بالدخول</span>
            </div>
            <div className="isp-hero-grid">
              <div>
                <p className="sey">منتج أساسي</p>
                <h1 className="st2 isp-h1">خدمات اعتماد الفعاليات في المملكة العربية السعودية</h1>
                <p className="isp-desc">
                  تدير زيماء طبقة الاعتماد والتحكم بالدخول الكاملة لفعاليتكم، مبنية على تقنية QR أولاً مع إتاحة RFID كخيار إضافي للبطاقات. اعتماد متعدد المستويات وبوابات حسب المناطق وتحقق لحظي، بإدارة كاملة من فريقنا في الرياض وجميع أنحاء المملكة.
                </p>
                <div className="isp-cta-row">
                  <a href="/ar/contact" className="bg"><i className="fas fa-paper-plane" /> تواصل معنا</a>
                  <a href="/ar/demo" className="bgh"><i className="fas fa-play" /> احجز عرضاً تجريبياً</a>
                </div>
              </div>
              <div className="isp-hero-visual">
                <span className="isp-chip isp-chip-a">اعتماد QR أولاً</span>
                <span className="isp-chip isp-chip-b">RFID اختياري</span>
                <div className="isp-panel">
                  <AccessControlReveal />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: 'rgba(255,255,255,0.015)', padding: '70px 0' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px' }}>
            <p className="sey">ما ستحصل عليه</p>
            <h2 className="st2">كل ما يجب أن يقوم به الاعتماد</h2>
            <p className="sst">منصة تحكم بالدخول واحدة تتولى بطاقات الاعتماد والتحقق وتطبيق المناطق، سواء اعتمدتم على QR فقط أو QR مع RFID.</p>
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
          <h2 className="st2">من الإعداد إلى التحقق عند البوابة</h2>
          <div style={{ display: 'grid', gap: 24, marginTop: 32 }}>
            {[
              { n:'1', t:'نُعد مستويات الاعتماد لديكم', d:'تشاركوننا فئاتكم وقواعد الدخول. يُعد فريقنا اعتماداً متعدد المستويات ويتيح لكم اختيار QR أو RFID أو كليهما.' },
              { n:'2', t:'يستلم الحضور بطاقة اعتمادهم عند تسجيل الدخول', d:'تصدر شارة مرمّزة بـ QR كخيار افتراضي. إذا اخترتم RFID، تصدر الأساور أو البطاقات إلى جانبها.' },
              { n:'3', t:'يُتحقق من الدخول لحظياً', d:'تتحقق كل نقطة تفتيش من بطاقة الاعتماد فوراً مقابل فئة الحاضر، وتنبّه لأي محاولة خارج صلاحيته.' },
              { n:'4', t:'يدير فريقنا الاعتماد يوم الفعالية', d:'تُدار مكاتب الاعتماد وإعادة الطباعة وإعادة الإصدار ميدانياً، حتى لا يتباطأ التحكم بالبوابة أبداً.' },
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

        <RelatedServices currentHref="/ar/services/accreditation" locale="ar" />

        <section style={{ background: 'rgba(212,175,55,0.04)', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '60px 32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>تحتاجون اعتماداً وتحكماً بالدخول لفعاليتكم؟</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>أخبرونا بمستويات الدخول لديكم وسنحدد إعداد QR وRFID المناسب لكم.</p>
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
