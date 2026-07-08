import { readStore } from '../../../lib/store';
import Nav from '../../../components/Nav';
import Footer from '../../../components/Footer';
import Breadcrumb from '../../../components/Breadcrumb';
import RelatedServices from '../../../components/RelatedServices';
import InviteReveal from './InviteReveal';

export const metadata = {
  title: 'Event Invitations, Reminders and Confirmations | Zeemaa',
  description: 'Digital invitations, automated reminders, RSVP confirmations, and e-badge or e-ticket delivery for every event in Saudi Arabia, sent by email and WhatsApp depending on your requirements, fully managed by Zeemaa.',
  alternates: {
    canonical: 'https://zeemaa.com/services/invitations',
    languages: { en: 'https://zeemaa.com/services/invitations', ar: 'https://zeemaa.com/ar/services/invitations' },
  },
};

export default async function InvitationsPage() {
  const store = await readStore();

  const features = [
    { icon:'fa-envelope-open-text', t:'Digital Invitations', d:'Branded invitations in Arabic and English, sent by email, WhatsApp, or both, for any event from a private dinner to a public conference.' },
    { icon:'fa-bell', t:'Automated Reminders', d:'Scheduled reminders leading up to the event, save the date, days-before nudges, and day-of alerts, sent without any manual follow-up.' },
    { icon:'fa-user-check', t:'RSVP and Approval Workflows', d:'Track responses live, with an optional host approval step for gated guest lists, or automatic confirmation for open registration and ticketed events.' },
    { icon:'fa-circle-check', t:'Instant Confirmations', d:'The moment a guest responds, or is approved, a confirmation goes out automatically by email and WhatsApp.' },
    { icon:'fa-qrcode', t:'E-Badge and E-Ticket Delivery', d:'Confirmed guests receive their QR-coded badge or ticket automatically, tied directly into Badge Printing and Ticketing.' },
    { icon:'fa-sliders', t:'Channel Control Per Event', d:'Choose email only, WhatsApp only, or both, configured to match each event’s requirements, not a one-size-fits-all setting.' },
  ];

  return (
    <>
      <Nav store={store} />
      <main style={{ background: '#060D1F', color: '#fff', fontFamily: 'Geist, sans-serif' }}>

        <section className="isp-hero">
          <div className="isp-hero-inner">
            <div className="isp-hero-top">
              <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Invitations & Reminders' }]} />
              <span className="isp-tag">Platform</span>
            </div>
            <div className="isp-hero-grid">
              <div>
                <p className="sey">Core Product</p>
                <h1 className="st2 isp-h1">Event Invitations, Reminders and Confirmations for Saudi Arabia</h1>
                <p className="isp-desc">
                  Zeemaa runs the full guest communication layer for your event, from the first invitation to the final confirmation. Invitations, reminders, and confirmations go out by email and WhatsApp depending on what your event requires, whether that is an open registration, a paid ticket, or an approved guest list, fully managed by our team.
                </p>
                <div className="isp-cta-row">
                  <a href="/contact" className="bg"><i className="fas fa-paper-plane" /> Get in Touch</a>
                  <a href="/demo" className="bgh"><i className="fas fa-play" /> Book a Demo</a>
                </div>
              </div>
              <div className="isp-hero-visual">
                <span className="isp-chip isp-chip-a">Email + WhatsApp</span>
                <span className="isp-chip isp-chip-b">Automated Reminders</span>
                <div className="isp-panel">
                  <InviteReveal />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: 'rgba(255,255,255,0.015)', padding: '70px 0' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px' }}>
            <p className="sey">What You Get</p>
            <h2 className="st2">Everything Guest Communication Should Do</h2>
            <p className="sst">One layer that handles invitations, reminders, confirmations, and credential delivery, for every event type, on the channels your guests actually use.</p>
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
          <h2 className="st2">From Invitation to Confirmation</h2>
          <div style={{ display: 'grid', gap: 24, marginTop: 32 }}>
            {[
              { n:'1', t:'We set up your guest list and channels', d:'You share your guest list, event type, and requirements. Our team configures email and WhatsApp templates and the reminder schedule around your timeline.' },
              { n:'2', t:'Guests receive their invitation', d:'A branded invitation goes out by email, WhatsApp, or both, in Arabic and English, matched to how your event actually needs to reach people.' },
              { n:'3', t:'Responses and approvals are tracked live', d:'RSVPs come in through a real-time dashboard, with an approval step if your guest list requires host sign-off before confirming.' },
              { n:'4', t:'Confirmations and credentials go out automatically', d:'Once a guest is confirmed, their confirmation message and e-badge or e-ticket are sent automatically, no manual sending required.' },
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

        <RelatedServices currentHref="/services/invitations" />

        <section style={{ background: 'rgba(212,175,55,0.04)', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '60px 32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Need invitations and reminders handled for your event?</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>Tell us your guest list and channels and we will scope the right setup for you.</p>
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
