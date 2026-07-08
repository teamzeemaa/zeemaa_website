import { readStore } from '../../../lib/store';
import Nav from '../../../components/Nav';
import Footer from '../../../components/Footer';
import Breadcrumb from '../../../components/Breadcrumb';
import RelatedServices from '../../../components/RelatedServices';
import TicketReveal from './TicketReveal';

export const metadata = {
  title: 'Event Ticketing Platform in Saudi Arabia | Zeemaa',
  description: 'Custom event ticketing for conferences, exhibitions, and corporate events across Saudi Arabia. Tiered pricing, promo codes, secure MADA and Apple Pay payments, QR e-tickets, and live sales tracking, fully managed by Zeemaa.',
  alternates: {
    canonical: 'https://zeemaa.com/services/ticketing',
    languages: { en: 'https://zeemaa.com/services/ticketing', ar: 'https://zeemaa.com/ar/services/ticketing' },
  },
};

export default async function TicketingPage() {
  const store = await readStore();

  const features = [
    { icon:'fa-layer-group', t:'Tiered Pricing', d:'VIP, standard, student, and any category your event needs, each with its own price, allocation, and access level.' },
    { icon:'fa-tags', t:'Early-Bird and Promo Codes', d:'Time-limited pricing, discount codes, and group offers that you control, with automatic cut-offs so nothing needs manual policing.' },
    { icon:'fa-credit-card', t:'Saudi Payment Gateways', d:'MADA, Apple Pay, Visa, and Mastercard through certified gateways including Moyasar, with settlement in SAR.' },
    { icon:'fa-qrcode', t:'QR E-Tickets', d:'Every purchase delivers a QR-coded e-ticket by email and WhatsApp, ready to scan at the gate with no printing needed.' },
    { icon:'fa-chart-line', t:'Live Sales Tracking', d:'Watch ticket sales, revenue, and category performance in real time, so you can adjust pricing or marketing while it matters.' },
    { icon:'fa-rotate-left', t:'Refunds and Transfers', d:'Cancellations, refunds, and name transfers handled through a clear workflow that keeps your records and revenue accurate.' },
  ];

  return (
    <>
      <Nav store={store} />
      <main style={{ background: '#060D1F', color: '#fff', fontFamily: 'Geist, sans-serif' }}>

        <section className="isp-hero">
          <div className="isp-hero-inner">
            <div className="isp-hero-top">
              <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Ticketing' }]} />
              <span className="isp-tag">Platform</span>
            </div>
            <div className="isp-hero-grid">
              <div>
                <p className="sey">Core Product</p>
                <h1 className="st2 isp-h1">Event Ticketing Platform for Saudi Arabia</h1>
                <p className="isp-desc">
                  Zeemaa runs the full ticketing layer for your event, from tiered pricing and promo codes to secure payment and QR entry at the gate. Built for conferences, exhibitions, and corporate events across the Kingdom, and fully managed by our team so selling tickets never becomes your second job.
                </p>
                <div className="isp-cta-row">
                  <a href="/contact" className="bg"><i className="fas fa-paper-plane" /> Get in Touch</a>
                  <a href="/demo" className="bgh"><i className="fas fa-play" /> Book a Demo</a>
                </div>
              </div>
              <div className="isp-hero-visual">
                <span className="isp-chip isp-chip-a">Tiered Pricing</span>
                <span className="isp-chip isp-chip-b">MADA and Apple Pay</span>
                <div className="isp-panel">
                  <TicketReveal />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: 'rgba(255,255,255,0.015)', padding: '70px 0' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px' }}>
            <p className="sey">What You Get</p>
            <h2 className="st2">Everything Ticketing Should Do</h2>
            <p className="sst">One platform that handles pricing, payment, delivery, and entry, without stitching a payment gateway to a separate ticket tool.</p>
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
          <h2 className="st2">From Pricing to the Gate</h2>
          <div style={{ display: 'grid', gap: 24, marginTop: 32 }}>
            {[
              { n:'1', t:'We set up your ticket structure', d:'You share your tiers, prices, and sales timeline. Our team builds the ticketing flow, connects payment, and hands it to you for review before sales open.' },
              { n:'2', t:'Attendees buy in Arabic or English', d:'Your ticket page goes live on your domain. Buyers pay with MADA, Apple Pay, or card, and receive their QR e-ticket instantly.' },
              { n:'3', t:'You watch sales in real time', d:'Track revenue, category performance, and remaining allocation live, and launch promo codes or new tiers whenever you need.' },
              { n:'4', t:'QR entry on event day', d:'Our on-site team scans tickets at the gate, flags duplicates instantly, and keeps entry moving with live attendance counts.' },
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

        <RelatedServices currentHref="/services/ticketing" />

        <section style={{ background: 'rgba(212,175,55,0.04)', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '60px 32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Selling tickets for an event in Saudi Arabia?</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>Tell us your tiers and timeline and we will scope the right ticketing setup for you.</p>
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
