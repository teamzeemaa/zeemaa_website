'use client';
import { useState, useEffect } from 'react';
import { LogoIcon, LogoText } from '../../components/Logo';
import { countries } from '../../lib/countries';
import { captureUtm, getUtms, trackDemoSubmit } from '../../lib/tracking';

export default function DemoClientAr({ store }) {
  const [form, setForm] = useState({ fullName:'', email:'', phone:'', countryCode:'+966', company:'', eventType:'', demoPreference:'', message:'' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { captureUtm(); }, []);

  const site = store.site || {};
  const isWatch = site.demoMode === 'watch' && site.demoLink;

  const submit = async () => {
    if (!form.fullName || !form.email || !form.phone) { alert('يرجى تعبئة جميع الحقول المطلوبة.'); return; }
    setSubmitting(true);
    const utms = getUtms();
    sessionStorage.setItem('_zm_last_conv', 'demo');
    const res = await fetch('/api/demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, ...utms }),
    });
    setSubmitting(false);
    if (res.ok) { trackDemoSubmit(); window.location.href = '/ar/thank-you'; }
    else alert('حدث خطأ ما. يرجى التواصل معنا عبر واتساب.');
  };

  return (
    <div dir="rtl" lang="ar">
      <main style={{ minHeight: '100vh', background: '#060D1F', color: '#fff', fontFamily: "'Tajawal', 'Geist', sans-serif" }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
          <a href="/ar" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 48 }}>
            <LogoIcon height={28} /><LogoText height={14} />
          </a>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 12 }}>
                {isWatch ? 'شاهد العرض التجريبي' : 'احجز عرضاً تجريبياً'}
              </p>
              <h1 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 700, lineHeight: 1.15, marginBottom: 20 }}>
                شاهد زيماء أثناء العمل
              </h1>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 32, textAlign: 'justify' }}>
                {isWatch
                  ? 'شاهد جولة كاملة في منصة زيماء: التسجيل وتسجيل الدخول عبر QR وطباعة الشارات والاعتماد والتحليلات اللحظية. تعرف على كيفية إدارتنا لطبقة التقنية الميدانية الكاملة للفعاليات في جميع أنحاء المملكة العربية السعودية.'
                  : 'احجز عرضاً تجريبياً مخصصاً لترى بالضبط كيف ستتعامل زيماء مع فعاليتك الخاصة. نأخذك في جولة عبر المنصة، ونجيب عن أسئلتك، ونوضح لك شكل إعدادك.'}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'جولة كاملة في المنصة مخصصة لنوع فعاليتك',
                  'عرض حي لتسجيل الدخول عبر QR وطباعة الشارات',
                  'مناقشة الأسعار وفق متطلباتك',
                  'دون التزام. دون ضغط. مجرد محادثة حقيقية.',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
                    <i className="fas fa-check" style={{ color: '#00D4B4', flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {isWatch ? (
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32, textAlign: 'center' }}>
                <i className="fas fa-play-circle" style={{ fontSize: 64, color: '#D4AF37', marginBottom: 20, display: 'block' }} />
                <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>شاهد العرض التجريبي</h2>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 24, textAlign: 'justify' }}>اضغط أدناه لمشاهدة العرض الكامل لمنصة زيماء. دون الحاجة للتسجيل.</p>
                <a href={site.demoLink} target="_blank" rel="noopener noreferrer" className="bg" style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                  <i className="fas fa-play" /> شاهد الآن
                </a>
              </div>
            ) : (
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32 }}>
                <div className="fg"><label>الاسم الكامل *</label><input className="fi" placeholder="اسمك الكامل" value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} /></div>
                <div className="fg"><label>البريد الإلكتروني *</label><input type="email" className="fi" placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
                <div className="fg"><label>الشركة / المؤسسة *</label><input className="fi" placeholder="اسم الشركة" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} /></div>
                <div className="fg"><label>الهاتف *</label>
                  <div className="phr">
                    <select className="fi phc" value={form.countryCode} onChange={e => setForm(f => ({ ...f, countryCode: e.target.value }))}>
                      {countries.map((c, i) => <option key={i} value={c[1]}>{c[0]} {c[1]}</option>)}
                    </select>
                    <input type="tel" className="fi ltr-num" placeholder="55 XXX XXXX" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                  </div>
                </div>
                <div className="fr2">
                  <div className="fg"><label>نوع الفعالية</label>
                    <select className="fi" value={form.eventType} onChange={e => setForm(f => ({ ...f, eventType: e.target.value }))}>
                      <option value="">اختر</option>
                      <option>مؤتمر / قمة</option><option>معرض / معرض تجاري</option>
                      <option>فعالية مؤسسية</option><option>حفل توزيع جوائز</option>
                      <option>فعالية حكومية</option><option>ورشة عمل / ندوة</option><option>أخرى</option>
                    </select>
                  </div>
                  <div className="fg"><label>تفضيل العرض</label>
                    <select className="fi" value={form.demoPreference} onChange={e => setForm(f => ({ ...f, demoPreference: e.target.value }))}>
                      <option value="">اختر</option>
                      <option>عرض عبر الإنترنت</option><option>زيارة ميدانية</option><option>كلاهما</option>
                    </select>
                  </div>
                </div>
                <div className="fg"><label>أخبرنا عن فعاليتك</label><textarea className="fi" placeholder="عدد الحضور المتوقع، تاريخ الفعالية، الموقع، المتطلبات الخاصة..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} /></div>
                <button className="bg" onClick={submit} disabled={submitting} style={{ width: '100%', justifyContent: 'center' }}>
                  <i className="fas fa-paper-plane" /> {submitting ? 'جارٍ الإرسال...' : 'احجز عرضي التجريبي'}
                </button>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 12, textAlign: 'center' }}>نرد خلال 24 ساعة. دون أي رسائل مزعجة أبداً.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
