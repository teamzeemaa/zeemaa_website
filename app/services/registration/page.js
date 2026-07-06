import { readStore } from '../../../lib/store';
import Nav from '../../../components/Nav';
import Footer from '../../../components/Footer';
import Breadcrumb from '../../../components/Breadcrumb';
import RelatedServices from '../../../components/RelatedServices';
import RegDashboard from './RegDashboard';

export const metadata = {
  title: 'Event Registration System in Saudi Arabia | Zeemaa',
  description: 'Custom event registration platform for conferences, exhibitions, and corporate events across Saudi Arabia. Branded sign-up pages, Arabic and English support, QR check-in, and live analytics, fully managed by Zeemaa.',
  alternates: { canonical: 'https://zeemaa.com/services/registration' },
};

export default async function RegistrationPage() {
  const store = await readStore();

  const features = [
    { icon:'fa-palette', t:'Branded Registration Pages', d:'Custom sign-up pages built around your event identity, with your logo, colors, and domain. Attendees see your brand from the first click.' },
    { icon:'fa-language', t:'Full Arabic and English', d:'Bilingual forms with right-to-left support, so every attendee registers in their preferred language without friction.' },
    { icon:'fa-sliders', t:'Custom Forms and Logic', d:'Conditional fields, multiple attendee categories, and approval workflows tailored to how your event actually runs.' },
    { icon:'fa-qrcode', t:'QR Check-in Built In', d:'Every registration generates a secure QR code for fast, contactless entry on event day. No extra setup required.' },
    { icon:'fa-chart-line', t:'Live Analytics', d:'Track registrations, attendance, and check-in rates in real time, with reports you can export before, during, or after the event.' },
    { icon:'fa-credit-card', t:'Integrated Payments', d:'Collect fees securely through MADA, Apple Pay, Visa, and Mastercard via certified Saudi gateways including Moyasar.' },
  ];

  return (
    <>
      <Nav store={store} />
      <main style={{ background: '#060D1F', color: '#fff', fontFamily: 'Geist, sans-serif' }}>

        <section className="isp-hero">
          <div className="isp-hero-inner">
            <div className="isp-hero-top">
              <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Registration' }]} />
              <span className="isp-tag">Platform</span>
            </div>
            <div className="isp-hero-grid">
              <div>
                <p className="sey">Core Product</p>
                <h1 className="st2 isp-h1">Event Registration System for Saudi Arabia</h1>
                <p className="isp-desc">
                  Zeemaa builds and manages the complete registration layer for your event, from a branded sign-up page to QR check-in at the gate. Purpose-built for conferences, exhibitions, and corporate events across the Kingdom, and fully managed by our team so you never touch the technical side.
                </p>
                <div className="isp-cta-row">
                  <a href="/contact" className="bg"><i className="fas fa-paper-plane" /> Get in Touch</a>
                  <a href="/demo" className="bgh"><i className="fas fa-play" /> Book a Demo</a>
                </div>
              </div>
              <div className="isp-hero-visual">
                <span className="isp-chip isp-chip-a">2,847 Registrations</span>
                <span className="isp-chip isp-chip-b">94% Check-in Rate</span>
                <div className="isp-panel">
                  <RegDashboard />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: 'rgba(255,255,255,0.015)', padding: '70px 0' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px' }}>
            <p className="sey">What You Get</p>
            <h2 className="st2">Everything Registration Should Do</h2>
            <p className="sst">One platform that handles sign-up, payment, communication, and check-in, without stitching tools together.</p>
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
          <p className="sey">How It Works</p>
          <h2 className="st2">From Setup to Check-in</h2>
          <div style={{ display: 'grid', gap: 24, marginTop: 32 }}>
            {[
              { n:'1', t:'We build your registration platform', d:'You share your event details and requirements. Our team designs a branded registration system, sets up categories, forms, and payment, and hands it to you for review before launch.' },
              { n:'2', t:'Attendees register in Arabic or English', d:'Your sign-up page goes live on your domain. Attendees register, pay if needed, and receive a confirmation with their QR code, all in their language.' },
              { n:'3', t:'You track everything live', d:'Watch registrations come in through a real-time dashboard, with the data you need to plan staffing, catering, and layout.' },
              { n:'4', t:'Fast QR check-in on event day', d:'Our on-site team manages check-in stations, scanning QR codes for instant, contactless entry and live attendance tracking.' },
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

        <RelatedServices currentHref="/services/registration" />

        <section style={{ background: 'rgba(212,175,55,0.04)', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '60px 32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Planning an event in Saudi Arabia?</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>Tell us what you need and we will scope the right registration setup for you.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contact" className="bg"><i className="fas fa-paper-plane" /> Get in Touch</a>
            <a href="/demo" className="bgh"><i className="fas fa-play" /> Book a Demo</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}