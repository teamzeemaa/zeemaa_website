'use client';
import { useState } from 'react';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { servicesList as items } from '../../lib/servicesList';
import RegDashboard from './registration/RegDashboard';
import BadgePrintReveal from './badge-printing/BadgePrintReveal';
import TicketReveal from './ticketing/TicketReveal';
import AccessControlReveal from './accreditation/AccessControlReveal';
import InviteReveal from './invitations/InviteReveal';

const filters = [
  { id:'all', label:'All' },
  { id:'platform', label:'Platform' },
  { id:'onsite', label:'On-site & Hardware' },
];

function AnalyticsMock() {
  const bars = [40, 65, 50, 80, 60, 95, 70];
  return (
    <div className="svcx-mock">
      <div className="svcx-mock-title"><span className="dot" /> Live Analytics Dashboard</div>
      <div className="amk-stats">
        <div className="amk-stat"><div className="amk-lbl">Registrations</div><div className="amk-val">2,847</div></div>
        <div className="amk-stat"><div className="amk-lbl">Check-in Rate</div><div className="amk-val teal">94%</div></div>
      </div>
      <div className="amk-bars">
        {bars.map((h, i) => <div key={i} className="amk-bar" style={{ height: `${h}%` }} />)}
      </div>
    </div>
  );
}

function OnsiteMock() {
  const rows = [
    { icon:'fa-desktop', t:'Check-in Desks', s:'Staffed for the full event' },
    { icon:'fa-id-badge', t:'Badge Printing Stations', s:'On-site, ready at doors open' },
    { icon:'fa-headset', t:'Technical Support', s:'On the ground, event day' },
  ];
  return (
    <div className="svcx-mock">
      <div className="svcx-mock-title"><span className="dot" /> On-Site Operations</div>
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
  'Custom Registration Pages',
  'Badge Printing',
  'Accreditation Management',
  'Ticketing Platform',
  'Invitations & Reminders',
  'Live Analytics Dashboard',
  'On-site Support',
]);

const featured = [
  {
    slug: 'registration',
    eyebrow: 'Core Product',
    h2: 'Event Registration Platform for Saudi Arabia',
    sub: 'A fully managed event registration platform for Saudi Arabia, with branded bilingual sign-up pages and QR check-in built in from day one.',
    bullets: [
      'Branded registration pages in Arabic and English',
      'QR check-in at the gate, no extra hardware required',
      'Custom forms, attendee categories, and approval workflows',
    ],
    href: '/services/registration',
    ctaLabel: 'View More: Registration Platform',
    ariaLabel: 'Event registration platform dashboard for Saudi Arabia events',
    Visual: RegDashboard,
    bare: true,
  },
  {
    slug: 'badge-printing',
    eyebrow: 'Core Product',
    h2: 'Secure Badge Printing System',
    sub: 'A secure badge printing system that issues QR-coded badges on demand at check-in, so every attendee gets a credential the moment they arrive.',
    bullets: [
      'On-demand badge printing with no pre-printing or sorting',
      'QR-coded badges tied to attendee profile and access tier',
      'Custom badge design matched to your event brand',
    ],
    href: '/services/badge-printing',
    ctaLabel: 'View More: Badge Printing',
    ariaLabel: 'Secure badge printing system with QR-coded event badges',
    Visual: BadgePrintReveal,
    bare: true,
  },
  {
    slug: 'accreditation',
    eyebrow: 'Access Control',
    h2: 'Event Accreditation Services in Saudi Arabia',
    sub: 'An event access control platform in Riyadh and across the Kingdom, built QR-first with RFID available as an optional credential format for high-volume gates and cashless on-site spending.',
    bullets: [
      'Multi-tier accreditation for VIP, speaker, exhibitor, staff, and media',
      'QR-coded badges as the default credential, scanned at every checkpoint',
      'RFID wristbands and cards available alongside QR, never as a replacement',
      'Real-time verification and zone-based access control, no manual guest lists',
    ],
    href: '/services/accreditation',
    ctaLabel: 'View More: Accreditation Platform',
    ariaLabel: 'Event accreditation platform with QR and RFID access control, Riyadh',
    Visual: AccessControlReveal,
    bare: true,
  },
  {
    slug: 'ticketing',
    eyebrow: 'Core Product',
    h2: 'Event Ticketing Platform with Secure Saudi Payments',
    sub: 'An event ticketing platform built for Saudi Arabia, with tiered pricing and secure payment through MADA, Apple Pay, and Moyasar.',
    bullets: [
      'Tiered pricing, early-bird offers, and promo codes',
      'Secure payment via MADA, Apple Pay, and Moyasar',
      'QR e-tickets delivered instantly by email and WhatsApp',
    ],
    href: '/services/ticketing',
    ctaLabel: 'View More: Ticketing Platform',
    ariaLabel: 'Event ticketing platform with QR e-tickets',
    Visual: TicketReveal,
    bare: true,
  },
  {
    slug: 'invitations',
    eyebrow: 'Core Product',
    h2: 'Event Invitations, Reminders and Confirmations for Saudi Arabia',
    sub: 'A guest communication layer for every event, sending invitations, reminders, and confirmations by email and WhatsApp depending on what your event requires.',
    bullets: [
      'Branded invitations in Arabic and English, by email, WhatsApp, or both',
      'Automated reminders on a schedule, no manual follow-up needed',
      'Instant confirmations and e-badge or e-ticket delivery once a guest is confirmed',
    ],
    href: '/services/invitations',
    ctaLabel: 'View More: Invitations & Reminders',
    ariaLabel: 'Event invitations, reminders, and confirmations sent by email and WhatsApp',
    Visual: InviteReveal,
    bare: true,
  },
  {
    slug: 'analytics',
    eyebrow: 'Reporting',
    h2: 'Real-Time Event Analytics Dashboard',
    sub: 'A real-time event analytics dashboard that tracks registrations, attendance, and check-in rates as your event happens, not days after it ends.',
    bullets: [
      'Live registration, attendance, and check-in tracking',
      'Category and session-level performance breakdowns',
      'Exportable reports before, during, and after the event',
    ],
    href: null,
    ctaLabel: 'Ask About Live Analytics',
    ariaLabel: 'Real-time event analytics dashboard for attendance tracking',
    Visual: AnalyticsMock,
    zpattern: true,
  },
  {
    slug: 'onsite-support',
    eyebrow: 'On the Ground',
    h2: 'On-Site Event Technology Support Across Saudi Arabia',
    sub: 'On-site event technology support in Riyadh and across Saudi Arabia, with our team managing check-in desks, badge stations, and technical issues throughout your event.',
    bullets: [
      'On-ground team for the full duration of your event',
      'Check-in desks, badge stations, and technical support staffed',
      'Present in Riyadh (HQ), with operations across the Kingdom including Dammam',
    ],
    href: null,
    ctaLabel: 'Ask About On-site Support',
    ariaLabel: 'On-site event technology support team operations',
    Visual: OnsiteMock,
    zpattern: true,
  },
];

export default function ServicesClient({ store }) {
  const [active, setActive] = useState('all');
  const gridItems = items
    .filter(i => !FEATURED_TITLES.has(i.t))
    .sort((a, b) => (a.cat === b.cat ? 0 : a.cat === 'platform' ? -1 : 1));
  const shown = active === 'all' ? gridItems : gridItems.filter(i => i.cat === active);

  return (
    <>
      <Nav store={store} />
      <main style={{ background: '#060D1F', color: '#fff', fontFamily: 'Geist, sans-serif' }}>

        <PageHero
          eyebrow="What We Offer"
          title="Complete Event Technology. One Partner."
          ghost="SERVICES"
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
        />

        {/* Featured services: full-width alternating rows */}
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
                  <a href={f.href || '/contact'} className="bgh">
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

        {/* Full capability index: remaining services as a filterable grid */}
        <section style={{ background: 'rgba(255,255,255,0.015)', padding: '80px 32px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <p className="sey">Full Capability Index</p>
            <h2 className="st2">Full Event Technology Capability Index</h2>
            <p className="sst">The complete list of platform features and on-site services that make up a fully managed Zeemaa event, beyond the six core products above.</p>

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
                const linked = c.href && c.href !== '/services';
                const Tag = linked ? 'a' : 'div';
                return (
                  <Tag key={c.t} href={linked ? c.href : undefined} className={`relsvc-card ${c.cat} svc-in${linked ? '' : ' static'}`} style={{ animationDelay: `${i * 0.03}s` }}>
                    <span className="relsvc-tag">{c.cat === 'platform' ? 'Platform' : 'On-Site'}</span>
                    <div className="relsvc-ic"><i className={`fas ${c.icon}`} /></div>
                    <h3>{c.t}</h3>
                    <p>{c.d}</p>
                    {linked && <span className="relsvc-cta">View Service <i className="fas fa-arrow-right" /></span>}
                  </Tag>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="alt" style={{ padding: '80px 0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
            <p className="sey">How It Works</p>
            <h2 className="st2">Three Simple Steps</h2>
            <p className="sst">From first conversation to event day, we handle everything.</p>
            <div className="steps">
              {[
                { n:1, t:'Tell Us About Your Event', d:'Share your event details, dates, expected attendees, and requirements. We will scope the right combination of platform and services for your specific needs.' },
                { n:2, t:'We Build Your Platform', d:'Our team designs your branded registration system, badges, certificates, and any additional services. You review and approve before anything goes live.' },
                { n:3, t:'Go Live with Full Support', d:'Launch with our team managing everything technical. On event day, we are on the ground. After the event, you get a full analytics report.' },
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
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Ready to discuss your event?</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>We respond within 24 hours and will have a clear proposal to you fast.</p>
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
