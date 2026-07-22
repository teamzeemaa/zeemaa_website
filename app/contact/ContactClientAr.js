'use client';
import { useState, useEffect } from 'react';
import Nav from '../../components/Nav';
import PageHero from '../../components/PageHero';
import { countries } from '../../lib/countries';
import { captureUtm, getUtms } from '../../lib/tracking';

export default function ContactClientAr() {
  const [store, setStore] = useState({ site: {}, sections: {}, pages: {} });
  const [form, setForm] = useState({ fullName:'', email:'', phone:'', countryCode:'+966', message:'' });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    captureUtm();
    fetch('/api/store').then(r => r.json()).then(d => { if (d.store) setStore(d.store); }).catch(() => {});
  }, []);

  const site = store.site || {};

  const errors = {
    fullName: form.fullName.trim().length < 2 ? 'يرجى إدخال اسمك الكامل' : '',
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? 'يرجى إدخال بريد إلكتروني صحيح' : '',
    phone: form.phone.replace(/\D/g, '').length < 7 ? 'يرجى إدخال رقم هاتف صحيح' : '',
    message: form.message.trim().length < 10 ? 'يرجى إخبارنا بمزيد من التفاصيل (10 أحرف على الأقل)' : '',
  };
  const isValid = !errors.fullName && !errors.email && !errors.phone && !errors.message;

  const mark = (field) => setTouched(t => ({ ...t, [field]: true }));

  const fieldState = (field) => {
    if (!touched[field]) return { cls: '', err: '' };
    return errors[field] ? { cls: 'fi-err', err: errors[field] } : { cls: 'fi-ok', err: '' };
  };

  const submit = async () => {
    setTouched({ fullName:true, email:true, phone:true, message:true });
    if (!isValid) return;
    setSubmitting(true);
    const utms = getUtms();
    sessionStorage.setItem('_zm_last_conv', 'contact');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, ...utms }),
    });
    setSubmitting(false);
    if (res.ok) {
      window.location.href = '/ar/thank-you';
    } else {
      alert('حدث خطأ ما. يرجى التواصل معنا عبر واتساب أو البريد الإلكتروني مباشرة.');
    }
  };

  const waLink = `https://wa.me/${site.whatsapp || '966552995295'}?text=${encodeURIComponent('مرحباً زيماء، أخطط لفعالية وأود مناقشة حلولكم.')}`;

  return (
    <div dir="rtl" lang="ar">
      <Nav store={store} locale="ar" />
      <main style={{ background: '#060D1F', color: '#fff', fontFamily: "'Tajawal', 'Geist', sans-serif", minHeight: '100vh' }}>
        <PageHero
          eyebrow="تواصل معنا"
          title="لنتحدث عن فعاليتك القادمة"
          ghost="تواصل"
          crumbs={[{ label: 'الرئيسية', href: '/ar' }, { label: 'تواصل معنا' }]}
          locale="ar"
        />

        <section style={{ padding: '40px 32px 80px', maxWidth: 1200, margin: '0 auto' }}>
          <div className="cgrid">
            <div className="cform">
              {done ? (
                <div className="csuccess">
                  <div className="csuccess-ic"><i className="fas fa-check" /></div>
                  <h3>تم إرسال الرسالة</h3>
                  <p>شكراً لك. سيتواصل معك فريقنا خلال 24 ساعة. لأي أمر عاجل، تواصل معنا عبر واتساب.</p>
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg" style={{ marginTop: 8 }}>
                    <i className="fab fa-whatsapp" /> راسلنا عبر واتساب
                  </a>
                </div>
              ) : (
                <>
                  <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>أرسل لنا رسالة</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 24 }}>سنرد عليك خلال 24 ساعة.</p>

                  <div className="fg">
                    <label>الاسم الكامل *</label>
                    <input className={`fi ${fieldState('fullName').cls}`} placeholder="أدخل اسمك الكامل"
                      value={form.fullName} onBlur={() => mark('fullName')}
                      onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} />
                    {fieldState('fullName').err && <span className="fhint">{fieldState('fullName').err}</span>}
                  </div>

                  <div className="fg">
                    <label>البريد الإلكتروني *</label>
                    <input type="email" className={`fi ${fieldState('email').cls}`} placeholder="your@email.com"
                      value={form.email} onBlur={() => mark('email')}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                    {fieldState('email').err && <span className="fhint">{fieldState('email').err}</span>}
                  </div>

                  <div className="fg">
                    <label>رقم الهاتف *</label>
                    <div className="phr">
                      <select className="fi phc" value={form.countryCode} onChange={e => setForm(f => ({ ...f, countryCode: e.target.value }))}>
                        {countries.map((c, i) => <option key={i} value={c[1]}>{c[0]} {c[1]}</option>)}
                      </select>
                      <input type="tel" className={`fi ltr-num ${fieldState('phone').cls}`} placeholder="55 XXX XXXX"
                        value={form.phone} onBlur={() => mark('phone')}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                    </div>
                    {fieldState('phone').err && <span className="fhint">{fieldState('phone').err}</span>}
                  </div>

                  <div className="fg">
                    <label>الرسالة *</label>
                    <textarea className={`fi ${fieldState('message').cls}`} placeholder="أخبرنا عن فعاليتك: التواريخ والموقع والمتطلبات الخاصة..."
                      value={form.message} onBlur={() => mark('message')}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                    {fieldState('message').err && <span className="fhint">{fieldState('message').err}</span>}
                  </div>

                  <button className="bg" onClick={submit} disabled={submitting || !isValid} style={{ width: '100%', justifyContent: 'center', opacity: (submitting || !isValid) ? 0.55 : 1 }}>
                    <i className="fas fa-paper-plane" /> {submitting ? 'جارٍ الإرسال...' : 'إرسال الرسالة'}
                  </button>
                </>
              )}
            </div>

            <div className="cinfo">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="wa-hero">
                <div className="wa-hero-ic"><i className="fab fa-whatsapp" /></div>
                <div>
                  <div className="wa-hero-t">تحدث عبر واتساب</div>
                  <div className="wa-hero-s">أسرع طريقة للتواصل معنا. اضغط للبدء.</div>
                </div>
                <i className="fas fa-arrow-right wa-hero-arr" />
              </a>

              <div className="cic"><div className="cii"><i className="fas fa-phone" /></div><div><div className="cil">الهاتف والواتساب</div><div className="civ"><a className="ltr-num" href={`tel:${site.phone || '+966552995295'}`}>{site.phone || '+966 55 299 5295'}</a></div></div></div>
              <div className="cic"><div className="cii"><i className="fas fa-envelope" /></div><div><div className="cil">البريد الإلكتروني</div><div className="civ"><a className="ltr-num" href={`mailto:${site.email || 'hello@zeemaa.com'}`}>{site.email || 'hello@zeemaa.com'}</a></div></div></div>
              <div className="cic"><div className="cii"><i className="fas fa-map-marker-alt" /></div><div><div className="cil">المكاتب</div><div className="ofl">
                <div className="ofi"><i className="fas fa-circle" /> الرياض، المملكة العربية السعودية <span className="ohq">HQ</span></div>
                <div className="ofi"><i className="fas fa-circle" /> الدمام، المملكة العربية السعودية</div>
              </div></div></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
