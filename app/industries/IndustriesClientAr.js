'use client';
import { useState } from 'react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';

const industries = [
  {
    icon: 'fa-microphone-lines',
    title: 'المؤتمرات والقمم',
    desc: 'تتطلب المؤتمرات متعددة المسارات التي تضم مئات أو آلاف الوفود نظام تسجيل يتعامل مع التعقيد دون أن يظهره. تدير زيماء تسجيل المتحدثين وفئات الوفود والدخول إلى الجلسات وطباعة الشارات وتسجيل الدخول الميداني لمؤتمرات بأي حجم في جميع أنحاء المملكة.',
    features: ['تسجيل متعدد الفئات', 'تحكم بالدخول على مستوى الجلسات', 'إدارة المتحدثين وكبار الشخصيات', 'تتبع الحضور لحظياً', 'إصدار شهادات التطوير المهني المستمر'],
  },
  {
    icon: 'fa-store',
    title: 'المعارض والمعارض التجارية',
    desc: 'تضم المعارض عارضين وزواراً وفريق تنظيم، لكل منهم متطلبات دخول ومسارات تسجيل مختلفة. نتولى بوابات العارضين وتسجيل الزوار وطباعة الشارات عند الدخول وتكامل مخطط الأرضية وتقارير حضور كاملة بعد الفعالية.',
    features: ['بوابة وإدارة العارضين', 'تسجيل مسبق للزوار ودخول مباشر', 'تحكم بالدخول حسب المناطق', 'كتالوجات عارضين رقمية', 'تحليلات حركة الزوار حسب المنطقة'],
  },
  {
    icon: 'fa-building',
    title: 'الفعاليات المؤسسية',
    desc: 'تتطلب الفعاليات المؤسسية دقة وسرية وتنفيذاً احترافياً. سواء كانت اجتماعاً عاماً داخلياً أو إطلاق منتج أو قمة مستثمرين أو مؤتمر شركاء، تدير زيماء طبقة التقنية الكاملة ليتفرغ فريقكم لجدول الأعمال.',
    features: ['تسجيل بالدعوة فقط', 'إدارة بطاقات الموظفين والضيوف', 'التزام وسجل تدقيق', 'دعم مواقع متعددة', 'تقارير ما بعد الفعالية للإدارة العليا'],
  },
  {
    icon: 'fa-trophy',
    title: 'حفلات توزيع الجوائز',
    desc: 'حفلات توزيع الجوائز فعاليات عالية الحضور حيث تهم تجربة كل حاضر. تتولى زيماء التذاكر وإدارة كبار الشخصيات وتكامل الجلوس وإصدار الشارات الميدانية لضمان دخول سلس وانطباع أول احترافي لكل ضيف.',
    features: ['تذاكر متدرجة بمسارات لكبار الشخصيات', 'إدارة الجلوس والطاولات', 'إدارة بطاقات المرشحين والضيوف', 'طباعة الشارات والحبال الميدانية', 'تتبع الدخول لحظياً'],
  },
  {
    icon: 'fa-landmark',
    title: 'الفعاليات الحكومية',
    desc: 'تحمل الفعاليات الحكومية متطلبات خاصة تتعلق بالأمن والبروتوكول والالتزام. تدعم زيماء اعتماداً عالي الأمان بمستويات دخول متعددة، وإدارة الإعلاميين والصحافة، وتقارير جاهزة للتدقيق متوافقة مع معايير الفعاليات الحكومية السعودية.',
    features: ['اعتماد أمني متعدد المستويات', 'إدارة بطاقات الإعلاميين والصحافة', 'مراقبة أمنية لحظية', 'توثيق التزام كامل', 'مسارات متوافقة مع الهيئة العامة للفعاليات الحية'],
  },
  {
    icon: 'fa-chalkboard-user',
    title: 'ورش العمل والندوات',
    desc: 'غالباً ما تتطلب ورش العمل والندوات التدريبية شهادات حضور وكشوف تسجيل ووثائق تطوير مهني مستمر. تُؤتمت زيماء كل ذلك، من التسجيل المسبق مروراً بتسجيل الدخول الميداني وحتى توزيع الشهادات بعد الفعالية.',
    features: ['تسجيل مسبق وتأكيد', 'تسجيل دخول رقمي ميداني', 'إصدار شهادات آلي', 'تقارير حضور للتطوير المهني المستمر', 'دعم المجموعات الصغيرة والكبيرة'],
  },
];

export default function IndustriesClientAr({ store }) {
  const [open, setOpen] = useState(0);

  return (
    <div dir="rtl" lang="ar">
      <Nav store={store} locale="ar" />
      <main style={{ background: '#060D1F', color: '#fff', fontFamily: "'Tajawal', 'Geist', sans-serif" }}>

        <PageHero
          eyebrow="من نخدم"
          title="فعاليات بجميع الأحجام والأنواع"
          ghost="القطاعات"
          crumbs={[{ label: 'الرئيسية', href: '/ar' }, { label: 'القطاعات' }]}
          locale="ar"
        />

        <section style={{ padding: '0 32px 80px', maxWidth: 900, margin: '0 auto' }}>
          <div className="acc">
            {industries.map((ind, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className={`acc-item ${isOpen ? 'open' : ''}`}>
                  <button className="acc-head" onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span className="acc-ic"><i className={`fas ${ind.icon}`} /></span>
                    <span className="acc-title">{ind.title}</span>
                    <span className="acc-chev"><i className="fas fa-chevron-down" /></span>
                  </button>
                  <div className="acc-body" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                    <div className="acc-inner">
                      <p className="acc-desc">{ind.desc}</p>
                      <div className="acc-feat-label">ما نتولاه</div>
                      <div className="acc-feats">
                        {ind.features.map((f, j) => (
                          <div key={j} className="acc-feat">
                            <i className="fas fa-check" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section style={{ background: 'rgba(212,175,55,0.04)', borderTop: '1px solid rgba(212,175,55,0.1)', padding: '60px 32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>غير متأكدين إن كنا نغطي نوع فعاليتكم؟</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>تواصلوا معنا وسنخبركم بصراحة إن كنا الخيار المناسب.</p>
          <a href="/ar/contact" className="bg"><i className="fas fa-paper-plane" /> تواصل معنا</a>
        </section>
      </main>
      <Footer locale="ar" />
    </div>
  );
}
