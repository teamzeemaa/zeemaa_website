'use client';
import { useState, useEffect } from 'react';
import Nav from '../../components/Nav';
import PageHero from '../../components/PageHero';
import { countries } from '../../lib/countries';
import { captureUtm, getUtms } from '../../lib/tracking';

export default function ContactPage() {
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

  // Validation rules
  const errors = {
    fullName: form.fullName.trim().length < 2 ? 'Please enter your full name' : '',
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? 'Please enter a valid email' : '',
    phone: form.phone.replace(/\D/g, '').length < 7 ? 'Please enter a valid phone number' : '',
    message: form.message.trim().length < 10 ? 'Please tell us a bit more (10+ characters)' : '',
  };
  const isValid = !errors.fullName && !errors.email && !errors.phone && !errors.message;

  const mark = (field) => setTouched(t => ({ ...t, [field]: true }));

  // returns class + error for a field
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
      window.location.href = '/thank-you';
    } else {
      alert('Something went wrong. Please reach us via WhatsApp or email directly.');
    }
  };

  const waLink = `https://wa.me/${site.whatsapp || '966552995295'}?text=Hi%20Zeemaa%2C%20I%20am%20planning%20an%20event%20and%20would%20like%20to%20discuss%20your%20solutions.`;

  return (
    <>
      <Nav store={store} />
      <main style={{ background: '#060D1F', color: '#fff', fontFamily: 'Geist, sans-serif', minHeight: '100vh' }}>
        <PageHero
          eyebrow="Get In Touch"
          title="Let us Discuss Your Next Event"
          ghost="CONTACT"
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        />

        <section style={{ padding: '40px 32px 80px', maxWidth: 1200, margin: '0 auto' }}>
          <div className="cgrid">
            {/* LEFT: form or success */}
            <div className="cform">
              {done ? (
                <div className="csuccess">
                  <div className="csuccess-ic"><i className="fas fa-check" /></div>
                  <h3>Message sent</h3>
                  <p>Thank you. Our team will get back to you within 24 hours. For anything urgent, reach us on WhatsApp.</p>
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg" style={{ marginTop: 8 }}>
                    <i className="fab fa-whatsapp" /> Message us on WhatsApp
                  </a>
                </div>
              ) : (
                <>
                  <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Send Us a Message</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 24 }}>We will get back to you within 24 hours.</p>

                  <div className="fg">
                    <label>Full Name *</label>
                    <input className={`fi ${fieldState('fullName').cls}`} placeholder="Enter your full name"
                      value={form.fullName} onBlur={() => mark('fullName')}
                      onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} />
                    {fieldState('fullName').err && <span className="fhint">{fieldState('fullName').err}</span>}
                  </div>

                  <div className="fg">
                    <label>Email Address *</label>
                    <input type="email" className={`fi ${fieldState('email').cls}`} placeholder="your@email.com"
                      value={form.email} onBlur={() => mark('email')}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                    {fieldState('email').err && <span className="fhint">{fieldState('email').err}</span>}
                  </div>

                  <div className="fg">
                    <label>Phone Number *</label>
                    <div className="phr">
                      <select className="fi phc" value={form.countryCode} onChange={e => setForm(f => ({ ...f, countryCode: e.target.value }))}>
                        {countries.map((c, i) => <option key={i} value={c[1]}>{c[0]} {c[1]}</option>)}
                      </select>
                      <input type="tel" className={`fi ${fieldState('phone').cls}`} placeholder="55 XXX XXXX"
                        value={form.phone} onBlur={() => mark('phone')}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                    </div>
                    {fieldState('phone').err && <span className="fhint">{fieldState('phone').err}</span>}
                  </div>

                  <div className="fg">
                    <label>Message *</label>
                    <textarea className={`fi ${fieldState('message').cls}`} placeholder="Tell us about your event: dates, location, and specific requirements..."
                      value={form.message} onBlur={() => mark('message')}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                    {fieldState('message').err && <span className="fhint">{fieldState('message').err}</span>}
                  </div>

                  <button className="bg" onClick={submit} disabled={submitting || !isValid} style={{ width: '100%', justifyContent: 'center', opacity: (submitting || !isValid) ? 0.55 : 1 }}>
                    <i className="fas fa-paper-plane" /> {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </>
              )}
            </div>

            {/* RIGHT: WhatsApp hero + info */}
            <div className="cinfo">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="wa-hero">
                <div className="wa-hero-ic"><i className="fab fa-whatsapp" /></div>
                <div>
                  <div className="wa-hero-t">Chat on WhatsApp</div>
                  <div className="wa-hero-s">Fastest way to reach us. Tap to start.</div>
                </div>
                <i className="fas fa-arrow-right wa-hero-arr" />
              </a>

              <div className="cic"><div className="cii"><i className="fas fa-phone" /></div><div><div className="cil">Phone and WhatsApp</div><div className="civ"><a className="ltr-num" href={`tel:${site.phone || '+966552995295'}`}>{site.phone || '+966 55 299 5295'}</a></div></div></div>
              <div className="cic"><div className="cii"><i className="fas fa-envelope" /></div><div><div className="cil">Email</div><div className="civ"><a href={`mailto:${site.email || 'hello@zeemaa.com'}`}>{site.email || 'hello@zeemaa.com'}</a></div></div></div>
              <div className="cic"><div className="cii"><i className="fas fa-map-marker-alt" /></div><div><div className="cil">Offices</div><div className="ofl">
                <div className="ofi"><i className="fas fa-circle" /> Riyadh, Saudi Arabia <span className="ohq">HQ</span></div>
                <div className="ofi"><i className="fas fa-circle" /> Dammam, Saudi Arabia</div>
              </div></div></div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}