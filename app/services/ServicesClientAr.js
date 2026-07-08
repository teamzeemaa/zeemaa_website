'use client';
import { useState } from 'react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { servicesListAr as items } from '../../lib/servicesList';
import RegDashboard from './registration/RegDashboard';
import BadgePrintReveal from './badge-printing/BadgePrintReveal';
import TicketReveal from './ticketing/TicketReveal';
import AccessControlReveal from './accreditation/AccessControlReveal';
import InviteReveal from './invitations/InviteReveal';

const filters = [
  { id:'all', label:'الكل' },
  { id:'platform', label:'المنصة' },
  { id:'onsite', label:'الميداني والأجهزة' },
];

function AnalyticsMock() {
  const bars = [40, 65, 50, 80, 60, 95, 70];
  return (
    <div className="svcx-mock">
      <div className="svcx-mock-title"><span className="dot" /> لوحة تحليلات لحظية</div>
      <div className="amk-stats">
        <div className="amk-stat"><div className="amk-lbl">التسجيلات</div><div className="amk-val">2,847</div></div>
        <div className="amk-stat"><div className="amk-lbl">معدل تسجيل الدخول</div><div className="amk-val teal">94%</div></div>
      </div>
      <div className="amk-bars">
        {bars.map((h, i) => <div key={i} className="amk-bar" style={{ height: `${h}%` }} />)}
      </div>
    </div>
  );
}

function OnsiteMock() {
  const rows = [
    { icon:'fa-desktop', t:'مكاتب تسجيل الدخول', s:'مزودة بالفريق طوال الفعالية' },
    { icon:'fa-id-badge', t:'محطات طباعة الشارات', s:'ميدانياً، جاهزة عند فتح الأبواب' },
    { icon:'fa-headset', t:'الدعم التقني', s:'حاضر ميدانياً يوم الفعالية' },
  ];
  return (
    <div className="svcx-mock">
      <div className="svcx-mock-title"><span className="dot" /> العمليات الميدانية</div>
      {rows.map((r, i) => (
        <div key={i} className="omk-card">
          <div className="omk-ic"><i className={`fas ${r.icon}`} /></div>
          <div><div className="omk-t">{r.t}</div><div className="omk-s">{r.s}</div></div>
        </div>
      ))}
    </div>
  );
}

const FEATURED_TITLES = new Set([
  'صفحات تسجيل مخصصة',
  'طباعة الشارات',
  'إدارة الاعتماد',
  'منصة التذاكر',
  'الدعوات والتذكيرات',
  'لوحة تحليلات لحظية',
  'الدعم الميداني',
]);

const featured = [
  {
    slug: 'registration',
    eyebrow: 'منتج أساسي',
    h2: 'منصة تسجيل الفعاليات في المملكة العربية السعودية',
    sub: 'منصة تسجيل فعاليات متكاملة الإدارة للمملكة العربية السعودية، بصفحات تسجيل ثنائية اللغة بهويتكم، وتسجيل دخول عبر QR مدمج منذ اليوم الأول.',
    bullets: [
      'صفحات تسجيل بهويتكم بالعربية والإنجليزية',
      'تسجيل دخول عبر QR عند البوابة، دون الحاجة لأجهزة إضافية',
      'نماذج مخصصة وفئات حضور ومسارات اعتماد',
    ],
    href: '/ar/services/registration',
    ctaLabel: 'المزيد: منصة التسجيل',
    ariaLabel: 'لوحة منصة تسجيل الفعاليات في المملكة العربية السعودية',
    Visual: RegDashboard,
    bare: true,
  },
  {
    slug: 'badge-printing',
    eyebrow: 'منتج أساسي',
    h2: 'نظام طباعة شارات آمن',
    sub: 'نظام طباعة شارات آمن يصدر شارات مرمّزة بـ QR عند الطلب أثناء تسجيل الدخول، ليحصل كل حاضر على بطاقته فور وصوله.',
    bullets: [
      'طباعة شارات عند الطلب دون طباعة مسبقة أو فرز',
      'شارات مرمّزة بـ QR مرتبطة بملف الحاضر ومستوى الدخول',
      'تصميم شارات مخصص يتوافق مع هوية فعاليتكم',
    ],
    href: '/ar/services/badge-printing',
    ctaLabel: 'المزيد: طباعة الشارات',
    ariaLabel: 'نظام طباعة شارات آمن بشارات فعاليات مرمّزة بـ QR',
    Visual: BadgePrintReveal,
    bare: true,
  },
  {
    slug: 'accreditation',
    eyebrow: 'التحكم بالدخول',
    h2: 'خدمات اعتماد الفعاليات في المملكة العربية السعودية',
    sub: 'منصة تحكم بالدخول للفعاليات في الرياض وجميع أنحاء المملكة، مبنية على تقنية QR أولاً مع إتاحة RFID كخيار إضافي للبوابات عالية الكثافة والدفع الميداني دون نقد.',
    bullets: [
      'اعتماد متعدد المستويات لكبار الشخصيات والمتحدثين والعارضين والفريق والإعلاميين',
      'شارات مرمّزة بـ QR كبطاقة اعتماد افتراضية، تُمسح عند كل نقطة تفتيش',
      'أساور وبطاقات RFID متاحة إلى جانب QR، وليست بديلاً عنه',
      'تحقق لحظي وتحكم بالدخول حسب المناطق، دون قوائم ضيوف يدوية',
    ],
    href: '/ar/services/accreditation',
    ctaLabel: 'المزيد: منصة الاعتماد',
    ariaLabel: 'منصة اعتماد فعاليات بتحكم دخول عبر QR وRFID، الرياض',
    Visual: AccessControlReveal,
    bare: true,
  },
  {
    slug: 'ticketing',
    eyebrow: 'منتج أساسي',
    h2: 'منصة تذاكر الفعاليات بمدفوعات سعودية آمنة',
    sub: 'منصة تذاكر فعاليات مبنية للمملكة العربية السعودية، بأسعار متدرجة ودفع آمن عبر مدى وApple Pay وميسر.',
    bullets: [
      'أسعار متدرجة وعروض حجز مبكر وأكواد ترويجية',
      'دفع آمن عبر مدى وApple Pay وميسر',
      'تذاكر إلكترونية بـ QR تُسلّم فوراً عبر البريد الإلكتروني والواتساب',
    ],
    href: '/ar/services/ticketing',
    ctaLabel: 'المزيد: منصة التذاكر',
    ariaLabel: 'منصة تذاكر فعاليات بتذاكر إلكترونية عبر QR',
    Visual: TicketReveal,
    bare: true,
  },
  {
    slug: 'invitations',
    eyebrow: 'منتج أساسي',
    h2: 'دعوات وتذكيرات وتأكيدات الفعاليات في المملكة العربية السعودية',
    sub: 'طبقة تواصل مع الضيوف لكل فعالية، ترسل الدعوات والتذكيرات والتأكيدات عبر البريد الإلكتروني والواتساب وفق احتياجات فعاليتكم.',
    bullets: [
      'دعوات بهويتكم بالعربية والإنجليزية، عبر البريد الإلكتروني أو الواتساب أو كليهما',
      'تذكيرات آلية مجدولة، دون الحاجة لمتابعة يدوية',
      'تأكيدات فورية وتسليم شارة أو تذكرة إلكترونية فور تأكيد الضيف',
    ],
    href: '/ar/services/invitations',
    ctaLabel: 'المزيد: الدعوات والتذكيرات',
    ariaLabel: 'دعوات وتذكيرات وتأكيدات فعاليات تُرسل عبر البريد الإلكتروني والواتساب',
    Visual: InviteReveal,
    bare: true,
  },
  {
    slug: 'analytics',
    eyebrow: 'التقارير',
    h2: 'لوحة تحليلات لحظية للفعاليات',
    sub: 'لوحة تحليلات لحظية تتتبع التسجيلات والحضور ومعدلات تسجيل الدخول أثناء فعاليتكم، لا بعد أيام من انتهائها.',
    bullets: [
      'تتبع لحظي للتسجيل والحضور وتسجيل الدخول',
      'تحليل الأداء حسب الفئة والجلسة',
      'تقارير قابلة للتصدير قبل الفعالية وأثناءها وبعدها',
    ],
    href: null,
    ctaLabel: 'استفسر عن التحليلات اللحظية',
    ariaLabel: 'لوحة تحليلات لحظية لفعاليات لتتبع الحضور',
    Visual: AnalyticsMock,
    zpattern: true,
  },
  {
    slug: 'onsite-support',
    eyebrow: 'حضور ميداني',
    h2: 'دعم تقني ميداني للفعاليات في جميع أنحاء المملكة العربية السعودية',
    sub: 'دعم تقني ميداني للفعاليات في الرياض وجميع أنحاء المملكة، يدير فريقنا خلاله مكاتب تسجيل الدخول ومحطات الشارات والمشكلات التقنية طوال فعاليتكم.',
    bullets: [
      'فريق ميداني طوال مدة فعاليتكم',
      'مكاتب تسجيل دخول ومحطات شارات ودعم تقني مزودة بالفريق',
      'متواجدون في الرياض (المقر الرئيسي)، مع عمليات في جميع أنحاء المملكة تشمل الدمام',
    ],
    href: null,
    ctaLabel: 'استفسر عن الدعم الميداني',
    ariaLabel: 'فريق دعم تقني ميداني لعمليات الفعاليات',
    Visual: OnsiteMock,
    zpattern: true,
  },
];

export default function ServicesClientAr({ store }) {
  const [active, setActive] = useState('all');
  const gridItems = items
    .filter(i => !FEATURED_TITLES.has(i.t))
    .sort((a, b) => (a.cat === b.cat ? 0 : a.cat === 'platform' ? -1 : 1));
  const shown = active === 'all' ? gridItems : gridItems.filter(i => i.cat === active);

  return (
    <div dir="rtl" lang="ar">
      <Nav store={store} locale="ar" />
      <main style={{ background: '#060D1F', color: '#fff', fontFamily: "'Tajawal', 'Geist', sans-serif" }}>

        <PageHero
          eyebrow="ما نقدمه"
          title="تقنية فعاليات متكاملة. شريك واحد."
          ghost="الخدمات"
          crumbs={[{ label: 'الرئيسية', href: '/ar' }, { label: 'الخدمات' }]}
          locale="ar"
        />

        {/* Featured services */}
        {featured.map((f, i) => (
          <section key={f.slug} className={`svcx${f.zpattern ? ' zpattern' : ''}`} id={f.slug}>
            <div className="svcx-in">
              <div className={`svcx-row${i % 2 ? ' flip' : ''}`}>
                <div className="svcx-copy">
                  <p className="sey">{f.eyebrow}</p>
                  <h2 className="st2" style={{ fontSize: 'clamp(24px,2.6vw,34px)' }}>{f.h2}</h2>
                  <p className="svcx-sub">{f.sub}</p>
                  <ul className="svcx-list">
                    {f.bullets.map((b, bi) => (
                      <li key={bi}><i className="fas fa-check-circle" />{b}</li>
                    ))}
                  </ul>
                  <a href={f.href || '/ar/contact'} className="bgh">
                    <i className="fas fa-arrow-right" /> {f.ctaLabel}
                  </a>
                </div>
                <div className={`svcx-media${f.bare ? ' svcx-media-bare' : ''}`} role="img" aria-label={f.ariaLabel}>
                  <f.Visual />
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Full capability index */}
        <section style={{ background: 'rgba(255,255,255,0.015)', padding: '80px 32px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <p className="sey">فهرس القدرات الكامل</p>
            <h2 className="st2">فهرس قدرات تقنية الفعاليات الكامل</h2>
            <p className="sst">القائمة الكاملة لميزات المنصة والخدمات الميدانية التي تشكّل فعالية زيماء المتكاملة، إضافة إلى المنتجات الأساسية الستة أعلاه.</p>

            <div className="fpills">
              {filters.map(f => (
                <button
                  key={f.id}
                  className={`fpill ${active === f.id ? 'on' : ''}`}
                  onClick={() => setActive(f.id)}
                >
                  {f.label}
                  <span className="fpc">{f.id === 'all' ? gridItems.length : gridItems.filter(i => i.cat === f.id).length}</span>
                </button>
              ))}
            </div>

            <div className="pgrid">
              {shown.map((c, i) => {
                const linked = c.href && c.href !== '/ar/services';
                const Tag = linked ? 'a' : 'div';
                return (
                  <Tag key={c.t} href={linked ? c.href : undefined} className={`relsvc-card ${c.cat} svc-in${linked ? '' : ' static'}`} style={{ animationDelay: `${i * 0.03}s` }}>
                    <span className="relsvc-tag">{c.cat === 'platform' ? 'المنصة' : 'ميداني'}</span>
                    <div className="relsvc-ic"><i className={`fas ${c.icon}`} /></div>
                    <h3>{c.t}</h3>
                    <p>{c.d}</p>
                    {linked && <span className="relsvc-cta">عرض الخدمة <i className="fas fa-arrow-right" /></span>}
                  </Tag>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="alt" style={{ padding: '80px 0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
            <p className="sey">كيف نعمل</p>
            <h2 className="st2">ثلاث خطوات بسيطة</h2>
            <p className="sst">من أول محادثة وحتى يوم الفعالية، نتولى كل شيء.</p>
            <div className="steps">
              {[
                { n:1, t:'أخبرنا عن فعاليتك', d:'شاركنا تفاصيل فعاليتك والتواريخ وعدد الحضور المتوقع ومتطلباتك. سنحدد المزيج المناسب من المنصة والخدمات وفق احتياجاتك.' },
                { n:2, t:'نبني منصتك', d:'يصمم فريقنا نظام التسجيل والشارات والشهادات وأي خدمات إضافية بهويتك. تراجع وتوافق قبل الانطلاق.' },
                { n:3, t:'انطلق بدعم كامل', d:'انطلق وفريقنا يدير كل الجوانب التقنية. في يوم الفعالية، نكون حاضرين ميدانياً. وبعد الفعالية، تحصل على تقرير تحليلي كامل.' },
              ].map((s, i) => (
                <div key={i} className="step">
                  {i < 2 && <div className="step-l" />}
                  <div className="step-n">{s.n}</div>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: 'rgba(212,175,55,0.04)', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '60px 32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>مستعدون لمناقشة فعاليتك؟</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>نرد خلال 24 ساعة ونقدم لك عرضاً واضحاً بسرعة.</p>
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
