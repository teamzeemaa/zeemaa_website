'use client';
import { useState, useEffect } from 'react';
import { LogoIcon, LogoText } from '../../components/Logo';
import { countries } from '../../lib/countries';
import { captureUtm, getUtms, trackDemoSubmit } from '../../lib/tracking';

export default function DemoClient({ store }) {
  const [form, setForm] = useState({ fullName:'', email:'', phone:'', countryCode:'+966', company:'', eventType:'', demoPreference:'', message:'' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { captureUtm(); }, []);

  const site = store.site || {};
  const isWatch = site.demoMode === 'watch' && site.demoLink;

  const submit = async () => {
    if (!form.fullName || !form.email || !form.phone) { alert('Please fill in all required fields.'); return; }
    setSubmitting(true);
    const utms = getUtms();
    sessionStorage.setItem('_zm_last_conv', 'demo');
    const res = await fetch('/api/demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, ...utms }),
    });
    setSubmitting(false);
    if (res.ok) {
      trackDemoSubmit();
      window.location.href = '/thank-you';
    } else {
      alert('Something went wrong. Please reach us via WhatsApp.');
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#060D1F', color: '#fff', fontFamily: 'Geist, sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 48 }}>
          <LogoIcon height={28} /><LogoText height={14} />
        </a>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 12 }}>
              {isWatch ? 'Watch the Demo' : 'Book a Demo'}
            </p>
            <h1 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 700, lineHeight: 1.15, marginBottom: 20 }}>
              See Zeemaa in Action
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 32, textAlign: 'justify' }}>
              {isWatch
                ? 'Watch a full walkthrough of the Zeemaa platform: registration, QR check-in, badge printing, accreditation, and live analytics. See how we manage the complete on-site technology layer for events across Saudi Arabia.'
                : 'Schedule a personalized demo and see exactly how Zeemaa would handle your specific event. We walk you through the platform, answer your questions, and outline what your setup would look like.'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                'Full platform walkthrough tailored to your event type',
                'Live demonstration of QR check-in and badge printing',
                'Pricing discussion based on your requirements',
                'No commitment. No pressure. Just a real conversation.',
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
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Watch the Demo</h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 24, textAlign: 'justify' }}>Click below to watch the full Zeemaa platform demonstration. No signup required.</p>
              <a href={site.demoLink} target="_blank" rel="noopener noreferrer" className="bg" style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                <i className="fas fa-play" /> Watch Now
              </a>
            </div>
          ) : (
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32 }}>
              <div className="fg"><label>Full Name *</label><input className="fi" placeholder="Your full name" value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} /></div>
              <div className="fg"><label>Email *</label><input type="email" className="fi" placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
              <div className="fg"><label>Company / Organization *</label><input className="fi" placeholder="Company name" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} /></div>
              <div className="fg"><label>Phone *</label>
                <div className="phr">
                  <select className="fi phc" value={form.countryCode} onChange={e => setForm(f => ({ ...f, countryCode: e.target.value }))}>
                    {countries.map((c, i) => <option key={i} value={c[1]}>{c[0]} {c[1]}</option>)}
                  </select>
                  <input type="tel" className="fi" placeholder="55 XXX XXXX" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
              </div>
              <div className="fr2">
                <div className="fg"><label>Event Type</label>
                  <select className="fi" value={form.eventType} onChange={e => setForm(f => ({ ...f, eventType: e.target.value }))}>
                    <option value="">Select</option>
                    <option>Conference / Summit</option><option>Exhibition / Trade Show</option>
                    <option>Corporate Event</option><option>Award Ceremony</option>
                    <option>Government Event</option><option>Workshop / Seminar</option><option>Other</option>
                  </select>
                </div>
                <div className="fg"><label>Demo Preference</label>
                  <select className="fi" value={form.demoPreference} onChange={e => setForm(f => ({ ...f, demoPreference: e.target.value }))}>
                    <option value="">Select</option>
                    <option>Online Demo</option><option>On-site Visit</option><option>Either</option>
                  </select>
                </div>
              </div>
              <div className="fg"><label>Tell Us About Your Event</label><textarea className="fi" placeholder="Expected attendees, event date, location, specific requirements..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} /></div>
              <button className="bg" onClick={submit} disabled={submitting} style={{ width: '100%', justifyContent: 'center' }}>
                <i className="fas fa-paper-plane" /> {submitting ? 'Sending...' : 'Book My Demo'}
              </button>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 12, textAlign: 'center' }}>We respond within 24 hours. No spam, ever.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
